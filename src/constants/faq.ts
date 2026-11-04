import { FaqData } from '../types/sections';

export const faqContent: FaqData = {
  eyebrow: 'CÂU HỎI THƯỜNG GẶP',
  heading: 'GIẢI ĐÁP NHANH THẮC MẮC TỪ CÁC BÊN',
  subheading:
    'Những thông tin cần thiết giúp sinh viên, doanh nghiệp và nhà trường chuẩn bị tốt nhất khi bước vào chương trình.',
  studentFaqs: [
    {
      id: 'faq-stu-1',
      category: 'student',
      question: 'Sinh viên mới biết code cơ bản, chưa hiểu sâu về AI có tham gia được không?',
      answer:
        'Hoàn toàn có thể! Cuộc thi tập trung vào kỹ năng ứng dụng AI vào thực tế (sử dụng API có sẵn của ChatGPT, Gemini kết hợp giao diện web/app quen thuộc), không yêu cầu nghiên cứu thuật toán từ đầu hay kỹ thuật RAG phức tạp. Chỉ cần bạn biết lập trình cơ bản và có tinh thần đồng đội, bạn đã hoàn toàn đủ sức tạo nên một sản phẩm chạy thật ấn tượng.',
    },
    {
      id: 'faq-stu-2',
      category: 'student',
      question: 'Tôi chưa có đội thi thì có thể đăng ký cá nhân được không?',
      answer:
        'Được. Bạn chỉ cần chọn hình thức "Cá nhân tìm đội ghép (1 thành viên)" trong biểu mẫu đăng ký. Ban Tổ chức sẽ tổ chức phiên kết nối ghép đội (Team Matching Session) trong tuần đầu tiên để giúp bạn tìm thấy những đồng đội có kỹ năng bổ trợ (Dev, UI/UX, Business).',
    },
    {
      id: 'faq-stu-3',
      category: 'student',
      question: 'Chi phí tham gia chương trình là bao nhiêu?',
      answer:
        'Chương trình hoàn toàn MIỄN PHÍ 100% cho tất cả các sinh viên được tuyển chọn tham gia. Các tài nguyên đào tạo, workshop và phiên cố vấn cùng chuyên gia đều được tài trợ toàn phần.',
    },
    {
      id: 'faq-stu-4',
      category: 'student',
      question: 'Lịch trình 3 tuần có làm ảnh hưởng đến việc học chính khóa trên trường không?',
      answer:
        'Không. Các buổi Workshop chung và các phiên Mentoring được bố trí linh hoạt vào các buổi tối ngày trong tuần hoặc cuối tuần. Thời gian làm việc nhóm do các đội chủ động tự sắp xếp theo hình thức online hoặc offline.',
    },
    {
      id: 'faq-stu-5',
      category: 'student',
      question: 'Quyền sở hữu trí tuệ đối với sản phẩm MVP thuộc về ai?',
      answer:
        'Toàn bộ sản phẩm và mã nguồn do đội thi phát triển thuộc quyền sở hữu của chính sinh viên. Doanh nghiệp đặt đề bài có quyền ưu tiên thương lượng hợp tác, cấp học bổng phát triển hoặc tài trợ triển khai thử nghiệm sau khi chương trình kết thúc.',
    },
  ],
  businessFaqs: [
    {
      id: 'faq-biz-1',
      category: 'business',
      question: 'Doanh nghiệp cần chuẩn bị những gì khi tham gia đồng hành?',
      answer:
        'Doanh nghiệp chỉ cần chuẩn bị một bản mô tả ngắn gọn về bài toán thực tế đang muốn giải quyết (kèm dữ liệu mẫu giả lập/ẩn danh nếu có) và cử 1-2 chuyên gia kỹ thuật hoặc sản phẩm dành khoảng 2-3 giờ mỗi tuần để cố vấn cho các đội thi.',
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
