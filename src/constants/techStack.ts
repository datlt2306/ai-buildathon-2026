import { BuildWithAiData } from '../types/sections';

export const buildWithAiContent: BuildWithAiData = {
  eyebrow: 'ĐỊNH HƯỚNG CÔNG NGHỆ & TÀI NGUYÊN',
  heading: 'XÂY DỰNG CÙNG AI: TỰ DO, THỰC TIỄN & TỐI ƯU CHI PHÍ',
  subheading:
    'Tập trung tối đa vào giải quyết vấn đề của người dùng. Tự do lựa chọn kiến trúc công nghệ phù hợp nhất với thế mạnh của đội bạn.',
  guidingPrinciples: [
    {
      title: 'Giá trị sản phẩm thực tế là cốt lõi',
      description:
        'Sự khác biệt không nằm ở việc sở hữu mô hình AI đồ sộ, mà ở cách bạn xâu chuỗi dữ liệu, thiết kế luồng tương tác và tháo gỡ triệt để nút thắt cho người dùng.',
    },
    {
      title: 'Không bắt buộc huấn luyện mô hình từ đầu (No Scratch-Training)',
      description:
        'Cuộc thi không yêu cầu bạn phải huấn luyện mô hình nền tảng từ đầu. Hãy tận dụng sức mạnh của các Foundation Models sẵn có để tập trung nguồn lực phát triển sản phẩm MVP trong 3 tuần.',
    },
    {
      title: 'Ưu tiên hạ tầng Free-Tier & Chi phí bền vững',
      description:
        'Khuyến khích khai thác tối đa các nền tảng có gói miễn phí (Free Tier) hoặc mã nguồn mở để giải pháp có thể dễ dàng vận hành và nhân rộng sau cuộc thi.',
    },
  ],
  techGroups: [
    {
      groupTitle: 'Mô hình AI & API dịch vụ',
      groupDescription: 'Các API mô hình ngôn ngữ lớn và đa phương tiện hàng đầu với tốc độ cao và chi phí tối ưu.',
      tools: [
        {
          name: 'Google Gemini (1.5 Flash / Pro)',
          badge: 'Free Tier Hào Phóng',
          description: 'Hỗ trợ Context Window lên đến 1M tokens, multimodal xử lý văn bản, hình ảnh, âm thanh qua Google AI Studio.',
          isFreeTierHighlighted: true,
        },
        {
          name: 'Groq Cloud (Llama 3 & Mixtral)',
          badge: 'Tốc độ cực cao',
          description: 'Tốc độ suy luận hàng trăm tokens/giây với gói sử dụng miễn phí lý tưởng cho demo thời gian thực.',
          isFreeTierHighlighted: true,
        },
        {
          name: 'OpenAI (GPT-4o mini / GPT-4o)',
          badge: 'Phổ biến & Chuẩn mực',
          description: 'Hỗ trợ Function Calling, Structured JSON Outputs và cộng đồng tài liệu phong phú.',
          isFreeTierHighlighted: false,
        },
        {
          name: 'Anthropic Claude (3.5 Sonnet)',
          badge: 'Tư duy logic & Code đỉnh cao',
          description: 'Khả năng phân tích mã nguồn và xử lý các bài toán logic phức tạp chuẩn xác.',
          isFreeTierHighlighted: false,
        },
      ],
    },
    {
      groupTitle: 'Frameworks, Agentic & RAG Pipeline',
      groupDescription: 'Các công cụ xâu chuỗi luồng xử lý và kết nối cơ sở tri thức nghiệp vụ.',
      tools: [
        {
          name: 'LangChain / LangGraph',
          badge: 'Multi-Agent',
          description: 'Xây dựng luồng tác vụ phức tạp với trạng thái và khả năng tự phục hồi lỗi.',
          isFreeTierHighlighted: true,
        },
        {
          name: 'LlamaIndex',
          badge: 'Tối ưu RAG',
          description: 'Chuyên biệt cho việc đánh chỉ mục, kết nối tài liệu và truy xuất dữ liệu nghiệp vụ.',
          isFreeTierHighlighted: true,
        },
        {
          name: 'Vercel AI SDK',
          badge: 'Full-stack AI',
          description: 'Thư viện mã nguồn mở hỗ trợ streaming UI thời gian thực trên React/Next.js.',
          isFreeTierHighlighted: true,
        },
        {
          name: 'Supabase pgvector / ChromaDB',
          badge: 'Vector Search',
          description: 'Lưu trữ và tìm kiếm vector ngữ nghĩa đơn giản, chi phí 0đ cho giai đoạn thử nghiệm.',
          isFreeTierHighlighted: true,
        },
      ],
    },
    {
      groupTitle: 'Hạ tầng triển khai & Lưu trữ mã nguồn',
      groupDescription: 'Các nền tảng đám mây triển khai sản phẩm nhanh chóng không tốn phí duy trì ban đầu.',
      tools: [
        {
          name: 'Vercel / Netlify',
          badge: 'Frontend Hosting',
          description: 'Triển khai giao diện web chỉ với một cú nhấp chuột từ kho GitHub.',
          isFreeTierHighlighted: true,
        },
        {
          name: 'Render / Railway',
          badge: 'Backend Services',
          description: 'Chạy các backend FastAPI/Node.js kèm container linh hoạt.',
          isFreeTierHighlighted: true,
        },
        {
          name: 'Hugging Face Spaces',
          badge: 'AI Prototype',
          description: 'Chia sẻ các bản demo Gradio/Streamlit nhanh chóng cho ban giám khảo trải nghiệm.',
          isFreeTierHighlighted: true,
        },
      ],
    },
  ],
  importantNotice:
    'Ban Tổ chức đánh giá cao tư duy kiến trúc hệ thống, khả năng kiểm soát độ chính xác (Grounding) và trải nghiệm người dùng hơn là số lượng tham số phần cứng bạn sử dụng.',
};
