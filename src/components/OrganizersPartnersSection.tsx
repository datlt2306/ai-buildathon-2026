import React from 'react';
import ProfileCard from './ProfileCard';
import FoldText from './FoldText';
import BorderGlow from './BorderGlow';
import { Building2, ShieldCheck, CheckCircle2, GraduationCap } from 'lucide-react';

interface ProfileItem {
  name: string;
  title: string;
  roleLabel: string;
  roleBadge: string;
  status: string;
  statusColor: string;
  avatarUrl: string;
  iconUrl: string;
}

const PROFILES: ProfileItem[] = [
  {
    name: 'Đại diện Ban tổ chức',
    title: 'Điều phối chương trình và tổ chức cuộc thi',
    roleLabel: 'Điều phối chương trình',
    roleBadge: 'Ban Tổ Chức',
    status: 'FPT Polytechnic Hà Nội',
    statusColor: '#8261f6',
    avatarUrl: '/assets/profiles/avatar-academic.svg',
    iconUrl: '/assets/profiles/holo-pattern.svg',
  },
  {
    name: 'Đại diện Ban tổ chức',
    title: 'Phụ trách chuyên môn và kỹ thuật',
    roleLabel: 'Chuyên môn & Kỹ thuật',
    roleBadge: 'Ban Tổ Chức',
    status: 'FPT Polytechnic Hà Nội',
    statusColor: '#38bdf8',
    avatarUrl: '/assets/profiles/avatar-tech.svg',
    iconUrl: '/assets/profiles/holo-pattern.svg',
  },
  {
    name: 'Đại diện Ban tổ chức',
    title: 'Hỗ trợ đội thi và kết nối hoạt động',
    roleLabel: 'Hỗ trợ đội thi',
    roleBadge: 'Ban Tổ Chức',
    status: 'FPT Polytechnic Hà Nội',
    statusColor: '#22c55e',
    avatarUrl: '/assets/profiles/avatar-product.svg',
    iconUrl: '/assets/profiles/holo-pattern.svg',
  },
  {
    name: 'Doanh nghiệp đồng hành',
    title: 'Chia sẻ bài toán nghiệp vụ HR Admin và đồng hành chuyên môn',
    roleLabel: 'Đồng hành chuyên môn',
    roleBadge: 'Doanh Nghiệp',
    status: 'Đang cập nhật danh tính',
    statusColor: '#f59e0b',
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
          Đơn vị tổ chức & Đối tác chuyên môn
        </span>
        <h2 id="partners-head">
          <FoldText
            text="Ban tổ chức & Doanh nghiệp đồng hành"
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
          Những người đứng sau AI Buildathon 2026, cùng kết nối sinh viên, doanh nghiệp và các bài toán thực tế để tạo nên một sân chơi công nghệ ý nghĩa.
        </p>
      </div>

      {/* Profile Cards Grid (React Bits ProfileCard) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center mt-12">
        {PROFILES.map((p, idx) => (
          <div key={idx} className="w-full flex justify-center">
            <ProfileCard
              name={p.name}
              title={p.title}
              roleLabel={p.roleLabel}
              roleBadge={p.roleBadge}
              status={p.status}
              statusColor={p.statusColor}
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
            />
          </div>
        ))}
      </div>

      {/* Roles & Collaboration Framework Panel */}
      <div className="mt-12">
        <BorderGlow
          backgroundColor="#12111d"
          borderRadius={24}
          glowRadius={42}
          glowIntensity={1.1}
          edgeSensitivity={30}
          colors={['#8261f6', '#4378ff', '#f59e0b']}
          glowColor="255 85 70"
        >
          <div className="p-7 sm:p-9 bg-paper-card rounded-[24px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Role 1: Ban Tổ Chức (FPT Polytechnic Hà Nội) */}
              <div className="space-y-3.5 p-6 rounded-2xl bg-paper/60 border border-rule-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
                      <GraduationCap className="w-4 h-4" />
                    </span>
                    <span className="pill text-[11px] text-accent border-accent/30 bg-accent/10 font-semibold">
                      Vai trò của Ban tổ chức
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                    FPT Polytechnic Hà Nội – Đơn vị sáng lập & Tổ chức
                  </h3>

                  <ul className="mt-3 space-y-2 text-xs text-muted leading-relaxed">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                      <span><strong>Khởi xướng & điều phối:</strong> Xây dựng thể lệ, quản lý toàn bộ các cột mốc từ Kickoff đến Chung kết.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                      <span><strong>Đào tạo & hỗ trợ kỹ thuật:</strong> Tổ chức các buổi Seminar/Workshop trang bị kỹ năng Vibe Coding và AI Coding Agents.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                      <span><strong>Kết nối & bảo trợ:</strong> Đồng hành giải đáp thắc mắc, ghép đội sinh viên và bảo trợ chuyên môn cho các sản phẩm.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-3 border-t border-rule text-[11px] text-muted">
                  📍 Địa điểm tổ chức: FPT Polytechnic cơ sở Hà Nội
                </div>
              </div>

              {/* Role 2: Doanh Nghiệp Đồng Hành */}
              <div className="space-y-3.5 p-6 rounded-2xl bg-paper/60 border border-rule-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <Building2 className="w-4 h-4" />
                    </span>
                    <span className="pill text-[11px] text-amber-400 border-amber-500/30 bg-amber-500/10 font-semibold">
                      Vai trò của Doanh nghiệp đồng hành
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                    Doanh nghiệp đối tác – Đồng hành bối cảnh & Đánh giá thực tế
                  </h3>

                  <ul className="mt-3 space-y-2 text-xs text-muted leading-relaxed">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Cung cấp bài toán nghiệp vụ:</strong> Đưa ra bối cảnh và các Pain Point thực tế trong quản lý hành chính nhân sự.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Định hướng bài toán:</strong> Trực tiếp giải đáp thắc mắc nghiệp vụ cho sinh viên tại buổi Kickoff & Orientation.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Hội đồng chuyên môn:</strong> Tham gia đánh giá sản phẩm MVP Vòng 1 và chấm thi tại Vòng chung kết (Final Pitch).</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-3 border-t border-rule text-[11px] text-muted flex items-center gap-1.5">
                  <span className="text-amber-400">🤝</span>
                  <span>Đồng hành xuyên suốt từ khi công bố đề tài đến ngày Demo Day</span>
                </div>
              </div>
            </div>
          </div>
        </BorderGlow>
      </div>
    </section>
  );
};

export default OrganizersPartnersSection;
