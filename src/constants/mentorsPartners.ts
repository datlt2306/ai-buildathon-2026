import { MentorsPartnersData } from '../types/sections';

export const mentorsPartnersContent: MentorsPartnersData = {
  eyebrow: 'HỆ SINH THÁI ĐỐI TÁC & CỐ VẤN',
  heading: 'ĐỘI NGŨ CỐ VẤN CHUYÊN MÔN & DOANH NGHIỆP ĐỒNG HÀNH',
  subheading:
    'Những chuyên gia đầu ngành và đối tác chiến lược đồng hành cùng bạn trên từng chặng đường phát triển sản phẩm.',
  recruitmentNotice:
    'Chương trình đang trong giai đoạn tiếp nhận đăng ký chính thức từ các chuyên gia công nghệ và doanh nghiệp tiên phong. Danh sách các mentor và thương hiệu xác nhận sẽ được cập nhật liên tục trước thềm Kick-off.',
  mentorSlots: [
    {
      id: 'mentor-ai-lead',
      roleTitle: 'AI Tech Lead / Machine Learning Architect',
      focusArea: 'Kiến trúc LLM, RAG Pipeline & Tối ưu Token',
      description:
        'Cố vấn trực tiếp về kiến trúc mô hình, kỹ thuật trích xuất vector, kiểm soát hiện tượng ảo tưởng (Hallucination) và tối ưu độ trễ cho sản phẩm.',
      statusBadge: 'Đang tiếp nhận hồ sơ Cố vấn',
      iconName: 'Cpu',
    },
    {
      id: 'mentor-product-lead',
      roleTitle: 'Product Strategist / UX Specialist',
      focusArea: 'Thiết kế trải nghiệm người dùng & Xác thực thị trường',
      description:
        'Định hướng bài toán kinh doanh, hoàn thiện kịch bản sử dụng (User Flow) và đóng gói tính năng phù hợp với nhu cầu thực tế của người dùng.',
      statusBadge: 'Đang tiếp nhận hồ sơ Cố vấn',
      iconName: 'Layout',
    },
    {
      id: 'mentor-domain-expert',
      roleTitle: 'Enterprise Domain Expert',
      focusArea: 'Nghiệp vụ chuyên ngành (Tài chính, Bán lẻ, Logistics, Y tế)',
      description:
        'Cung cấp góc nhìn thực tiễn về quy trình vận hành nội bộ, quy định tuân thủ bảo mật dữ liệu và tiêu chí nghiệm thu của doanh nghiệp.',
      statusBadge: 'Đang tiếp nhận hồ sơ Cố vấn',
      iconName: 'Building2',
    },
    {
      id: 'mentor-cloud-engineer',
      roleTitle: 'Senior Cloud & DevOps Engineer',
      focusArea: 'Triển khai hạ tầng, Container & API Integration',
      description:
        'Hỗ trợ thiết lập môi trường CI/CD, đóng gói Docker container và triển khai sản phẩm lên các dịch vụ đám mây miễn phí ổn định.',
      statusBadge: 'Đang tiếp nhận hồ sơ Cố vấn',
      iconName: 'Cloud',
    },
  ],
  partnerSlots: [
    {
      id: 'partner-problem-provider',
      category: 'Doanh nghiệp đặt đề bài',
      label: 'Technology Problem Provider',
      statusLabel: 'Cổng đăng ký đang mở',
      description: 'Các doanh nghiệp tiên phong cung cấp bài toán nghiệp vụ thật và dữ liệu thử nghiệm cho cuộc thi.',
    },
    {
      id: 'partner-cloud-resource',
      category: 'Đối tác Hạ tầng & API',
      label: 'Cloud & AI Resource Partner',
      statusLabel: 'Đang tiếp nhận tài trợ',
      description: 'Hỗ trợ credits API, môi trường máy chủ và tài nguyên tính toán phục vụ thí sinh phát triển sản phẩm.',
    },
    {
      id: 'partner-academic-patron',
      category: 'Đơn vị Bảo trợ Học thuật',
      label: 'Academic Patron & University Network',
      statusLabel: 'Đang mở rộng liên kết',
      description: 'Các trường đại học, viện đào tạo phối hợp phát động phong trào và công nhận kết quả học tập cho sinh viên.',
    },
    {
      id: 'partner-incubator-hiring',
      category: 'Đối tác Tuyển dụng & Ươm mầm',
      label: 'Hiring & Incubation Partner',
      statusLabel: 'Đang kết nối tuyển dụng',
      description: 'Mở ra cơ hội tuyển dụng đặc cách, thực tập tài năng và bảo trợ ươm mầm sản phẩm xuất sắc sau cuộc thi.',
    },
  ],
  ctaLabel: 'Đăng ký làm Mentor / Đối tác Doanh nghiệp',
};
