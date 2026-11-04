import React from 'react';
import { ArrowRight, CheckCircle2, Trophy, Users, Calendar, Sparkles } from 'lucide-react';

export const DuskHeroConsole: React.FC = () => {
  return (
    <div className="glass p-6 sm:p-7 space-y-5 w-full max-w-lg relative">
      {/* Header card: Thông tin đăng ký cuộc thi */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <p className="font-display font-medium text-base text-ink">Thông tin dành cho sinh viên</p>
          <p className="text-xs text-muted mt-0.5">AI Innovation Challenge 2026</p>
        </div>
        <div className="chip">
          <span className="chip__dot" aria-hidden="true" />
          <span>MỞ ĐĂNG KÝ</span>
        </div>
      </div>

      {/* 3 Thông số chính sinh viên quan tâm */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="p-3 rounded-xl bg-paper-2 border border-white/5 text-center">
          <Calendar className="w-4 h-4 text-accent mx-auto mb-1.5" />
          <span className="text-[11px] text-muted block">Thời gian</span>
          <span className="text-xs font-semibold text-ink mt-0.5 block">03 tuần</span>
        </div>
        <div className="p-3 rounded-xl bg-paper-2 border border-white/5 text-center">
          <Users className="w-4 h-4 text-accent mx-auto mb-1.5" />
          <span className="text-[11px] text-muted block">Hình thức</span>
          <span className="text-xs font-semibold text-ink mt-0.5 block">Đội / Cá nhân</span>
        </div>
        <div className="p-3 rounded-xl bg-paper-2 border border-white/5 text-center">
          <Trophy className="w-4 h-4 text-accent-2 mx-auto mb-1.5" />
          <span className="text-[11px] text-muted block">Lệ phí thi</span>
          <span className="text-xs font-semibold text-accent-2 mt-0.5 block">Miễn phí 100%</span>
        </div>
      </div>

      {/* 4 Giá trị cụ thể sinh viên nhận được khi tham gia */}
      <div className="space-y-2.5 pt-1">
        <p className="text-xs font-medium text-ink flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          Sinh viên nhận được gì sau 03 tuần?
        </p>

        <ul className="space-y-2 text-xs text-muted">
          <li className="p-3 rounded-xl bg-paper-2/70 border border-white/5 flex items-start gap-2.5 text-ink/90">
            <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
            <span><strong>Bài toán thực tế:</strong> Nhận đề bài thật từ doanh nghiệp, không phải bài tập lý thuyết.</span>
          </li>
          <li className="p-3 rounded-xl bg-paper-2/70 border border-white/5 flex items-start gap-2.5 text-ink/90">
            <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
            <span><strong>Mentor kèm cặp 1-1:</strong> Chuyên gia công nghệ hướng dẫn giải pháp và phản biện sản phẩm.</span>
          </li>
          <li className="p-3 rounded-xl bg-paper-2/70 border border-white/5 flex items-start gap-2.5 text-ink/90">
            <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
            <span><strong>Có sản phẩm MVP vào CV:</strong> Tự tay xây dựng sản phẩm AI hoàn chỉnh để đưa vào Portfolio.</span>
          </li>
          <li className="p-3 rounded-xl bg-paper-2/70 border border-white/5 flex items-start gap-2.5 text-ink/90">
            <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
            <span><strong>Cơ hội việc làm:</strong> Kết nối trực tiếp với các doanh nghiệp đang tuyển dụng nhân tài AI.</span>
          </li>
        </ul>
      </div>

      {/* Nút đăng ký trực tiếp */}
      <div className="pt-2">
        <a
          href="#register"
          className="btn w-full py-3 text-sm flex items-center justify-center gap-2"
        >
          <span>Điền đơn đăng ký tham gia ngay</span>
          <ArrowRight className="w-4 h-4" />
        </a>
        <p className="text-center text-[11px] text-muted mt-2">
          Chưa có nhóm? Bạn có thể đăng ký cá nhân, BTC sẽ hỗ trợ ghép đội!
        </p>
      </div>
    </div>
  );
};
