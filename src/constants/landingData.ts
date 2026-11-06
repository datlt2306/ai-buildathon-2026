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
  eyebrow: 'AI BUILDATHON 2026',
  heading: 'Có AI, có ý tưởng. Ngại gì mà không làm sản phẩm thật!',
  subheading: 'Chủ đề: Ứng dụng AI trong quản lý hành chính nhân sự (HR Admin). 3 tuần thực chiến cùng đồng đội phát triển sản phẩm MVP từ bài toán thực tế.',
  stats: [
    { label: 'Thời gian thi đấu', value: '03 tuần' },
    { label: 'Quy mô mỗi đội', value: 'Khoảng 3 bạn' },
    { label: 'Công nghệ & công cụ', value: 'Sinh viên tự chọn' },
    { label: 'Yêu cầu sản phẩm', value: 'MVP chạy thử nghiệm' },
  ],
};

export const interactiveChallenges: ChallengeMockup[] = [
  {
    id: 'hr-policy',
    category: 'Tra cứu chính sách',
    title: 'Trợ lý AI tra cứu nội quy & chính sách HR',
    problem: 'Nhân viên liên tục hỏi HR các câu hỏi lặp đi lặp lại về chế độ nghỉ phép, bảo hiểm, nội quy.',
    solution: 'Chatbot tra cứu nội bộ đọc tài liệu quy chế, trả lời tức thì kèm trích dẫn điều khoản.',
    tech: ['Gemini Flash API', 'React', 'Prompt Engineering'],
    difficulty: 'Vừa sức',
    metrics: [
      { label: 'Tốc độ phản hồi', value: '< 1.0s' },
      { label: 'Độ chính xác trích dẫn', value: '96%' },
    ],
    interactiveDemo: {
      type: 'chat',
      model: 'Gemini 2.0 Flash',
      latency: '220 ms',
      cost: 'Tối ưu tài nguyên',
      previewTitle: 'Luồng hỏi đáp chính sách nhân sự',
      previewContent: 'Nhân viên hỏi: "Mình là nhân viên thử việc tháng thứ 2 thì có được hưởng ngày phép năm không và thủ tục xin nghỉ thế nào?"',
      outputSample: 'Trợ lý HR: "Chào bạn, theo Điều 14 Sổ tay nhân viên:\n• Nhân viên trong thời gian thử việc chưa được tính phép năm có hưởng lương.\n• Bạn có thể xin nghỉ không lương (tối đa 2 ngày/tháng) bằng cách nộp đơn trên cổng nội bộ trước 24h và được Quản lý trực tiếp duyệt.\nBạn có cần mình mở mẫu đơn xin nghỉ không lương không?"',
    },
  },
  {
    id: 'hr-doc',
    category: 'Xử lý hồ sơ',
    title: 'Bóc tách thông tin CV & CCCD tự động',
    problem: 'Phòng HR nhận hàng chục CV/CCCD mỗi tuần và phải nhập tay vào file Excel, dễ nhầm lẫn.',
    solution: 'Tải file CV/CCCD lên, AI Vision tự động trích xuất thông tin cấu trúc thành bảng tính.',
    tech: ['Gemini Vision API', 'Structured JSON', 'Next.js'],
    difficulty: 'Vừa sức',
    metrics: [
      { label: 'Thời gian bóc tách', value: '1.2s / hồ sơ' },
      { label: 'Tiết kiệm thời gian', value: '85%' },
    ],
    interactiveDemo: {
      type: 'doc',
      model: 'Gemini 2.0 Flash Vision',
      latency: '280 ms',
      cost: 'Tối ưu tài nguyên',
      previewTitle: 'Trích xuất hồ sơ ứng viên mẫu',
      previewContent: 'Tập tin tải lên: "CV_NguyenVanA.pdf" + "CCCD_mat_truoc.jpg"',
      outputSample: '{\n  "ho_va_ten": "Nguyễn Văn A",\n  "ngay_sinh": "2003-05-18",\n  "so_cccd": "001203012345",\n  "vi_tri_ung_tuyen": "Lập trình viên Frontend",\n  "ky_nang_chinh": ["React", "JavaScript", "Tailwind CSS"],\n  "so_dien_thoai": "0912345678"\n}\n-> Đã cập nhật vào bảng dữ liệu nhân sự thành công!',
    },
  },
  {
    id: 'hr-contract',
    category: 'Cảnh báo hợp đồng',
    title: 'Theo dõi hợp đồng & Cảnh báo nhắc hạn',
    problem: 'HR quản lý nhiều hợp đồng lao động, dễ quên hạn tái ký hoặc hạn thử việc trước 15-30 ngày.',
    solution: 'Hệ thống quét dữ liệu thời hạn, AI tự động tạo cảnh báo và bản thảo email nhắc quản lý.',
    tech: ['LLM Automation', 'Google Sheets / Supabase', 'React'],
    difficulty: 'Thử thách',
    metrics: [
      { label: 'Độ chính xác cảnh báo', value: '100%' },
      { label: 'Tự động soạn thảo', value: 'Tức thì' },
    ],
    interactiveDemo: {
      type: 'analytics',
      model: 'LLM Automation',
      latency: '350 ms',
      cost: 'Tối ưu tài nguyên',
      previewTitle: 'Cảnh báo hạn hợp đồng lao động',
      previewContent: 'Dữ liệu: "Hợp đồng thử việc NV Trần Thị B - Hết hạn: 25/11/2026 - Quản lý: Lê Văn C"',
      outputSample: '[CẢNH BÁO ĐẾN HẠN] Còn 15 ngày là hết hạn thử việc của NV Trần Thị B.\n[Bản thảo email gửi Quản lý Lê Văn C]:\n"Chào anh C, hợp đồng thử việc của bạn Trần Thị B sẽ kết thúc vào ngày 25/11/2026. Anh vui lòng hoàn thiện phiếu đánh giá thử việc trước ngày 18/11 để phòng HR chuẩn bị thủ tục ký HĐLĐ chính thức."',
    },
  },
];

