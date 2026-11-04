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
      name: '01. Trợ lý bán hàng cho Shop',
      desc: 'Tư vấn sản phẩm 24/7 và hỗ trợ khách đặt hàng tự động qua chat.',
      title: 'Trợ lý bán hàng & Tư vấn tự động cho Shop / Fanpage',
      problem: 'Shop thời trang / đồ ăn của sinh viên hoặc người quen nhận nhiều tin nhắn ngoài giờ; nhân viên không kịp rep dẫn đến mất khách.',
      solution: 'Dựng web bán hàng đơn giản, kết nối Gemini API để bot đọc thông tin bảng giá, tự động tư vấn và lưu thông tin giao hàng.',
      tech: ['Google Gemini API (Free)', 'React / Next.js', 'Tailwind CSS'],
      sampleInput: 'Khách hỏi: "Shop còn áo hoodie oversize màu xám size L ở kho Hà Nội không?"',
      sampleOutput: 'AI phản hồi: "Dạ shop còn đúng 2 chiếc size L màu xám tại kho Cầu Giấy ạ! Shop có thể gửi ship hỏa tốc ngay trong ngày. Bạn cho shop xin địa chỉ và SĐT nhận hàng nhé!"',
    },
    {
      id: 'study',
      name: '02. Trợ lý học tập Poly',
      desc: 'Giải thích bài tập, giải thích đáp án trắc nghiệm và gợi ý ví dụ dễ hiểu.',
      title: 'Trợ lý học tập & Luyện thi trắc nghiệm FPT Poly',
      problem: 'Sinh viên ôn thi các môn cơ sở ngành (Web, Java, C#, Database...) gặp câu hỏi khó nhưng không hiểu bản chất, chỉ học vẹt đáp án.',
      solution: 'Ứng dụng cho phép dán câu hỏi trắc nghiệm, AI phân tích từng phương án đúng/sai, giải thích bản chất và gợi ý bài tập tương tự.',
      tech: ['ChatGPT / Gemini API', 'Node.js / Express', 'React'],
      sampleInput: 'Câu hỏi: "Trong Java, điểm khác biệt cơ bản giữa ArrayList và LinkedList là gì?"',
      sampleOutput: 'AI giải thích: "• ArrayList dùng mảng động: tìm kiếm theo vị trí index cực nhanh O(1), nhưng chèn/xóa ở giữa chậm.\n• LinkedList dùng danh sách liên kết: chèn/xóa nhanh O(1), nhưng tìm kiếm phải duyệt từ đầu O(n).\nMẹo ôn thi: Cần đọc/tra cứu dữ liệu nhiều chọn ArrayList; cần thêm/xóa liên tục chọn LinkedList!"',
    },
    {
      id: 'local',
      name: '03. Tìm trọ quanh trường',
      desc: 'Hỏi đáp tự nhiên để lọc phòng trọ hoặc quán ăn ngon theo ngân sách sinh viên.',
      title: 'Trợ lý tìm phòng trọ & Quán ngon quanh Trịnh Văn Bô',
      problem: 'Sinh viên Poly mất nhiều ngày đi tìm phòng trọ quanh khu Nam Từ Liêm, dễ gặp phòng không đúng nhu cầu hoặc bị "hớ" giá.',
      solution: 'Chatbot hỗ trợ tìm trọ: sinh viên nhập ngân sách, tiện ích mong muốn (điều hòa, không chung chủ), AI tự động gợi ý danh sách phòng phù hợp.',
      tech: ['LLM Prompting', 'Supabase (Free Tier)', 'React / Vite'],
      sampleInput: 'Sinh viên hỏi: "Tìm cho mình phòng trọ quanh Trịnh Văn Bô dưới 2.5 triệu, có điều hòa và giờ giấc tự do."',
      sampleOutput: 'AI gợi ý: "Tìm thấy 3 phòng phù hợp gần trường:\n1. Phòng khép kín 22m² - Ngõ 80 Xuân Phương (Cách trường 600m) - 2.3 tr/tháng (Có ĐH, nóng lạnh, vân tay tự do).\n2. Studio gác xép - Phố Hòe Thị - 2.5 tr/tháng (Full đồ, thoáng mát).\nBạn muốn mình gửi số liên hệ chủ trọ nào?"',
    },
    {
      id: 'doc',
      name: '04. Đọc và xử lý hóa đơn',
      desc: 'Chụp ảnh hóa đơn hoặc hồ sơ, AI tự đọc chữ và xuất vào bảng tính Excel.',
      title: 'Số hóa hóa đơn & Nhập liệu sổ sách tự động',
      problem: 'Cửa hàng buôn bán nhỏ hoặc câu lạc bộ sinh viên tốn nhiều giờ gõ tay từng hóa đơn giấy vào file Excel để tính thu chi.',
      solution: 'Tải ảnh chụp hóa đơn lên, mô hình AI thị giác (Gemini Vision) tự động nhận diện ngày mua, danh sách món và tổng tiền rồi lưu vào bảng tính.',
      tech: ['Gemini Vision API', 'Structured JSON Output', 'Python / Next.js'],
      sampleInput: 'Tệp ảnh: "Hoa_don_mua_vat_tu_CLB.jpg" (Hóa đơn 10 món văn phòng phẩm)',
      sampleOutput: '{\n  "cua_hang": "Văn phòng phẩm Poly",\n  "ngay_mua": "2026-11-04",\n  "tong_tien": 485000,\n  "danh_sach_mon": ["Bút dạ quang (5)", "Bìa màu A4 (2)", "Băng dính 2 mặt (3)"]\n}\n-> Đã tự động xuất ra file Excel thành công!',
    },
    {
      id: 'marketing',
      name: '05. Trợ lý sáng tạo nội dung',
      desc: 'Gợi ý ý tưởng, viết kịch bản video và hỗ trợ sáng tạo nội dung TikTok.',
      title: 'Trợ lý sáng tạo kịch bản TikTok & Bài viết Fanpage',
      problem: 'Sinh viên làm dự án Digital Marketing hoặc bán hàng online thường bí ý tưởng viết bài, mất nhiều thời gian nghĩ kịch bản video.',
      solution: 'Nhập tên sản phẩm hoặc chủ đề, AI tạo ngay 3 góc kịch bản video TikTok 30s kèm lời thoại, góc quay và danh sách hashtag thịnh hành.',
      tech: ['OpenAI / Gemini API', 'Tailwind CSS', 'React'],
      sampleInput: 'Yêu cầu: "Tạo kịch bản TikTok 30s giới thiệu bình giữ nhiệt sinh viên, phong cách hài hước."',
      sampleOutput: '• Giây 0-3 (Hook): "Đừng mua chiếc bình này nếu bạn không muốn đá từ 7h sáng đến chiều vẫn chưa tan!"\n• Giây 4-15: Cảnh đổ nước đá lúc đi học ở Poly, chiều về mở ra đá vẫn kêu leng keng.\n• Giây 16-25: Thử nghiệm để bình nghiêng trong balo cùng laptop - hoàn toàn không rò một giọt.\n• Giây 26-30 (CTA): "Link giá sinh viên săn deal ngay hôm nay nhé!"',
    },
  ];

  const current = items.find((i) => i.id === activeTab) || items[0];

  const listItems = items.map((item, idx) => ({
    id: item.id,
    title: item.name,
    description: item.desc,
    meta: `Ý tưởng 0${idx + 1}`,
  }));

  return (
    <div>
      <div className="sec__head mx-auto text-center mb-10">
        <h2>Những sản phẩm bạn và nhóm có thể thử sức!</h2>
        <p className="lead max-w-2xl mx-auto">
          Không cần ý tưởng quá phức tạp. Hãy bắt đầu từ những vấn đề quen thuộc và thử giải quyết chúng bằng AI.
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

          <div className="p-3.5 rounded-xl bg-paper border border-rule-2 mt-6 space-y-1.5 text-xs text-muted">
            <p className="text-white font-medium flex items-center gap-1.5">
              <span>💡</span>
              <span>Bạn có ý tưởng riêng từ Đồ án môn học?</span>
            </p>
            <p className="leading-relaxed">
              Hoàn toàn có thể mang bài tập lớn, assignment hoặc đồ án (Java, Web, Mobile) vào cuộc thi và gắn thêm tính năng AI để nâng cấp thành sản phẩm dự thi!
            </p>
          </div>
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
            </div>
          </div>
        </AnimatedContent>
      </div>
    </div>
  </div>
  );
};
