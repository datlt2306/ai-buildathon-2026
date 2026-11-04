import React, { useState, useRef } from 'react';
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
import { ChevronDown, Mail, Code2, Palette, TrendingUp, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const footerContactRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      num: '01',
      title: 'Làm việc cùng đồng đội',
      desc: 'Rủ bạn bè cùng lớp lập đội hoặc đăng ký cá nhân để được hỗ trợ ghép nhóm. Mỗi thành viên cùng đóng góp thế mạnh và kiến thức của mình.',
    },
    {
      num: '02',
      title: 'Giải quyết bài toán thực tế',
      desc: 'Tiếp cận những vấn đề thực tế từ doanh nghiệp, tìm hiểu nhu cầu và đề xuất giải pháp bằng sản phẩm ứng dụng AI.',
    },
    {
      num: '03',
      title: 'Xây dựng sản phẩm ứng dụng AI',
      desc: 'Vận dụng kiến thức đã học, kết hợp các công cụ AI để phát triển ứng dụng, hoàn thiện những chức năng cốt lõi và kiểm thử sản phẩm.',
    },
    {
      num: '04',
      title: 'Demo và giới thiệu sản phẩm',
      desc: 'Trình diễn thành quả trước hội đồng, chia sẻ cách bạn xây dựng sản phẩm và có thêm một dự án thực tế cho portfolio cá nhân.',
    },
  ];

  const noExpertPoints = [
    {
      icon: Code2,
      title: 'Biết code cơ bản về lập trình?',
      desc: 'Có kiến thức HTML, CSS, JavaScript, PHP, Java hoặc lập trình Mobile? Bạn có thể xây dựng giao diện, xử lý chức năng và tích hợp AI vào sản phẩm.',
      tag: 'Lập trình ứng dụng',
    },
    {
      icon: Sparkles,
      title: 'Thường xuyên sử dụng AI?',
      desc: 'Biết sử dụng ChatGPT, Gemini hay các công cụ AI khác? Bạn có thể tận dụng chúng để tìm ý tưởng, phân tích vấn đề, hỗ trợ lập trình và xây dựng các tính năng thông minh.',
      tag: 'Khai thác công cụ AI',
    },
    {
      icon: Palette,
      title: 'Có gu thẩm mỹ?',
      desc: 'Yêu thích thiết kế giao diện, Figma, làm hình ảnh hay trình bày nội dung? Bạn có thể giúp sản phẩm dễ sử dụng, trực quan và hấp dẫn hơn.',
      tag: 'Thiết kế trải nghiệm người dùng',
    },
    {
      icon: TrendingUp,
      title: 'Thích lên ý tưởng và làm việc nhóm?',
      desc: 'Bạn giỏi tìm hiểu nhu cầu, sắp xếp công việc, lên kế hoạch hoặc thuyết trình? Bạn có thể giúp đội xác định hướng đi và đưa sản phẩm đến gần hơn với người dùng.',
      tag: 'Phát triển ý tưởng sản phẩm',
    },
  ];

  const faqs = [
    {
      q: 'Em mới học kỳ 3, mới biết code cơ bản (HTML/CSS/JS hoặc Java), có theo nổi không?',
      a: 'Hoàn toàn theo được! Kỳ 3 đến kỳ 6 là thời điểm vàng để bạn bắt tay làm sản phẩm thật. Bạn không cần làm thuật toán phức tạp — chỉ cần dựng giao diện đơn giản và kết nối API AI có sẵn. Phần thông minh đã có ChatGPT/Gemini lo, và còn có Mentor hỗ trợ kỹ thuật sát sao.',
    },
    {
      q: 'Cuộc thi này có bắt buộc phải biết chuyên sâu AI, làm chatbot phức tạp hay triển khai RAG không?',
      a: 'Tuyệt đối KHÔNG! Cuộc thi không chấm điểm việc bạn tự train mô hình hay thuật toán cao siêu. Tiêu chí quan trọng nhất là: Sản phẩm của nhóm có chạy được không, có giải quyết được bài toán thực tế không và người dùng dùng có tiện lợi không.',
    },
    {
      q: 'Em chưa bao giờ gọi API của AI thì làm sao kết nối vào ứng dụng?',
      a: 'Rất dễ dàng! Gọi API AI cũng chỉ giống như gửi một yêu cầu lấy dữ liệu (fetch API) bạn học ở môn Web. Ban tổ chức sẽ cung cấp code mẫu (React, Next.js, Node.js, Python) và tổ chức buổi Workshop hướng dẫn từ con số 0 để bạn chạy thử được ngay sau 30 phút.',
    },
    {
      q: 'Em chưa có nhóm bạn cùng thi thì có đăng ký tham gia được không?',
      a: 'Được chứ! Bạn chỉ cần chọn hình thức "Cá nhân ghép đội" khi đăng ký. Ban tổ chức sẽ tổ chức buổi kết nối (Orientation) để ghép bạn với các bạn sinh viên Poly khác có kỹ năng bổ trợ (code, thiết kế, ý tưởng).',
    },
    {
      q: 'Chi phí sử dụng API của ChatGPT, Gemini có tốn tiền không?',
      a: '100% Miễn phí! Ban tổ chức sẽ hướng dẫn các nhóm tận dụng các gói miễn phí (Free Tier) của Google Gemini API, Groq, Cohere, Vercel, Supabase... đủ dung lượng để phát triển và demo sản phẩm mà không tốn một đồng nào.',
    },
    {
      q: 'Nhóm em có thể lấy ý tưởng từ bài tập assignment hoặc đồ án môn học để dự thi không?',
      a: 'Rất khuyến khích! Nếu bạn đã có sẵn bài tập lớn hoặc đồ án (như web bán hàng, app quản lý sinh viên, tool học tập...), bạn hoàn toàn có thể mang vào cuộc thi và gắn thêm tính năng AI để nâng cấp thành sản phẩm xịn sò.',
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
              <span className="text-[10px] text-accent font-semibold leading-none tracking-tight">FPT Polytechnic Hà Nội</span>
            </div>
          </a>
          <nav aria-label="Điều hướng chính">
            <ul className="nav__links" role="list">
              <li><a href="#what">Bạn sẽ làm gì</a></li>
              <li><a href="#no-expert">Cần giỏi AI không?</a></li>
              <li><a href="#challenges">Ý tưởng thử sức</a></li>
              <li><a href="#timeline">Lộ trình 21 ngày</a></li>
              <li><a href="#partners">Cố vấn đồng hành</a></li>
              <li><a href="#faq">Hỏi đáp</a></li>
            </ul>
          </nav>
          <a className="btn btn--small btn--primary" href="#register">
            Đăng ký thử sức
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
              dotSize={4}
              gap={20}
              proximity={140}
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
              intro={true}
            />
          
          </div>

          <div className="container hero__grid">
            <AnimatedContent className="hero__text" distance={35} duration={0.8} stagger={0.08} trigger="mount">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-semibold mb-3">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span>DÀNH RIÊNG CHO SINH VIÊN FPT POLYTECHNIC HÀ NỘI</span>
              </div>

              <h1 id="hero-head" className="tracking-tight text-white">
                Biết code cơ bản
                <span className="block text-gradient mt-1">Thử làm sản phẩm AI!</span>
              </h1>

              <p className="lead">
                Vận dụng kiến thức đã học, kết hợp sức mạnh của AI để cùng đồng đội lên ý tưởng và xây dựng một sản phẩm thực tế trong 3 tuần.
              </p>

              <div className="actions">
                <a href="#register" className="btn btn--primary">
                  Đăng ký tham gia
                </a>
                <a href="#no-expert" className="btn btn--secondary">
                  Tìm hiểu cuộc thi
                </a>
              </div>

              <p className="hero__fine">Miễn phí tham gia · Làm việc theo nhóm · 3 tuần</p>
            </AnimatedContent>

            <HeroLanyardPass />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: BẠN SẼ LÀM GÌ? (Hairline sequence)                             */}
        {/* ========================================================================= */}
        <section className="sec container" id="what">
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
                Không chỉ là một cuộc thi. Đây là cơ hội để bạn làm sản phẩm thật. Trong 3 tuần, bạn sẽ cùng đồng đội trải qua hành trình từ tìm ý tưởng, giải quyết vấn đề đến xây dựng và trình diễn một sản phẩm ứng dụng AI.
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
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: BẠN CÓ CẦN GIỎI AI KHÔNG? (Reassurance)                        */}
        {/* ========================================================================= */}
        <section className="sec container" id="no-expert">
          <AnimatedContent distance={30} duration={0.7} threshold={0.15}>
            <div className="sec__head mx-auto text-center">
              <h2>Bạn có thế mạnh gì? Đều có thể đóng góp!</h2>
              <p className="lead max-w-2xl mx-auto">
                Không cần một đội toàn những người giỏi lập trình hay chuyên sâu về AI. Một sản phẩm tốt cần nhiều kỹ năng khác nhau. Hãy xem bạn có thể đóng góp gì cho đội của mình!
              </p>
            </div>
          </AnimatedContent>

          <AnimatedContent distance={50} duration={0.8} stagger={0.1} threshold={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {noExpertPoints.map((pt, idx) => {
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
        {/* SECTION 4: NHỮNG BÀI TOÁN BẠN CÓ THỂ GIẢI QUYẾT (Challenge Tour)          */}
        {/* ========================================================================= */}
        <section className="sec container" id="challenges">
          <AnimatedContent distance={30} duration={0.7} threshold={0.15}>
            <ChallengeTour />
          </AnimatedContent>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: HÀNH TRÌNH 03 TUẦN (Timeline Strip & Tallies)                  */}
        {/* ========================================================================= */}
        <section className="sec container" id="timeline">
          <AnimatedContent distance={30} duration={0.7} threshold={0.15}>
            <div className="sec__head mx-auto text-center">
              <h2>
                <FoldText
                  text="Hành trình 03 tuần: Từ ý tưởng đến sản phẩm."
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
                21 ngày thực chiến được thiết kế vừa sức cho sinh viên Poly. Có Workshop hướng dẫn từ đầu và Mentor là Senior Dev đồng hành gỡ rối kỹ thuật.
              </p>
            </div>
          </AnimatedContent>

          <AnimatedContent distance={30} duration={0.7} threshold={0.15}>
            <SprintTimeline />
          </AnimatedContent>

          <AnimatedContent distance={35} duration={0.7} stagger={0.08} threshold={0.1}>
            <dl className="tally">
              <div>
                <dt>Thời gian thực chiến</dt>
                <dd className="num">03 <span className="c">tuần</span></dd>
              </div>
              <div>
                <dt>Đối tượng sinh viên</dt>
                <dd className="num">Kỳ 3 – 6 <span className="c">Poly HN</span></dd>
              </div>
              <div>
                <dt>Mỗi đội thi</dt>
                <dd className="num is-open">Khoảng 3 <span className="c">bạn</span></dd>
              </div>
              <div>
                <dt>Lệ phí tham gia</dt>
                <dd className="num">0đ <span className="c">Free 100%</span></dd>
              </div>
            </dl>
          </AnimatedContent>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 6 & 7: AI NÊN THAM GIA? & BẠN NHẬN ĐƯỢC GÌ? (Wells)               */}
        {/* ========================================================================= */}
        <section className="sec container" id="participants">
          <AnimatedContent distance={30} duration={0.7} threshold={0.15}>
            <div className="sec__head mx-auto text-center">
              <h2>Ai nên tham gia và bạn nhận được gì?</h2>
              <p className="lead max-w-2xl mx-auto">
               Không cần cả đội đều giỏi lập trình hay AI. Hãy kết hợp những thế mạnh khác nhau để cùng tạo nên một sản phẩm thực tế.
              </p>
            </div>
          </AnimatedContent>

          <AnimatedContent distance={40} duration={0.8} stagger={0.15} threshold={0.1}>
            <div className="wells">
              {/* Well 1: Ai nên tham gia? */}
              <BorderGlow
                backgroundColor="#12111d"
                borderRadius={24}
                glowRadius={40}
                glowIntensity={1.0}
                edgeSensitivity={30}
                colors={['#7c5dfa', '#4378ff', '#a588f6']}
                glowColor="255 85 70"
              >
                <figure className="well p-7 sm:p-8 m-0 flex flex-col justify-between h-full bg-paper-card rounded-[24px]">
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-rule-2 mb-5">
                      <span className="font-semibold text-white flex items-center gap-2.5 text-base">
                        <span className="wordmark__ring" style={{ width: 10, height: 10, borderWidth: 2 }} />
                        Một đội thi cần những ai?
                      </span>
                      <span className="pill">Khoảng 3 bạn/đội</span>
                    </div>
                    <div className="space-y-3 text-sm text-muted leading-relaxed">
                      <p><strong className="text-white">Lập trình viên:</strong> Có kiến thức về Web, Java, PHP hoặc Mobile? Bạn có thể xây dựng giao diện, chức năng và tích hợp AI vào ứng dụng.</p>
                      <p><strong className="text-white">Thiết kế & Trải nghiệm: </strong> Yêu thích Figma, thiết kế giao diện hoặc làm nội dung? Bạn có thể giúp sản phẩm trực quan và dễ sử dụng hơn.</p>
                      <p><strong className="text-white">AI & Công nghệ:</strong> Thường xuyên sử dụng ChatGPT, Gemini và các công cụ AI? Bạn có thể khai thác AI để tìm ý tưởng, hỗ trợ lập trình và phát triển tính năng.</p>
                      <p><strong className="text-white">Ý tưởng & Tổ chức:</strong> Có khả năng tìm hiểu nhu cầu, lên kế hoạch và thuyết trình? Bạn có thể giúp đội xác định hướng đi và giới thiệu sản phẩm.</p>
                    </div>
                  </div>
                  <figcaption className="mt-6 pt-4 border-t border-rule-2">
                    <span className="well__title text-white font-bold">Ai cũng có vai trò quan trọng</span>
                    Chưa có đội? Đăng ký cá nhân để BTC hỗ trợ kết nối với các bạn khác.
                  </figcaption>
                </figure>
              </BorderGlow>

              {/* Well 2: Bạn nhận được gì? */}
              <BorderGlow
                backgroundColor="#12111d"
                borderRadius={24}
                glowRadius={40}
                glowIntensity={1.0}
                edgeSensitivity={30}
                colors={['#7c5dfa', '#4378ff', '#a588f6']}
                glowColor="255 85 70"
              >
                <figure className="well p-7 sm:p-8 m-0 flex flex-col justify-between h-full bg-paper-card rounded-[24px]">
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-rule-2 mb-5">
                      <span className="font-semibold text-white text-base">Bạn nhận được gì?</span>
                      <span className="pill">Thiết thực</span>
                    </div>
                    <div className="space-y-3 text-sm text-muted leading-relaxed">
                      <p><strong className="text-white">Một sản phẩm thực tế cho Portfolio:</strong> Tự tay xây dựng sản phẩm cùng đồng đội, có thêm dự án để giới thiệu năng lực của mình.</p>
                      <p><strong className="text-white">Được hướng dẫn và góp ý:</strong> Tham gia các buổi chia sẻ, trao đổi với Mentor để nhận góp ý và tháo gỡ khó khăn trong quá trình phát triển sản phẩm..</p>
                      <p><strong className="text-white">Cơ hội khám phá công cụ AI:</strong> Tự chọn công cụ phù hợp với dự án và được BTC hướng dẫn cách tận dụng các gói Free Tier để phát triển sản phẩm.</p>
                      <p><strong className="text-white">Cơ hội trình diễn và tranh tài:</strong> Giới thiệu sản phẩm trước hội đồng, cạnh tranh các giải thưởng và nhận chứng nhận dành cho những đội vào vòng cuối hoặc đạt giải.</p>
                    </div>
                  </div>
                  <figcaption className="mt-6 pt-4 border-t border-rule-2">
                    <span className="well__title text-white font-bold">Hành trang cho chặng đường tiếp theo</span>
                    Kiến thức, kinh nghiệm làm việc nhóm và sản phẩm bạn xây dựng có thể trở thành tư liệu hữu ích khi hoàn thiện Portfolio và tìm kiếm cơ hội thực tập, việc làm.
                  </figcaption>
                </figure>
              </BorderGlow>
            </div>
          </AnimatedContent>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 7: ĐỘI NGŨ CỐ VẤN & MẠNG LƯỚI ĐỐI TÁC (ProfileCards)              */}
        {/* ========================================================================= */}
        <AnimatedContent distance={35} duration={0.8} threshold={0.1}>
          <OrganizersPartnersSection />
        </AnimatedContent>

        {/* ========================================================================= */}
        {/* SECTION 8: FORM ĐĂNG KÝ TRONG CLOSE BAND                                   */}
        {/* ========================================================================= */}
        <section className="close" id="register" aria-labelledby="reg-head">
          <div className="container pb-16">
            <AnimatedContent distance={35} duration={0.8} threshold={0.1}>
              <StudentRegistrationSection />
            </AnimatedContent>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 9: CÂU HỎI THƯỜNG GẶP (FAQ)                                      */}
        {/* ========================================================================= */}
        {/* <section className="sec container max-w-4xl" id="faq">
          <AnimatedContent distance={30} duration={0.7} threshold={0.15}>
            <div className="sec__head mx-auto text-center">
              <h2>
                <FoldText
                  text="Những thắc mắc thường gặp."
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
                  fontWeight="inherit"
                  color="inherit"
                />
              </h2>
              <p className="lead">
                Giải đáp chi tiết mọi băn khoăn của sinh viên FPT Polytechnic trước khi gửi đơn đăng ký.
              </p>
            </div>
          </AnimatedContent>

          <AnimatedContent distance={30} duration={0.6} stagger={0.05} threshold={0.1}>
            <div className="space-y-3 mt-12">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="panel overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 text-ink hover:text-accent transition-colors"
                    >
                      <span className="text-base font-medium">{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-muted flex-shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-accent' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs text-muted leading-relaxed border-t border-rule pt-3 bg-paper-2">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </AnimatedContent>
        </section> */}
      </main>

      {/* ========================================================================= */}
      {/* FOOTER                                                                    */}
      {/* ========================================================================= */}
      <footer className="footer relative overflow-hidden mt-20">
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
                  <span className="ml-2 font-mono text-[11px] text-muted">AI Buildathon 2026 // FPT Polytechnic Hà Nội</span>
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
                    Không cần tự xây dựng mô hình AI. Hãy dùng AI có sẵn để tạo ra sản phẩm giải quyết vấn đề thực tế. Cuộc thi 03 tuần thực chiến dành cho sinh viên FPT Polytechnic Hà Nội (Kỳ 3 - Kỳ 6).
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
                    Dành cho sinh viên FPT Polytechnic, doanh nghiệp đối tác hoặc giảng viên cần hỗ trợ thông tin:
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row flex-wrap gap-x-4 gap-y-2 text-xs text-ink">
                    <span className="flex items-center gap-1.5 text-accent font-medium">
                      <Mail className="w-3.5 h-3.5" />
                      btc@aibuildathon.vn
                    </span>
                    <span className="text-muted">Hotline: [BTC CẦN BỔ SUNG]</span>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Navigation Links & Copyright */}
              <div className="px-7 sm:p-9 py-5 border-t border-rule-2 bg-paper-2/40 flex flex-col md:flex-col items-start md:items-center justify-between gap-4">
                <nav className="footer__links flex flex-wrap gap-x-6 gap-y-2" aria-label="Chân trang">
                  <a href="#top">Đầu trang</a>
                  <a href="#what">Bạn sẽ làm gì</a>
                  <a href="#no-expert">Cần giỏi AI không?</a>
                  <a href="#challenges">Ý tưởng thử sức</a>
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