export const stakeholdersData = [
  {
    role: 'Nhà trường',
    tag: 'Đào tạo thực chiến',
    highlight: 'Gắn kết giảng đường với thực tế doanh nghiệp',
    points: [
      'Sinh viên có môi trường cọ xát với bài toán nghiệp vụ thật',
      'Định hướng vận dụng kiến thức lập trình kết hợp công nghệ AI',
      'Mở rộng mạng lưới đối tác doanh nghiệp đồng hành cùng trường',
    ],
  },
  {
    role: 'Sinh viên',
    tag: 'Trung tâm hành động',
    highlight: 'Học bằng cách tự tay tạo ra sản phẩm chạy được',
    points: [
      'Xây dựng sản phẩm MVP thực tế để đưa vào Portfolio cá nhân',
      'Được cố vấn chuyên môn & tham gia các buổi giải đáp kỹ thuật chung',
      'Tự do lựa chọn công nghệ, công cụ và AI Coding Agents',
    ],
    featured: true,
  },
  {
    role: 'Doanh nghiệp',
    tag: 'Đồng hành & Nghiệp vụ',
    highlight: 'Đưa bài toán thực tế đến sinh viên tài năng',
    points: [
      'Cung cấp bối cảnh thực tế và các Pain Point trong quản lý HR',
      'Tiếp cận các giải pháp AI sáng tạo và nguồn nhân sự trẻ',
      'Quan sát năng lực làm việc nhóm và thực hành của sinh viên',
    ],
  },
];

export const timelineSteps = [
  {
    week: 'Tuần 01',
    title: 'Nhận đề & Thiết kế',
    desc: 'Hiểu bối cảnh nghiệp vụ HR Admin, chọn Pain Point và thiết kế luồng giải pháp MVP.',
    keyAction: 'Khóa ý tưởng & Thiết kế giao diện sơ bộ',
  },
  {
    week: 'Tuần 02',
    title: 'Xây dựng & Tích hợp',
    desc: 'Lập trình ứng dụng, tích hợp API AI và tham gia các buổi Q&A gỡ khó kỹ thuật chung.',
    keyAction: 'Chạy thử bản MVP đầu tiên',
  },
  {
    week: 'Tuần 03',
    title: 'Hoàn thiện & Trình diễn',
    desc: 'Kiểm thử thực tế, hoàn thiện slide/video demo và tự tin bảo vệ sản phẩm tại Demo Day.',
    keyAction: 'Trình diễn sản phẩm tại Demo Day',
  },
];

