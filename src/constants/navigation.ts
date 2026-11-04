import { NavItem } from '../types/common';

export const mainNavLinks: NavItem[] = [
  { id: 'nav-overview', label: 'Tổng quan', href: '#the-idea' },
  { id: 'nav-students', label: 'Dành cho sinh viên', href: '#students' },
  { id: 'nav-business', label: 'Dành cho doanh nghiệp', href: '#business' },
  { id: 'nav-education', label: 'Dành cho nhà trường', href: '#education' },
  { id: 'nav-timeline', label: 'Lộ trình', href: '#timeline' },
  { id: 'nav-challenges', label: 'Bài toán', href: '#challenges' },
  { id: 'nav-partners', label: 'Đối tác', href: '#partners' },
  { id: 'nav-faq', label: 'FAQ', href: '#faq' },
];

export const footerNavGroups = [
  {
    title: 'Chương trình',
    links: [
      { label: 'Tổng quan sáng kiến', href: '#the-idea' },
      { label: 'Lộ trình 3 tuần', href: '#timeline' },
      { label: 'Lĩnh vực bài toán', href: '#challenges' },
      { label: 'Tiêu chí đánh giá', href: '#evaluation' },
      { label: 'Quyền lợi & Giải thưởng', href: '#awards' },
    ],
  },
  {
    title: 'Đối tượng tham gia',
    links: [
      { label: 'Dành cho Sinh viên', href: '#students' },
      { label: 'Dành cho Doanh nghiệp', href: '#business' },
      { label: 'Dành cho Nhà trường', href: '#education' },
      { label: 'Đăng ký làm Mentor', href: '#partners' },
    ],
  },
  {
    title: 'Hỗ trợ & Tài nguyên',
    links: [
      { label: 'Hướng dẫn công nghệ Build With AI', href: '#build-with-ai' },
      { label: 'Câu hỏi thường gặp (FAQ)', href: '#faq' },
      { label: 'Quy định bảo mật dữ liệu', href: '#faq' },
    ],
  },
];
