import React, { useState } from 'react';
import AnimatedList from './AnimatedList';
import AnimatedContent from './AnimatedContent';

interface ChallengeItem {
  id: string;
  name: string;
  desc: string;
  title: string;
  problem: string;
  solution: string;
  tech: string[];
  sampleInput: string;
  sampleOutput: string;
}

export const ChallengeTour: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('cskh');

  const items: ChallengeItem[] = [
    {
      id: 'cskh',
      name: '01. CSKH & Bán hàng',
      desc: 'Tư vấn sản phẩm 24/7 và hỗ trợ chốt đơn tự động qua chat.',
      title: 'Trợ lý CSKH & Bán hàng đa kênh',
      problem: 'Cửa hàng hoặc doanh nghiệp nhận hàng trăm tin nhắn ngoài giờ; nhân viên không kịp trả lời dẫn đến mất khách hàng.',
      solution: 'Xây dựng bot AI hiểu ngữ cảnh tiếng Việt, tự động tra cứu kho hàng và hướng dẫn khách hoàn tất đặt hàng.',
      tech: ['Google Gemini API', 'FastAPI / Next.js', 'Webhook'],
      sampleInput: 'Khách hỏi: "Shop còn áo khoác gió size L màu đen ở kho Hà Nội không?"',
      sampleOutput: 'AI phản hồi: "Dạ còn 2 chiếc tại kho Cầu Giấy ạ! Shop có thể giao hỏa tốc trong 2 giờ. Bạn cho shop xin số điện thoại nhé!"',
    },
    {
      id: 'marketing',
      name: '02. Marketing & Kinh doanh',
      desc: 'Tạo nội dung quảng cáo, viết bài truyền thông và gợi ý chiến dịch.',
      title: 'Trợ lý sáng tạo nội dung & Chiến dịch Marketing',
      problem: 'Doanh nghiệp nhỏ thiếu nhân sự marketing, mất nhiều thời gian viết bài quảng cáo, email chào hàng và kịch bản video.',
      solution: 'Ứng dụng AI giúp tạo bài viết chuẩn SEO, gợi ý tiêu đề quảng cáo và cá nhân hóa email tiếp cận từng nhóm khách hàng.',
      tech: ['OpenAI / Gemini API', 'Tailwind CSS', 'React'],
      sampleInput: 'Yêu cầu: "Tạo 3 mẫu tiêu đề quảng cáo Facebook cho khóa học lập trình web sinh viên, phong cách trẻ trung."',
      sampleOutput: '1. Không chỉ học lý thuyết: Tự tay làm dự án web đầu tiên sau 4 tuần!\n2. Lập trình từ con số 0: Cẩm nang thực chiến dành riêng cho tân sinh viên.\n3. Portfolio trống trơn? Xây dựng 3 dự án thật cùng chuyên gia ngay hôm nay.',
    },
    {
      id: 'doc',
      name: '03. Xử lý tài liệu & Tri thức',
      desc: 'Bóc tách hóa đơn, hợp đồng tự động và tra cứu tài liệu nội bộ.',
      title: 'Số hóa tài liệu & Hỏi đáp tri thức nội bộ',
      problem: 'Nhân viên tốn nhiều giờ nhập liệu thủ công từ hóa đơn PDF hoặc mất thời gian tìm kiếm quy định trong hàng trăm trang tài liệu.',
      solution: 'Kết hợp nhận diện văn bản (OCR) và mô hình AI để trích xuất thông tin hóa đơn thành bảng tính hoặc hỏi đáp tài liệu tức thì.',
      tech: ['Document AI / OCR', 'Structured JSON Output', 'Python'],
      sampleInput: 'Tệp tải lên: "Hoa_don_GTGT_112026.pdf" (Hóa đơn mua máy chủ)',
      sampleOutput: '{\n  "ma_so_thue": "0108923411",\n  "so_hoa_don": "HD-00492",\n  "tong_tien_chua_thue": 14500000,\n  "thue_vat": 1160000,\n  "tong_thanh_toan": 15660000\n}',
    },
    {
      id: 'workflow',
      name: '04. Tự động hóa quy trình',
      desc: 'Phân loại email công việc, tóm tắt cuộc họp và tự giao việc.',
      title: 'Trợ lý điều phối luồng công việc tự động',
      problem: 'Nhiều yêu cầu công việc bị bỏ sót trong các nhóm chat hoặc chuỗi email trao đổi dài.',
      solution: 'AI đọc nội dung trao đổi, tự động tạo danh sách việc cần làm (to-do list), gắn người phụ trách và nhắc hạn chót.',
      tech: ['Function Calling', 'Slack / Telegram API', 'Node.js'],
      sampleInput: 'Nội dung email: "An chuẩn bị slide báo cáo tài chính trước 17:00 thứ Sáu để họp với khách hàng nhé."',
      sampleOutput: '• Nhiệm vụ: Chuẩn bị slide báo cáo tài chính\n• Người phụ trách: @Nguyễn Văn An\n• Hạn chót: 17:00 ngày 15/11 (Đã tự động thêm vào lịch làm việc)',
    },
    {
      id: 'data',
      name: '05. Phân tích dữ liệu & Báo cáo',
      desc: 'Hỏi bằng tiếng Việt tự nhiên để hệ thống xuất số liệu và vẽ biểu đồ.',
      title: 'Trợ lý truy vấn & Trực quan hóa dữ liệu kinh doanh',
      problem: 'Người quản lý muốn nắm nhanh doanh thu và xu hướng bán hàng nhưng không thành thạo viết câu lệnh truy vấn dữ liệu phức tạp.',
      solution: 'Chuyển đổi câu hỏi tiếng Việt thành truy vấn dữ liệu tự động và hiển thị biểu đồ trực quan.',
      tech: ['Text-to-SQL API', 'Chart.js', 'FastAPI'],
      sampleInput: 'Câu hỏi: "Doanh thu chi nhánh Đà Nẵng tháng này tăng hay giảm so với tháng trước?"',
      sampleOutput: 'Doanh thu đạt 420 triệu VNĐ (tăng +18.4% so với tháng trước). Nhóm sản phẩm tăng trưởng tốt nhất: Phụ kiện (+32%). Đã tạo biểu đồ xu hướng.',
    },
  ];

  const current = items.find((i) => i.id === activeTab) || items[0];

  const listItems = items.map((item, idx) => ({
    id: item.id,
    title: item.name,
    description: item.desc,
    meta: `Đề tài 0${idx + 1}`,
  }));

  return (
    <div>
      <div className="sec__head mx-auto text-center mb-10">
        <h2>Những bài toán bạn có thể giải quyết.</h2>
        <p className="lead max-w-2xl mx-auto">
          5 nhóm bài toán thực tiễn gợi ý từ doanh nghiệp. Bạn có thể chọn hướng đi phù hợp với thế mạnh của đội mình.
        </p>
      </div>

      <div className="tour__grid mt-0">
        {/* Left: Interactive AnimatedList Selector */}
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

          <p className="text-xs text-muted pt-3 border-t border-rule mt-6 italic">
            <strong>Lưu ý:</strong> Đây là các nhóm bài toán tham khảo. Đề bài chi tiết do doanh nghiệp đối tác đặt hàng sẽ được Ban tổ chức công bố tại buổi Orientation.
          </p>
        </div>

      {/* Right: Machined Panel Stage */}
      <div className="tour__stage">
        <AnimatedContent key={current.id} distance={15} duration={0.35} trigger="mount">
          <div className="panel p-6 sm:p-7" role="tabpanel" id={`pane-${current.id}`} aria-labelledby={`tab-${current.id}`}>
            <div className="flex items-center justify-between pb-4 border-b border-rule">
              <div>
                <p className="font-display font-medium text-lg text-ink">{current.title}</p>
                <p className="text-xs text-muted mt-0.5">Mô phỏng bài toán & giải pháp MVP</p>
              </div>
              <span className="pill pill--on">
                Gợi ý đề tài
              </span>
            </div>

            <div className="space-y-4 pt-4">
              <div className="p-4 rounded-xl bg-paper border border-rule-2">
                <p className="text-xs text-muted block mb-1">Vấn đề thực tế gặp phải:</p>
                <p className="text-sm text-ink leading-relaxed">{current.problem}</p>
              </div>

              <div className="p-4 rounded-xl bg-paper border border-rule-2">
                <p className="text-xs text-muted block mb-1">Giải pháp ứng dụng AI của đội bạn:</p>
                <p className="text-sm text-ink leading-relaxed">{current.solution}</p>
              </div>

              <div className="p-4 rounded-xl bg-paper border border-rule-2 space-y-2">
                <div className="text-xs text-muted">{current.sampleInput}</div>
                <pre className="text-xs text-accent font-mono whitespace-pre-wrap leading-relaxed">
                  {current.sampleOutput}
                </pre>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap gap-2">
                  {current.tech.map((t, idx) => (
                    <span key={idx} className="text-xs px-2.5 py-1 rounded-full bg-paper border border-rule text-ink-2 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
                <a href="#register" className="text-accent hover:underline font-medium">
                  Chọn bài toán này
                </a>
              </div>
            </div>
          </div>
        </AnimatedContent>
      </div>
    </div>
  </div>
  );
};
