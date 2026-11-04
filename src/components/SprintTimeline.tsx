import React, { useState } from 'react';
import BorderGlow from './BorderGlow';
import { Sparkles, Target, Trophy, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';

export interface SprintPhase {
  week: number;
  days: string;
  title: string;
  phaseVi: string;
  focus: string;
  activities: string[];
  checkpoint: string;
  badge: string;
  tagColor: string;
}

const SPRINTS: SprintPhase[] = [
  {
    week: 1,
    days: 'Ngày 01 – 07',
    title: 'Understand & Design',
    phaseVi: 'Chọn ý tưởng & Nhập môn API AI',
    focus: 'Lập team, chọn bài toán vừa sức và tham gia Workshop hướng dẫn gọi API từ con số 0.',
    activities: [
      'Thành lập nhóm khoảng 3 bạn cùng lớp Poly (hoặc ghép đội tại buổi Orientation).',
      'Chọn bài toán gần gũi: CSKH shop, trợ lý học tập, app đời sống hoặc nâng cấp đồ án môn học.',
      'Tham gia Workshop cầm tay chỉ việc: Cấp code mẫu kết nối Gemini/ChatGPT API chạy được ngay.',
    ],
    checkpoint: 'Khung giao diện sơ bộ (Mockup Figma/Web) & Kịch bản tính năng AI.',
    badge: 'Tuần 1 · Khởi động',
    tagColor: '#8261f6',
  },
  {
    week: 2,
    days: 'Ngày 08 – 14',
    title: 'Build & Validate',
    phaseVi: 'Ghép AI vào sản phẩm & Nhờ Mentor sửa code',
    focus: 'Dựng giao diện quen thuộc, kết nối API AI và được Mentor là Senior Dev hỗ trợ gỡ bug.',
    activities: [
      'Lập trình web/app bằng ngôn ngữ đội thành thạo (React, Vue, Java, PHP, Flutter...).',
      'Viết hàm gọi API AI, thử nghiệm các câu prompt để bot trả lời thông minh và chuẩn xác.',
      'Phiên cố vấn 1-1 cùng Mentor công nghệ hỗ trợ gỡ lỗi code và tối ưu trải nghiệm.',
    ],
    checkpoint: 'Bản MVP chạy được luồng tương tác chính (Working Prototype).',
    badge: 'Tuần 2 · Thực chiến',
    tagColor: '#487cf6',
  },
  {
    week: 3,
    days: 'Ngày 15 – 21',
    title: 'Polish & Demo',
    phaseVi: 'Tút tát giao diện & Tự tin tỏa sáng Demo Day',
    focus: 'Hoàn thiện sản phẩm mượt mà, chuẩn bị slide và tự tin bảo vệ trước Hội đồng.',
    activities: [
      'Trau chuốt giao diện UI/UX trực quan, kiểm tra các trường hợp người dùng nhập liệu.',
      'Quay video demo ngắn 2 phút và hoàn thiện vài slide giới thiệu ý tưởng nổi bật.',
      'Tổng duyệt kỹ thuật và thuyết trình sản phẩm trực tiếp tại Demo Day FPT Polytechnic.',
    ],
    checkpoint: 'Trình diễn trực tiếp tại AI Buildathon Demo Day, nhận chứng nhận & giải thưởng.',
    badge: 'Tuần 3 · Chung kết',
    tagColor: '#a588f6',
  },
];

export const SprintTimeline: React.FC = () => {
  const [activeWeek, setActiveWeek] = useState<number>(1);

  return (
    <div className="sprint-timeline w-full mt-10 space-y-8" role="region" aria-label="Lộ trình 3 tuần thực chiến">
      {/* 21-Day Interactive Stepper Ribbon */}
      <div className="panel p-5 sm:p-6 overflow-hidden">
        {/* Header bar of the timeline */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-rule-2">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
              <Calendar className="w-4 h-4" />
            </span>
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                Lộ trình 21 ngày thực chiến
              </p>
              <h3 className="text-base font-bold text-ink tracking-tight m-0">
                Từ ý tưởng sơ khai đến sản phẩm AI chạy thực tế
              </h3>
            </div>
          </div>

          {/* Quick sprint selector pills */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Chọn tuần thi">
            {SPRINTS.map((s) => {
              const isSelected = activeWeek === s.week;
              return (
                <button
                  key={s.week}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveWeek(s.week)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-accent text-white shadow-lg shadow-accent/25'
                      : 'bg-paper-2 text-muted hover:text-ink hover:bg-paper-2/80'
                  }`}
                >
                  Tuần {s.week}
                </button>
              );
            })}
          </div>
        </div>

        {/* 21 Days Visual Bar & Milestones */}
        <div className="pt-6">
          <div className="relative">
            {/* Glowing progress track line */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-paper-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent via-[#487cf6] to-accent transition-all duration-500 ease-out"
                style={{ width: `${(activeWeek / 3) * 100}%` }}
              />
            </div>

            {/* 21 Day micro ticks */}
            <div
              className="relative items-center z-10"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(21, minmax(0, 1fr))', gap: '0.25rem' }}
            >
              {Array.from({ length: 21 }, (_, idx) => {
                const day = idx + 1;
                const weekIndex = day <= 7 ? 1 : day <= 14 ? 2 : 3;
                const isCheckpoint = day === 7 || day === 14 || day === 21;
                const isSelectedWeek = activeWeek === weekIndex;
                const isPassedOrCurrent = day <= activeWeek * 7;

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setActiveWeek(weekIndex)}
                    title={`Ngày ${day} · Tuần ${weekIndex}`}
                    className={`group relative flex flex-col items-center justify-center py-2 transition-transform ${
                      isSelectedWeek ? 'scale-110' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    {/* Tick indicator */}
                    <span
                      className={`rounded-full transition-all duration-200 ${
                        isCheckpoint
                          ? 'w-3.5 h-3.5 border-2 ' +
                            (isPassedOrCurrent
                              ? 'bg-accent border-accent text-white shadow-[0_0_12px_rgba(130,97,246,0.8)]'
                              : 'bg-paper border-rule text-muted')
                          : 'w-2 h-2 ' +
                            (isPassedOrCurrent ? 'bg-accent/80' : 'bg-muted/30 group-hover:bg-muted')
                      }`}
                    />
                    {/* Day number on checkpoints or on md screens */}
                    <span
                      className={`text-[10px] font-mono mt-1 transition-colors ${
                        isCheckpoint
                          ? 'font-bold text-accent'
                          : 'text-muted/60 hidden sm:inline-block group-hover:text-ink'
                      }`}
                    >
                      {day}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Key milestone summary badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 mt-4 border-t border-rule-2 text-xs">
            <div
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                activeWeek === 1
                  ? 'bg-accent/10 border-accent/40 text-ink'
                  : 'bg-paper/40 border-rule-2 text-muted hover:border-rule'
              }`}
              onClick={() => setActiveWeek(1)}
            >
              <div className="flex items-center gap-1.5 font-semibold text-accent mb-0.5">
                <Target className="w-3.5 h-3.5" />
                <span>Mốc Ngày 07 · Checkpoint 1</span>
              </div>
              <p className="line-clamp-1">Chốt bài toán & Kiến trúc giải pháp MVP</p>
            </div>

            <div
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                activeWeek === 2
                  ? 'bg-accent/10 border-accent/40 text-ink'
                  : 'bg-paper/40 border-rule-2 text-muted hover:border-rule'
              }`}
              onClick={() => setActiveWeek(2)}
            >
              <div className="flex items-center gap-1.5 font-semibold text-[#487cf6] mb-0.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Mốc Ngày 14 · Checkpoint 2</span>
              </div>
              <p className="line-clamp-1">Hoàn thành Prototype & Mentor Review 1-1</p>
            </div>

            <div
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                activeWeek === 3
                  ? 'bg-accent/10 border-accent/40 text-ink'
                  : 'bg-paper/40 border-rule-2 text-muted hover:border-rule'
              }`}
              onClick={() => setActiveWeek(3)}
            >
              <div className="flex items-center gap-1.5 font-semibold text-accent mb-0.5">
                <Trophy className="w-3.5 h-3.5" />
                <span>Mốc Ngày 21 · Demo Day</span>
              </div>
              <p className="line-clamp-1">Thuyết trình trước Hội đồng Ban giám khảo</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Interactive Sprint Cards with BorderGlow */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {SPRINTS.map((sprint) => {
          const isSelected = activeWeek === sprint.week;
          return (
            <div
              key={sprint.week}
              onClick={() => setActiveWeek(sprint.week)}
              className="cursor-pointer transition-transform duration-200"
            >
              <BorderGlow
                backgroundColor="#12111d"
                borderRadius={24}
                glowRadius={isSelected ? 48 : 32}
                glowIntensity={isSelected ? 1.4 : 0.8}
                edgeSensitivity={30}
                colors={
                  sprint.week === 1
                    ? ['#8261f6', '#487cf6', '#a588f6']
                    : sprint.week === 2
                    ? ['#487cf6', '#8261f6', '#60a5fa']
                    : ['#a588f6', '#8261f6', '#ec4899']
                }
                glowColor="255 85 70"
                className={`h-full transition-all duration-300 ${
                  isSelected ? 'ring-1 ring-accent/60 shadow-xl' : 'opacity-90 hover:opacity-100'
                }`}
              >
                <div className="p-7 flex flex-col justify-between h-full bg-paper-card rounded-[24px]">
                  {/* Card Header */}
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-rule-2 mb-4">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: sprint.tagColor }}
                        />
                        <span className="font-mono text-xs uppercase tracking-wider text-muted font-medium">
                          Tuần 0{sprint.week} · {sprint.days}
                        </span>
                      </div>
                      <span className="pill text-[11px] font-medium">{sprint.badge}</span>
                    </div>

                    <h4 className="text-xl font-bold text-white tracking-tight leading-snug">
                      {sprint.title}
                    </h4>
                    <p className="text-xs font-medium text-accent mt-1">{sprint.phaseVi}</p>
                    <p className="text-xs text-muted mt-2 leading-relaxed">{sprint.focus}</p>

                    {/* Activities List */}
                    <div className="mt-5 space-y-2.5 pt-4 border-t border-rule-2">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-muted font-semibold">
                        Nội dung trọng tâm:
                      </p>
                      {sprint.activities.map((act, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-muted leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                          <span>{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer: Checkpoint deliverable */}
                  <div className="mt-6 pt-4 border-t border-rule-2 bg-paper-2/40 -mx-7 -mb-7 p-5 rounded-b-[24px]">
                    <div className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-accent font-semibold block">
                          Sản phẩm bàn giao:
                        </span>
                        <p className="text-xs text-white font-medium mt-0.5 leading-snug">
                          {sprint.checkpoint}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </BorderGlow>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SprintTimeline;
