export interface ChallengeMockup {
  id: string;
  category: string;
  title: string;
  problem: string;
  solution: string;
  tech: string[];
  difficulty: 'Vừa sức' | 'Thử thách';
  metrics: { label: string; value: string }[];
  interactiveDemo: {
    type: 'chat' | 'doc' | 'analytics';
    model: string;
    latency: string;
    cost: string;
    previewTitle: string;
    previewContent: string;
    outputSample: string;
  };
}

export const heroData = {
  eyebrow: 'AI INNOVATION CHALLENGE 2026',
  heading: 'Từ bài toán thực tế đến sản phẩm AI',
  subheading: 'Hành trình 3 tuần cùng đồng đội và Mentor biến ý tưởng thành MVP ứng dụng AI có thể vận hành.',
  stats: [
    { label: 'Thời gian thi đấu', value: '03 tuần' },
    { label: 'Quy mô mỗi đội', value: '3 - 5 bạn' },
    { label: 'Chi phí tham gia', value: 'Miễn phí 100%' },
    { label: 'Công nghệ', value: 'Dùng API có sẵn' },
  ],
};

export const interactiveChallenges: ChallengeMockup[] = [
  {
    id: 'customer-ai',
    category: 'Chăm sóc khách hàng',
    title: 'Trợ lý CSKH & Chốt đơn tự động',
    problem: 'Doanh nghiệp nhận hàng nghìn tin nhắn mỗi ngày nhưng nhân viên quá tải vào ban đêm.',
    solution: 'Bot AI hiểu ngữ cảnh, tra cứu bảng giá và hỗ trợ khách đặt hàng tức thì.',
    tech: ['Gemini Flash API', 'React', 'FastAPI'],
    difficulty: 'Vừa sức',
    metrics: [
      { label: 'Tốc độ phản hồi', value: '< 1.2s' },
      { label: 'Độ chính xác tư vấn', value: '94%' },
    ],
    interactiveDemo: {
      type: 'chat',
      model: 'Gemini 2.0 Flash (Free Tier)',
      latency: '240 ms',
      cost: '0 VNĐ / tháng',
      previewTitle: 'Luồng hội thoại mẫu',
      previewContent: 'Khách hàng: "Shop còn áo khoác gió chống nước size L màu đen không, giao hỏa tốc HN được không?"',
      outputSample: 'Trợ lý AI: "Dạ bên em còn đúng 2 chiếc áo khoác gió chống nước size L màu đen tại kho Cầu Giấy ạ. Nếu anh/chị đặt bây giờ, shop giao hỏa tốc trong 2 giờ nội thành Hà Nội. Anh/chị cho em xin địa chỉ nhận hàng nhé!"',
    },
  },
  {
    id: 'document-ai',
    category: 'Xử lý tài liệu',
    title: 'Bóc tách & Số hóa hồ sơ, hóa đơn',
    problem: 'Phòng kế toán phải nhập tay hàng trăm hóa đơn VAT và hợp đồng mỗi tuần, dễ sai sót.',
    solution: 'Ứng dụng tải ảnh/PDF lên, tự động trích xuất thông tin thành file Excel / JSON.',
    tech: ['OCR API', 'Structured LLM', 'Next.js'],
    difficulty: 'Vừa sức',
    metrics: [
      { label: 'Thời gian bóc tách', value: '1.5s / trang' },
      { label: 'Tiết kiệm thời gian', value: '80%' },
    ],
    interactiveDemo: {
      type: 'doc',
      model: 'Claude 3.5 Haiku / GPT-4o-mini',
      latency: '310 ms',
      cost: 'Miễn phí quota',
      previewTitle: 'Trích xuất hóa đơn mẫu',
      previewContent: 'Tập tin tải lên: "HD_VAT_2026_0912.pdf" (Hóa đơn mua linh kiện điện tử)',
      outputSample: '{\n  "ma_so_thue": "0108923411",\n  "tong_tien_chua_vat": 14500000,\n  "vat_8_phan_tram": 1160000,\n  "tong_thanh_toan": 15660000,\n  "ngay_lap": "2026-11-04"\n}',
    },
  },
  {
    id: 'analytics-ai',
    category: 'Phân tích số liệu',
    title: 'Trợ lý hỏi đáp dữ liệu kinh doanh',
    problem: 'Quản lý muốn biết tình hình bán hàng nhưng không rành viết câu lệnh SQL để truy vấn.',
    solution: 'Hỏi bằng tiếng Việt tự nhiên (Text-to-SQL/Chart), hệ thống tự vẽ biểu đồ trực quan.',
    tech: ['Text-to-SQL', 'Chart.js', 'Python'],
    difficulty: 'Thử thách',
    metrics: [
      { label: 'Hiểu câu hỏi tiếng Việt', value: '96%' },
      { label: 'Xuất biểu đồ', value: 'Tức thì' },
    ],
    interactiveDemo: {
      type: 'analytics',
      model: 'LLM Function Calling',
      latency: '420 ms',
      cost: 'Free tier',
      previewTitle: 'Truy vấn ngôn ngữ tự nhiên',
      previewContent: 'Giám đốc hỏi: "Doanh số chi nhánh Đà Nẵng tháng vừa rồi tăng hay giảm so với tháng trước?"',
      outputSample: 'Phân tích: Chi nhánh Đà Nẵng đạt 420 triệu VNĐ (tăng +18.4% so với tháng trước). Nhóm sản phẩm tăng trưởng mạnh nhất là Phụ kiện thông minh (+32%). [Đã tự động tạo biểu đồ đường xu hướng].',
    },
  },
];

