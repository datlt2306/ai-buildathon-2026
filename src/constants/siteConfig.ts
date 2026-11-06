import { HeroData, FinalCtaData } from '../types/sections';
import { SocialLink } from '../types/common';

export const siteConfig = {
  name: 'AI INNOVATION CHALLENGE 2026',
  tagline: 'FROM REAL PROBLEMS TO REAL AI PRODUCTS',
  description:
    'Sân chơi công nghệ kết nối Nhà trường, Sinh viên và Doanh nghiệp trong hành trình 3 tuần biến bài toán kinh doanh thực tế thành sản phẩm AI ứng dụng có giá trị đo lường được.',
  url: 'https://aiinnovationchallenge.vn',
  ogImage: 'https://aiinnovationchallenge.vn/og-image.png',
  event: {
    startDate: '2026-11-15T08:00:00+07:00',
    endDate: '2026-12-06T18:00:00+07:00',
    durationWeeks: 3,
    location: 'Hội trường Đổi Mới Sáng Tạo & Nền tảng Trực tuyến',
    format: 'Hybrid (Trực tiếp & Trực tuyến)',
    fee: 'Chủ động lựa chọn công cụ & công nghệ',
    status: 'Đang mở cổng tiếp nhận đăng ký',
  },
  contact: {
    email: 'contact@aiinnovationchallenge.vn',
    supportHotline: '1900 xxxx (Đang cập nhật)',
    address: 'Hà Nội & TP. Hồ Chí Minh, Việt Nam',
  },
  socialLinks: [
    {
      platform: 'facebook',
      label: 'Facebook Fanpage',
      url: 'https://facebook.com/aiinnovationchallenge',
      iconName: 'Facebook',
    },
    {
      platform: 'linkedin',
      label: 'LinkedIn Community',
      url: 'https://linkedin.com/company/aiinnovationchallenge',
      iconName: 'Linkedin',
    },
    {
      platform: 'github',
      label: 'GitHub Organization',
      url: 'https://github.com/aiinnovationchallenge',
      iconName: 'Github',
    },
    {
      platform: 'email',
      label: 'Email liên hệ',
      url: 'mailto:contact@aiinnovationchallenge.vn',
      iconName: 'Mail',
    },
  ] as SocialLink[],
};

export const heroContent: HeroData = {
  eyebrow: '⚡ AI INNOVATION CHALLENGE 2026',
  headingLine1: 'REAL PROBLEMS. REAL PEOPLE.',
  headingLine2: 'REAL AI SOLUTIONS.',
  subheading:
    'Sân chơi công nghệ kết nối Nhà trường, Sinh viên và Doanh nghiệp trong hành trình 3 tuần biến bài toán kinh doanh thực tế thành sản phẩm AI ứng dụng có giá trị đo lường được.',
  primaryCtaText: 'Khám phá chương trình',
  primaryCtaTarget: '#the-idea',
  secondaryCtaText: 'Trở thành đối tác đồng hành',
  secondaryCtaTarget: '#stakeholders',
  metricBadges: [
    { label: 'Hành trình', value: '03 Tuần', description: 'Tăng tốc phát triển MVP' },
    { label: 'Nguồn bài toán', value: '100%', description: 'Đề bài từ doanh nghiệp thực tế' },
    { label: 'Cố vấn chuyên môn', value: '1 : 1', description: 'Đồng hành cùng Tech Lead' },
    { label: 'Công nghệ & Công cụ', value: 'Tự chọn', description: 'Sinh viên tự do lựa chọn' },
  ],
};

export const finalCtaContent: FinalCtaData = {
  eyebrow: 'THỜI KHẮC CỦA BẠN ĐÃ ĐẾN',
  heading: "LET'S BUILD THE FUTURE WITH AI",
  subheading:
    'Dù bạn là sinh viên khao khát khẳng định năng lực, doanh nghiệp tìm kiếm lời giải đột phá, hay nhà trường hướng tới kết nối thực tiễn — luôn có vị trí dành riêng cho bạn trong liên minh đổi mới sáng tạo này.',
  studentCta: {
    label: 'Đăng ký tham gia ngay (Sinh viên)',
    subtitle: 'Trưởng nhóm đăng ký thông tin đội thi (~3 thành viên)',
  },
  businessCta: {
    label: 'Đồng hành cùng chương trình (Doanh nghiệp)',
    subtitle: 'Đặt đề bài thực tế & cử cố vấn chuyên gia',
  },
  educationCta: {
    label: 'Hợp tác đào tạo (Nhà trường)',
    subtitle: 'Kết nối đào tạo lý thuyết với thực tiễn thị trường',
  },
};
