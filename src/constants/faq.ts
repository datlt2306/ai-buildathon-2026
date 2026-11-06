import { FaqData } from '../types/sections';

export const faqContent: FaqData = {
  eyebrow: 'CÂU HỎI THƯỜNG GẶP',
  heading: 'GIẢI ĐÁP NHANH THẮC MẮC VỀ AI BUILDATHON 2026',
  subheading:
    'Những thông tin cần thiết giúp sinh viên FPT Polytechnic và các đối tác chuẩn bị tốt nhất khi bước vào cuộc thi.',
  studentFaqs: [
    {
      id: 'faq-stu-1',
      category: 'student',
      question: 'Sinh viên chỉ biết code cơ bản, hay dùng ChatGPT có tham gia được không?',
      answer:
        'Hoàn toàn được! Cuộc thi không dành riêng cho "cao thủ code" hay chuyên gia AI. Chỉ cần bạn biết lập trình cơ bản, biết dùng ChatGPT/Gemini để hỗ trợ, có khoảng 3 bạn cùng nhóm là đã đủ sức tạo ra một sản phẩm ứng dụng AI giải quyết bài toán thực tế.',
    },
    {
      id: 'faq-stu-2',
      category: 'student',
      question: 'Có bắt buộc xây dựng hệ thống HRM hoàn chỉnh hay toàn bộ vòng đời nhân sự không?',
      answer:
        'Tuyệt đối không! Cuộc thi áp dụng mô hình "Một lĩnh vực nghiệp vụ – Một số Pain Point cụ thể – Nhiều hướng giải quyết". Bạn không cần làm hệ thống HRM đồ sộ. Nhóm chỉ cần chọn 1 Pain Point hành chính nhân sự cụ thể (như tra cứu quy định, bóc tách CV/CCCD, nhắc hạn hợp đồng, phân loại đơn từ...) để phát triển một công cụ AI nhỏ trong 3 tuần.',
    },
    {
      id: 'faq-stu-3',
      category: 'student',
      question: 'Quy định về việc đăng ký và quy mô đội thi như thế nào?',
      answer:
        'Cuộc thi yêu cầu đăng ký theo đội (khuyến khích khoảng 3 sinh viên/đội). Trưởng nhóm sẽ đại diện đăng ký thông tin đội và điền danh sách các thành viên tham gia trên biểu mẫu đăng ký của website.',
    },
    {
      id: 'faq-stu-4',
      category: 'student',
      question: 'Mentor sẽ hỗ trợ các đội như thế nào trong 3 tuần?',
      answer:
        'Mentor và chuyên gia công nghệ sẽ hỗ trợ nhiều đội thông qua các buổi Workshop hướng dẫn chung và các buổi Q&A giải đáp kỹ thuật định kỳ, không phải hình thức mentor kèm 1-1.',
    },
    {
      id: 'faq-stu-5',
      category: 'student',
      question: 'Đội thi được sử dụng những công cụ, ngôn ngữ và nền tảng nào?',
      answer:
        'Sinh viên hoàn toàn tự do lựa chọn ngôn ngữ lập trình, framework, công cụ phát triển và AI Coding Agents phù hợp với khả năng của đội (như React, Next.js, Node.js, Python, Antigravity, Cursor, Gemini API...). Cuộc thi không áp đặt hay giới hạn công nghệ.',
    },
    {
      id: 'faq-stu-6',
      category: 'student',
      question: 'Yêu cầu sản phẩm MVP và điều kiện cấp chứng nhận như thế nào?',
      answer:
        'Cuộc thi hướng tới sản phẩm MVP có thể chạy thử và trình diễn được luồng chính tại Demo Day, không yêu cầu sản phẩm thương mại hoàn chỉnh. Về chứng nhận, theo quy định chỉ các đội lọt vào vòng chung kết hoặc đạt giải mới được cấp chứng nhận chính thức từ Ban tổ chức.',
    },
  ],
  businessFaqs: [
    {
      id: 'faq-biz-1',
      category: 'business',
      question: 'Doanh nghiệp đồng hành đóng vai trò như thế nào trong cuộc thi?',
      answer:
        'Doanh nghiệp đồng hành cung cấp bối cảnh thực tế và một số Pain Point điển hình trong công tác hành chính nhân sự. BTC sẽ cùng doanh nghiệp chuẩn hóa các đề bài phù hợp để sinh viên phát triển MVP trong 3 tuần.',
    },
    {
      id: 'faq-biz-2',
      category: 'business',
      question: 'Dữ liệu nghiệp vụ của doanh nghiệp có được đảm bảo an toàn bảo mật không?',
      answer:
        'An toàn thông tin là ưu tiên hàng đầu. Ban Tổ chức khuyến nghị doanh nghiệp chỉ cung cấp dữ liệu giả lập (synthetic data) hoặc dữ liệu đã được làm sạch, ẩn danh hóa hoàn toàn. Nếu doanh nghiệp có yêu cầu cụ thể, Ban Tổ chức sẵn sàng hỗ trợ ký kết thỏa thuận bảo mật thông tin (NDA).',
    },
    {
      id: 'faq-biz-3',
      category: 'business',
      question: 'Doanh nghiệp nhận được giá trị cụ thể gì sau 3 tuần của chương trình?',
      answer:
        'Doanh nghiệp nhận được nhiều góc nhìn giải pháp và bản nguyên mẫu MVP thực tế có thể kiểm chứng ngay; tiếp cận nguồn nhân sự công nghệ trẻ tài năng mà không tốn chi phí tuyển dụng ban đầu; đồng thời gia tăng nhận diện thương hiệu công nghệ tích cực trong cộng đồng sinh viên.',
    },
    {
      id: 'faq-biz-4',
      category: 'business',
      question: 'Nhà trường và Viện đào tạo có thể tham gia phối hợp với vai trò gì?',
      answer:
        'Nhà trường có thể đồng hành với tư cách Đơn vị bảo trợ học thuật, phối hợp phát động thông tin chương trình đến sinh viên các khoa CNTT/Kinh tế, đề cử giảng viên tham gia Hội đồng cố vấn/giám khảo và công nhận hoạt động ngoại khóa hoặc đồ án môn học cho sinh viên.',
    },
    {
      id: 'faq-biz-5',
      category: 'business',
      question: 'Quy trình tiếp nhận và phản hồi từ Ban Tổ chức diễn ra như thế nào?',
      answer:
        'Sau khi doanh nghiệp hoặc đại diện nhà trường gửi thông tin qua biểu mẫu trên website, Ban Thư ký chương trình sẽ liên hệ lại qua email hoặc số điện thoại trong vòng 24 - 48 giờ làm việc để trao đổi chi tiết về đề bài và phương thức phối hợp.',
    },
  ],
};
