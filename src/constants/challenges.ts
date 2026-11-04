import { ChallengesData } from '../types/sections';

export const challengesContent: ChallengesData = {
  eyebrow: 'LĨNH VỰC BÀI TOÁN THỰC TẾ',
  heading: 'CÁC NHÓM ĐỀ TÀI ĐẶT HÀNG TỪ DOANH NGHIỆP',
  subheading:
    'Những bài toán thực tiễn từ thị trường đang chờ đón các lời giải sáng tạo và đột phá từ thế hệ trẻ.',
  notice:
    'Danh sách đề bài chi tiết cụ thể kèm bộ dữ liệu mẫu (synthetic/anonymized dataset) sẽ được các doanh nghiệp đối tác chính thức công bố tại phiên Kick-off. Dưới đây là 6 định hướng bài toán gợi ý tiêu biểu:',
  categories: [
    {
      id: 'customer-support',
      categoryNumber: '01',
      title: 'Customer Support & Engagement',
      tag: 'Conversational AI / Voice / Multi-channel',
      description:
        'Trợ lý ảo AI đa kênh có khả năng hiểu ngữ cảnh sâu sắc, tra cứu cơ sở tri thức chính sách nội bộ tức thì, tự động giải đáp thắc mắc và định tuyến xử lý khiếu nại 24/7.',
      realWorldImpact:
        'Giúp doanh nghiệp giảm đến 70% khối lượng tác vụ lặp lại của nhân sự hỗ trợ, phản hồi khách hàng trong vài giây và duy trì chất lượng dịch vụ đồng đều.',
      sampleUseCases: [
        'Trợ lý hỏi đáp chính sách hoàn hàng & bảo hành tự động.',
        'Hệ thống phân tích giọng nói và cảm xúc khách hàng qua tổng đài.',
        'Chatbot tư vấn sản phẩm thông minh tích hợp giỏ hàng.',
      ],
      iconName: 'MessageSquare',
    },
    {
      id: 'marketing-assistant',
      categoryNumber: '02',
      title: 'Marketing Assistant & Content Generation',
      tag: 'Multimodal / Generative AI / Personalization',
      description:
        'Bộ công cụ tự động hóa sáng tạo nội dung đa phương tiện (copywriting, hình ảnh quảng cáo, kịch bản video, newsletter) và cá nhân hóa thông điệp tiếp thị dựa trên hành vi khách hàng.',
      realWorldImpact:
        'Cắt giảm thời gian sản xuất chiến dịch truyền thông từ nhiều ngày xuống vài giờ, tối ưu hóa ngân sách sáng tạo nội dung cho các thương hiệu.',
      sampleUseCases: [
        'Trình tạo nội dung bài đăng mạng xã hội đa biến thể tự động.',
        'Cá nhân hóa email marketing theo từng phân khúc người dùng.',
        'Trợ lý gợi ý ý tưởng chiến dịch dựa trên xu hướng thị trường.',
      ],
      iconName: 'Sparkles',
    },
    {
      id: 'document-processing',
      categoryNumber: '03',
      title: 'Document Processing & Knowledge Extraction',
      tag: 'OCR + LLM / Intelligent Document Processing / RAG',
      description:
        'Ứng dụng nhận diện, trích xuất cấu trúc dữ liệu, đối soát và tóm tắt thông tin quan trọng từ các tài liệu phức tạp (hợp đồng pháp lý, hóa đơn chứng từ, hồ sơ bảo hiểm, báo cáo tài chính).',
      realWorldImpact:
        'Loại bỏ 90% rủi ro sai sót do nhập liệu thủ công, rút ngắn thời gian thẩm định hồ sơ tín dụng hoặc giải quyết quyền lợi bảo hiểm từ vài ngày xuống vài phút.',
      sampleUseCases: [
        'Bóc tách tự động thông tin hóa đơn giá trị gia tăng & hợp đồng.',
        'Trợ lý đối soát điều khoản pháp lý và cảnh báo rủi ro hợp đồng.',
        'Hệ thống hỏi đáp tài liệu kỹ thuật nội bộ sử dụng kỹ thuật RAG.',
      ],
      iconName: 'FileText',
    },
    {
      id: 'workflow-automation',
      categoryNumber: '04',
      title: 'Workflow Automation & Enterprise Agents',
      tag: 'AI Agents / Tool Calling / System Integration',
      description:
        'Hệ sinh thái AI Agents tự chủ kết nối các phần mềm nội bộ (CRM, ERP, Slack, Email, Google Sheets), có khả năng tự động phân loại tác vụ, lập lịch thông minh và điều phối quy trình làm việc liên phòng ban.',
      realWorldImpact:
        'Giúp doanh nghiệp giải phóng hàng nghìn giờ làm việc bàn giấy mỗi tháng, loại bỏ nút thắt cổ chai trong phê duyệt nội bộ và tăng cường năng suất vận hành.',
      sampleUseCases: [
        'Agent tiếp nhận yêu cầu nghỉ phép và tự động cập nhật hệ thống nhân sự.',
        'Hệ thống tự động tóm tắt cuộc họp và tạo danh sách việc cần làm (Action Items).',
        'Tự động hóa luồng tổng hợp và gửi báo cáo kinh doanh hàng tuần.',
      ],
      iconName: 'Workflow',
    },
    {
      id: 'data-analytics',
      categoryNumber: '05',
      title: 'Data Analytics & Business Intelligence',
      tag: 'Text-to-SQL / Predictive Insights / Visual BI',
      description:
        'Trợ lý trò chuyện cho phép ban lãnh đạo và chuyên viên đặt câu hỏi bằng ngôn ngữ tự nhiên để truy vấn cơ sở dữ liệu lớn, nhận biểu đồ trực quan và dự báo xu hướng thị trường mà không cần viết mã SQL.',
      realWorldImpact:
        'Dân chủ hóa dữ liệu (Data Democratization), trao quyền cho người làm kinh doanh đưa ra quyết định dựa trên số liệu tức thời mà không phải phụ thuộc vào bộ phận IT.',
      sampleUseCases: [
        'Hỏi đáp doanh thu và tồn kho theo thời gian thực bằng tiếng Việt tự nhiên.',
        'Tự động phát hiện biến động dữ liệu bất thường và gửi cảnh báo sớm.',
        'Trợ lý phân tích xu hướng mua hàng và gợi ý kế hoạch nhập hàng.',
      ],
      iconName: 'BarChart3',
    },
    {
      id: 'other',
      categoryNumber: '06',
      title: 'Other Innovative Applications',
      tag: 'EdTech / HealthTech / Code Assistant / Open Innovation',
      description:
        'Các giải pháp đột phá trong lĩnh vực giáo dục cá nhân hóa, trợ lý hỗ trợ lập trình viên (AI Pair Programmer), sàng lọc sức khỏe ban đầu, nông nghiệp công nghệ cao hoặc bảo vệ môi trường.',
      realWorldImpact:
        'Mở rộng biên độ ứng dụng AI vào mọi ngành nghề, khuyến khích tư duy đổi mới mở và tạo ra các tác động tích cực cho cộng đồng xã hội.',
      sampleUseCases: [
        'Nền tảng gia sư ảo hỗ trợ học tập cá nhân hóa theo năng lực học sinh.',
        'Công cụ kiểm tra lỗi bảo mật và tối ưu mã nguồn cho developer.',
        'Ứng dụng nhận diện sâu bệnh nông nghiệp qua camera điện thoại.',
      ],
      iconName: 'Lightbulb',
    },
  ],
};
