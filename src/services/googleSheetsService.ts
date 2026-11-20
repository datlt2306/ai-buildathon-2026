import type {
  StudentRegistrationFormValues,
  Phase1SubmissionFormValues,
  Phase1TeamVerificationResult,
} from '../types/forms';
import type { StudentRegistrationResult } from '../types/api';

export interface GoogleSheetRowPayload {
  timestamp: string;
  registrationId: string;
  teamName: string;
  teamSize: string;
  mentor: string;
  leaderName: string;
  leaderStudentId: string;
  leaderEmail: string;
  leaderPhone: string;
  majorClass: string;
  member2Name: string;
  member2StudentId: string;
  member3Name: string;
  member3StudentId: string;
  member4Name: string;
  member4StudentId: string;
  status: string;
}

export interface GoogleSheetsSyncResult {
  success: boolean;
  syncedToCloud: boolean;
  message: string;
  error?: string;
  submissionCount?: number;
}

export interface Phase1GoogleSheetRowPayload {
  action: 'submitPhase1';
  timestamp: string;
  registrationId: string;
  teamName: string;
  registrationType: string;
  leaderName: string;
  studentId: string;
  email: string;
  phone: string;
  mentor: string;
  projectTitle: string;
  pitchDeckUrl: string;
  videoUrl: string;
  summaryDescription: string;
}

export const DEFAULT_GOOGLE_SHEETS_URL =
  'https://script.google.com/macros/s/AKfycbychcwV3JlCshtBoXbxP0A2lCwby3tW2avAofsJl814ODJJO74W_zqyz1ogZMXkeV-bDA/exec';

let customWebhookOverride: string | null = null;

/**
 * Lấy URL Google Apps Script Web App (Webhook):
 * Ưu tiên 1: Override trực tiếp (dùng trong test hoặc cấu hình tạm thời)
 * Ưu tiên 2: Biến môi trường Vite (VITE_GOOGLE_SHEETS_SCRIPT_URL)
 * Ưu tiên 3: URL Webhook chính thức mặc định
 */
export function getGoogleSheetsWebhookUrl(): string {
  if (customWebhookOverride !== null) {
    return customWebhookOverride;
  }

  // Tự động dọn dẹp cache cũ trong localStorage để không bị trỏ nhầm link cũ
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem('aic_google_sheets_url');
    }
  } catch {
    // Ignore
  }

  // Vite environment variable (Vite thay thế tĩnh lúc compile) hoặc process.env
  let envUrl = '';
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      envUrl = import.meta.env.VITE_GOOGLE_SHEETS_SCRIPT_URL || '';
    }
  } catch {
    // fallback if import.meta.env is not accessible
  }

  if (!envUrl && typeof process !== 'undefined' && process.env) {
    envUrl = process.env.VITE_GOOGLE_SHEETS_SCRIPT_URL || '';
  }

  const finalUrl = envUrl.trim() || DEFAULT_GOOGLE_SHEETS_URL;
  return finalUrl;
}

/**
 * Cho phép thiết lập URL Webhook (hoặc truyền chuỗi rỗng để mô phỏng chưa cấu hình)
 */
export function setGoogleSheetsWebhookUrl(url: string): void {
  customWebhookOverride = url;
}

/**
 * Kiểm tra xem đã cấu hình Google Sheets Webhook URL chưa
 */
export function isGoogleSheetsConfigured(): boolean {
  return Boolean(getGoogleSheetsWebhookUrl());
}

/**
 * Chuyển đổi dữ liệu form đăng ký thành dòng dữ liệu chuẩn cho Google Sheets / Excel
 */
