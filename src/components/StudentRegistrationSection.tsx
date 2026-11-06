import React, { useState } from 'react';
import { validateStudentForm } from '../services/validation';
import { mockApiService } from '../services/mockApiService';
import { StudentRegistrationFormValues, TeamMemberInfo } from '../types/forms';
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Send,
  Users,
  Calendar,
  Sparkles
} from 'lucide-react';
import { syncStudentRegistrationToGoogleSheets } from '../services/googleSheetsService';
import { MENTORS_LIST } from '../constants/mentors';

export const StudentRegistrationSection: React.FC = () => {
  // Team info
  const [teamName, setTeamName] = useState('');
  const [teamSize, setTeamSize] = useState<'3' | '4'>('3');
  const [mentor, setMentor] = useState('');

  // Leader info (Thành viên 1 - Đại diện nhóm)
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [studentId, setStudentId] = useState('');
  const [majorClass, setMajorClass] = useState('');

  // Additional members (Thành viên 2, 3... - chỉ cần Họ tên và MSSV)
  const [members, setMembers] = useState<TeamMemberInfo[]>([
    { fullName: '', studentId: '' },
    { fullName: '', studentId: '' },
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleTeamSizeChange = (newSize: '3' | '4') => {
    setTeamSize(newSize);
    const count = parseInt(newSize, 10) - 1;
    setMembers((prev) => {
      const updated = [...prev];
      while (updated.length < count) {
        updated.push({ fullName: '', studentId: '' });
      }
      return updated.slice(0, count);
    });
  };

  const handleMemberChange = (index: number, field: keyof TeamMemberInfo, value: string) => {
    setMembers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const localErrors: Record<string, string> = {};

    // Validate Team Name
    if (!teamName.trim()) {
      localErrors.teamName = 'Vui lòng nhập tên đội thi.';
    } else if (teamName.trim().length < 2) {
      localErrors.teamName = 'Tên đội thi phải có ít nhất 2 ký tự.';
    }

    // Validate Mentor
    if (!mentor.trim()) {
      localErrors.mentor = 'Vui lòng chọn Giảng viên hướng dẫn / Mentor đồng hành.';
    }

    // Validate Leader Info
    const values: StudentRegistrationFormValues = {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      studentId: studentId.trim(),
      majorClass: majorClass.trim(),
      teamName: teamName.trim() || 'Team AI Builders',
      teamSize,
      mentor: mentor.trim(),
      domainInterest: 'other',
      members,
    };

    const validationErrors = validateStudentForm(values);
    Object.assign(localErrors, validationErrors);

    // Validate additional team members (only fullName and studentId are required)
    members.forEach((m, idx) => {
      const memberNum = idx + 2;
      if (!m.fullName.trim()) {
        localErrors[`member_${idx}_fullName`] = `Vui lòng nhập họ tên Thành viên ${memberNum}.`;
      }
      if (!m.studentId.trim()) {
        localErrors[`member_${idx}_studentId`] = `Vui lòng nhập MSSV Thành viên ${memberNum}.`;
      }
    });

    if (Object.keys(localErrors).length > 0) {
      setErrors(localErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await mockApiService.registerStudent(values);
      if (response.success) {
        // Tự động điền vào file Google Drive Excel / Google Sheets
        try {
          await syncStudentRegistrationToGoogleSheets(values, response.data);
        } catch (err) {
          console.warn('[GoogleSheets] Sync warning:', err);
        }
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
          Đăng ký tham gia AI Buildathon 2026
        </h2>
        <p className="mt-2 text-sm text-muted leading-relaxed">
          Mỗi đội thi gồm 3 hoặc 4 sinh viên. Trưởng nhóm đại diện đăng ký thông tin đội và điền danh sách các thành viên cùng tham gia để phát triển sản phẩm ứng dụng AI giải quyết bài toán thực tế.
        </p>

        {/* 3 Quick Facts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-rule text-xs">
          <div className="p-3 rounded-xl bg-paper border border-rule-2 flex items-center gap-3">
            <Users className="w-4 h-4 text-accent flex-shrink-0" />
            <div>
              <span className="text-muted block">Quy mô đội thi</span>
              <span className="font-medium text-ink">3 – 4 sinh viên/đội</span>
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
            <Sparkles className="w-4 h-4 text-accent flex-shrink-0" />
            <div>
              <span className="text-muted block">Công cụ & Công nghệ</span>
              <span className="font-medium text-accent">Sinh viên tự chọn</span>
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
            <p className="text-2xl font-display font-medium text-ink">Đăng ký đội thi thành công!</p>
            <p className="text-sm text-muted max-w-lg mx-auto leading-relaxed">
              Chúc mừng đội <strong className="text-accent">{teamName}</strong> do trưởng nhóm <strong className="text-white">{fullName}</strong> đại diện đã hoàn tất đăng ký tham gia <strong className="text-ink">AI Buildathon 2026</strong>. Ban tổ chức đã gửi email xác nhận và thông tin bước tiếp theo đến <strong className="text-ink">{email}</strong>.
            </p>

            {/* Members summary */}
            <div className="p-4 rounded-xl bg-paper border border-rule-2 max-w-md mx-auto text-left text-xs space-y-2 mt-4">
              <div className="flex items-center justify-between pb-2 border-b border-rule/50">
                <span className="text-muted font-medium">Giảng viên / Mentor:</span>
                <span className="text-accent font-semibold">{mentor || 'Chưa chỉ định'}</span>
              </div>
              <div className="text-muted font-medium">Danh sách thành viên đăng ký:</div>
              <div className="text-ink flex items-center justify-between">
                <span>1. {fullName} (Trưởng nhóm)</span>
                <span className="text-muted font-mono">{studentId}</span>
              </div>
              {members.map((m, idx) => (
                <div key={idx} className="text-ink flex items-center justify-between">
                  <span>{idx + 2}. {m.fullName}</span>
                  <span className="text-muted font-mono">{m.studentId}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsSuccess(false);
                  setTeamName('');
                  setMentor('');
                  setFullName('');
                  setEmail('');
                  setPhone('');
                  setStudentId('');
                  setMajorClass('');
                  setMembers([
                    { fullName: '', studentId: '' },
                    { fullName: '', studentId: '' },
                  ]);
                  setTeamSize('3');
                }}
                className="btn btn--quiet btn--sm whitespace-nowrap"
              >
                Đăng ký thêm đội thi khác
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

            {/* Section 1: Team Information */}
            <div className="p-5 sm:p-6 rounded-2xl bg-paper-2/60 border border-rule-2 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-rule">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-accent/20 border border-accent/30 text-accent flex items-center justify-center text-xs font-bold">1</span>
                  <span className="text-sm font-bold text-ink">Thông tin đội thi</span>
                </div>
                <span className="text-xs text-muted">Bắt buộc</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor="teamName" className="block text-xs font-medium text-muted mb-1.5">
                    Tên đội thi *
                  </label>
                  <input
                    id="teamName"
                    type="text"
                    placeholder="Ví dụ: Team AI Builders, Poly Innovators..."
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className={`w-full h-11 px-3.5 rounded-xl bg-paper border text-sm text-ink placeholder:text-muted/40 outline-none transition-colors ${
                      errors.teamName ? 'border-red-500' : 'border-rule focus:border-accent'
                    }`}
                  />
                  {errors.teamName && <p className="mt-1 text-xs text-red-400">{errors.teamName}</p>}
                </div>

                <div>
                  <label htmlFor="teamSize" className="block text-xs font-medium text-muted mb-1.5">
                    Số lượng thành viên *
                  </label>
                  <select
                    id="teamSize"
                    value={teamSize}
                    onChange={(e) => handleTeamSizeChange(e.target.value as '3' | '4')}
                    className="w-full h-11 px-3.5 rounded-xl bg-paper border border-rule text-sm text-ink outline-none focus:border-accent"
                  >
                    <option value="3">3 thành viên</option>
                    <option value="4">4 thành viên</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="mentor" className="text-xs font-medium text-muted">
                    Giảng viên hướng dẫn / Mentor đồng hành *
                  </label>
                  <span className="text-[11px] text-accent">11 Thầy đồng hành</span>
                </div>
                <select
                  id="mentor"
                  value={mentor}
                  onChange={(e) => setMentor(e.target.value)}
                  className={`w-full h-11 px-3.5 rounded-xl bg-paper border text-sm text-ink outline-none transition-colors ${
                    errors.mentor ? 'border-red-500' : 'border-rule focus:border-accent'
                  }`}
                >
                  <option value="">-- Chọn Giảng viên hướng dẫn / Mentor --</option>
                  {MENTORS_LIST.map((m) => (
                    <option key={m.id} value={`${m.name} - ${m.username}`}>
                      {m.name} - {m.username}
                    </option>
                  ))}
                </select>
                {errors.mentor && <p className="mt-1 text-xs text-red-400">{errors.mentor}</p>}
              </div>
            </div>

            {/* Section 2: Leader Information */}
            <div className="p-5 sm:p-6 rounded-2xl bg-paper-2/60 border border-rule-2 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-rule">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-accent/20 border border-accent/30 text-accent flex items-center justify-center text-xs font-bold">2</span>
                  <span className="text-sm font-bold text-ink">Thông tin Trưởng nhóm</span>
                </div>
                <span className="pill text-[11px] text-accent font-semibold">Đại diện liên hệ</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-medium text-muted mb-1.5">
                    Họ và tên trưởng nhóm *
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
                    placeholder="Ví dụ: PH12345"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className={`w-full h-11 px-3.5 rounded-xl bg-paper border text-sm text-ink placeholder:text-muted/40 outline-none transition-colors ${
                      errors.studentId ? 'border-red-500' : 'border-rule focus:border-accent'
                    }`}
                  />
                  {errors.studentId && <p className="mt-1 text-xs text-red-400">{errors.studentId}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    Số điện thoại liên hệ *
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
            </div>

            {/* Section 3: Team Members Information (Họ tên & MSSV) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-paper-2/60 border border-rule-2 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-rule">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-accent/20 border border-accent/30 text-accent flex items-center justify-center text-xs font-bold">3</span>
                  <span className="text-sm font-bold text-ink">Thông tin thành viên nhóm</span>
                </div>
                <span className="text-xs text-muted">{members.length} thành viên khác</span>
              </div>

              <div className="space-y-3">
                {members.map((member, idx) => {
                  const memberNum = idx + 2;
                  const nameErr = errors[`member_${idx}_fullName`];
                  const idErr = errors[`member_${idx}_studentId`];

                  return (
                    <div key={idx} className="p-4 rounded-xl bg-paper border border-rule-2 space-y-3">
                      <div className="flex items-center justify-between text-xs font-semibold text-accent pb-2 border-b border-rule/50">
                        <span>Thành viên {memberNum}</span>
                        <span className="text-[11px] text-muted font-normal">Thành viên đội thi</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-muted mb-1">
                            Họ và tên thành viên {memberNum} *
                          </label>
                          <input
                            type="text"
                            placeholder="Ví dụ: Trần Thị Bình"
                            value={member.fullName}
                            onChange={(e) => handleMemberChange(idx, 'fullName', e.target.value)}
                            className={`w-full h-10 px-3 rounded-lg bg-paper-2 border text-xs text-ink placeholder:text-muted/40 outline-none transition-colors ${
                              nameErr ? 'border-red-500' : 'border-rule focus:border-accent'
                            }`}
                          />
                          {nameErr && <p className="mt-1 text-[11px] text-red-400">{nameErr}</p>}
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-muted mb-1">
                            Mã số sinh viên (MSSV) *
                          </label>
                          <input
                            type="text"
                            placeholder="Ví dụ: PH23456"
                            value={member.studentId}
                            onChange={(e) => handleMemberChange(idx, 'studentId', e.target.value)}
                            className={`w-full h-10 px-3 rounded-lg bg-paper-2 border text-xs text-ink placeholder:text-muted/40 outline-none transition-colors ${
                              idErr ? 'border-red-500' : 'border-rule focus:border-accent'
                            }`}
                          />
                          {idErr && <p className="mt-1 text-[11px] text-red-400">{idErr}</p>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Friendly Motivation Note */}
            <div className="p-3.5 rounded-xl bg-paper-2 border border-rule-2 flex items-start gap-2.5 text-xs text-muted">
              <span className="text-base flex-shrink-0" aria-hidden="true">💡</span>
              <p className="leading-relaxed">
                <strong className="text-white">Chủ động công cụ &amp; công nghệ:</strong> Sinh viên hoàn toàn tự do lựa chọn ngôn ngữ lập trình, framework, công cụ phát triển và AI Coding Agents phù hợp với sở trường của nhóm để xây dựng sản phẩm.
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
                    <span>Đang gửi thông tin đăng ký đội thi…</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Xác nhận đăng ký đội thi</span>
                  </>
                )}
              </button>
              <p className="text-center text-xs text-muted mt-2.5">
                Thông tin được dùng cho mục đích tiếp nhận đội thi và gửi tài liệu cuộc thi. Hoàn toàn bảo mật.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
