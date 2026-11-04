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
import { ChevronDown, Mail, Cpu, Zap, Sparkles, CheckCircle2 } from 'lucide-react';

export const App: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const footerContactRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      num: '01',
      title: 'Nhận bài toán thực tế',
      desc: 'Doanh nghiệp đối tác chia sẻ các bài toán nghiệp vụ thật họ đang cần giải quyết, kèm dữ liệu mẫu và kỳ vọng đầu ra.',
    },
    {
      num: '02',
      title: 'Bootcamp & Định hình giải pháp',
      desc: 'Tham gia AI Product Bootcamp, học cách tận dụng API có sẵn và trao đổi trực tiếp với Mentor để chốt phạm vi MVP.',
    },
    {
      num: '03',
      title: 'Làm việc nhóm & Xây dựng MVP',
      desc: 'Cùng đồng đội lập trình, thiết kế giao diện và hoàn thiện sản phẩm ứng dụng AI chạy được trong vòng 03 tuần.',
    },
    {
      num: '04',
      title: 'Demo sản phẩm trước hội đồng',
      desc: 'Trình diễn sản phẩm trực tiếp trước ban giám khảo, doanh nghiệp đặt hàng và nhận phản biện giá trị tại Demo Day.',
    },
  ];

  const noExpertPoints = [
    {
      icon: Cpu,
      title: 'Không cần tự train model',
      desc: 'Bạn không phải huấn luyện mô hình từ con số 0 hay cần máy chủ cấu hình mạnh. Mọi mô hình thông minh đã được các hãng lớn xây dựng sẵn.',
      tag: '0đ Huấn luyện',
    },
    {
      icon: Zap,
      title: 'Gọi mô hình qua API có sẵn',
      desc: 'Chỉ cần vài dòng code để kết nối Google Gemini, OpenAI GPT, Claude hoặc các mô hình mã nguồn mở như Llama qua API.',
      tag: 'REST API & SDK',
    },
    {
      icon: Sparkles,
      title: 'Tự do dùng AI hỗ trợ lập trình',
      desc: 'Khuyến khích sử dụng GitHub Copilot, Cursor, ChatGPT, v0... để tăng tốc viết mã nguồn và thiết kế giao diện.',
      tag: 'Copilot & Cursor',
    },
    {
      icon: CheckCircle2,
      title: 'Không bắt buộc RAG hay Agent',
      desc: 'Không cần cố nhồi nhét kỹ thuật phức tạp. Trọng tâm đánh giá là sản phẩm có giao diện thân thiện, chạy ổn định và giải quyết đúng bài toán.',
      tag: 'Ưu tiên sản phẩm MVP',
    },
  ];

  const faqs = [
    {
      q: 'Chưa biết nhiều về AI có tham gia được không?',
      a: 'Hoàn toàn được! Cuộc thi không yêu cầu bạn phải hiểu sâu về thuật toán hay toán học của AI. Bạn chỉ cần biết gọi API mô hình có sẵn (như Gemini, GPT) để đưa vào ứng dụng thực tế. Ban tổ chức cũng có buổi Bootcamp hướng dẫn tích hợp AI từ đầu.',
    },
    {
      q: 'Có cần biết lập trình không?',
      a: 'Trong một đội thi cần có ít nhất một thành viên phụ trách lập trình giao diện hoặc kết nối API. Tuy nhiên, các vị trí khác như thiết kế UI/UX, phân tích nghiệp vụ, viết kịch bản sử dụng (BA/Product) đều đóng vai trò rất quan trọng.',
    },
    {
      q: 'Có bắt buộc thành lập đội trước khi đăng ký không?',
      a: 'Không bắt buộc. Bạn có thể đăng ký cá nhân, Ban tổ chức sẽ tổ chức buổi kết nối (Orientation) để giúp bạn ghép đội với những bạn có kỹ năng bổ trợ phù hợp.',
    },
    {
      q: 'Đội thi có được tự do chọn công nghệ không?',
      a: 'Hoàn toàn tự do. Bạn có thể dùng bất kỳ ngôn ngữ, framework nào mà đội thành thạo: React, Next.js, Vue, Flutter, Python, Node.js,...',
    },
    {
      q: 'Có phải tự huấn luyện mô hình AI không?',
      a: 'Không. Bạn được khuyến khích sử dụng 100% các mô hình AI có sẵn qua API để tập trung vào việc làm ra sản phẩm có giá trị sử dụng thực tế.',
    },
    {
      q: 'Chi phí sử dụng API do ai chi trả?',
      a: 'Ban tổ chức ưu tiên và hướng dẫn các đội tận dụng gói miễn phí (Free Tier) của Google AI Studio, Groq, Cohere, Supabase, Vercel... để tối ưu chi phí. Đội thi tự chủ động quản lý việc sử dụng tài nguyên của mình.',
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
          <a className="wordmark" href="#top" aria-label="AI Buildathon 2026, về đầu trang">
            <span className="wordmark__ring" aria-hidden="true" />
            <span>AI Buildathon 2026</span>
          </a>
          <nav aria-label="Điều hướng chính">
            <ul className="nav__links" role="list">
              <li><a href="#what">Bạn sẽ làm gì</a></li>
              <li><a href="#no-expert">Cần giỏi AI không?</a></li>
              <li><a href="#challenges">Đề bài gợi ý</a></li>
              <li><a href="#timeline">Lộ trình 21 ngày</a></li>
              <li><a href="#partners">Cố vấn & Đối tác</a></li>
              <li><a href="#faq">Hỏi đáp</a></li>
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
              <p className="text-gradient font-display text-base font-medium tracking-wide uppercase mb-3">
                AI Buildathon 2026
              </p>
              <h1 id="hero-head"> Có AI, có ý tưởng. Ngại gì mà không làm sản phẩm thật!</h1>
              <p className="lead">
                Cùng bạn bè tạo ra một sản phẩm AI từ bài toán thực tế trong 3 tuần.
              </p>

              <div className="actions">
                <a href="#register" className="btn btn--primary">
                  Đăng ký tham gia ngay
                </a>
                <a href="#what" className="btn btn--secondary">
                  Tìm hiểu cuộc thi
                </a>
              </div>

              <p className="hero__fine">Miễn phí tham gia · Đội khoảng 3 thành viên</p>
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
                  text="Bạn sẽ làm gì trong cuộc thi?"
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
                Không thi lý thuyết, không thi thuật toán. Đây là hành trình 03 tuần thực chiến cùng đồng đội để biến bài toán thực tế thành sản phẩm chạy được.
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
              <h2>Bạn có cần giỏi AI để tham gia không?</h2>
              <p className="lead max-w-2xl mx-auto">
                Câu trả lời là KHÔNG. Cuộc thi không dành riêng cho chuyên gia nghiên cứu hay kỹ sư Machine Learning. Bạn chỉ cần biết ứng dụng AI để tạo ra sản phẩm hữu ích.
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

          <AnimatedContent distance={25} duration={0.6} threshold={0.15}>
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
                21 ngày thực chiến liên tục với các mốc đánh giá cụ thể cùng Mentor trước khi bước vào ngày Demo Day.
              </p>
            </div>
          </AnimatedContent>

          <AnimatedContent distance={30} duration={0.7} threshold={0.15}>
            <SprintTimeline />
          </AnimatedContent>

          <AnimatedContent distance={35} duration={0.7} stagger={0.08} threshold={0.1}>
            <dl className="tally">
              <div>
                <dt>Thời gian phát triển</dt>
                <dd className="num">03 <span className="c">tuần</span></dd>
              </div>
              <div>
                <dt>Quy mô tuyển chọn</dt>
                <dd className="num">20 đến 25 <span className="c">đội</span></dd>
              </div>
              <div>
                <dt>Mỗi đội thi</dt>
                <dd className="num is-open">Khoảng 3 <span className="c">bạn</span></dd>
              </div>
              <div>
                <dt>Lệ phí tham gia</dt>
                <dd className="num">0đ <span className="c">Free</span></dd>
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
                Không yêu cầu tất cả thành viên phải biết lập trình. Một đội thi hiệu quả luôn cần sự kết hợp giữa kỹ thuật, thiết kế và tư duy sản phẩm.
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
                        Đội ngũ đa dạng
                      </span>
                      <span className="pill">Khoảng 3 bạn/đội</span>
                    </div>
                    <div className="space-y-3 text-sm text-muted leading-relaxed">
                      <p><strong className="text-white">Lập trình viên:</strong> Xây dựng giao diện web/app và kết nối API mô hình.</p>
                      <p><strong className="text-white">Thiết kế UI/UX:</strong> Thiết kế màn hình trực quan, thân thiện cho người dùng.</p>
                      <p><strong className="text-white">Phân tích nghiệp vụ:</strong> Nắm chắc yêu cầu bài toán và định hình luồng sử dụng.</p>
                      <p><strong className="text-white">Ứng dụng AI:</strong> Tinh chỉnh prompt, lựa chọn công cụ và tối ưu kết quả đầu ra.</p>
                    </div>
                  </div>
                  <figcaption className="mt-6 pt-4 border-t border-rule-2">
                    <span className="well__title text-white font-bold">Đa dạng chuyên môn</span>
                    Không yêu cầu mọi thành viên đều phải biết lập trình hoặc giỏi AI.
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
                      <span className="font-semibold text-white text-base">Quyền lợi sinh viên</span>
                      <span className="pill">Thực chiến</span>
                    </div>
                    <div className="space-y-3 text-sm text-muted leading-relaxed">
                      <p><strong className="text-white">Dự án thật vào Portfolio & CV:</strong> Sở hữu sản phẩm MVP chạy thực tế chứng minh năng lực trước nhà tuyển dụng.</p>
                      <p><strong className="text-white">Mentor đồng hành 1-1:</strong> Được chuyên gia công nghệ cố vấn giải pháp kỹ thuật và phản biện hàng tuần.</p>
                      <p><strong className="text-white">Cơ hội việc làm:</strong> Kết nối trực tiếp với các doanh nghiệp đang tìm kiếm nhân lực ứng dụng AI.</p>
                    </div>
                  </div>
                  <figcaption className="mt-6 pt-4 border-t border-rule-2">
                    <span className="well__title text-white font-bold">Giá trị thiết thực cho sự nghiệp</span>
                    Học kỹ năng phát triển sản phẩm công nghệ thật, không dừng lại ở đồ án lý thuyết.
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
        <section className="sec container max-w-4xl" id="faq">
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
                Giải đáp chi tiết các băn khoăn của sinh viên trước khi gửi đơn đăng ký.
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
        </section>
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
                  <span className="ml-2 font-mono text-[11px] text-muted">AI Buildathon 2026 // Hub</span>
                </div>
                <span className="pill text-[11px]">Official Console</span>
              </div>

              {/* Main Content: 2-column balanced layout */}
              <div className="p-7 sm:p-9 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: Branding & Manifesto */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="wordmark">
                    <span className="wordmark__ring" aria-hidden="true" />
                    <span>AI Buildathon 2026</span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed max-w-lg">
                    Không cần tự xây dựng mô hình AI. Hãy dùng AI để tạo ra sản phẩm giải quyết vấn đề thực tế. Cuộc thi 03 tuần thực chiến dành cho sinh viên.
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-xs text-muted">
                    <span className="wordmark__ring" style={{ width: 8, height: 8, borderWidth: 1.5 }} />
                    <span>Build With AI · From Ideas to Real Products</span>
                  </div>
                </div>

                {/* Right: Organizer Contact Card */}
                <div className="lg:col-span-5 p-5 rounded-2xl bg-paper border border-rule-2 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="wordmark__ring" style={{ width: 10, height: 10, borderWidth: 2 }} />
                    <p className="text-sm text-ink font-semibold">Ban Tổ Chức AI Buildathon 2026</p>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    Dành cho sinh viên, doanh nghiệp đối tác hoặc trường đại học cần hỗ trợ giải đáp thông tin:
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
              <div className="px-7 sm:px-9 py-5 border-t border-rule-2 bg-paper-2/40 flex flex-col md:flex-col items-start md:items-center justify-between gap-4">
                <nav className="footer__links flex flex-wrap gap-x-6 gap-y-2" aria-label="Chân trang">
                  <a href="#top">Đầu trang</a>
                  <a href="#what">Bạn sẽ làm gì</a>
                  <a href="#no-expert">Cần giỏi AI không?</a>
                  <a href="#challenges">Đề bài</a>
                  <a href="#timeline">Lộ trình</a>
                  <a href="#partners">Cố vấn & Đối tác</a>
                  <a href="#register">Đăng ký</a>
                </nav>

                <p className="footer__legal text-xs text-muted m-0">
                  &copy; 2026 AI Buildathon. Mọi quyền được bảo lưu. Thiết kế theo chuẩn Ribbon Theme (Hallmark).
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
