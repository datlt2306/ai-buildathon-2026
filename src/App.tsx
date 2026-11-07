import React, { useRef } from 'react';
import { HeroLanyardPass } from './components/HeroLanyardPass';
import { ChallengeTour } from './components/ChallengeTour';
import { StudentRegistrationSection } from './components/StudentRegistrationSection';
import DotGrid from './components/DotGrid';
import BorderGlow from './components/BorderGlow';
import AnimatedContent from './components/AnimatedContent';
import LaserFlow from './components/LaserFlow';
import FoldText from './components/FoldText';
import SprintTimeline from './components/SprintTimeline';
import OrganizersPartnersSection from './components/OrganizersPartnersSection';
import { Mail, Code2, Palette, TrendingUp, Sparkles, Bot, Cpu, CheckCircle2, Trophy, Medal, Award, Lightbulb } from 'lucide-react';

export const App: React.FC = () => {
  const footerContactRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      num: '01',
      title: 'Làm việc cùng đồng đội',
      desc: 'Rủ bạn bè cùng lớp lập nhóm 3 hoặc 4 thành viên để đăng ký tham gia và cùng nhau phát triển sản phẩm.',
    },
    {
      num: '02',
      title: 'Tiếp cận bài toán thực tế',
      desc: 'Nhận bối cảnh hoạt động và các Pain Point thực tế trong quản lý hành chính nhân sự từ doanh nghiệp đồng hành.',
    },
    {
      num: '03',
      title: 'Sử dụng AI để phát triển sản phẩm',
      desc: 'Thực hành dùng AI Coding Agents và phương pháp Vibe Coding để hỗ trợ biến ý tưởng thành sản phẩm phần mềm chạy được.',
    },
    {
      num: '04',
      title: 'Demo và giới thiệu sản phẩm',
      desc: 'Trình diễn sản phẩm MVP trước hội đồng chuyên môn, nhận đánh giá thực tế và bổ sung dự án vào Portfolio cá nhân.',
    },
  ];

  const capabilityGroups = [
    {
      icon: Code2,
      title: 'Lập trình và phát triển',
      desc: 'Có kiến thức về Web, Java, PHP, Mobile hoặc lập trình ứng dụng để xây dựng giao diện, xử lý chức năng và kết nối công cụ.',
      tag: 'Lập trình & Phát triển',
    },
    {
      icon: Sparkles,
      title: 'AI và công cụ công nghệ',
      desc: 'Biết sử dụng ChatGPT, Gemini, AI Coding Agents hoặc muốn tìm hiểu cách ứng dụng AI hỗ trợ phân tích và phát triển sản phẩm.',
      tag: 'Khai thác công cụ AI',
    },
    {
      icon: Palette,
      title: 'Thiết kế và trải nghiệm',
      desc: 'Có khả năng thiết kế giao diện Figma, tối ưu luồng thao tác UI/UX trực quan và xây dựng slide thuyết trình cuốn hút.',
      tag: 'Thiết kế & Trải nghiệm',
    },
    {
      icon: TrendingUp,
      title: 'Phân tích nghiệp vụ và tổ chức',
      desc: 'Có khả năng tìm hiểu vấn đề, phân tích yêu cầu, sắp xếp kế hoạch nhóm, kiểm thử sản phẩm và thuyết trình.',
      tag: 'Ý tưởng & Tổ chức',
    },
  ];

  return (
    <div className="min-h-screen bg-paper text-ink font-body selection:bg-accent-soft selection:text-ink">
      {/* Skip link */}
      <a href="#main" className="skip">
        Chuyển đến nội dung chính
      </a>

      {/* Navigation (Ribbon edge-aligned) */}
      <header className="nav">
        <div className="container nav__bar">
          <a className="wordmark flex items-center gap-2.5" href="#top" aria-label="AI Buildathon 2026, về đầu trang">
            <span className="wordmark__ring" aria-hidden="true" />
            <div className="flex flex-col text-left">
              <span className="font-bold text-ink leading-tight text-sm">AI Buildathon 2026</span>
              <span className="text-[10px] text-accent font-semibold leading-none tracking-tight">Bộ môn CNTT - FPT Polytechnic Hà Nội</span>
            </div>
          </a>
          <nav aria-label="Điều hướng chính">
            <ul className="nav__links" role="list">
              <li><a href="#what">Cuộc thi có gì</a></li>
              <li><a href="#awards">Giải thưởng</a></li>
              <li><a href="#no-expert">Thế mạnh của bạn</a></li>
              <li><a href="#vibe-coding">Vận dụng AI</a></li>
              <li><a href="#challenges">Bạn sẽ xây gì?</a></li>
              <li><a href="#timeline">Lịch trình</a></li>
              <li><a href="#partners">Cố vấn & Đối tác</a></li>
            </ul>
          </nav>
          <a className="btn btn--small btn--primary" href="#register">
            Đăng ký tham gia
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main id="main">
        {/* ========================================================================= */}
        {/* SECTION 1: HERO (Ribbon Stage over the night)                             */}
        {/* ========================================================================= */}
        <section className="hero" id="top" aria-labelledby="hero-head">
          <div className="night" aria-hidden="true">
            <DotGrid
              className="absolute inset-0 z-0"
              baseColor="#1d1b33"
              activeColor="#8261f6"
              shape="circle"
              dotSize={2}
              gap={20}
              proximity={160}
              strength={1.2}
              bounce={0.6}
              tension={0.4}
              returnDuration={0.8}
              shockRadius={320}
              shockStrength={5}
              swell={0.8}
              stretch={0.5}
              glow={0.6}
              fade={0.25}
              intro={false}
            />
          </div>

          <div className="container hero__grid">
            <AnimatedContent className="hero__text" distance={35} duration={0.8} stagger={0.08} trigger="mount">
              <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-semibold mb-3">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span>AI BUILDATHON 2026 · Bộ môn CNTT - FPT POLYTECHNIC HÀ NỘI</span>
              </div>

              <h1 id="hero-head" className="tracking-tight text-white">
                Dùng AI, giải bài toán nhân sự thực tế!
              </h1>

              <p className="lead">
                Cùng đồng đội xây dựng Website/Web App giải quyết các vấn đề trong quản lý hành chính nhân sự. Sử dụng AI hỗ trợ lập trình và phát triển sản phẩm trong 3 tuần.
              </p>

              <div className="actions">
                <a href="#register" className="btn btn--primary">
                  Đăng ký tham gia ngay
                </a>
                <a href="#vibe-coding" className="btn btn--secondary">
                  Tìm hiểu cách dùng AI
                </a>
              </div>

              <p className="hero__fine">3 tuần thực chiến · 3–4 bạn/đội · Doanh nghiệp đồng hành · Tự do chọn công nghệ</p>
            </AnimatedContent>

            <HeroLanyardPass />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: CUỘC THI NÀY CÓ GÌ? (4 Trải nghiệm cốt lõi)                   */}
        {/* ========================================================================= */}
        <section className="sec container relative overflow-hidden" id="what">
          {/* Plus Crosshair Mesh Overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-10 [mask-image:radial-gradient(ellipse_65%_55%_at_50%_50%,#000_65%,transparent_100%)]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 13v6m-3-3h6' stroke='%238261f6' stroke-width='1.2' stroke-linecap='round'/%3E%3C/svg%3E")`,
              backgroundSize: '22px 22px',
            }}
            aria-hidden="true"
          />
          <div className="relative z-10">
            <AnimatedContent distance={30} duration={0.7} threshold={0.15}>
              <div className="sec__head mx-auto text-center">
                <h2>
                  <FoldText
                    text="Cuộc thi này có gì?"
                    foldStyle="paper"
                    splitBy="word"
                    hinge="top"
                    trigger="scroll"
                    foldAngle={90}
                    duration={0.65}
                    stagger={0.05}
                    ease="power3.out"
                    hoverRefold={true}
                    refoldRadius={120}
                    refoldAngle={35}
                    perspective={700}
                    creaseShading={0.4}
                    fontSize="inherit"
                    fontWeight={700}
                    color="inherit"
                  />
                </h2>
                <p className="lead max-w-2xl mx-auto">
                  4 trải nghiệm thực tế bạn sẽ cùng đồng đội trải qua trong hành trình 3 tuần:
                </p>
              </div>
            </AnimatedContent>

            <AnimatedContent distance={40} duration={0.8} stagger={0.1} threshold={0.1}>
              <ul className="step-list" role="list">
                {steps.map((st) => (
                  <li key={st.num} className="step-row">
                    <span className="step-num">{st.num}</span>
                    <div className="step-body">
                      <h3>{st.title}</h3>
                      <p>{st.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </AnimatedContent>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: CƠ CẤU GIẢI THƯỞNG (Awards)                                    */}
        {/* ========================================================================= */}
        <section className="sec container relative overflow-hidden" id="awards">
          {/* Ambient Spotlight Top Glow */}
          <div
            className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-gradient-to-b from-amber-500/15 via-accent/10 to-transparent rounded-full blur-[120px] z-0"
            aria-hidden="true"
          />
          {/* Subtle Precision Grid Overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-15 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_35%,#000_50%,transparent_100%)]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(245, 158, 11, 0.12) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(130, 97, 246, 0.12) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
            aria-hidden="true"
          />
          <div className="relative z-10">
          <AnimatedContent distance={30} duration={0.7} threshold={0.15}>
            <div className="sec__head mx-auto text-center">
              <span className="pill pill--on mb-3 inline-block">Cơ cấu giải thưởng</span>
              <h2>
                <FoldText
                  text="Giải thưởng AI Buildathon 2026"
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
                  fontWeight={700}
                  color="inherit"
                />
              </h2>
              <p className="lead max-w-2xl mx-auto">
                Cùng đồng đội tạo sản phẩm thực tế, thể hiện khả năng giải quyết vấn đề và tranh tài để chinh phục các giải thưởng.
              </p>
            </div>
          </AnimatedContent>

          <AnimatedContent distance={40} duration={0.8} stagger={0.12} threshold={0.1}>
            {/* Top 3 Main Awards Podium */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mt-10">
              {/* Giải Nhất - Gold / Champion */}
              <BorderGlow
                backgroundColor="#12111d"
                borderRadius={24}
                glowRadius={44}
                glowIntensity={1.2}
                edgeSensitivity={28}
                colors={['#f59e0b', '#fbbf24', '#d97706']}
                glowColor="245 158 11"
                className="h-full md:order-2 md:-translate-y-2"
              >
                <div className="p-7 sm:p-8 flex flex-col justify-between h-full bg-paper-card rounded-[24px] border border-amber-500/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-rule-2 mb-6">
                      <div className="flex items-center gap-2.5">
                        <span className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/10">
                          <Trophy className="w-5 h-5 text-amber-300" />
                        </span>
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400/90 block">Quán Quân</span>
                          <h3 className="text-2xl font-black text-white tracking-tight leading-none">Giải Nhất</h3>
                        </div>
                      </div>
                      <span className="pill text-[11px] text-amber-300 bg-amber-500/15 border border-amber-500/40 font-semibold">
                        01 đội
                      </span>
                    </div>

                    <div className="my-6">
                      <span className="text-xs text-muted block mb-1">Giá trị giải thưởng</span>
                      <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 tracking-tight font-mono">
                        1.500.000 <span className="text-lg text-amber-400 font-sans font-bold">VNĐ</span>
                      </div>
                    </div>

                    <p className="text-xs text-muted leading-relaxed">
                      Dành cho đội thi có sản phẩm MVP hoàn thiện xuất sắc nhất, giải quyết trọn vẹn Pain Point nghiệp vụ thực tế và trình diễn thuyết phục trước Hội đồng.
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-rule-2 flex items-center justify-between text-xs text-amber-400 font-medium">
                    <span>Hạng mục cao nhất</span>
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  </div>
                </div>
              </BorderGlow>

              {/* Giải Nhì - Silver / Runner-up */}
              <BorderGlow
                backgroundColor="#12111d"
                borderRadius={24}
                glowRadius={38}
                glowIntensity={0.9}
                edgeSensitivity={30}
                colors={['#94a3b8', '#38bdf8', '#64748b']}
                glowColor="56 189 248"
                className="h-full md:order-1"
              >
                <div className="p-7 sm:p-8 flex flex-col justify-between h-full bg-paper-card rounded-[24px]">
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-rule-2 mb-6">
                      <div className="flex items-center gap-2.5">
                        <span className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
                          <Medal className="w-5 h-5 text-sky-300" />
                        </span>
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400/90 block">Á Quân</span>
                          <h3 className="text-2xl font-bold text-white tracking-tight leading-none">Giải Nhì</h3>
                        </div>
                      </div>
                      <span className="pill text-[11px] text-sky-300 font-semibold">
                        01 đội
                      </span>
                    </div>

                    <div className="my-6">
                      <span className="text-xs text-muted block mb-1">Giá trị giải thưởng</span>
                      <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
                        1.000.000 <span className="text-lg text-muted font-sans font-medium">VNĐ</span>
                      </div>
                    </div>

                    <p className="text-xs text-muted leading-relaxed">
                      Dành cho đội thi có sản phẩm chất lượng cao, tính ứng dụng thực tiễn rõ nét và khả năng vận dụng AI hiệu quả trong quá trình phát triển.
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-rule-2 flex items-center justify-between text-xs text-muted">
                    <span>Hạng nhì chung cuộc</span>
                    <span className="w-2 h-2 rounded-full bg-sky-400" />
                  </div>
                </div>
              </BorderGlow>

              {/* Giải Ba - Bronze */}
              <BorderGlow
                backgroundColor="#12111d"
                borderRadius={24}
                glowRadius={38}
                glowIntensity={0.9}
                edgeSensitivity={30}
                colors={['#f97316', '#fb923c', '#ea580c']}
                glowColor="249 115 22"
                className="h-full md:order-3"
              >
                <div className="p-7 sm:p-8 flex flex-col justify-between h-full bg-paper-card rounded-[24px]">
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-rule-2 mb-6">
                      <div className="flex items-center gap-2.5">
                        <span className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400">
                          <Award className="w-5 h-5 text-orange-300" />
                        </span>
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400/90 block">Quý Quân</span>
                          <h3 className="text-2xl font-bold text-white tracking-tight leading-none">Giải Ba</h3>
                        </div>
                      </div>
                      <span className="pill text-[11px] text-orange-300 font-semibold">
                        01 đội
                      </span>
                    </div>

                    <div className="my-6">
                      <span className="text-xs text-muted block mb-1">Giá trị giải thưởng</span>
                      <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
                        700.000<span className="text-lg text-muted font-sans font-medium">VNĐ</span>
                      </div>
                    </div>

                    <p className="text-xs text-muted leading-relaxed">
                      Dành cho đội thi có giải pháp hoàn chỉnh, nỗ lực bứt phá và trình diễn tiềm năng ứng dụng thực tế trong quản lý hành chính nhân sự.
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-rule-2 flex items-center justify-between text-xs text-muted">
                    <span className="text-[11px] text-amber-400/90">Hạng 3 chung cuộc</span>
                    <span className="w-2 h-2 rounded-full bg-orange-400" />
                  </div>
                </div>
              </BorderGlow>
            </div>

            {/* Sub-awards: AI Solution & Innovation */}
            <div className="mt-8">
              <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-4 px-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span>Nhóm giải thưởng phụ & chuyên môn</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Giải AI Solution */}
                <div className="p-6 sm:p-7 rounded-2xl bg-paper border border-rule-2 hover:border-accent/40 transition-colors flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
                          <Bot className="w-4 h-4" />
                        </span>
                        <div>
                          <h4 className="text-lg font-bold text-white tracking-tight">Giải AI Solution</h4>
                          <p className="text-xs text-muted">Ứng dụng công nghệ AI hiệu quả</p>
                        </div>
                      </div>
                      <span className="pill text-[11px] text-accent font-semibold">
                        02 đội
                      </span>
                    </div>

                    <p className="text-xs text-muted leading-relaxed mb-4">
                      Trao tặng cho các đội thi có giải pháp tích hợp hoặc khai thác AI thông minh, giải quyết sắc bén tác vụ nghiệp vụ hành chính nhân sự.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-rule flex items-center justify-between">
                    <span className="text-xs text-muted">Giá trị giải thưởng:</span>
                    <span className="text-xl font-bold font-mono text-ink">
                      500.000 <span className="text-xs font-sans text-muted">VNĐ</span>
                    </span>
                  </div>
                </div>

                {/* Giải Innovation */}
                <div className="p-6 sm:p-7 rounded-2xl bg-paper border border-rule-2 hover:border-accent/40 transition-colors flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                          <Lightbulb className="w-4 h-4" />
                        </span>
                        <div>
                          <h4 className="text-lg font-bold text-white tracking-tight">Giải Innovation</h4>
                          <p className="text-xs text-muted">Ý tưởng sáng tạo & đột phá</p>
                        </div>
                      </div>
                      <span className="pill text-[11px] text-amber-300 font-semibold">
                        03 đội
                      </span>
                    </div>

                    <p className="text-xs text-muted leading-relaxed mb-4">
                      Trao tặng cho các đội thi có ý tưởng mới lạ, hướng tiếp cận bài toán độc đáo và trải nghiệm sản phẩm sáng tạo.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-rule flex items-center justify-between">
                    <span className="text-xs text-muted">Giá trị giải thưởng:</span>
                    <span className="text-xl font-bold font-mono text-ink">
                      300.000 <span className="text-xs font-sans text-muted">VNĐ</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </AnimatedContent>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: BẠN CÓ THẾ MẠNH GÌ? (4 Nhóm năng lực)                          */}
        {/* ========================================================================= */}
        <section className="sec container" id="no-expert">
          <AnimatedContent distance={30} duration={0.7} threshold={0.15}>
            <div className="sec__head mx-auto text-center">
              <h2>Bạn có thế mạnh gì? Đều có thể đóng góp!</h2>
              <p className="lead max-w-2xl mx-auto">
                Không cần một đội toàn những người giỏi lập trình hay chuyên sâu về AI. Một sản phẩm tốt cần sự kết hợp của nhiều nhóm năng lực khác nhau:
              </p>
            </div>
          </AnimatedContent>

          <AnimatedContent distance={50} duration={0.8} stagger={0.1} threshold={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {capabilityGroups.map((pt, idx) => {
                const Icon = pt.icon;
                return (
                  <BorderGlow
                    key={idx}
                    backgroundColor="#12111d"
                    borderRadius={24}
                    glowRadius={40}
                    glowIntensity={1.0}
                    edgeSensitivity={35}
                    colors={['#7c5dfa', '#4378ff', '#a588f6']}
                    glowColor="255 85 70"
                    className="h-full"
                  >
                    <div className="p-7 flex flex-col justify-between h-full bg-paper-card rounded-[24px]">
                      <div>
                        <div className="icon-box mb-6">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white tracking-tight leading-snug">{pt.title}</h3>
                        <p className="text-sm text-muted mt-3 leading-relaxed">{pt.desc}</p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-rule-2">
                        <span className="pill">{pt.tag}</span>
                      </div>
                    </div>
                  </BorderGlow>
                );
              })}
            </div>
          </AnimatedContent>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: PHƯƠNG PHÁP & CÔNG CỤ PHÁT TRIỂN (AI Coding & Vibe Coding)    */}
        {/* ========================================================================= */}
        <section className="sec container relative overflow-hidden" id="vibe-coding">
          {/* Precision Tech Grid Overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-15 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_50%,transparent_100%)]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(130, 97, 246, 0.15) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(67, 120, 255, 0.15) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
            aria-hidden="true"
          />
          <div className="relative z-10">
          <AnimatedContent distance={30} duration={0.7} threshold={0.15}>
            <div className="sec__head mx-auto text-center">
              <span className="pill pill--on mb-3 inline-block">Phương pháp phát triển</span>
              <h2>
                <FoldText
                  text="Vận dụng AI trong cuộc thi: Hai khía cạnh & Vibe Coding"
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
                  fontWeight={700}
                  color="inherit"
                />
              </h2>
              <p className="lead max-w-3xl mx-auto">
                AI không chỉ là tính năng trong sản phẩm, mà còn là trợ thủ đắc lực trong suốt quá trình xây dựng phần mềm từ con số 0.
              </p>
            </div>
          </AnimatedContent>

          <AnimatedContent distance={40} duration={0.8} stagger={0.15} threshold={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
              {/* Pillar A: AI in Product Development */}
              <BorderGlow
                backgroundColor="#12111d"
                borderRadius={24}
                glowRadius={42}
                glowIntensity={1.1}
                edgeSensitivity={30}
                colors={['#8261f6', '#4378ff', '#a588f6']}
                glowColor="255 85 70"
                className="h-full"
              >
                <div className="p-7 sm:p-8 flex flex-col justify-between h-full bg-paper-card rounded-[24px]">
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-rule-2 mb-5">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
                          <Bot className="w-4 h-4" />
                        </span>
                        <span className="font-bold text-white text-base">A. AI trong quá trình phát triển</span>
                      </div>
                      <span className="pill text-[11px] text-accent font-semibold">AI Coding Agents</span>
                    </div>

                    <p className="text-sm text-ink leading-relaxed">
                      Sinh viên được khuyến khích sử dụng các <strong className="text-white">AI Coding Agents</strong> (như <em>Google Antigravity, Cursor, Claude Code, Gemini CLI...</em>) để hỗ trợ toàn diện:
                    </p>

                    <ul className="mt-4 space-y-2 text-xs text-muted">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                        <span><strong>Phân tích yêu cầu:</strong> Làm rõ bối cảnh và quy trình nghiệp vụ HR.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                        <span><strong>Thiết kế giải pháp:</strong> Lên kiến trúc phần mềm, cấu trúc dữ liệu và mockup UI.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                        <span><strong>Sinh code & chức năng:</strong> Viết logic, tạo API và xây dựng màn hình tương tác.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                        <span><strong>Kiểm thử & sửa lỗi:</strong> Rà soát bug, gỡ lỗi và tối ưu hiệu năng sản phẩm.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Vibe Coding Explanation Callout */}
                  <div className="mt-6 p-4 rounded-xl bg-accent/10 border border-accent/30 space-y-1.5 text-xs">
                    <p className="text-accent font-semibold flex items-center gap-1.5">
                      <span>⚡</span>
                      <span>Hiểu đúng về phương pháp Vibe Coding</span>
                    </p>
                    <p className="text-muted leading-relaxed">
                      Vibe Coding là cách tiếp cận phát triển phần mềm bằng cách sử dụng AI để hỗ trợ chuyển yêu cầu và ý tưởng thành sản phẩm. <strong className="text-white">Người phát triển vẫn cần hiểu nghiệp vụ, kiểm tra kết quả, kiểm soát code và chịu trách nhiệm về phần mềm</strong> (không phải là tạo sản phẩm chỉ bằng vài câu lệnh mà không hiểu bản chất).
                    </p>
                  </div>
                </div>
              </BorderGlow>

              {/* Pillar B: AI inside Product */}
              <BorderGlow
                backgroundColor="#12111d"
                borderRadius={24}
                glowRadius={42}
                glowIntensity={1.1}
                edgeSensitivity={30}
                colors={['#4378ff', '#8261f6', '#38bdf8']}
                glowColor="255 85 70"
                className="h-full"
              >
                <div className="p-7 sm:p-8 flex flex-col justify-between h-full bg-paper-card rounded-[24px]">
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-rule-2 mb-5">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
                          <Cpu className="w-4 h-4" />
                        </span>
                        <span className="font-bold text-white text-base">B. AI trong chính sản phẩm</span>
                      </div>
                      <span className="pill text-[11px] text-sky-400 font-semibold">Tùy chọn theo bài toán</span>
                    </div>

                    <p className="text-sm text-ink leading-relaxed">
                      Nếu phù hợp với bài toán hành chính nhân sự đã chọn, đội thi có thể tích hợp AI vào tính năng sản phẩm:
                    </p>

                    <ul className="mt-4 space-y-2 text-xs text-muted">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 flex-shrink-0 mt-0.5" />
                        <span><strong>Trợ lý tra cứu:</strong> Giải đáp quy định, chính sách, sổ tay nhân sự nội bộ.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 flex-shrink-0 mt-0.5" />
                        <span><strong>Xử lý hồ sơ:</strong> Trích xuất dữ liệu từ CV ứng viên, ảnh chụp CCCD vào bảng tính.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 flex-shrink-0 mt-0.5" />
                        <span><strong>Phân loại đơn từ:</strong> Tự động điều phối đơn xin nghỉ, đề xuất thiết bị đến đúng người.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 flex-shrink-0 mt-0.5" />
                        <span><strong>Theo dõi & tổng hợp:</strong> Nhắc hạn hợp đồng lao động, tóm tắt dữ liệu chấm công.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Important Principles Note */}
                  <div className="mt-6 p-4 rounded-xl bg-paper border border-rule-2 space-y-1.5 text-xs">
                    <p className="text-white font-semibold flex items-center gap-1.5">
                      <span>📌</span>
                      <span>Lưu ý quan trọng về AI trong sản phẩm</span>
                    </p>
                    <p className="text-muted leading-relaxed">
                      <strong className="text-white">Không bắt buộc mọi sản phẩm phải tích hợp AI</strong> nếu bài toán chỉ cần một ứng dụng hoặc công cụ tự động hóa chuẩn mực. Cuộc thi cũng <strong className="text-white">không yêu cầu huấn luyện mô hình AI từ đầu</strong>.
                    </p>
                  </div>
                </div>
              </BorderGlow>
            </div>
          </AnimatedContent>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: BÀI TOÁN THỰC TẾ HR ADMIN (Challenge Tour)                    */}
        {/* ========================================================================= */}
        <section className="sec container" id="challenges">
          <AnimatedContent distance={30} duration={0.7} threshold={0.15}>
            <ChallengeTour />
          </AnimatedContent>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 6: LỊCH TRÌNH AI BUILDATHON 2026 (Timeline Strip & Tallies)       */}
        {/* ========================================================================= */}
        <section className="sec container relative overflow-hidden" id="timeline">
          {/* Diamond Mesh Overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-15 [mask-image:radial-gradient(ellipse_75%_55%_at_50%_50%,#000_50%,transparent_100%)]"
            style={{
              backgroundImage: `
                linear-gradient(45deg, rgba(130, 97, 246, 0.12) 1px, transparent 1px),
                linear-gradient(-45deg, rgba(130, 97, 246, 0.12) 1px, transparent 1px)
              `,
              backgroundSize: '36px 36px',
            }}
            aria-hidden="true"
          />
          <div className="relative z-10">
          <AnimatedContent distance={30} duration={0.7} threshold={0.15}>
            <div className="sec__head mx-auto text-center">
              <h2>
                <FoldText
                  text="Lịch trình AI Buildathon 2026"
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
                  fontWeight={700}
                  color="inherit"
                />
              </h2>
              <p className="lead max-w-2xl mx-auto">
                Theo dõi các cột mốc quan trọng từ khi phát động cuộc thi đến vòng chung kết.
              </p>
            </div>
          </AnimatedContent>

          <AnimatedContent distance={30} duration={0.7} threshold={0.15}>
            <SprintTimeline />
          </AnimatedContent>

          <AnimatedContent distance={35} duration={0.7} stagger={0.08} threshold={0.1}>
            <dl className="tally">
              <div>
                <dt>Thời gian tổ chức</dt>
                <dd className="num">09/11 <span className="c">– 02/12</span></dd>
              </div>
              <div>
                <dt>Đối tượng sinh viên</dt>
                <dd className="num">Kỳ 3 – 6 <span className="c">Poly HN</span></dd>
              </div>
              <div>
                <dt>Mỗi đội thi</dt>
                <dd className="num is-open">3 – 4 <span className="c">bạn</span></dd>
              </div>
              <div>
                <dt>Vòng chung kết</dt>
                <dd className="num">Top 8 <span className="c">đội</span></dd>
              </div>
            </dl>
          </AnimatedContent>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 7: ĐỘI NGŨ CỐ VẤN & MẠNG LƯỚI ĐỐI TÁC (ProfileCards)              */}
        {/* ========================================================================= */}
        <AnimatedContent distance={35} duration={0.8} threshold={0.1}>
          <OrganizersPartnersSection />
        </AnimatedContent>

        {/* ========================================================================= */}
        {/* SECTION 9: FORM ĐĂNG KÝ TRONG CLOSE BAND                                   */}
        {/* ========================================================================= */}
        <section className="close relative overflow-hidden" id="register" aria-labelledby="reg-head">
          {/* AI Dot Matrix Overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-25 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,#000_45%,transparent_100%)]"
            style={{
              backgroundImage: `radial-gradient(rgba(130, 97, 246, 0.45) 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
            aria-hidden="true"
          />
          <div className="container pb-16 relative z-10">
            <AnimatedContent distance={35} duration={0.8} threshold={0.1}>
              <StudentRegistrationSection />
            </AnimatedContent>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 10: CÂU HỎI THƯỜNG GẶP (FAQ)                                     */}
      </main>

      {/* ========================================================================= */}
      {/* FOOTER                                                                    */}
      {/* ========================================================================= */}
      <footer className="footer relative overflow-hidden">
        <LaserFlow
          surfaceRef={footerContactRef}
          color="#8261f6"
          beamPosition={0.5}
          intensity={2.2}
          flare={1.8}
          spread={1.8}
          spill={1.4}
          fog={0.35}
          dust={2.0}
          streaks={1.8}
          dots={1.2}
          pulse={1.6}
          speed={1.6}
          mouseInteraction={true}
          className="absolute inset-0 z-0 pointer-events-none"
        />

        <div className="container relative z-10">
          <AnimatedContent distance={30} duration={0.8} threshold={0.15}>
            <div ref={footerContactRef} className="footer__card panel overflow-hidden">
              {/* Window Chrome Header Bar */}
              <div className="flex items-center justify-between px-6 py-3.5 border-b border-rule-2 bg-paper-2/70 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 font-mono text-[11px] text-muted">AI Buildathon 2026 // Bộ môn CNTT - FPT Polytechnic Hà Nội</span>
                </div>
                <span className="pill text-[11px]">Cơ sở Hà Nội</span>
              </div>

              {/* Main Content: 2-column balanced layout */}
              <div className="p-7 sm:p-9 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: Branding & Manifesto */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="wordmark flex items-center gap-2">
                    <span className="wordmark__ring" aria-hidden="true" />
                    <span className="font-bold text-ink">AI Buildathon 2026</span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed max-w-lg">
                    Cuộc thi phát triển sản phẩm công nghệ ứng dụng AI trong quản lý hành chính nhân sự. 03 tuần thực chiến dành cho sinh viên Bộ môn CNTT - FPT Polytechnic Hà Nội cùng Doanh nghiệp đồng hành.
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-xs text-muted">
                    <span className="wordmark__ring" style={{ width: 8, height: 8, borderWidth: 1.5 }} />
                    <span>Build With AI · Từ ý tưởng đến sản phẩm chạy thật</span>
                  </div>
                </div>

                {/* Right: Organizer Contact Card */}
                <div className="lg:col-span-5 p-5 rounded-2xl bg-paper border border-rule-2 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="wordmark__ring" style={{ width: 10, height: 10, borderWidth: 2 }} />
                    <p className="text-sm text-ink font-semibold">Ban Tổ Chức AI Buildathon 2026</p>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    Dành cho sinh viên FPT Polytechnic, doanh nghiệp đồng hành hoặc giảng viên cần trao đổi thông tin:
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row flex-wrap gap-x-4 gap-y-2 text-xs text-ink">
                    <span className="flex items-center gap-1.5 text-accent font-medium">
                      <Mail className="w-3.5 h-3.5" />
                      btc@aibuildathon.vn
                    </span>
                    <span className="text-muted">Cơ sở: Trịnh Văn Bô, Nam Từ Liêm, Hà Nội</span>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Navigation Links & Copyright */}
              <div className="px-7 sm:p-9 py-5 border-t border-rule-2 bg-paper-2/40 flex flex-col md:flex-col items-start md:items-center justify-between gap-4">
                <nav className="footer__links flex flex-wrap gap-x-6 gap-y-2" aria-label="Chân trang">
                  <a href="#top">Đầu trang</a>
                  <a href="#what">Cuộc thi có gì</a>
                  <a href="#no-expert">Thế mạnh của bạn</a>
                  <a href="#vibe-coding">Vận dụng AI</a>
                  <a href="#challenges">Bài toán HR Admin</a>
                  <a href="#timeline">Lộ trình</a>
                  <a href="#partners">Cố vấn & Đối tác</a>
                  <a href="#register">Đăng ký</a>
                </nav>

                <p className="footer__legal text-xs text-muted m-0">
                  &copy; 2026 AI Buildathon · FPT Polytechnic Hà Nội. Mọi quyền được bảo lưu.
                </p>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </footer>
    </div>
  );
};

export default App;
