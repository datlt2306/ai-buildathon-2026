import { StakeholdersData, TheIdeaData } from '../types/sections';

export const theIdeaContent: TheIdeaData = {
  eyebrow: 'TRIẾT LÝ CHƯƠNG TRÌNH',
  heading: 'KHÔNG CHỈ LÀ MỘT CUỘC THI CÔNG NGHỆ',
  subheading: 'Cầu nối chuyển hóa tri thức và công nghệ thành sản phẩm thực tiễn',
  philosophy:
    'Khác với các cuộc thi học thuật truyền thống nơi ý tưởng thường dừng lại ở slide thuyết trình hay thuật toán lý thuyết, AI Innovation Challenge là vườn ươm sản phẩm thực chiến. Chúng tôi thu hẹp khoảng cách giữa giảng đường và thị trường bằng cách đưa bài toán thực tế của doanh nghiệp đến với các đội thi sinh viên dưới sự bảo trợ và hướng dẫn trực tiếp từ chuyên gia.',
  steps: [
    {
      stepNumber: 1,
      badge: 'BƯỚC 1',
      title: 'Doanh nghiệp chia sẻ bài toán',
      description:
        'Doanh nghiệp đối tác đưa ra những vấn đề nhức nhối, nút thắt vận hành hoặc nhu cầu chuyển đổi số từ thực tiễn kinh doanh.',
      iconName: 'Briefcase',
      accentColor: 'violet',
    },
    {
      stepNumber: 2,
      badge: 'BƯỚC 2',
      title: 'Sinh viên phát triển giải pháp',
      description:
        'Các đội thi đa ngành ứng dụng các mô hình AI tiên tiến, kỹ thuật RAG và hệ thống Multi-Agent để hiện thực hóa nguyên mẫu giải pháp.',
      iconName: 'Terminal',
      accentColor: 'blue',
    },
    {
      stepNumber: 3,
      badge: 'BƯỚC 3',
      title: 'Mentor & Chuyên gia đồng hành',
      description:
        'Đội ngũ Senior Engineers và Product Leads hướng dẫn sát cánh 1-1 từ cấu trúc kỹ thuật đến nghiệp vụ và kiểm soát độ chính xác của AI.',
      iconName: 'Compass',
      accentColor: 'cyan',
    },
    {
      stepNumber: 4,
      badge: 'BƯỚC 4',
      title: 'MVP được trình diễn & thẩm định',
      description:
        'Trình diễn sản phẩm trực tiếp (Live Demo) trước Hội đồng thẩm định, mở ra cơ hội triển khai thử nghiệm thực tế và tuyển dụng nhân tài.',
      iconName: 'Rocket',
      accentColor: 'emerald',
    },
  ],
};

