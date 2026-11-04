/**
 * Test Fixtures & Authoritative Expected Data
 * Derived directly from ORIGINAL_REQUEST.md and PROJECT.md
 */

export const SECTION_REQUIREMENTS = [
  {
    id: 'hero',
    eyebrow: 'AI INNOVATION CHALLENGE',
    heading: 'REAL PROBLEMS. REAL PEOPLE. REAL AI SOLUTIONS.',
    subheadingSnippet: '3 tuần',
    primaryCta: 'Khám phá chương trình',
    secondaryCta: 'Trở thành đối tác đồng hành',
  },
  {
    id: 'the-idea',
    heading: 'KHÔNG CHỈ LÀ MỘT CUỘC THI CÔNG NGHỆ',
    steps: [
      'Doanh nghiệp chia sẻ bài toán',
      'Sinh viên phát triển giải pháp',
      'Mentor đồng hành',
      'Sản phẩm MVP được trình diễn và đánh giá',
    ],
  },
  {
    id: 'stakeholders',
    heading: 'HỆ SINH THÁI ĐỔI MỚI SÁNG TẠO 3 BÊN',
    stakeholders: [
      {
        name: 'Nhà trường',
        tagline: 'BRIDGING EDUCATION AND INDUSTRY',
        cta: 'Tìm hiểu chương trình',
      },
      {
        name: 'Sinh viên',
        tagline: "DON'T JUST LEARN AI. BUILD WITH AI",
        primaryCta: 'Đăng ký tham gia',
        secondaryCta: 'Khám phá thể lệ',
      },
      {
        name: 'Doanh nghiệp',
        tagline: 'BRING REAL CHALLENGES. INSPIRE REAL INNOVATION',
        modalities: ['Business Problem', 'Mentor', 'Expert Review', 'Sponsorship'],
        cta: 'Trở thành đối tác đồng hành',
      },
    ],
  },
  {
    id: 'timeline',
    heading: 'LỘ TRÌNH 3 TUẦN',
    weeks: [
      { week: 1, title: 'Understand & Design' },
      { week: 2, title: 'Build & Validate' },
      { week: 3, title: 'Polish & Demo' },
    ],
  },
  {
    id: 'challenges',
    heading: 'CÁC LĨNH VỰC BÀI TOÁN THỰC TẾ ĐẶT HÀNG',
    categories: [
      'Customer Support',
      'Marketing Assistant',
      'Document Processing',
      'Workflow Automation',
      'Data Analytics',
      'Other Applications',
    ],
  },
  {
    id: 'build-with-ai',
    heading: 'XÂY DỰNG CÙNG AI',
    keyPhrases: [
      'Không yêu cầu huấn luyện mô hình từ đầu',
      'Tập trung vào giá trị ứng dụng thực tế',
    ],
  },
  {
    id: 'partners',
    heading: 'ĐỘI NGŨ CỐ VẤN & MẠNG LƯỚI ĐỐI TÁC',
    placeholderKeywords: ['tiếp nhận đăng ký', 'Đang cập nhật', 'Cố vấn'],
    cta: 'đối tác',
  },
  {
    id: 'evaluation',
    heading: 'TIÊU CHÍ ĐÁNH GIÁ CHUYÊN MÔN',
    criteria: [
      { name: 'Problem Solving', weight: 30 },
      { name: 'AI Application', weight: 30 },
      { name: 'Product Quality', weight: 20 },
      { name: 'Practicality', weight: 20 },
    ],
  },
  {
    id: 'awards',
    heading: 'QUYỀN LỢI THAM GIA & CƠ HỘI BỨT PHÁ',
    perks: [
      'Cơ hội Việc làm',
      'Mentorship',
      'Chứng nhận',
      'Ươm mầm',
    ],
  },
  {
    id: 'faq',
    heading: 'CÂU HỎI THƯỜNG GẶP',
    tabs: ['Sinh viên', 'Doanh nghiệp'],
    minQuestionsPerTab: 5,
  },
  {
    id: 'final-cta',
    heading: "LET'S BUILD THE FUTURE WITH AI",
    ctaButtons: [
      'Sinh viên',
      'Doanh nghiệp',
      'Nhà trường',
    ],
  },
];

export const NAV_ANCHORS = [
  '#the-idea',
  '#students',
  '#business',
  '#education',
  '#timeline',
  '#partners',
  '#faq',
];

export const VALID_STUDENT_DATA = {
  fullName: 'Nguyễn Văn Minh',
  email: 'minh.nguyen@university.edu.vn',
  phoneNumber: '0912345678',
  studentId: 'SV2026101',
  majorClass: 'Khoa học Máy tính K21',
  teamName: 'Neural Nexters',
  teamSize: '3' as const,
  domainInterest: 'workflow-automation' as const,
};

export const VALID_BUSINESS_DATA = {
  companyName: 'Công ty Cổ phần Công nghệ Tiên Phong',
  contactPerson: 'Trần Thị Mai',
  jobTitle: 'Giám đốc Đổi mới Sáng tạo',
  email: 'mai.tran@tienphongtech.vn',
  phoneNumber: '0988776655',
  partnershipType: 'problem-provider' as const,
  problemDescription: 'Tự động hóa bóc tách và đối soát dữ liệu hóa đơn giá trị gia tăng phức tạp với hơn 5000 chứng từ/tháng.',
};

export const VALID_EDUCATION_DATA = {
  institutionName: 'Khoa Công nghệ Thông tin - Đại học Bách Khoa',
  contactPerson: 'TS. Lê Hoàng Nam',
  email: 'nam.le@hcmut.edu.vn',
  phoneNumber: '0903123456',
  collaborationScope: 'Phối hợp phát động cuộc thi đến sinh viên, cử giảng viên tham gia Hội đồng Giám khảo chuyên môn và bảo trợ học thuật.',
};

export const INVALID_PHONES = [
  { value: '', label: 'Empty phone' },
  { value: '12345678', label: '8 digits (too short)' },
  { value: '0123456789', label: 'Old 01 prefix (deprecated in VN)' },
  { value: '0281234567', label: '02 prefix (landline)' },
  { value: '091234567890', label: '12 digits (too long)' },
  { value: '091234abcd', label: 'Contains letters' },
  { value: '++849123456', label: 'Malformed prefix' },
];

export const VALID_PHONES = [
  '0912345678',
  '0381234567',
  '0779998888',
  '0868886666',
  '0581234567',
  '+84912345678',
  '84988776655',
];

export const INVALID_EMAILS = [
  { value: '', label: 'Empty email' },
  { value: 'notanemail', label: 'Missing @ and domain' },
  { value: 'test@', label: 'Missing domain' },
  { value: '@example.com', label: 'Missing username' },
  { value: 'test@example', label: 'Missing top-level domain' },
  { value: 'test name@example.com', label: 'Contains spaces' },
];

export const VALID_EMAILS = [
  'student@university.edu.vn',
  'techlead@enterprise.com',
  'mentor@startup.io',
  'contact@domain.vn',
];