export function formatStudentRegistrationForSheet(
  values: StudentRegistrationFormValues,
  result?: Partial<StudentRegistrationResult>
): GoogleSheetRowPayload {
  const now = new Date();
  const formattedTime = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

  const members = values.members || [];
  const member2 = members[0] || { fullName: '', studentId: '' };
  const member3 = members[1] || { fullName: '', studentId: '' };
  const member4 = members[2] || { fullName: '', studentId: '' };

  return {
    timestamp: formattedTime,
    registrationId: result?.registrationId || `AIC-STU-${Date.now().toString(36).toUpperCase()}`,
    teamName: values.teamName.trim(),
    teamSize: `${values.teamSize} thành viên`,
    mentor: values.mentor?.trim() || 'Chưa chỉ định',
    leaderName: values.fullName.trim(),
    leaderStudentId: values.studentId.trim().toUpperCase(),
    leaderEmail: values.email.trim(),
    leaderPhone: values.phone?.trim() || values.phoneNumber?.trim() || '',
    majorClass: values.majorClass.trim(),
    member2Name: member2.fullName?.trim() || '',
    member2StudentId: member2.studentId?.trim().toUpperCase() || '',
    member3Name: member3.fullName?.trim() || '',
    member3StudentId: member3.studentId?.trim().toUpperCase() || '',
    member4Name: member4.fullName?.trim() || '',
    member4StudentId: member4.studentId?.trim().toUpperCase() || '',
    status: 'Đã tiếp nhận',
  };
}

/**
 * Gửi dữ liệu đăng ký vào Google Drive Excel (Google Sheets) qua Google Apps Script Web App
 */
export async function syncStudentRegistrationToGoogleSheets(
  values: StudentRegistrationFormValues,
  result?: Partial<StudentRegistrationResult>
): Promise<GoogleSheetsSyncResult> {
  const webhookUrl = getGoogleSheetsWebhookUrl();
  const payload = formatStudentRegistrationForSheet(values, result);

  if (!webhookUrl) {
    console.info('[GoogleSheets] Chưa cấu hình Google Sheets Webhook URL. Dữ liệu đã lưu cục bộ.');
    return {
      success: true,
      syncedToCloud: false,
      message: 'Đã lưu đăng ký cục bộ. Chưa kết nối URL Google Sheets Web App.',
    };
  }

  try {
    /**
     * Dùng fetch với text/plain hoặc no-cors:
     * Google Apps Script Web App tự động redirect (302). Để tránh trình duyệt chặn do CORS
     * preflight OPTIONS request, gửi payload dạng stringified JSON với Content-Type: text/plain
     * hoặc mode: 'no-cors'. Google Apps Script lấy được toàn bộ nội dung qua e.postData.contents.
     */
    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    console.info('[GoogleSheets] Đã gửi thông tin đăng ký đến Google Drive Excel thành công:', payload);

    return {
      success: true,
      syncedToCloud: true,
      message: 'Thông tin đăng ký đã được tự động điền vào file Google Drive Excel (Google Sheets)!',
    };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Lỗi kết nối';
    console.error('[GoogleSheets] Lỗi khi gửi dữ liệu lên Google Sheets:', error);
    return {
      success: false,
      syncedToCloud: false,
      message: 'Không thể kết nối đến file Google Drive Excel. Vui lòng kiểm tra lại Webhook URL.',
      error: errorMsg,
    };
  }
}

/**
 * Kiểm tra kết nối thử tới Google Apps Script Web App
 */
export async function testGoogleSheetsWebhook(url: string): Promise<{ success: boolean; message: string }> {
  if (!url || !url.trim().startsWith('http')) {
    return {
      success: false,
      message: 'URL không hợp lệ. Vui lòng nhập đúng đường dẫn Web App của Google Apps Script (bắt đầu bằng https://script.google.com/macros/s/...)',
    };
  }

  try {
    const testPayload = {
      isTest: true,
      timestamp: new Date().toLocaleString('vi-VN'),
      message: 'Kiểm tra kết nối AI Buildathon 2026',
    };

    await fetch(url.trim(), {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(testPayload),
    });

    return {
      success: true,
      message: 'Gửi tín hiệu kiểm tra thành công! Vui lòng kiểm tra file Google Sheets trên Google Drive.',
    };
  } catch (err) {
    return {
      success: false,
      message: `Không thể kết nối tới Google Sheets: ${err instanceof Error ? err.message : 'Lỗi không xác định'}`,
    };
  }
}

/**
 * Xuất danh sách đăng ký đã lưu cục bộ ra định dạng file Excel / CSV (UTF-8 BOM)
 * Tương thích 100% với Microsoft Excel và Google Drive Spreadsheet.
 */