export const stakeholdersData = [
  {
    role: 'Nhà trường',
    tag: 'Đào tạo thực chiến',
    highlight: 'Gắn kết giảng đường với thực tế',
    points: [
      'Sinh viên có môi trường cọ xát với bài toán thật',
      'Định hướng ứng dụng AI vào thực tế sản phẩm',
      'Mở rộng mạng lưới đối tác doanh nghiệp uy tín',
    ],
  },
  {
    role: 'Sinh viên',
    tag: 'Trung tâm hành động',
    highlight: 'Học bằng cách tự tay tạo ra sản phẩm',
    points: [
      'Xây dựng MVP hoàn chỉnh để đưa vào Portfolio / CV',
      'Được Mentor phản biện & hướng dẫn 1-1 hàng tuần',
      'Tự do chọn công nghệ, không áp đặt mô hình',
    ],
    featured: true,
  },
  {
    role: 'Doanh nghiệp',
    tag: 'Đồng hành & Tuyển dụng',
    highlight: 'Tìm kiếm ý tưởng & nhân tài công nghệ',
    points: [
      'Đưa ra bài toán thực tiễn đang cần giải quyết',
      'Tiếp cận các giải pháp AI sáng tạo từ người trẻ',
      'Quan sát năng lực thực chiến để tuyển dụng thực tập',
    ],
  },
];

export const timelineSteps = [
  {
    week: 'Tuần 01',
    title: 'Nhận đề & Thiết kế',
    desc: 'Phân tích vấn đề, nghiên cứu luồng người dùng và phác thảo giao diện MVP.',
    keyAction: 'Khóa đề bài & Thiết kế wireframe',
  },
  {
    week: 'Tuần 02',
    title: 'Xây dựng & Tích hợp',
    desc: 'Kết nối mô hình AI qua API có sẵn, lập trình tính năng cốt lõi và kiểm thử.',
    keyAction: 'Chạy thử bản MVP đầu tiên',
  },
  {
    week: 'Tuần 03',
    title: 'Hoàn thiện & Trình diễn',
    desc: 'Tinh chỉnh trải nghiệm, tối ưu tốc độ và demo trực tiếp trước ban giám khảo.',
    keyAction: 'Bảo vệ sản phẩm tại Demo Day',
  },
];

export const allChallenges = [
  {
    id: 1,
    category: 'Chăm sóc khách hàng',
    title: 'Trợ lý CSKH & Bán hàng 24/7',
    desc: 'Tự động phản hồi tin nhắn, giải đáp thắc mắc và hỗ trợ đặt hàng bằng tiếng Việt tự nhiên.',
    badge: 'API Prompting',
  },
  {
    id: 2,
    category: 'Xử lý tài liệu',
    title: 'Số hóa hóa đơn & Hồ sơ hợp đồng',
    desc: 'Bóc tách thông tin từ ảnh chụp và file PDF, trích xuất dữ liệu có cấu trúc vào bảng tính.',
    badge: 'OCR & LLM',
  },
  {
    id: 3,
    category: 'Tự động hóa',
    title: 'Trợ lý tự động hóa quy trình nghiệp vụ',
    desc: 'Tự động phân loại email, trích xuất việc cần làm và nhắc lịch tự động cho nhân viên.',
    badge: 'AI Workflow',
  },
  {
    id: 4,
    category: 'Marketing',
    title: 'Trợ lý tạo nội dung & Truyền thông',
    desc: 'Hỗ trợ lên ý tưởng bài viết, tạo bản thảo nội dung mạng xã hội theo phong cách thương hiệu.',
    badge: 'Content AI',
  },
  {
    id: 5,
    category: 'Phân tích dữ liệu',
    title: 'Truy vấn & Trực quan hóa số liệu',
    desc: 'Đặt câu hỏi bằng tiếng Việt để tự động xuất bảng số liệu và vẽ biểu đồ xu hướng kinh doanh.',
    badge: 'Data AI',
  },
  {
    id: 6,
    category: 'Đề tài mở',
    title: 'Giải pháp AI giải quyết bài toán riêng',
    desc: 'Đội thi có thể tự đề xuất bài toán thực tiễn từ trường học, đời sống hoặc doanh nghiệp đối tác.',
    badge: 'Sáng tạo mở',
  },
];