export const stakeholdersContent: StakeholdersData = {
  eyebrow: 'HỆ SINH THÁI ĐỔI MỚI SÁNG TẠO 3 BÊN',
  heading: 'GẮN KẾT CHẶT CHẼ GIỮA ĐÀO TẠO - THỰC THI - DOANH NGHIỆP',
  subheading:
    'Mỗi mắt xích đóng vai trò trọng tâm tạo nên chu trình chuyển giao công nghệ toàn diện và bền vững.',
  pillars: {
    education: {
      id: 'education',
      badge: '🏛️ DÀNH CHO NHÀ TRƯỜNG',
      title: 'Nhà trường & Viện đào tạo',
      tagline: 'BRIDGING EDUCATION AND INDUSTRY',
      valueProposition:
        'Gắn kết chương trình đào tạo lý thuyết với đòi hỏi khắt khe của thị trường lao động thời đại trí tuệ nhân tạo.',
      accentColor: 'cyan',
      benefits: [
        {
          title: 'Đổi mới phương pháp học tập thực chiến',
          description:
            'Cập nhật xu hướng công nghệ AI thực tiễn cho sinh viên thông qua phương pháp Project-Based Learning mà không làm xáo trộn khung chương trình chuẩn.',
        },
        {
          title: 'Nâng cao uy tín và vị thế học thuật',
          description:
            'Tạo sân chơi công nghệ chuẩn mực, khẳng định chất lượng đào tạo thông qua các sản phẩm ứng dụng có tác động đo lường được.',
        },
        {
          title: 'Thiết lập mạng lưới đối tác bền vững',
          description:
            'Xây dựng mối quan hệ hợp tác chiến lược dài hạn giữa trường đại học và cộng đồng doanh nghiệp công nghệ hàng đầu.',
        },
      ],
      primaryCtaLabel: 'Tìm hiểu chương trình hợp tác',
    },
    student: {
      id: 'student',
      badge: '🚀 DÀNH CHO SINH VIÊN (TRỌNG TÂM THỰC CHIẾN)',
      title: 'Sinh viên & Lập trình viên trẻ',
      tagline: "DON'T JUST LEARN AI. BUILD WITH AI",
      valueProposition:
        'Đừng dừng lại ở việc đọc tài liệu hay gọi câu lệnh đơn giản. Hãy tự tay xây dựng sản phẩm AI hoàn chỉnh giải quyết vấn đề thực tế.',
      accentColor: 'blue',
      benefits: [
        {
          title: 'Giải quyết bài toán thực tế từ doanh nghiệp',
          description:
            'Cọ xát trực tiếp với bài toán hóc búa, dữ liệu mô phỏng thật và các tình huống vận hành thực tế tại thị trường.',
        },
        {
          title: 'Trải nghiệm quy trình Agile 3 tuần',
          description:
            'Học cách làm việc nhóm, thiết kế kiến trúc hệ thống và ra mắt sản phẩm MVP chạy thật đúng tiến độ dưới áp lực thời gian.',
        },
        {
          title: 'Được cố vấn 1-1 bởi chuyên gia hàng đầu',
          description:
            'Nhận phản hồi kỹ thuật, đánh giá kiến trúc và gỡ lỗi trực tiếp từ các Senior AI Engineers và Tech Leads doanh nghiệp.',
        },
        {
          title: 'Xây dựng Portfolio & Cơ hội nghề nghiệp độc quyền',
          description:
            'Sở hữu dự án thực chiến gây ấn tượng trên CV, nhận giấy chứng nhận uy tín và cơ hội phỏng vấn tuyển dụng trực tiếp.',
        },
      ],
      primaryCtaLabel: 'Đăng ký tham gia ngay',
      secondaryCtaLabel: 'Khám phá thể lệ cuộc thi',
      secondaryCtaTarget: '#timeline',
    },
    business: {
      id: 'business',
      badge: '💼 DÀNH CHO DOANH NGHIỆP',
      title: 'Doanh nghiệp & Đơn vị đồng hành',
      tagline: 'BRING REAL CHALLENGES. INSPIRE REAL INNOVATION',
      valueProposition:
        'Tiếp cận góc nhìn sáng tạo, không giới hạn từ thế hệ kỹ sư trẻ để tìm lời giải đột phá cho bài toán kinh doanh.',
      accentColor: 'violet',
      benefits: [
        {
          title: 'Nhận nguyên mẫu giải pháp (PoC/MVP) nhanh chóng',
          description:
            'Thu thập nhiều cách tiếp cận và góc nhìn công nghệ khác nhau cho bài toán nội bộ với chi phí nghiên cứu phát triển tối ưu.',
        },
        {
          title: 'Kênh phát hiện và tuyển dụng nhân tài xuất sắc',
          description:
            'Quan sát trực tiếp năng lực giải quyết vấn đề, tinh thần làm việc nhóm và kỹ năng code thực tế của ứng viên trước khi tuyển dụng.',
        },
        {
          title: 'Lan tỏa thương hiệu nhà tuyển dụng công nghệ',
          description:
            'Khẳng định vai trò tiên phong trong ứng dụng AI và xây dựng hình ảnh đối tác gắn liền với trách nhiệm xã hội và ươm mầm thế hệ trẻ.',
        },
      ],
      collaborationModes: [
        {
          type: 'problem-provider',
          title: 'Business Problem',
          description: 'Đưa bài toán thực tế hoặc quy trình cần tối ưu của đơn vị cho các đội thi giải quyết.',
        },
        {
          type: 'mentor',
          title: 'Mentor & Cố vấn',
          description: 'Cử chuyên gia kỹ thuật/sản phẩm tham gia hướng dẫn và tháo gỡ vướng mắc cho các đội.',
        },
        {
          type: 'judge',
          title: 'Expert Review',
          description: 'Tham gia Hội đồng thẩm định độc lập đánh giá sản phẩm tại buổi thuyết trình Demo Day.',
        },
        {
          type: 'sponsor',
          title: 'Sponsorship',
          description: 'Tài trợ giải thưởng, học bổng hoặc cung cấp tài nguyên Cloud/API credits phục vụ cuộc thi.',
        },
      ],
      primaryCtaLabel: 'Trở thành đối tác đồng hành',
    },
  },
};
