import React from 'react';
import ProfileCard from './ProfileCard';
import FoldText from './FoldText';
import BorderGlow from './BorderGlow';
import { Handshake, Sparkles, Building2, ShieldCheck, Mail } from 'lucide-react';

interface ProfileItem {
  name: string;
  title: string;
  handle: string;
  status: string;
  statusColor: string;
  contactText: string;
  avatarUrl: string;
  iconUrl: string;
}

const PROFILES: ProfileItem[] = [
  {
    name: 'TS. Lê Hoàng Nam',
    title: 'Trưởng Ban Cố Vấn Học Thuật & AI',
    handle: 'nam.le',
    status: 'Cố vấn chuyên môn',
    statusColor: '#22c55e',
    contactText: 'Liên hệ',
    avatarUrl: '/assets/profiles/avatar-academic.svg',
    iconUrl: '/assets/profiles/holo-pattern.svg',
  },
  {
    name: 'Nguyễn Quốc Bảo',
    title: 'AI Tech Lead & Mentor Kỹ Thuật',
    handle: 'bao.ai',
    status: 'Mentor 1-1',
    statusColor: '#8261f6',
    contactText: 'Cố vấn',
    avatarUrl: '/assets/profiles/avatar-tech.svg',
    iconUrl: '/assets/profiles/holo-pattern.svg',
  },
  {
    name: 'Trần Minh Anh',
    title: 'Head of Product & UX Mentor',
    handle: 'minhanh.ux',
    status: 'Cố vấn MVP',
    statusColor: '#38bdf8',
    contactText: 'Cố vấn',
    avatarUrl: '/assets/profiles/avatar-product.svg',
    iconUrl: '/assets/profiles/holo-pattern.svg',
  },
  {
    name: 'Doanh Nghiệp Đặt Bài Toán',
    title: 'Đối Tác Đồng Hành & Tài Trợ',
    handle: 'partner.slot',
    status: 'Tiếp nhận đăng ký',
    statusColor: '#f59e0b',
    contactText: 'Đồng hành',
    avatarUrl: '/assets/profiles/avatar-enterprise.svg',
    iconUrl: '/assets/profiles/holo-pattern.svg',
  },
];

export const OrganizersPartnersSection: React.FC = () => {
  return (
    <section className="sec container" id="partners" aria-labelledby="partners-head">
      {/* Section Heading */}
      <div className="sec__head text-center mx-auto max-w-3xl">
        <span className="pill mb-4 inline-flex items-center gap-1.5 text-xs text-accent">
          <ShieldCheck className="w-3.5 h-3.5" />
          Hội đồng chuyên môn & Mạng lưới đối tác
        </span>
        <h2 id="partners-head">
          <FoldText
            text="Đội ngũ cố vấn & Mạng lưới đối tác"
            foldStyle="paper"
            splitBy="word"
            hinge="top"
            trigger="scroll"
            foldAngle={90}
            duration={0.65}
            stagger={0.04}
            ease="power3.out"
            hoverRefold={true}
            refoldRadius={120}
            refoldAngle={35}
            perspective={700}
            creaseShading={0.4}
            fontSize="inherit"
            fontWeight="inherit"
            color="inherit"
          />
        </h2>
        <p className="lead">
          Đội ngũ chuyên gia công nghệ, cố vấn học thuật từ viện trường và các doanh nghiệp tiên phong đồng hành hỗ trợ trực tiếp các đội thi trong suốt 03 tuần.
        </p>
      </div>

      {/* Profile Cards Grid (React Bits ProfileCard) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center mt-12">
        {PROFILES.map((p, idx) => (
          <div key={idx} className="w-full flex justify-center">
            <ProfileCard
              name={p.name}
              title={p.title}
              handle={p.handle}
              status={p.status}
              statusColor={p.statusColor}
              contactText={p.contactText}
              avatarUrl={p.avatarUrl}
              iconUrl={p.iconUrl}
              holo={0.85}
              glare={0.55}
              tiltStrength={12}
              parallax={7}
              radius={18}
              enableTilt={true}
              intro={true}
              showUserInfo={true}
              theme="dark"
              className="w-full max-w-[320px]"
              onContactClick={() => {
                const reg = document.getElementById('register');
                if (reg) reg.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </div>
        ))}
      </div>

      {/* Enterprise Partnership Invitation Panel */}
      <div className="mt-12">
        <BorderGlow
          backgroundColor="#12111d"
          borderRadius={24}
          glowRadius={42}
          glowIntensity={1.1}
          edgeSensitivity={30}
          colors={['#f59e0b', '#8261f6', '#4378ff']}
          glowColor="255 85 70"
        >
          <div className="p-7 sm:p-9 bg-paper-card rounded-[24px] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Proposition */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Building2 className="w-4 h-4" />
                </span>
                <span className="pill text-[11px] text-amber-400 border-amber-500/30 bg-amber-500/10">
                  Doanh nghiệp & Đơn vị đồng hành
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                Đưa bài toán thực tế của doanh nghiệp đến thế hệ tài năng AI trẻ
              </h3>

              <p className="text-sm text-muted leading-relaxed max-w-2xl">
                Cùng AI Buildathon 2026 kiến tạo sản phẩm AI giải quyết bài toán nghiệp vụ thật. Doanh nghiệp tham gia với tư cách <strong>Đơn vị đặt đề bài</strong>, <strong>Cố vấn chuyên môn (Mentor)</strong> hoặc <strong>Nhà tài trợ</strong> sẽ tiếp cận sớm các ý tưởng đột phá và nguồn nhân lực tài năng.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-muted">
                <span className="flex items-center gap-1.5 text-accent font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  Đang tiếp nhận đăng ký đồng hành
                </span>
                <span>·</span>
                <span>Danh sách đối tác chính thức đang cập nhật</span>
              </div>
            </div>

            {/* Right Column: CTA Actions */}
            <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
              <a
                href="#register"
                className="btn btn--primary w-full justify-center text-center py-3.5 flex items-center gap-2 shadow-lg shadow-accent/20"
              >
                <Handshake className="w-4 h-4" />
                <span>Trở thành đối tác đồng hành</span>
              </a>
              <a
                href="mailto:btc@aibuildathon.vn"
                className="btn btn--secondary w-full justify-center text-center py-3 flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Gửi thư hợp tác (btc@aibuildathon.vn)</span>
              </a>
            </div>
          </div>
        </BorderGlow>
      </div>
    </section>
  );
};

export default OrganizersPartnersSection;
