import React, { useState } from 'react';
import BorderGlow from './BorderGlow';
import AnimatedContent from './AnimatedContent';
import { CheckCircle2, Clock, Sparkles, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

export interface MilestoneItem {
  id: number;
  time: string;
  shortTitle: string;
  fullTitle: string;
  roundBadge: string;
  desc: string;
  keyAction: string;
  isKeyMilestone?: boolean;
  notes?: string;
}

export const MILESTONES: MilestoneItem[] = [
  {
    id: 1,
    time: '09–12/11',
    shortTitle: 'Phát động & Đăng ký',
    fullTitle: 'Phát động cuộc thi & Mở cổng đăng ký',
    roundBadge: 'GIAI ĐOẠN KHỞI ĐỘNG',
    desc: 'Truyền thông, tiếp nhận đăng ký cá nhân và đội nhóm.',
    keyAction: 'Sinh viên hoàn tất đăng ký cá nhân (Solo Builder) hoặc đội nhóm (3–4 thành viên) trên website.',
  },
  {
    id: 2,
    time: '11/11',
    shortTitle: 'Kickoff cuộc thi',
    fullTitle: 'Kickoff cuộc thi – Giới thiệu bài toán HRM',
    roundBadge: 'SỰ KIỆN QUAN TRỌNG',
    desc: 'Giới thiệu bài toán HRM, định hướng và thể lệ.',
    keyAction: 'Tham gia buổi Kickoff để nắm rõ bối cảnh bài toán nhân sự thực tế từ doanh nghiệp và thể lệ thi đấu.',
    isKeyMilestone: true,
  },
  {
    id: 3,
    time: '19/11',
    shortTitle: 'Workshop: Idea to MVP',
    fullTitle: 'Workshop: From Idea to MVP cùng AI Agent',
    roundBadge: 'WORKSHOP CHUYÊN MÔN',
    desc: 'Hỗ trợ định hình sản phẩm, phát triển với AI Agent.',
    keyAction: 'Học hỏi phương pháp chuyển đổi ý tưởng thành MVP chạy thực tế, ứng dụng AI Coding Agents để bứt phá tốc độ phát triển.',
    isKeyMilestone: true,
  },
  {
    id: 4,
    time: '12–23/11',
    shortTitle: 'Vòng 1: Proposal',
    fullTitle: 'Vòng 1: Solution Proposal – Pitch Deck & Video thuyết trình',
    roundBadge: 'VÒNG 1: NỘP BÀI THI',
    desc: 'Các đội hoàn thiện Pitch Deck và Video thuyết trình.',
    keyAction: 'Hoàn thiện hồ sơ giải pháp gồm Pitch Deck giới thiệu sản phẩm và Video thuyết trình demo trước hạn chót 23/11.',
    isKeyMilestone: true,
  },
  {
    id: 5,
    time: '24/11',
    shortTitle: 'Đánh giá Top 8',
    fullTitle: 'Đánh giá & Lựa chọn Top 8 đội xuất sắc',
    roundBadge: 'HỘI ĐỒNG ĐÁNH GIÁ',
    desc: 'Ban giám khảo/Mentor đánh giá hồ sơ dự thi.',
    keyAction: 'Hội đồng Ban giám khảo và Mentor chấm điểm hồ sơ dự thi dựa trên tính giải quyết vấn đề và chất lượng giải pháp.',
  },
  {
    id: 6,
    time: '25/11',
    shortTitle: 'Công bố Top 8',
    fullTitle: 'Công bố kết quả Vòng 1 – Top 8 vào Vòng 2',
    roundBadge: 'KẾT QUẢ VÒNG 1',
    desc: 'Thông báo các đội vào vòng phát triển sản phẩm.',
    keyAction: 'Top 8 đội xuất sắc nhất nhận thông báo chính thức bước vào giai đoạn Mentoring phát triển sản phẩm thực tế.',
    isKeyMilestone: true,
  },
  {
    id: 7,
    time: '26–28/11',
    shortTitle: 'Mentoring & Dev',
    fullTitle: 'Mentoring & Product Development – Hoàn thiện MVP',
    roundBadge: 'GIAI ĐOẠN TĂNG TỐC',
    desc: 'Mentor đồng hành, hỗ trợ các đội hoàn thiện MVP.',
    keyAction: 'Làm việc cùng Mentor chuyên môn để tối ưu luồng chức năng, tinh chỉnh UI/UX và chuẩn bị kịch bản Final Pitch.',
  },
  {
    id: 8,
    time: '03/12',
    shortTitle: 'Vòng 2: Final Pitch',
    fullTitle: 'Vòng 2: Final Pitch – Chung kết & Trao giải',
    roundBadge: 'VÒNG 2: CHUNG KẾT',
    desc: 'Trình diễn sản phẩm và bảo vệ giải pháp trước Ban giám khảo.',
    keyAction: 'Live demo sản phẩm thực tế trước Hội đồng Ban giám khảo, phản biện bảo vệ giải pháp và vinh danh trao giải thưởng.',
    isKeyMilestone: true,
    notes: 'Thời gian và địa điểm chi tiết sẽ được Ban tổ chức gửi thông báo trực tiếp đến Top 8.',
  },
];

export const SprintTimeline: React.FC = () => {
  const [activeId, setActiveId] = useState<number>(3);

  const current = MILESTONES.find((m) => m.id === activeId) || MILESTONES[0];

  const handlePrev = () => {
    if (activeId > 1) setActiveId(activeId - 1);
  };

  const handleNext = () => {
    if (activeId < MILESTONES.length) setActiveId(activeId + 1);
  };

  return (
    <div className="sprint-timeline w-full mt-10 space-y-6" role="region" aria-label="Lịch trình cuộc thi AI Buildathon 2026">
      {/* 1. Header Ribbon with Schedule summary & Interaction hint */}
      <div className="p-4 sm:p-5 rounded-2xl bg-paper border border-rule-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted">
        <div className="flex items-center gap-2.5">
          <Calendar className="w-4 h-4 text-accent flex-shrink-0" />
          <span className="text-white font-medium">
            Lịch trình tổ chức: <strong className="text-accent font-mono font-bold">09/11 đến 03/12</strong>
          </span>
          <span className="hidden sm:inline text-muted/60">·</span>
          <span className="hidden sm:inline text-ink/70">Nhấp vào từng cột mốc để xem chi tiết hoạt động</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="pill text-[11px] font-semibold text-accent border border-accent/30 bg-accent/10">
            2 Vòng thi: Solution Proposal &amp; Final Pitch
          </span>
        </div>
      </div>

      {/* 2. Interactive Timeline Stepper Track (8 Nodes) */}
      <div className="p-5 sm:p-6 rounded-2xl bg-paper border border-rule-2 overflow-x-auto">
        <div className="min-w-[760px] lg:min-w-0">
          <div className="relative">
            {/* Background connecting progress line */}
            <div className="absolute top-4 left-6 right-6 h-0.5 bg-paper-2 rounded-full overflow-hidden pointer-events-none">
              <div
                className="h-full bg-accent transition-all duration-300 ease-out"
                style={{ width: `${((activeId - 1) / (MILESTONES.length - 1)) * 100}%` }}
              />
            </div>

            {/* 8 Milestone Nodes */}
            <div className="grid grid-cols-8 gap-2 relative z-10">
              {MILESTONES.map((m) => {
                const isSelected = activeId === m.id;
                const isPassed = m.id < activeId;

                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setActiveId(m.id)}
                    className={`group flex flex-col items-center text-center transition-all p-1.5 rounded-xl cursor-pointer ${
                      isSelected
                        ? 'bg-paper-2/80 ring-1 ring-accent/40 shadow-lg'
                        : 'hover:bg-paper-2/40'
                    }`}
                  >
                    {/* Node circle */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isSelected
                          ? m.isKeyMilestone
                            ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20 ring-4 ring-amber-500/20'
                            : 'bg-accent text-white shadow-md shadow-accent/20 ring-4 ring-accent/20'
                          : isPassed
                          ? 'bg-accent/40 text-white'
                          : 'bg-paper border border-rule text-muted'
                      }`}
                    >
                      {m.isKeyMilestone ? (
                        <span className="text-[11px]">★</span>
                      ) : (
                        m.id
                      )}
                    </div>

                    {/* Time label */}
                    <span
                      className={`text-xs font-mono font-bold mt-2 transition-colors ${
                        isSelected
                          ? m.isKeyMilestone
                            ? 'text-amber-300'
                            : 'text-white'
                          : 'text-muted group-hover:text-ink'
                      }`}
                    >
                      {m.time}
                    </span>

                    {/* Short title */}
                    <span
                      className={`text-[11px] leading-tight line-clamp-1 mt-0.5 transition-colors ${
                        isSelected ? 'text-white font-medium' : 'text-muted/70 group-hover:text-muted'
                      }`}
                    >
                      {m.shortTitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Milestone Detail Card (Revealed on click, with smooth animation) */}
      <AnimatedContent key={current.id} distance={15} duration={0.3} trigger="mount">
        <BorderGlow
          backgroundColor="#12111d"
          borderRadius={24}
          glowRadius={38}
          glowIntensity={current.isKeyMilestone ? 1.1 : 0.8}
          edgeSensitivity={30}
          colors={current.isKeyMilestone ? ['#f59e0b', '#7c5dfa', '#d97706'] : ['#7c5dfa', '#4378ff', '#a588f6']}
          glowColor="255 85 70"
          className="w-full"
        >
          <div className="p-7 sm:p-9 bg-paper-card rounded-[24px] space-y-6">
            {/* Top Bar: Badges + Prev/Next controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-rule-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono text-xs font-bold text-accent px-2.5 py-1 rounded-md bg-accent/15 border border-accent/30">
                  Cột mốc 0{current.id} / 0{MILESTONES.length}
                </span>
                <span className="pill text-[11px] text-muted font-mono font-semibold">
                  {current.roundBadge}
                </span>
                {current.isKeyMilestone && (
                  <span className="pill text-[11px] text-amber-300 bg-amber-500/15 border-amber-500/30 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>Sự kiện nổi bật</span>
                  </span>
                )}
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={activeId === 1}
                  className="px-2.5 py-1.5 rounded-lg bg-paper border border-rule text-xs text-muted hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-1 cursor-pointer"
                  aria-label="Cột mốc trước"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Trước</span>
                </button>
                <span className="text-xs font-mono text-muted/60">
                  {activeId}/{MILESTONES.length}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={activeId === MILESTONES.length}
                  className="px-2.5 py-1.5 rounded-lg bg-paper border border-rule text-xs text-muted hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-1 cursor-pointer"
                  aria-label="Cột mốc tiếp theo"
                >
                  <span className="hidden sm:inline">Tiếp</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Date & Title */}
            <div>
              <div className="text-2xl sm:text-3xl font-mono font-extrabold text-white tracking-tight flex items-baseline gap-3 mb-2">
                <span className={current.isKeyMilestone ? 'text-amber-300' : 'text-accent'}>
                  {current.time}
                </span>
                <span className="text-sm font-sans font-normal text-muted hidden sm:inline">
                  — Cột mốc hoạt động
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                {current.fullTitle}
              </h3>
              <p className="text-sm text-muted mt-2 leading-relaxed max-w-3xl">
                {current.desc}
              </p>
            </div>

            {/* Key Action Callout */}
            <div className="p-4 rounded-xl bg-paper border border-rule-2 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <strong className="text-xs font-semibold text-white block">
                  Mục tiêu &amp; Hoạt động chính:
                </strong>
                <p className="text-xs text-muted leading-relaxed">
                  {current.keyAction}
                </p>
              </div>
            </div>

            {/* Specific Note (if any) */}
            {current.notes && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-300/90">
                <Clock className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-400" />
                <span className="leading-relaxed">
                  <strong className="text-amber-300">Lưu ý quan trọng:</strong> {current.notes}
                </span>
              </div>
            )}
          </div>
        </BorderGlow>
      </AnimatedContent>
    </div>
  );
};

export default SprintTimeline;
