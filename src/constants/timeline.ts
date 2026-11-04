import { TimelineData } from '../types/sections';

export const timelineContent: TimelineData = {
  eyebrow: 'LỘ TRÌNH 3 TUẦN TĂNG TỐC',
  heading: 'TỪ Ý TƯỞNG ĐẾN SẢN PHẨM KHẢ THI (MVP)',
  subheading:
    'Hành trình tinh gọn, tập trung cao độ mô phỏng quy trình tăng tốc khởi nghiệp thực chiến trong chu kỳ 21 ngày.',
  sprints: [
    {
      sprintNumber: 1,
      weekLabel: 'TUẦN 1',
      phaseName: 'Sprint 1: Phân tích & Thiết kế',
      title: 'Understand & Design (Thấu hiểu bài toán & Thiết kế giải pháp)',
      objective: 'Định hình chân dung bài toán, nghiên cứu hành trình người dùng và chốt kiến trúc hệ thống AI khả thi nhất.',
      activities: [
        'Lễ Khởi động (Kick-off), công bố chi tiết danh mục đề bài từ các doanh nghiệp đối tác.',
        'Phiên kết nối ghép đội (Team Matching) cho các thí sinh đăng ký tự do.',
        'Workshop chuyên sâu: Problem Framing & AI Architecture Design cùng các chuyên gia.',
        'Phiên làm việc 1-1 đầu tiên với Mentor được chỉ định để chốt phạm vi (Scope) của MVP.',
      ],
      deliverable: 'Bản mô tả giải pháp (Solution Brief) & Sơ đồ kiến trúc kỹ thuật (System Architecture).',
      tag: 'Phân tích & Lập kế hoạch',
    },
    {
      sprintNumber: 2,
      weekLabel: 'TUẦN 2',
      phaseName: 'Sprint 2: Lập trình & Kiểm chứng',
      title: 'Build & Validate (Xây dựng & Kiểm chứng giải pháp)',
      objective: 'Tập trung cao độ vào lập trình kỹ thuật, tích hợp mô hình AI, RAG và thẩm định độ chính xác trên dữ liệu mẫu.',
      activities: [
        'Coding Sprint: Xây dựng giao diện người dùng, backend API và kết nối mô hình AI.',
        'Ứng dụng kỹ thuật Prompt Tuning, hệ thống truy xuất RAG hoặc thiết lập luồng Agent tự chủ.',
        'Phiên kiểm tra giữa kỳ (Mid-point Check-in) cùng Mentor và đại diện Doanh nghiệp để nhận góp ý thực tế.',
        'Đo lường độ trễ, kiểm thử khả năng xử lý ngoại lệ và hạn chế tối đa hiện tượng ảo tưởng (Hallucination).',
      ],
      deliverable: 'Bản thử nghiệm nguyên mẫu MVP Beta hoạt động được (Working Prototype) có kết nối dữ liệu.',
      tag: 'Lập trình & Tích hợp AI',
    },
    {
      sprintNumber: 3,
      weekLabel: 'TUẦN 3',
      phaseName: 'Sprint 3: Hoàn thiện & Tỏa sáng',
      title: 'Polish & Demo (Hoàn thiện trải nghiệm & Trình diễn tại Demo Day)',
      objective: 'Tối ưu hóa toàn diện giao diện, hoàn thiện kịch bản thuyết trình và tỏa sáng trước Hội đồng Giám khảo.',
      activities: [
        'Tinh chỉnh giao diện (UI/UX Polish), tối ưu hóa tốc độ tải trang và chi phí gọi token API.',
        'Chuẩn bị bộ Slide thuyết trình (Pitch Deck) và video quay lại luồng trải nghiệm chính của sản phẩm.',
        'Buổi tổng duyệt kỹ thuật và cố vấn kỹ năng thuyết trình sản phẩm trước các nhà đầu tư/doanh nghiệp.',
        'Demo Day Chung kết: Trình diễn sản phẩm trực tiếp (Live Product Demo) và trả lời chất vấn từ Ban Giám khảo.',
      ],
      deliverable: 'Sản phẩm MVP hoàn chỉnh trên môi trường live + Slide Pitching + Mã nguồn công khai.',
      tag: 'Demo Day & Trao giải',
    },
  ],
};
