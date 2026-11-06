import React, { useState } from 'react';
import AnimatedList from './AnimatedList';
import AnimatedContent from './AnimatedContent';
import { Globe, Search, FileUp, Inbox, BarChart3, CheckCircle2 } from 'lucide-react';

interface ConceptItem {
  id: string;
  name: string;
  desc: string;
  productName: string;
  productDesc: string;
  url: string;
  badge: string;
  renderMockup: () => React.ReactNode;
}

export const ChallengeTour: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('policy');

  const items: ConceptItem[] = [
    {
      id: 'policy',
      name: '01. Tra cứu chính sách nhân sự',
      desc: 'Cổng tra cứu nội quy, quy định và chế độ nhân sự.',
      productName: 'Cổng Tra Cứu Chính Sách & Nội Quy Nhân Sự',
      productDesc: 'Website nội bộ giúp nhân viên dễ dàng tra cứu quyền lợi, chế độ và sổ tay công ty mọi lúc mọi nơi.',
      url: 'hr-portal.app/policy-search',
      badge: 'Cổng Web Nhân Viên',
      renderMockup: () => (
        <div className="space-y-3.5">
          {/* Mock Search Bar */}
          <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-paper border border-rule text-xs text-muted">
            <Search className="w-4 h-4 text-accent" />
            <span className="text-ink font-medium">Nhập câu hỏi: "Quy định nghỉ phép năm và thủ tục xin nghỉ..."</span>
          </div>

          {/* Quick Filter Tags */}
          <div className="flex flex-wrap gap-1.5 text-[11px]">
            <span className="px-2.5 py-1 rounded-md bg-accent/15 text-accent font-medium border border-accent/30">Nghỉ phép năm</span>
            <span className="px-2.5 py-1 rounded-md bg-paper border border-rule text-muted">Bảo hiểm xã hội</span>
            <span className="px-2.5 py-1 rounded-md bg-paper border border-rule text-muted">Công tác phí</span>
            <span className="px-2.5 py-1 rounded-md bg-paper border border-rule text-muted">Thực tập sinh</span>
          </div>

          {/* Policy Preview Cards */}
          <div className="space-y-2.5">
            <div className="p-3.5 rounded-xl bg-paper border border-rule-2 hover:border-accent/40 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-white">Điều 14: Quy chế nghỉ phép năm & nghỉ việc riêng</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Đang áp dụng</span>
              </div>
              <p className="text-xs text-muted line-clamp-2">
                Quy định số ngày phép được hưởng theo thâm niên, thủ tục gửi đơn xin phép qua cổng nội bộ trước 24 giờ và chính sách nghỉ không hưởng lương...
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-paper border border-rule-2 hover:border-accent/40 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-white">Chế độ phúc lợi & Chăm sóc sức khỏe định kỳ</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/15 text-sky-400 border border-sky-500/30">Chính sách 2026</span>
              </div>
              <p className="text-xs text-muted line-clamp-2">
                Quyền lợi khám sức khỏe tổng quát hằng năm, gói bảo hiểm tai nạn và quy trình đăng ký tham gia các hoạt động nội bộ công ty...
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'doc',
      name: '02. Số hóa hồ sơ nhân sự',
      desc: 'Quản lý và xử lý hồ sơ trên nền tảng Web.',
      productName: 'Hệ Thống Quản Lý & Số Hóa Hồ Sơ Ứng Viên',
      productDesc: 'Ứng dụng Web kéo thả hồ sơ, tự động điền biểu mẫu thông tin và quản lý danh sách nhân sự tập trung.',
      url: 'hr-admin.app/onboarding',
      badge: 'Web App Tuyển Dụng',
      renderMockup: () => (
        <div className="space-y-3.5">
          {/* Upload Dropzone */}
          <div className="p-4 rounded-xl border border-dashed border-accent/40 bg-accent/5 flex flex-col items-center justify-center text-center">
            <FileUp className="w-6 h-6 text-accent mb-1" />
            <span className="text-xs font-semibold text-white">Kéo thả CV (PDF) hoặc ảnh CCCD vào đây</span>
            <span className="text-[11px] text-muted mt-0.5">Tự động nhận diện và trích xuất thông tin lên biểu mẫu Web</span>
          </div>

          {/* Auto-filled Candidate Profile Preview */}
          <div className="p-3.5 rounded-xl bg-paper border border-rule-2 space-y-2.5">
            <div className="flex items-center justify-between border-b border-rule pb-2">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-accent/20 text-accent font-bold text-xs flex items-center justify-center">A</span>
                <div>
                  <p className="text-xs font-bold text-white">Nguyễn Văn An</p>
                  <p className="text-[10px] text-muted">Vị trí: Lập trình viên Web Frontend</p>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-accent/15 text-accent border border-accent/30 font-medium">
                Đã điền tự động
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-muted">
              <div><span className="text-ink/60">CCCD:</span> 001203012345</div>
              <div><span className="text-ink/60">SĐT:</span> 0912 345 678</div>
              <div><span className="text-ink/60">Ngày sinh:</span> 18/05/2003</div>
              <div><span className="text-ink/60">Kỹ năng:</span> React, JavaScript, Tailwind</div>
            </div>

            <div className="pt-2 border-t border-rule flex justify-end gap-2 text-xs">
              <span className="px-3 py-1 rounded-md bg-accent text-white font-medium flex items-center gap-1 cursor-pointer">
                <span>Lưu hồ sơ vào CSDL</span>
                <CheckCircle2 className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'contract',
      name: '03. Quản lý hợp đồng lao động',
      desc: 'Theo dõi hợp đồng và nhắc hạn tự động.',
      productName: 'Phân Hệ Quản Lý Hợp Đồng & Nhắc Hạn Tự Động',
      productDesc: 'Bảng theo dõi thời hạn hợp đồng thử việc, thời vụ và cảnh báo hạn tái ký trực quan cho người phụ trách.',
      url: 'hr-admin.app/contracts',
      badge: 'Dashboard Hợp Đồng',
      renderMockup: () => (
        <div className="space-y-3">
          {/* Summary Stat Bar */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-lg bg-paper border border-rule">
              <span className="text-muted block text-[10px]">Tổng hợp đồng</span>
              <span className="font-bold text-white">48</span>
            </div>
            <div className="p-2 rounded-lg bg-paper border border-amber-500/30">
              <span className="text-amber-400 block text-[10px]">Sắp hết hạn (&lt;30 ngày)</span>
              <span className="font-bold text-amber-300">5</span>
            </div>
            <div className="p-2 rounded-lg bg-paper border border-emerald-500/30">
              <span className="text-emerald-400 block text-[10px]">Đang hiệu lực</span>
              <span className="font-bold text-emerald-300">43</span>
            </div>
          </div>

          {/* Contract List Items */}
          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-paper border border-amber-500/30 flex items-center justify-between gap-2">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-white">Trần Thị Bích</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">Hết hạn thử việc</span>
                </div>
                <p className="text-[11px] text-muted">Hết hạn: 25/11/2026 (Còn 15 ngày) · Quản lý: Lê Văn C.</p>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-accent text-white text-[11px] font-medium whitespace-nowrap cursor-pointer">
                Nhắc đánh giá
              </span>
            </div>

            <div className="p-3 rounded-xl bg-paper border border-rule-2 flex items-center justify-between gap-2">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-white">Hoàng Minh Đức</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">HĐ 1 năm</span>
                </div>
                <p className="text-[11px] text-muted">Hết hạn: 15/01/2027 · Phòng Kỹ thuật phần mềm</p>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-paper-2 border border-rule text-muted text-[11px] font-medium whitespace-nowrap">
                Chi tiết
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'forms',
      name: '04. Quản lý đơn từ hành chính',
      desc: 'Tiếp nhận và theo dõi đơn từ nội bộ.',
      productName: 'Cổng Tiếp Nhận & Theo Dõi Đơn Từ Hành Chính',
      productDesc: 'Cổng dịch vụ nội bộ cho nhân viên gửi đề xuất nghỉ phép, cấp thiết bị và theo dõi luồng phê duyệt theo thời gian thực.',
      url: 'helpdesk.internal/my-requests',
      badge: 'Cổng Yêu Cầu Nội Bộ',
      renderMockup: () => (
        <div className="space-y-3">
          {/* Quick Request Status Tabs */}
          <div className="flex items-center justify-between text-xs border-b border-rule pb-2">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <Inbox className="w-3.5 h-3.5 text-accent" />
              <span>Yêu cầu gần đây của tôi</span>
            </span>
            <span className="text-accent font-medium cursor-pointer">+ Tạo đơn mới</span>
          </div>

          {/* Request Items */}
          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-paper border border-rule-2 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Đơn xin nghỉ phép (2 ngày)</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">Chờ Quản lý duyệt</span>
              </div>
              <p className="text-[11px] text-muted">Thời gian nghỉ: 12/11/2026 – 13/11/2026 · Lý do: Giải quyết việc cá nhân</p>
            </div>

            <div className="p-3 rounded-xl bg-paper border border-rule-2 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Đề xuất cấp màn hình phụ làm việc</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">Đã phê duyệt</span>
              </div>
              <p className="text-[11px] text-muted">Bộ phận xử lý: IT Support & Quản trị hành chính · Trạng thái: Đang chuẩn bị thiết bị</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'analytics',
      name: '05. Thống kê và báo cáo nhân sự',
      desc: 'Tổng hợp dữ liệu và trực quan hóa báo cáo.',
      productName: 'Dashboard Thống Kê & Báo Cáo Chấm Công Nhân Sự',
      productDesc: 'Bảng số liệu trực quan giúp tổng hợp dữ liệu chuyên cần, phát hiện trường hợp bất thường và xuất báo cáo nhanh chóng.',
      url: 'hr-analytics.app/dashboard',
      badge: 'Dashboard Thống Kê',
      renderMockup: () => (
        <div className="space-y-3">
          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-lg bg-paper border border-rule">
              <span className="text-muted block text-[10px]">Tỷ lệ chuyên cần</span>
              <span className="font-bold text-emerald-400 text-sm">97.5%</span>
            </div>
            <div className="p-2.5 rounded-lg bg-paper border border-rule">
              <span className="text-muted block text-[10px]">Đi trễ có phép</span>
              <span className="font-bold text-white text-sm">8 ca</span>
            </div>
            <div className="p-2.5 rounded-lg bg-paper border border-rule">
              <span className="text-muted block text-[10px]">Cần giải trình</span>
              <span className="font-bold text-amber-400 text-sm">2 ca</span>
            </div>
          </div>

          {/* Attendance Trend Chart Mockup */}
          <div className="p-3 rounded-xl bg-paper border border-rule-2 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-white flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-accent" />
                <span>Chuyên cần tuần qua theo phòng ban</span>
              </span>
              <span className="text-[10px] text-muted">Cập nhật hôm nay</span>
            </div>

            {/* Simple CSS Bar Graph */}
            <div className="space-y-1.5 pt-1 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-16 text-muted truncate">Khối Kỹ thuật</span>
                <div className="flex-1 h-2 rounded-full bg-paper-2 overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: '98%' }} />
                </div>
                <span className="w-8 text-right font-mono text-ink text-[10px]">98%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-16 text-muted truncate">Khối Nghiệp vụ</span>
                <div className="flex-1 h-2 rounded-full bg-paper-2 overflow-hidden">
                  <div className="h-full bg-sky-400 rounded-full" style={{ width: '96%' }} />
                </div>
                <span className="w-8 text-right font-mono text-ink text-[10px]">96%</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-muted/90 italic">
            💡 Tự động tổng hợp dữ liệu từ file chấm công thô thành bản nhận định trực quan.
          </p>
        </div>
      ),
    },
  ];

  const current = items.find((i) => i.id === activeTab) || items[0];

  const listItems = items.map((item, idx) => ({
    id: item.id,
    title: item.name,
    description: item.desc,
    meta: `Gợi ý 0${idx + 1}`,
  }));

  return (
    <div>
      {/* Section Header */}
      <div className="sec__head mx-auto text-center mb-10">
        <span className="pill pill--on mb-3 inline-block">Định hướng sản phẩm</span>
        <h2>Bạn sẽ xây dựng sản phẩm gì?</h2>
        <p className="lead max-w-2xl mx-auto">
          Từ những vấn đề thực tế trong quản lý hành chính nhân sự, hãy cùng đồng đội tìm ý tưởng và sử dụng AI để phát triển giải pháp phần mềm của riêng mình.
        </p>
      </div>

      <div className="tour__grid mt-0">
        {/* Left: 5 Direction Items & Reassurance Note */}
        <div className="tour__text">
          <div className="mt-1">
            <AnimatedList
              items={listItems}
              initialSelectedIndex={0}
              onItemSelect={(_, index) => setActiveTab(items[index].id)}
              animation="pop"
              theme="dark"
              accentColor="#7c5dfa"
              width="100%"
              maxHeight={380}
              radius={14}
              fadeSize={32}
              frame={true}
            />
          </div>

          {/* Open Idea & Disclaimer Box */}
          <div className="p-4 rounded-xl bg-paper border border-rule-2 mt-5 space-y-2 text-xs text-muted">
            <p className="text-white font-semibold flex items-center gap-1.5">
              <span>💡</span>
              <span>Bạn có ý tưởng khác?</span>
            </p>
            <p className="leading-relaxed">
              Đừng giới hạn bản thân trong những gợi ý trên. Hãy chọn một vấn đề thực tế và phát triển giải pháp theo cách riêng của đội mình.
            </p>
            <p className="leading-relaxed text-[11px] text-muted/80 pt-2 border-t border-rule-2">
              📌 <em>5 định hướng trên chỉ là ví dụ tham khảo. Các bài toán chính thức sẽ do doanh nghiệp đồng hành và BTC công bố tại buổi Orientation.</em>
            </p>
          </div>
        </div>

        {/* Right: Simplified Web App Mockup Panel */}
        <div className="tour__stage">
          <AnimatedContent key={current.id} distance={15} duration={0.35} trigger="mount">
            <div className="panel overflow-hidden" role="tabpanel" id={`pane-${current.id}`} aria-labelledby={`tab-${current.id}`}>
              {/* Browser Window Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-rule bg-paper-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  <div className="ml-3 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-md bg-paper border border-rule text-muted font-mono text-[11px]">
                    <Globe className="w-3 h-3 text-accent" />
                    <span>https://{current.url}</span>
                  </div>
                </div>
                <span className="pill text-[11px] text-accent font-semibold">{current.badge}</span>
              </div>

              {/* Product Info & Visual Mockup */}
              <div className="p-6 sm:p-7 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight leading-snug">{current.productName}</h3>
                  <p className="text-xs text-muted mt-1 leading-relaxed">{current.productDesc}</p>
                </div>

                {/* UI Mockup Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-paper-2/70 border border-rule">
                  {current.renderMockup()}
                </div>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </div>
  );
};

export default ChallengeTour;
