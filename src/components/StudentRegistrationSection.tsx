import React, { useState } from 'react';
import { validateStudentForm } from '../services/validation';
import { mockApiService } from '../services/mockApiService';
import { StudentRegistrationFormValues } from '../types/forms';
import { CheckCircle2, AlertCircle, Loader2, Send, Users, Calendar, Trophy } from 'lucide-react';

export const StudentRegistrationSection: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [studentId, setStudentId] = useState('');
  const [majorClass, setMajorClass] = useState('');
  const [hasTeam, setHasTeam] = useState<boolean>(true);
  const [teamName, setTeamName] = useState('');
  const [teamSize, setTeamSize] = useState<'1' | '2' | '3' | '4' | '5'>('3');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const values: StudentRegistrationFormValues = {
      fullName,
      email,
      phone,
      studentId: studentId.trim(),
      majorClass: majorClass.trim(),
      teamName: hasTeam ? (teamName.trim() || 'Đội AI') : 'Cá nhân ghép đội',
      teamSize: hasTeam ? teamSize : '1',
      domainInterest: 'other',
    };

    const validationErrors = validateStudentForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await mockApiService.registerStudent(values);
      if (response.success) {
        setIsSuccess(true);
      } else {
        setServerError(response.message || 'Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại.');
      }
    } catch {
      setServerError('Không thể kết nối đến máy chủ. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="panel p-6 sm:p-10 max-w-3xl mx-auto">
      {/* Header section */}
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-semibold mb-3">
          <span>DÀNH CHO SINH VIÊN FPT POLYTECHNIC HÀ NỘI</span>
        </div>
        <h2 className="text-3xl font-display font-bold text-ink">
          Đăng ký thử sức cùng AI Buildathon 2026
        </h2>
        <p className="mt-2 text-sm text-muted leading-relaxed">
          Biết lập trình cơ bản, biết dùng ChatGPT, có khoảng 3 bạn cùng nhóm? Đăng ký ngay để phát triển sản phẩm ứng dụng AI giải quyết bài toán thực tế! Nếu chưa có nhóm, chọn <strong>"Cá nhân ghép đội"</strong> để BTC hỗ trợ kết nối.
        </p>

        {/* 3 Quick Facts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-rule text-xs">
          <div className="p-3 rounded-xl bg-paper border border-rule-2 flex items-center gap-3">
            <Users className="w-4 h-4 text-accent flex-shrink-0" />
            <div>
              <span className="text-muted block">Quy mô đội thi</span>
              <span className="font-medium text-ink">Khoảng 3 sinh viên/đội</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-paper border border-rule-2 flex items-center gap-3">
            <Calendar className="w-4 h-4 text-accent flex-shrink-0" />
            <div>
              <span className="text-muted block">Đối tượng tham gia</span>
              <span className="font-medium text-accent">Kỳ 3 đến Kỳ 6 Poly HN</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-paper border border-rule-2 flex items-center gap-3">
            <Trophy className="w-4 h-4 text-accent flex-shrink-0" />
            <div>
              <span className="text-muted block">Lệ phí & Công cụ</span>
              <span className="font-medium text-accent">Miễn phí & Hướng dẫn Free Tier</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        {isSuccess ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-accent-soft border border-accent flex items-center justify-center mx-auto text-accent">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <p className="text-2xl font-display font-medium text-ink">Đăng ký thành công!</p>
            <p className="text-sm text-muted max-w-md mx-auto leading-relaxed">
              Chúc mừng bạn <strong className="text-accent">{fullName}</strong> đã hoàn tất đăng ký tham gia{' '}
              <strong className="text-ink">AI Buildathon 2026</strong>. Ban tổ chức đã gửi email xác nhận và thông tin bước tiếp theo đến <strong className="text-ink">{email}</strong>.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsSuccess(false);
                  setFullName('');
                  setEmail('');
                  setPhone('');
                  setStudentId('');
                  setMajorClass('');
                  setTeamName('');
                }}
                className="btn btn--quiet btn--sm whitespace-nowrap"
              >
                Đăng ký thêm thành viên hoặc đội khác
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {serverError && (
              <div className="p-4 rounded-xl bg-paper border border-red-500/40 text-red-300 text-xs sm:text-sm flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400 mt-0.5" />
                <span>{serverError}</span>
              </div>
            )}

            {/* Participation Mode */}
            <div className="p-3.5 rounded-xl bg-paper border border-rule-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs font-medium text-ink">Hình thức đăng ký:</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setHasTeam(true)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                    hasTeam
                      ? 'bg-accent text-accent-ink font-semibold shadow-sm'
                      : 'bg-paper-2 text-muted border border-rule hover:text-ink'
                  }`}
                >
                  Đã có nhóm (~3 bạn)
                </button>
                <button
                  type="button"
                  onClick={() => setHasTeam(false)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                    !hasTeam
                      ? 'bg-accent text-accent-ink font-semibold shadow-sm'
                      : 'bg-paper-2 text-muted border border-rule hover:text-ink'
                  }`}
                >
                  Cá nhân ghép đội
                </button>
              </div>
            </div>

            {/* Row 1: Name & Student ID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="fullName" className="block text-xs font-medium text-muted mb-1.5">
                  Họ và tên thí sinh *
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Nguyễn Văn An"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full h-11 px-3.5 rounded-xl bg-paper border text-sm text-ink placeholder:text-muted/40 outline-none transition-colors ${
                    errors.fullName ? 'border-red-500' : 'border-rule focus:border-accent'
                  }`}
                />
                {errors.fullName && <p className="mt-1 text-xs text-red-400">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="studentId" className="block text-xs font-medium text-muted mb-1.5">
                  Mã số sinh viên (MSSV) *
                </label>
                <input
                  id="studentId"
                  type="text"
                  placeholder="Ví dụ: PH12345 (hoặc mã sinh viên FPT Poly của bạn)"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className={`w-full h-11 px-3.5 rounded-xl bg-paper border text-sm text-ink placeholder:text-muted/40 outline-none transition-colors ${
                    errors.studentId ? 'border-red-500' : 'border-rule focus:border-accent'
                  }`}
                />
                {errors.studentId && <p className="mt-1 text-xs text-red-400">{errors.studentId}</p>}
              </div>
            </div>

            {/* Row 2: Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-muted mb-1.5">
                  Email sinh viên (FPT / Cá nhân) *
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="annvph12345@fpt.edu.vn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full h-11 px-3.5 rounded-xl bg-paper border text-sm text-ink placeholder:text-muted/40 outline-none transition-colors ${
                    errors.email ? 'border-red-500' : 'border-rule focus:border-accent'
                  }`}
                />
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-medium text-muted mb-1.5">
                  Số điện thoại *
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="0912345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full h-11 px-3.5 rounded-xl bg-paper border text-sm text-ink placeholder:text-muted/40 outline-none transition-colors ${
                    errors.phone ? 'border-red-500' : 'border-rule focus:border-accent'
                  }`}
                />
                {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
              </div>
            </div>

            {/* Row 3: Class & Major (FPT Polytechnic) */}
            <div>
              <label htmlFor="majorClass" className="block text-xs font-medium text-muted mb-1.5">
                Lớp / Chuyên ngành & Kỳ học (FPT Polytechnic Hà Nội) *
              </label>
              <input
                id="majorClass"
                type="text"
                placeholder="Ví dụ: WD18301 - Lập trình Web (Kỳ 4) hoặc SD18402 - Ứng dụng phần mềm (Kỳ 3)"
                value={majorClass}
                onChange={(e) => setMajorClass(e.target.value)}
                className={`w-full h-11 px-3.5 rounded-xl bg-paper border text-sm text-ink placeholder:text-muted/40 outline-none transition-colors ${
                  errors.majorClass ? 'border-red-500' : 'border-rule focus:border-accent'
                }`}
              />
              {errors.majorClass && <p className="mt-1 text-xs text-red-400">{errors.majorClass}</p>}
            </div>

            {/* Row 3: If Team */}
            {hasTeam && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="teamName" className="block text-xs font-medium text-muted mb-1.5">
                    Tên đội thi
                  </label>
                  <input
                    id="teamName"
                    type="text"
                    placeholder="Team AI Builders"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-paper border border-rule text-sm text-ink placeholder:text-muted/40 outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label htmlFor="teamSize" className="block text-xs font-medium text-muted mb-1.5">
                    Số lượng thành viên (khuyến khích khoảng 3 bạn)
                  </label>
                  <select
                    id="teamSize"
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value as '1' | '2' | '3' | '4' | '5')}
                    className="w-full h-11 px-3.5 rounded-xl bg-paper border border-rule text-sm text-ink outline-none focus:border-accent"
                  >
                    <option value="2">2 thành viên</option>
                    <option value="3">3 thành viên (Khuyên dùng)</option>
                    <option value="4">4 thành viên</option>
                    <option value="5">5 thành viên</option>
                  </select>
                </div>
              </div>
            )}

            {/* Friendly Motivation Note */}
            <div className="p-3.5 rounded-xl bg-paper-2 border border-rule-2 flex items-start gap-2.5 text-xs text-muted">
              <span className="text-base flex-shrink-0" aria-hidden="true">💡</span>
              <p className="leading-relaxed">
                <strong className="text-white">Chưa từng tích hợp API AI?</strong> Đừng lo! BTC sẽ tổ chức Workshop hướng dẫn tận dụng các gói Free Tier phổ biến (Gemini, Groq, Open-source...) và các buổi Q&amp;A giải đáp kỹ thuật chung trong suốt 3 tuần phát triển MVP.
              </p>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn--primary w-full py-3.5 text-base flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Đang gửi thông tin đăng ký…</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Xác nhận đăng ký tham gia</span>
                  </>
                )}
              </button>
              <p className="text-center text-xs text-muted mt-2.5">
                Thông tin được dùng cho mục đích xếp đội và gửi tài liệu cuộc thi. Hoàn toàn bảo mật.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