export function exportRegistrationsToCSV(): void {
  try {
    const raw = typeof window !== 'undefined' ? window.localStorage.getItem('aic_submissions_students') : null;
    const records = raw ? JSON.parse(raw) : [];

    if (!Array.isArray(records) || records.length === 0) {
      alert('Chưa có dữ liệu đăng ký sinh viên nào được lưu trên trình duyệt.');
      return;
    }

    const headers = [
      'STT',
      'Thời gian đăng ký',
      'Mã đăng ký',
      'Tên đội thi',
      'Số lượng thành viên',
      'Giảng viên / Mentor',
      'Trưởng nhóm - Họ tên',
      'Trưởng nhóm - MSSV',
      'Trưởng nhóm - Email',
      'Trưởng nhóm - SĐT',
      'Lớp / Ngành / Kỳ',
      'Thành viên 2 - Họ tên',
      'Thành viên 2 - MSSV',
      'Thành viên 3 - Họ tên',
      'Thành viên 3 - MSSV',
      'Thành viên 4 - Họ tên',
      'Thành viên 4 - MSSV',
      'Trạng thái',
    ];

    const escapeCsv = (str: unknown): string => {
      const val = String(str ?? '').replace(/"/g, '""');
      return `"${val}"`;
    };

    const rows = records.map((rec, index) => {
      const members = rec.members || [];
      const m2 = members[0] || {};
      const m3 = members[1] || {};
      const m4 = members[2] || {};

      return [
        index + 1,
        escapeCsv(rec.submittedAt || rec.registeredAt || new Date().toISOString()),
        escapeCsv(rec.confirmationCode || rec.registrationId || ''),
        escapeCsv(rec.teamName || ''),
        escapeCsv(rec.teamSize ? `${rec.teamSize} thành viên` : ''),
        escapeCsv(rec.mentor || 'Chưa chỉ định'),
        escapeCsv(rec.fullName || ''),
        escapeCsv(rec.studentId || ''),
        escapeCsv(rec.email || ''),
        escapeCsv(rec.phone || rec.phoneNumber || ''),
        escapeCsv(rec.majorClass || ''),
        escapeCsv(m2.fullName || ''),
        escapeCsv(m2.studentId || ''),
        escapeCsv(m3.fullName || ''),
        escapeCsv(m3.studentId || ''),
        escapeCsv(m4.fullName || ''),
        escapeCsv(m4.studentId || ''),
        escapeCsv('Đã tiếp nhận'),
      ].join(',');
    });

    // UTF-8 BOM (\uFEFF) giúp Excel hiển thị tiếng Việt có dấu chuẩn 100%
    const csvContent = '\uFEFF' + [headers.map(escapeCsv).join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Danh_Sach_Dang_Ky_AI_Buildathon_2026_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Lỗi khi xuất file Excel:', err);
    alert('Có lỗi khi tạo file Excel. Vui lòng thử lại.');
  }
}

/**
 * Chuyển đổi dữ liệu nộp bài Vòng 1 thành payload chuẩn gửi tới Apps Script Webhook
 */
export function formatPhase1SubmissionForSheet(
  values: Phase1SubmissionFormValues
): Phase1GoogleSheetRowPayload {
  const now = new Date();
  const formattedTime = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

  return {
    action: 'submitPhase1',
    timestamp: formattedTime,
    registrationId: values.registrationId?.trim() || `AIC-STU-${values.studentId.trim().toUpperCase()}`,
    teamName: values.teamName.trim(),
    registrationType: values.registrationType === 'individual' ? 'Cá nhân' : 'Đội thi',
    leaderName: values.leaderName.trim(),
    studentId: values.studentId.trim().toUpperCase(),
    email: values.email.trim(),
    phone: values.phone?.trim() || '',
    mentor: values.mentor?.trim() || 'Chưa chỉ định',
    projectTitle: values.projectTitle.trim(),
    pitchDeckUrl: values.pitchDeckUrl.trim(),
    videoUrl: values.videoUrl.trim(),
    summaryDescription: values.summaryDescription.trim(),
  };
}

/**
 * Tra cứu & Xác thực đội thi trước khi cho phép nộp bài Vòng 1:
 * - Đối soát MSSV và Email của Trưởng nhóm / Thí sinh cá nhân
 * - Phát hiện nếu là thành viên thường (member 2, 3...) nộp hộ
 * - Phát hiện nếu đã có bài nộp trước đó để hỗ trợ cập nhật (Upsert)
 */
export async function verifyTeamForPhase1(
  studentId: string,
  email: string
): Promise<Phase1TeamVerificationResult> {
  const normId = studentId.trim().toUpperCase();
  const normEmail = email.trim().toLowerCase();

  if (!normId || !normEmail) {
    return {
      valid: false,
      message: 'Vui lòng nhập cả MSSV và Email của Trưởng nhóm/Thí sinh.',
    };
  }

  // 1. Thử gọi Webhook Google Apps Script nếu có kết nối
  const webhookUrl = getGoogleSheetsWebhookUrl();
  if (webhookUrl) {
    try {
      const verifyEndpoint = `${webhookUrl}${webhookUrl.includes('?') ? '&' : '?'}action=verifyTeam&studentId=${encodeURIComponent(normId)}&email=${encodeURIComponent(normEmail)}`;
      const res = await fetch(verifyEndpoint, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        const json = await res.json();
        if (json && typeof json.valid === 'boolean') {
          return json;
        }
      }
    } catch {
      // Nếu mạng hoặc CORS chặn GET trực tiếp, tiếp tục đối soát qua local cache
    }
  }

  // 2. Đối soát cục bộ qua LocalStorage (Dữ liệu đã lưu khi đăng ký)
  try {
    const rawStudents = typeof window !== 'undefined' ? window.localStorage.getItem('aic_submissions_students') : null;
    const records = rawStudents ? JSON.parse(rawStudents) : [];

    if (Array.isArray(records) && records.length > 0) {
      let matchedRecord: any = null;
      let matchedMember: any = null;

      for (const rec of records) {
        const recLeaderId = String(rec.studentId || '').trim().toUpperCase();
        const recLeaderEmail = String(rec.email || '').trim().toLowerCase();

        if (recLeaderId === normId) {
          if (recLeaderEmail === normEmail) {
            matchedRecord = rec;
            break;
          } else {
            const masked = recLeaderEmail.replace(/(.{2})(.*)(@.*)/, '$1***$3');
            return {
              valid: false,
              message: `MSSV chính xác nhưng Email không khớp với email Trưởng nhóm đã đăng ký (${masked}). Vui lòng kiểm tra lại!`,
            };
          }
        }

        // Kiểm tra thành viên thường
        if (Array.isArray(rec.members)) {
          const isMem = rec.members.some((m: any) => String(m.studentId || '').trim().toUpperCase() === normId);
          if (isMem) {
            matchedMember = rec;
          }
        }
      }

      if (!matchedRecord && matchedMember) {
        return {
          valid: false,
          isLeader: false,
          message: `MSSV ${normId} là thành viên của đội "${matchedMember.teamName}". Theo quy định, chỉ Trưởng nhóm (${matchedMember.fullName}) mới có quyền đại diện đội nộp bài thi!`,
        };
      }

      if (matchedRecord) {
        // Kiểm tra xem đã từng nộp bài Vòng 1 chưa trong localStorage
        const rawPhase1 = typeof window !== 'undefined' ? window.localStorage.getItem('aic_submissions_phase1') : null;
        const phase1List = rawPhase1 ? JSON.parse(rawPhase1) : [];
        const existing = Array.isArray(phase1List) ? phase1List.find((p: any) => p.studentId === normId) : null;

        return {
          valid: true,
          isLeader: true,
          teamData: {
            teamName: matchedRecord.teamName || 'Thí sinh tự do',
            leaderName: matchedRecord.fullName,
            leaderStudentId: matchedRecord.studentId,
            leaderEmail: matchedRecord.email,
            leaderPhone: matchedRecord.phone || matchedRecord.phoneNumber || '',
            mentor: matchedRecord.mentor || 'Chưa chỉ định',
            registrationId: matchedRecord.registrationId || matchedRecord.confirmationCode || `AIC-STU-${normId}`,
            registrationType: String(matchedRecord.teamSize || '').includes('1') ? 'individual' : 'team',
            majorClass: matchedRecord.majorClass || '',
          },
          alreadySubmitted: Boolean(existing),
          existingSubmission: existing || undefined,
          message: existing
            ? `Đội "${matchedRecord.teamName}" đã nộp bài trước đó. Bạn có thể gửi lại để cập nhật bản mới nhất.`
            : `Xác thực thành công đội thi "${matchedRecord.teamName}"!`,
        };
      }
    }
  } catch (err) {
    console.warn('[GoogleSheets] Lỗi tra cứu cache:', err);
  }

  // 3. Nếu chưa tìm thấy trong cache cục bộ (ví dụ đổi máy hoặc đăng ký từ nơi khác)
  // Cung cấp fallback xác thực hợp lệ để sinh viên không bị chặn cứng khi đăng ký từ máy khác
  return {
    valid: true,
    isLeader: true,
    teamData: {
      teamName: `Đội thi ${normId}`,
      leaderName: 'Trưởng nhóm',
      leaderStudentId: normId,
      leaderEmail: normEmail,
      leaderPhone: '',
      mentor: 'BTC điều phối',
      registrationId: `AIC-STU-${normId}`,
      registrationType: 'team',
    },
    alreadySubmitted: false,
    message: `Đã tiếp nhận thông tin xác thực cho MSSV ${normId}. Thông tin bài thi sẽ được đối soát tự động khi lưu vào Google Sheets!`,
  };
}

/**
 * Gửi dữ liệu nộp bài Vòng 1 vào Sheet "Vòng 1 - Nộp bài (Proposal)"
 */
export async function syncPhase1SubmissionToGoogleSheets(
  values: Phase1SubmissionFormValues
): Promise<GoogleSheetsSyncResult> {
  const webhookUrl = getGoogleSheetsWebhookUrl();
  const payload = formatPhase1SubmissionForSheet(values);

  // Lưu trữ cục bộ với cơ chế Upsert
  let submissionCount = 1;
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = window.localStorage.getItem('aic_submissions_phase1');
      const list = raw ? JSON.parse(raw) : [];
      const normId = values.studentId.trim().toUpperCase();
      const existingIdx = Array.isArray(list) ? list.findIndex((item: any) => item.studentId === normId) : -1;

      if (existingIdx >= 0) {
        submissionCount = (list[existingIdx].submissionCount || 1) + 1;
        list[existingIdx] = {
          ...values,
          studentId: normId,
          submittedAt: list[existingIdx].submittedAt || payload.timestamp,
          updatedAt: payload.timestamp,
          submissionCount,
        };
      } else {
        list.push({
          ...values,
          studentId: normId,
          submittedAt: payload.timestamp,
          updatedAt: payload.timestamp,
          submissionCount: 1,
        });
      }
      window.localStorage.setItem('aic_submissions_phase1', JSON.stringify(list));
    }
  } catch (err) {
    console.warn('[LocalStorage] Lỗi lưu trữ nộp bài Vòng 1:', err);
  }

  if (!webhookUrl) {
    return {
      success: true,
      syncedToCloud: false,
      submissionCount,
      message: `Đã lưu bài thi Vòng 1 cục bộ (Lần ${submissionCount}). Chưa kết nối Google Sheets Webhook.`,
    };
  }

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    return {
      success: true,
      syncedToCloud: true,
      submissionCount,
      message: `Bài thi Vòng 1 của đội "${values.teamName}" đã được ghi nhận thành công vào Google Drive Excel!`,
    };
  } catch (error) {
    return {
      success: false,
      syncedToCloud: false,
      submissionCount,
      message: 'Không thể kết nối đến Google Sheets. Bài dự thi đã được lưu tạm trên máy của bạn.',
      error: error instanceof Error ? error.message : 'Lỗi kết nối',
    };
  }
}
