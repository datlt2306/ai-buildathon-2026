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
    fullTitle: 'Phát động cuộc thi và mở cổng đăng ký',
    roundBadge: 'GIAI ĐOẠN KHỞI ĐỘNG',
    desc: 'Mở cổng tiếp nhận hồ sơ đăng ký tham gia dành cho sinh viên FPT Polytechnic cơ sở Hà Nội. Sinh viên có thể đăng ký theo nhóm (khoảng 3 bạn) hoặc đăng ký cá nhân để BTC hỗ trợ kết nối đồng đội.',
    keyAction: 'Lập nhóm khoảng 3 bạn hoặc đăng ký cá nhân trên landing page trước khi đóng cổng.',
  },
  {
    id: 2,
    time: '11/11',
    shortTitle: 'Kickoff cuộc thi',
    fullTitle: 'Lễ Kickoff & Công bố đề tài nghiệp vụ',
    roundBadge: 'SỰ KIỆN QUAN TRỌNG',
    desc: 'Buổi lễ phát động chính thức của AI Buildathon 2026. Doanh nghiệp đồng hành chia sẻ bối cảnh hoạt động, quy trình nghiệp vụ HR Admin và chính thức công bố các bài toán thực tế.',
    keyAction: 'Tham gia trực tiếp / online để nắm rõ đề bài và giải đáp thắc mắc cùng Doanh nghiệp.',
    isKeyMilestone: true,
  },
  {
    id: 3,
    time: '12–23/11',
    shortTitle: 'Vòng 1: MVP Review',
    fullTitle: 'Vòng 1 – MVP Review và triển khai Seminar/Workshop',
    roundBadge: 'VÒNG 1: MVP REVIEW',
    desc: 'Các đội tập trung phát triển giải pháp phần mềm Web MVP ứng dụng AI, chủ động lựa chọn công nghệ và công cụ phù hợp. BTC tổ chức các buổi Seminar/Workshop chuyên môn và giải đáp kỹ thuật chung. Hạn chót nộp sản phẩm: 23/11.',
    keyAction: 'Xây dựng sản phẩm Web MVP chạy được, nộp mã nguồn và video demo chức năng.',
  },
  {
    id: 4,
    time: '25/11',
    shortTitle: 'Công bố Top 8',
    fullTitle: 'Công bố kết quả Vòng 1 – Top 8 đội vào vòng 2',
    roundBadge: 'KẾT QUẢ VÒNG 1',
    desc: 'Hội đồng Ban giám khảo đánh giá sản phẩm MVP của các đội thi dựa trên tính giải quyết vấn đề thực tế và chất lượng hoàn thiện. Chính thức công bố danh sách 8 đội thi xuất sắc nhất bước vào vòng chung kết.',
    keyAction: 'Top 8 đội sẵn sàng tiếp nhận hướng dẫn chuyên sâu cho vòng chung kết.',
    isKeyMilestone: true,
  },
  {
    id: 5,
    time: '27–28/11',
    shortTitle: 'Seminar/Workshop số 1',
    fullTitle: 'Seminar/Workshop số 1 hỗ trợ Top 8',
    roundBadge: 'VÒNG 2: CHUNG KẾT',
    desc: 'Phiên chia sẻ và cố vấn chuyên sâu hỗ trợ Top 8 hoàn thiện tính năng sản phẩm, tối ưu trải nghiệm người dùng và rèn luyện kỹ năng thuyết trình (pitching) trước Hội đồng.',
    keyAction: 'Hoàn thiện slide thuyết trình, kịch bản demo và trau chuốt sản phẩm thực tế.',
  },
  {
    id: 6,
    time: '30/11–02/12',
    shortTitle: 'Vòng 2: Final Pitch',
    fullTitle: 'Vòng 2 – Vòng chung kết & Final Pitch trao giải',
    roundBadge: 'VÒNG 2: FINAL PITCH',
    desc: 'Top 8 đội thi trình diễn trực tiếp sản phẩm MVP và thuyết trình bảo vệ giải pháp trước Hội đồng Ban giám khảo, Doanh nghiệp đồng hành và khán giả để tìm ra các đội đoạt giải.',
    keyAction: 'Demo sản phẩm thực tế, trả lời phản biện và vinh danh trao giải thưởng.',
    isKeyMilestone: true,
    notes: 'Thời gian tổ chức cụ thể sẽ được BTC thông báo chính thức sau khi xác nhận lịch hội trường.',
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
            Lịch trình tổ chức: <strong className="text-accent font-mono font-bold">09/11 đến 02/12</strong>
          </span>
          <span className="hidden sm:inline text-muted/60">·</span>
          <span className="hidden sm:inline text-ink/70">Nhấp vào từng cột mốc để xem chi tiết hoạt động</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="pill text-[11px] font-semibold text-accent border border-accent/30 bg-accent/10">
            2 Vòng thi: MVP Review &amp; Final Pitch
          </span>
        </div>
      </div>

      {/* 2. Interactive Timeline Stepper Track (6 Nodes) */}
      <div className="p-5 sm:p-6 rounded-2xl bg-paper border border-rule-2 overflow-x-auto">
        <div className="min-w-[620px] sm:min-w-0">
          <div className="relative">
            {/* Background connecting progress line */}
            <div className="absolute top-4 left-6 right-6 h-0.5 bg-paper-2 rounded-full overflow-hidden pointer-events-none">
              <div
                className="h-full bg-accent transition-all duration-300 ease-out"
                style={{ width: `${((activeId - 1) / (MILESTONES.length - 1)) * 100}%` }}
              />
            </div>

            {/* 6 Milestone Nodes */}
            <div className="grid grid-cols-6 gap-2 relative z-10">
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
                  Cột mốc 0{current.id} / 06
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
                  {activeId}/6
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