export const buildWithAiPrinciples = [
  {
    title: 'Dùng API có sẵn',
    desc: 'Sử dụng các mô hình sẵn có (Gemini, OpenAI, Claude, Groq, DeepSeek). Không yêu cầu tự huấn luyện mô hình từ đầu.',
  },
  {
    title: 'Ưu tiên tài nguyên miễn phí',
    desc: 'Tận dụng các gói Free Tier của cloud và mô hình mã nguồn mở để tối ưu chi phí phát triển.',
  },
  {
    title: 'Sản phẩm có giao diện thực',
    desc: 'Sản phẩm phải có giao diện sử dụng được (Web, Mobile App hoặc Chatbot) để người dùng thao tác thực tế.',
  },
  {
    title: 'Tự do lựa chọn công nghệ',
    desc: 'Sinh viên thoải mái chọn ngôn ngữ và framework yêu thích: React, Next.js, Vue, Flutter, Python, Node.js,...',
  },
];

export const evaluationCriteria = [
  { name: 'Giá trị giải quyết vấn đề', percent: 35, desc: 'Sản phẩm có thực sự giải quyết được bài toán thực tế đã đặt ra không?' },
  { name: 'Trải nghiệm & Luồng sử dụng', percent: 30, desc: 'Giao diện trực quan, dễ thao tác, có luồng người dùng mượt mà.' },
  { name: 'Mức độ ứng dụng AI', percent: 25, desc: 'Tận dụng AI thông minh, prompt tối ưu, xử lý kết quả chính xác.' },
  { name: 'Tính thực tiễn & Vận hành', percent: 10, desc: 'Dễ triển khai, chi phí vận hành hợp lý, có tiềm năng mở rộng.' },
];

export const studentFaqs = [
  {
    q: 'Không giỏi Machine Learning có tham gia được không?',
    a: 'Hoàn toàn được! Cuộc thi tập trung vào việc ứng dụng mô hình AI có sẵn (qua API) để làm ra sản phẩm có ích. Bạn chỉ cần biết lập trình cơ bản hoặc thiết kế UI/UX là đã có thể cùng đồng đội tạo nên sản phẩm tuyệt vời.',
  },
  {
    q: 'Có bắt buộc đăng ký theo nhóm không?',
    a: 'Không bắt buộc. Bạn có thể đăng ký cá nhân, Ban Tổ Chức sẽ tổ chức buổi ghép đội để kết nối bạn với những thành viên có kỹ năng bổ trợ (như Lập trình, Thiết kế, Quản lý sản phẩm).',
  },
  {
    q: 'Chi phí sử dụng API có tốn kém không?',
    a: 'Hoàn toàn không. Ban Tổ Chức khuyến khích sử dụng các dịch vụ có gói miễn phí (Free Tier như Gemini API, Groq, Cohere, Supabase, Vercel) để đội nào cũng có thể phát triển MVP mà không tốn chi phí.',
  },
  {
    q: 'Sản phẩm nộp vào cuối cuộc thi gồm những gì?',
    a: 'Mỗi đội nộp: (1) Mã nguồn trên GitHub, (2) Đường dẫn chạy thử sản phẩm trực tuyến (hoặc video demo ngắn 2 phút), và (3) Trình diễn sản phẩm trực tiếp trước ban giám khảo trong Demo Day.',
  },
  {
    q: 'Sinh viên tham gia nhận được những quyền lợi gì?',
    a: 'Bạn có một sản phẩm thật trong Portfolio cá nhân, giấy chứng nhận từ chương trình, cơ hội tiếp cận trực tiếp nhà tuyển dụng và nhận phản biện quý báu từ các Mentor giàu kinh nghiệm.',
  },
];
