import { EvaluationData } from '../types/sections';

export const evaluationContent: EvaluationData = {
  eyebrow: 'TIÊU CHÍ ĐÁNH GIÁ CHUYÊN MÔN',
  heading: 'HỆ THỐNG ĐÁNH GIÁ MINH BẠCH & CÔNG TÂM',
  subheading:
    'Sản phẩm được thẩm định toàn diện bởi Hội đồng Giám khảo gồm các chuyên gia công nghệ và lãnh đạo doanh nghiệp đặt đề bài.',
  criteria: [
    {
      id: 'criterion-problem-solving',
      criterionNumber: '01',
      name: 'Problem Solving (Khả năng giải quyết vấn đề)',
      weightPercent: 30,
      weightLabel: '30%',
      accentColor: 'blue',
      description:
        'Mức độ thấu hiểu bài toán thực tế của doanh nghiệp và giá trị định lượng mang lại cho người dùng.',
      keyQuestions: [
        'Giải pháp có giải quyết đúng "điểm nghẽn" cốt lõi của đề bài hay chỉ giải quyết phần ngọn?',
        'Có tạo ra giá trị đo lường được (tiết kiệm thời gian, giảm chi phí, tăng độ hài lòng) không?',
        'Mức độ thấu hiểu bối cảnh nghiệp vụ và đối tượng người dùng mục tiêu.',
      ],
    },
    {
      id: 'criterion-ai-application',
      criterionNumber: '02',
      name: 'AI Application (Ứng dụng AI thông minh)',
      weightPercent: 30,
      weightLabel: '30%',
      accentColor: 'cyan',
      description:
        'Kỹ thuật ứng dụng công nghệ AI sáng tạo, phù hợp và giải quyết triệt để các rủi ro kỹ thuật.',
      keyQuestions: [
        'AI có đóng vai trò cốt lõi tạo ra bước đột phá hay chỉ là tính năng phụ trợ mang tính hình thức?',
        'Kỹ thuật Prompting, RAG, Agentic workflow được thiết kế hợp lý và hiệu quả ra sao?',
        'Cách đội thi kiểm soát hiện tượng ảo tưởng (Hallucination) và xử lý dữ liệu đầu vào không hợp lệ.',
      ],
    },
    {
      id: 'criterion-product-quality',
      criterionNumber: '03',
      name: 'Product Quality & UX (Chất lượng sản phẩm & Trải nghiệm)',
      weightPercent: 20,
      weightLabel: '20%',
      accentColor: 'violet',
      description:
        'Mức độ hoàn thiện của bản MVP thử nghiệm thực tế tại buổi Live Demo và độ mượt mà của giao diện.',
      keyQuestions: [
        'Sản phẩm có chạy live ổn định trước Ban Giám khảo hay chỉ là video quay trước / mô phỏng?',
        'Giao diện trực quan, luồng tương tác của người dùng tự nhiên và dễ sử dụng?',
        'Cấu trúc mã nguồn sạch sẽ, thiết kế module hóa và có tính bảo trì cao.',
      ],
    },
    {
      id: 'criterion-practicality',
      criterionNumber: '04',
      name: 'Practicality & Viability (Tính thực tiễn & Chi phí)',
      weightPercent: 20,
      weightLabel: '20%',
      accentColor: 'emerald',
      description:
        'Khả năng nhân rộng, mô hình chi phí vận hành và tiềm năng tích hợp vào hệ thống doanh nghiệp.',
      keyQuestions: [
        'Chi phí gọi token API và hosting có kinh tế khi đưa vào vận hành quy mô lớn?',
        'Khả năng kết nối kỹ thuật với các hệ thống phần mềm sẵn có của doanh nghiệp.',
        'Định hướng phát triển và lộ trình nâng cấp sản phẩm sau khi cuộc thi kết thúc.',
      ],
    },
  ],
};
