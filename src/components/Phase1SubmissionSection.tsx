import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Send,
  FileText,
  Video,
  ExternalLink,
  ShieldCheck,
  Search,
  Calendar,
  Clock,
  RefreshCw,
  Info,
} from 'lucide-react';
import { Phase1SubmissionFormValues, Phase1TeamVerificationResult } from '../types/forms';
import { validatePhase1Submission } from '../services/validation';
import { verifyTeamForPhase1, syncPhase1SubmissionToGoogleSheets } from '../services/googleSheetsService';

export const Phase1SubmissionSection: React.FC = () => {
  // Verification step fields
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<Phase1TeamVerificationResult | null>(null);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  // Proposal submission fields
  const [projectTitle, setProjectTitle] = useState('');
  const [pitchDeckUrl, setPitchDeckUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [summaryDescription, setSummaryDescription] = useState('');
  const [confirmedShareAccess, setConfirmedShareAccess] = useState(false);

  // Honeypot for anti-bot spam
  const [honeypot, setHoneypot] = useState('');

  // Submission state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submissionResultData, setSubmissionResultData] = useState<{
    teamName: string;
    projectTitle: string;
    pitchDeckUrl: string;
    videoUrl: string;
    submissionCount: number;
    submittedAt: string;
  } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  // Step 1: Handle Team Verification
  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setVerifyError(null);

    const normId = studentId.trim().toUpperCase();
    const normEmail = email.trim().toLowerCase();

    if (!normId) {
      setVerifyError('Vui lòng nhập Mã số sinh viên (MSSV) của bạn.');
      return;
    }
    if (!normEmail) {
      setVerifyError('Vui lòng nhập Email sinh viên của bạn.');
      return;
    }

    setIsVerifying(true);
    try {
      const res = await verifyTeamForPhase1(normId, normEmail);
      if (res.valid) {
        setVerificationResult(res);
        setVerifyError(null);

        // Nếu nhóm đã nộp bài trước đó, tự động điền thông tin cũ để sinh viên dễ cập nhật
        if (res.alreadySubmitted && res.existingSubmission) {
          if (res.existingSubmission.projectTitle) setProjectTitle(res.existingSubmission.projectTitle);
          if (res.existingSubmission.pitchDeckUrl) setPitchDeckUrl(res.existingSubmission.pitchDeckUrl);
          if (res.existingSubmission.videoUrl) setVideoUrl(res.existingSubmission.videoUrl);
          if (res.existingSubmission.summaryDescription) setSummaryDescription(res.existingSubmission.summaryDescription);
          setConfirmedShareAccess(true);
        }
      } else {
        setVerificationResult(null);
        setVerifyError(res.message || 'Không tìm thấy thông tin đăng ký hợp lệ trong hệ thống.');
      }
    } catch {
      setVerifyError('Không thể kết nối đến máy chủ đối soát. Vui lòng kiểm tra lại kết nối mạng.');
    } finally {
      setIsVerifying(false);
    }
  };

  // Step 2: Handle Proposal Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Anti-bot honeypot check
    if (honeypot.trim()) {
      console.warn('[AntiSpam] Bot detected via honeypot.');
      setIsSuccess(true);
      return;
    }

    const team = verificationResult?.teamData;
    const finalValues: Phase1SubmissionFormValues = {
      studentId: studentId.trim().toUpperCase(),
      email: email.trim().toLowerCase(),
      teamName: team?.teamName || `Đội thi ${studentId.trim().toUpperCase()}`,
      leaderName: team?.leaderName || 'Trưởng nhóm',
      phone: team?.leaderPhone || '',
      mentor: team?.mentor || 'Chưa chỉ định',
      registrationType: team?.registrationType || 'team',
      registrationId: team?.registrationId || `AIC-STU-${studentId.trim().toUpperCase()}`,
      projectTitle: projectTitle.trim(),
      pitchDeckUrl: pitchDeckUrl.trim(),
      videoUrl: videoUrl.trim(),
      summaryDescription: summaryDescription.trim(),
      confirmedShareAccess,
    };

    const validationErrors = validatePhase1Submission(finalValues);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const syncResult = await syncPhase1SubmissionToGoogleSheets(finalValues);
      if (syncResult.success) {
        setSubmissionResultData({
          teamName: finalValues.teamName,
          projectTitle: finalValues.projectTitle,
          pitchDeckUrl: finalValues.pitchDeckUrl,
          videoUrl: finalValues.videoUrl,
          submissionCount: syncResult.submissionCount || 1,
          submittedAt: new Date().toLocaleString('vi-VN'),
        });
        setIsSuccess(true);
      } else {
        setServerError(syncResult.message || 'Có lỗi xảy ra khi nộp bài. Vui lòng thử lại.');
      }
    } catch {
      setServerError('Không thể kết nối đến hệ thống nộp bài. Vui lòng thử lại sau giây lát.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isAlreadySubmitted = Boolean(verificationResult?.alreadySubmitted);

  return (
    <div className="max-w-6xl mx-auto" id="submission-portal">
      {/* Portal Top Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/15 border border-accent/40 text-accent text-xs font-semibold mb-3.5 shadow-sm shadow-accent/10">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>VÒNG 1: SOLUTION PROPOSAL · HẠN CHÓT 23:59 · 23/11/2026</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
          Cổng tiếp nhận bài thi Vòng 1
        </h2>
        <p className="mt-3 text-sm text-muted leading-relaxed max-w-2xl mx-auto">
          Dành riêng cho các đội thi và cá nhân <strong>đã đăng ký tham gia</strong> nộp Slide Pitch Deck và Video giải pháp để Hội đồng chuyên môn đánh giá lựa chọn <strong className="text-white">Top 8 bước vào Vòng 2</strong>.
        </p>
      </div>

      {/* Main 2-Column Portal Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Guidelines, Criteria, Status & Registration Bridge */}
        <div className="lg:col-span-5 space-y-6">
          {/* Status & Timeline Card */}
          <div className="p-6 rounded-3xl bg-paper-card border border-rule-2 relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-rule-2 mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Cổng nộp bài đang mở</span>
              </div>
              <span className="pill text-[11px] text-accent font-mono font-semibold">Giai đoạn 1</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-accent/15 border border-accent/30 text-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Calendar className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-xs text-muted block">Hạn chót tiếp nhận</span>
                  <span className="text-sm font-bold text-amber-300">23:59 Thứ Hai · 23/11/2026</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-xs text-muted block">Lộ trình đánh giá</span>
                  <span className="text-xs text-ink leading-snug block mt-0.5">
                    <strong>24/11:</strong> Đánh giá hồ sơ &bull; <strong>25/11:</strong> Công bố Top 8
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <RefreshCw className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-xs text-muted block">Cơ chế nộp đè linh hoạt</span>
                  <span className="text-xs text-muted leading-relaxed block mt-0.5">
                    Hệ thống tự động ghi nhận phiên bản mới nhất. Có thể cập nhật lại bất kỳ lúc nào trước giờ đóng cổng.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Submission Checklist Card */}
          <div className="p-6 rounded-3xl bg-paper-card border border-rule-2 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-rule-2">
              <FileText className="w-4 h-4 text-accent" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Hồ sơ nộp bài gồm những gì?</h3>
            </div>

            <ul className="space-y-3.5 text-xs text-muted">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-accent/20 text-accent flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-[10px]">1</span>
                <div>
                  <strong className="text-white block mb-0.5">Slide Pitch Deck (10–15 slides)</strong>
                  <span>Tập trung làm rõ: Vấn đề nhân sự cần giải quyết, giải pháp phần mềm, giao diện Mockup/UI, kiến trúc kỹ thuật và cách ứng dụng AI.</span>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-[10px]">2</span>
                <div>
                  <strong className="text-white block mb-0.5">Video thuyết trình &amp; Demo luồng (3–5 phút)</strong>
                  <span>Trình bày súc tích ý tưởng nhóm và demo luồng thao tác trên sản phẩm MVP thực tế (YouTube hoặc Drive mở quyền xem).</span>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-[10px]">3</span>
                <div>
                  <strong className="text-white block mb-0.5">Bật quyền xem công khai</strong>
                  <span>Cả Slide và Video đều phải được cấp quyền &ldquo;Bất kỳ ai có liên kết đều xem được&rdquo; để Ban giám khảo truy cập chấm thi.</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Pathway Bridge: For Unregistered Students */}
          <div className="p-5 rounded-2xl bg-paper border border-rule-2 relative overflow-hidden flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-accent uppercase tracking-wider block">Chưa có đội thi?</span>
              <p className="text-xs text-muted">
                Nếu bạn chưa từng đăng ký tham gia cuộc thi, hãy điền form đăng ký trước khi nộp bài.
              </p>
            </div>
            <a
              href="#register"
              className="btn btn--small btn--secondary flex-shrink-0 text-xs font-semibold whitespace-nowrap"
            >
              Đăng ký mới ↓
            </a>
          </div>
        </div>

        {/* Right Column: The Interactive Submission Console */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-9 rounded-3xl bg-paper-card border border-accent/30 shadow-2xl shadow-accent/5 relative">
            {isSuccess && submissionResultData ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-accent-soft border border-accent flex items-center justify-center mx-auto text-accent shadow-lg shadow-accent/20">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white">
                  {submissionResultData.submissionCount > 1
                    ? 'Cập nhật bài thi Vòng 1 thành công!'
                    : 'Nộp bài thi Vòng 1 thành công!'}
                </h3>
                <p className="text-xs sm:text-sm text-muted max-w-lg mx-auto leading-relaxed">
                  Hồ sơ dự thi của đội <strong className="text-accent">{submissionResultData.teamName}</strong> với đề tài <strong className="text-white">&ldquo;{submissionResultData.projectTitle}&rdquo;</strong> đã được ghi nhận trực tiếp vào bảng điểm Ban giám khảo.
                </p>

                {/* Submission Receipt Card */}
                <div className="p-5 rounded-2xl bg-paper border border-rule-2 max-w-lg mx-auto text-left text-xs space-y-3 mt-4">
                  <div className="flex items-center justify-between pb-2.5 border-b border-rule/50">
                    <span className="text-muted font-medium">Trạng thái ghi nhận:</span>
                    <span className="pill text-[11px] text-accent font-semibold">
                      Đã tiếp nhận (Lần {submissionResultData.submissionCount})
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-muted">
                    <span>Thời gian nộp:</span>
                    <span className="text-ink font-mono">{submissionResultData.submittedAt}</span>
                  </div>
                  <div className="flex items-center justify-between text-muted">
                    <span>Link Pitch Deck:</span>
                    <a
                      href={submissionResultData.pitchDeckUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-accent hover:underline flex items-center gap-1 font-mono max-w-[220px] truncate"
                    >
                      <span className="truncate">{submissionResultData.pitchDeckUrl}</span>
                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    </a>
                  </div>
                  <div className="flex items-center justify-between text-muted">
                    <span>Link Video:</span>
                    <a
                      href={submissionResultData.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sky-400 hover:underline flex items-center gap-1 font-mono max-w-[220px] truncate"
                    >
                      <span className="truncate">{submissionResultData.videoUrl}</span>
                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    </a>
                  </div>

                  <div className="pt-2 border-t border-rule/50 text-[11px] text-muted flex items-start gap-1.5">
                    <Info className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                    <span>
                      Ban giám khảo sẽ tiến hành đánh giá hồ sơ vào ngày <strong>24/11</strong> và công bố danh sách <strong>Top 8 vào Vòng 2</strong> vào ngày <strong>25/11</strong>.
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSuccess(false);
                    }}
                    className="btn btn--quiet btn--sm"
                  >
                    Chỉnh sửa hoặc nộp lại bản mới
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {serverError && (
                  <div className="p-4 rounded-xl bg-paper border border-red-500/40 text-red-300 text-xs sm:text-sm flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400 mt-0.5" />
                    <span>{serverError}</span>
                  </div>
                )}

                {/* STEP 1: VERIFY TEAM & LEADER */}
                <div className="p-5 sm:p-6 rounded-2xl bg-paper/80 border border-rule-2 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-rule">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-accent/20 border border-accent/30 text-accent flex items-center justify-center text-xs font-bold">1</span>
                      <span className="text-sm font-bold text-white">Xác thực Trưởng nhóm / Thí sinh</span>
                    </div>
                    <span className="pill text-[11px] text-accent font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Đối soát danh sách</span>
                    </span>
                  </div>

                  <p className="text-xs text-muted leading-relaxed">
                    Nhập Mã số sinh viên (MSSV) và Email của <strong>Trưởng nhóm</strong> (đối với đội) hoặc <strong>Thí sinh</strong> (đối với cá nhân) để hệ thống tự động xác nhận quyền nộp bài:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="verifyStudentId" className="block text-xs font-medium text-muted mb-1.5">
                        Mã số sinh viên (MSSV) *
                      </label>
                      <input
                        id="verifyStudentId"
                        type="text"
                        placeholder="Ví dụ: PH12345"
                        value={studentId}
                        onChange={(e) => {
                          setStudentId(e.target.value);
                          if (verificationResult) setVerificationResult(null);
                        }}
                        className="w-full h-11 px-3.5 rounded-xl bg-paper-2 border border-rule text-sm text-ink placeholder:text-muted/40 outline-none focus:border-accent"
                      />
                    </div>

                    <div>
                      <label htmlFor="verifyEmail" className="block text-xs font-medium text-muted mb-1.5">
                        Email sinh viên FPT *
                      </label>
                      <input
                        id="verifyEmail"
                        type="email"
                        placeholder="annvph12345@fpt.edu.vn"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (verificationResult) setVerificationResult(null);
                        }}
                        className="w-full h-11 px-3.5 rounded-xl bg-paper-2 border border-rule text-sm text-ink placeholder:text-muted/40 outline-none focus:border-accent"
                      />
                    </div>
                  </div>

                  {verifyError && (
                    <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400 mt-0.5" />
                      <span>{verifyError}</span>
                    </div>
                  )}

                  {/* Verified Team Info Callout */}
                  {verificationResult?.valid && verificationResult.teamData && (
                    <div className="p-4 rounded-xl bg-accent/10 border border-accent/30 space-y-2.5 text-xs">
                      <div className="flex items-center justify-between pb-2 border-b border-accent/20">
                        <span className="text-white font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-accent" />
                          <span>Xác thực thành công!</span>
                        </span>
                        <span className="pill text-[11px] text-accent font-semibold">
                          {verificationResult.teamData.registrationType === 'individual' ? 'Cá nhân' : 'Đội thi'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-muted">
                        <div>
                          <span>Đội thi: </span>
                          <strong className="text-white">{verificationResult.teamData.teamName}</strong>
                        </div>
                        <div>
                          <span>Đại diện: </span>
                          <strong className="text-white">{verificationResult.teamData.leaderName}</strong> ({verificationResult.teamData.leaderStudentId})
                        </div>
                        <div>
                          <span>Mentor: </span>
                          <span className="text-accent font-medium">{verificationResult.teamData.mentor}</span>
                        </div>
                        {verificationResult.teamData.majorClass && (
                          <div>
                            <span>Lớp / Chuyên ngành: </span>
                            <span className="text-ink">{verificationResult.teamData.majorClass}</span>
                          </div>
                        )}
                      </div>

                      {isAlreadySubmitted && (
                        <div className="mt-2 pt-2 border-t border-accent/20 flex items-center gap-1.5 text-amber-300 font-medium">
                          <Clock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                          <span>Đội bạn đã có bài nộp trước đó. Bạn có thể cập nhật link mới bên dưới để nộp đè.</span>
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => handleVerify()}
                    disabled={isVerifying}
                    className="btn btn--secondary w-full py-2.5 text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    {isVerifying ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Đang đối soát dữ liệu đăng ký...</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-3.5 h-3.5" />
                        <span>{verificationResult?.valid ? 'Xác thực lại thông tin' : 'Kiểm tra & Xác thực đội thi'}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* STEP 2: SUBMISSION FORM */}
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Invisible Honeypot to trap spam bots */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="website_url_hp"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  <div className="p-5 sm:p-6 rounded-2xl bg-paper/80 border border-rule-2 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-rule">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-accent/20 border border-accent/30 text-accent flex items-center justify-center text-xs font-bold">2</span>
                        <span className="text-sm font-bold text-white">Hồ sơ bài thi Vòng 1</span>
                      </div>
                      <span className="text-xs text-muted">Bắt buộc</span>
                    </div>

                    {/* Field 1: Project Title */}
                    <div>
                      <label htmlFor="projectTitle" className="block text-xs font-medium text-muted mb-1.5">
                        Tên đề tài / Vấn đề HR Admin giải quyết *
                      </label>
                      <input
                        id="projectTitle"
                        type="text"
                        placeholder="Ví dụ: Trợ lý AI tra cứu nội quy & chính sách phúc lợi nhân sự nội bộ"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        className={`w-full h-11 px-3.5 rounded-xl bg-paper-2 border text-sm text-ink placeholder:text-muted/40 outline-none transition-colors ${
                          errors.projectTitle ? 'border-red-500' : 'border-rule focus:border-accent'
                        }`}
                      />
                      {errors.projectTitle && <p className="mt-1 text-xs text-red-400">{errors.projectTitle}</p>}
                    </div>

                    {/* Field 2: Pitch Deck URL */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="pitchDeckUrl" className="text-xs font-medium text-muted flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-accent" />
                          <span>Link Slide Pitch Deck (Thuyết trình giải pháp) *</span>
                        </label>
                        <span className="text-[11px] text-accent">Slides / Canva / Drive PDF</span>
                      </div>
                      <input
                        id="pitchDeckUrl"
                        type="url"
                        placeholder="https://docs.google.com/presentation/d/... hoặc https://www.canva.com/design/..."
                        value={pitchDeckUrl}
                        onChange={(e) => setPitchDeckUrl(e.target.value)}
                        className={`w-full h-11 px-3.5 rounded-xl bg-paper-2 border text-sm text-ink placeholder:text-muted/40 outline-none transition-colors ${
                          errors.pitchDeckUrl ? 'border-red-500' : 'border-rule focus:border-accent'
                        }`}
                      />
                      {errors.pitchDeckUrl && <p className="mt-1 text-xs text-red-400">{errors.pitchDeckUrl}</p>}
                    </div>

                    {/* Field 3: Video URL */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="videoUrl" className="text-xs font-medium text-muted flex items-center gap-1.5">
                          <Video className="w-3.5 h-3.5 text-sky-400" />
                          <span>Link Video thuyết trình &amp; Trình diễn luồng MVP (3–5 phút) *</span>
                        </label>
                        <span className="text-[11px] text-sky-400">YouTube / Drive / Loom</span>
                      </div>
                      <input
                        id="videoUrl"
                        type="url"
                        placeholder="https://youtu.be/... hoặc https://drive.google.com/file/d/..."
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        className={`w-full h-11 px-3.5 rounded-xl bg-paper-2 border text-sm text-ink placeholder:text-muted/40 outline-none transition-colors ${
                          errors.videoUrl ? 'border-red-500' : 'border-rule focus:border-accent'
                        }`}
                      />
                      {errors.videoUrl && <p className="mt-1 text-xs text-red-400">{errors.videoUrl}</p>}
                    </div>

                    {/* Field 4: Summary Description */}
                    <div>
                      <label htmlFor="summaryDescription" className="block text-xs font-medium text-muted mb-1.5">
                        Tóm tắt ngắn gọn giải pháp &amp; công cụ AI ứng dụng *
                      </label>
                      <textarea
                        id="summaryDescription"
                        rows={3}
                        placeholder="Tóm tắt 2-3 câu: Pain Point giải quyết, công nghệ AI sử dụng (ví dụ: Google Gemini API, Claude, LangChain, Vibe Coding...) và điểm nổi bật của giải pháp."
                        value={summaryDescription}
                        onChange={(e) => setSummaryDescription(e.target.value)}
                        className={`w-full p-3 rounded-xl bg-paper-2 border text-xs sm:text-sm text-ink placeholder:text-muted/40 outline-none transition-colors resize-none ${
                          errors.summaryDescription ? 'border-red-500' : 'border-rule focus:border-accent'
                        }`}
                      />
                      {errors.summaryDescription && <p className="mt-1 text-xs text-red-400">{errors.summaryDescription}</p>}
                    </div>

                    {/* Checklist: Permission Confirmation */}
                    <div className="p-3.5 rounded-xl bg-paper-2/70 border border-rule-2 space-y-2">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={confirmedShareAccess}
                          onChange={(e) => setConfirmedShareAccess(e.target.checked)}
                          className="mt-0.5 rounded border-rule text-accent focus:ring-accent"
                        />
                        <span className="text-xs text-ink leading-relaxed">
                          Tôi xác nhận <strong>đã bật quyền xem công khai (&ldquo;Bất kỳ ai có liên kết đều có thể xem&rdquo;)</strong> cho cả Slide và Video để Ban giám khảo có thể mở và đánh giá hồ sơ.
                        </span>
                      </label>
                      {errors.confirmedShareAccess && (
                        <p className="text-xs text-red-400 pl-6">{errors.confirmedShareAccess}</p>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn--primary w-full py-3.5 text-base flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-accent/20"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Đang kiểm tra và ghi nhận bài nộp Vòng 1...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>{isAlreadySubmitted ? 'Cập nhật bài thi Vòng 1' : 'Xác nhận nộp bài thi Vòng 1'}</span>
                        </>
                      )}
                    </button>
                    <p className="text-center text-xs text-muted mt-2.5">
                      Dữ liệu bài nộp được bảo mật và tự động đồng bộ vào bảng điểm riêng của Ban giám khảo.
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Phase1SubmissionSection;