export const allChallenges = [
  {
    id: 1,
    category: 'Chính sách & Nội quy',
    title: 'Tra cứu chính sách & quy định nhân sự',
    desc: 'Hỏi đáp nhanh chế độ, nội quy, bảo hiểm, phép năm dựa trên sổ tay nhân viên.',
    badge: 'HR FAQ Bot',
  },
  {
    id: 2,
    category: 'Hồ sơ nhân sự',
    title: 'Số hóa & bóc tách thông tin CV, CCCD',
    desc: 'Bóc tách thông tin tự động từ CV ứng viên, CCCD vào bảng dữ liệu nhân sự.',
    badge: 'Vision & OCR',
  },
  {
    id: 3,
    category: 'Hợp đồng lao động',
    title: 'Theo dõi hợp đồng & cảnh báo nhắc hạn',
    desc: 'Theo dõi thời hạn hợp đồng thử việc, thời vụ và gửi thông báo nhắc tái ký.',
    badge: 'Reminder AI',
  },
  {
    id: 4,
    category: 'Đơn từ hành chính',
    title: 'Tiếp nhận & phân loại đơn từ hành chính',
    desc: 'Phân loại đơn xin nghỉ phép, đề xuất cấp thiết bị và gửi đúng người xử lý.',
    badge: 'Classification',
  },
  {
    id: 5,
    category: 'Dữ liệu hành chính',
    title: 'Tổng hợp & báo cáo dữ liệu chấm công, nhân sự',
    desc: 'Chuyển dữ liệu chấm công, điểm danh thành bản báo cáo tóm tắt trực quan.',
    badge: 'HR Analytics',
  },
  {
    id: 6,
    category: 'Đề bài Doanh nghiệp',
    title: 'Pain Point hành chính nhân sự từ Doanh nghiệp',
    desc: 'Bài toán nghiệp vụ cụ thể do Doanh nghiệp đồng hành và BTC công bố tại Orientation.',
    badge: 'Real Business',
  },
];

export const buildWithAiPrinciples = [
  {
    title: 'Dùng API có sẵn',
    desc: 'Sử dụng các mô hình sẵn có (Gemini, OpenAI, Claude, Groq, DeepSeek). Không yêu cầu tự huấn luyện mô hình từ đầu.',
  },
  {
    title: 'Tự chủ công nghệ & công cụ',
    desc: 'Đội thi chủ động lựa chọn nền tảng, công cụ phát triển và AI Agents phù hợp nhất với giải pháp của mình.',
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
  { name: 'Mức độ giải quyết vấn đề', percent: 35, desc: 'Sản phẩm có giải quyết đúng Pain Point hành chính nhân sự đã chọn không?' },
  { name: 'Tính khả thi & Trải nghiệm MVP', percent: 30, desc: 'Giao diện trực quan, dễ thao tác, có luồng người dùng mượt mà và chạy thử được.' },
  { name: 'Mức độ ứng dụng AI', percent: 25, desc: 'Tận dụng AI thông minh, prompt tối ưu, xử lý kết quả chính xác cho nghiệp vụ.' },
  { name: 'Khả năng trình diễn & Bảo vệ', percent: 10, desc: 'Thuyết trình rõ ràng, hiểu sản phẩm và demo thuyết phục tại Demo Day.' },
];

export const studentFaqs = [
  {
    q: 'Chỉ biết lập trình cơ bản và hay dùng ChatGPT có tham gia được không?',
    a: 'Hoàn toàn được! Cuộc thi tập trung vào bài toán Quản lý hành chính nhân sự (HR Admin) ở mức độ vừa sức trong 3 tuần. Bạn chỉ cần biết lập trình cơ bản, biết prompt ChatGPT/Gemini hoặc làm giao diện là có thể cùng đồng đội tạo ra một MVP chạy thực tế.',
  },
  {
    q: 'Có bắt buộc xây dựng hệ thống HRM hoàn chỉnh không?',
    a: 'Không. Cuộc thi không yêu cầu sinh viên xây dựng hệ thống HRM hoàn chỉnh hay bao quát toàn bộ vòng đời nhân sự. Mỗi đội chỉ tập trung giải quyết 1 Pain Point hành chính nhân sự cụ thể bằng một công cụ hoặc ứng dụng AI nhỏ trong 3 tuần.',
  },
  {
    q: 'Hình thức Mentor hỗ trợ các đội như thế nào?',
    a: 'Mentor sẽ đồng hành cùng các đội thông qua các buổi Workshop hướng dẫn chung và các phiên Q&A giải đáp kỹ thuật theo nhóm, không phải hình thức kèm cặp 1-1.',
  },
  {
    q: 'Sinh viên được sử dụng những công nghệ và công cụ nào?',
    a: 'Sinh viên hoàn toàn tự do lựa chọn ngôn ngữ, framework, công cụ phát triển và AI Coding Agents phù hợp với khả năng của đội (React, Next.js, Python, Node.js, Cursor, Antigravity...). Cuộc thi không áp đặt hay giới hạn công nghệ.',
  },
  {
    q: 'Chứng nhận tham gia được cấp như thế nào?',
    a: 'Theo quy định cuộc thi, chỉ các đội lọt vào vòng chung kết hoặc đạt giải mới được cấp giấy chứng nhận chính thức từ Ban tổ chức.',
  },
];
