import type { StudentRegistrationFormValues } from '../types/forms';
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
