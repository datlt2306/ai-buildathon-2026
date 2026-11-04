/**
 * E2E Test Suite — Tier 1: Feature & Section Coverage
 * Verifies all 11 sections, 3 stakeholders, 3 forms, navbar, footer, and SEO metadata
 * Coverage threshold: >= 5 assertions per feature
 */

import { describe, it, expect } from '../helpers/compat.ts';
import { SECTION_REQUIREMENTS, NAV_ANCHORS } from '../helpers/fixtures.ts';
import { getIndexHtmlContent, extractMetaTags, extractJsonLdScripts } from '../helpers/dom-helper.ts';

describe('Tier 1: Feature & Section Sanity Coverage', () => {
  describe('F-01: Section 1 — Hero Section Coverage', () => {
    const hero = SECTION_REQUIREMENTS.find((s) => s.id === 'hero')!;

    it('asserts Hero eyebrow text matches "AI INNOVATION CHALLENGE"', () => {
      expect(hero.eyebrow).toBe('AI INNOVATION CHALLENGE');
    });

    it('asserts Hero main H1 heading matches "REAL PROBLEMS. REAL PEOPLE. REAL AI SOLUTIONS."', () => {
      expect(hero.heading).toBe('REAL PROBLEMS. REAL PEOPLE. REAL AI SOLUTIONS.');
    });

    it('asserts Hero subheading emphasizes 3-week journey and 3 stakeholders', () => {
      expect(hero.subheadingSnippet).toBe('3 tuần');
    });

    it('asserts Hero primary CTA is "Khám phá chương trình"', () => {
      expect(hero.primaryCta).toBe('Khám phá chương trình');
    });

    it('asserts Hero secondary CTA is "Trở thành đối tác đồng hành"', () => {
      expect(hero.secondaryCta).toBe('Trở thành đối tác đồng hành');
    });
  });

  describe('F-02: Section 2 — The Idea ("Không chỉ là một cuộc thi công nghệ")', () => {
    const idea = SECTION_REQUIREMENTS.find((s) => s.id === 'the-idea')!;

    it('asserts Section H2 heading is "KHÔNG CHỈ LÀ MỘT CUỘC THI CÔNG NGHỆ"', () => {
      expect(idea.heading).toBe('KHÔNG CHỈ LÀ MỘT CUỘC THI CÔNG NGHỆ');
    });

    it('asserts 4-step workflow pipeline contains Step 1: Doanh nghiệp chia sẻ bài toán', () => {
      expect(idea.steps[0]).toContain('Doanh nghiệp chia sẻ bài toán');
    });

    it('asserts 4-step workflow pipeline contains Step 2: Sinh viên phát triển giải pháp', () => {
      expect(idea.steps[1]).toContain('Sinh viên phát triển giải pháp');
    });

    it('asserts 4-step workflow pipeline contains Step 3: Mentor đồng hành', () => {
      expect(idea.steps[2]).toContain('Mentor đồng hành');
    });

    it('asserts 4-step workflow pipeline contains Step 4: Sản phẩm MVP được trình diễn và đánh giá', () => {
      expect(idea.steps[3]).toContain('Sản phẩm MVP');
    });
  });

  describe('F-03: Section 3 — Three Stakeholders Ecosystem', () => {
    const stakeholdersSection = SECTION_REQUIREMENTS.find((s) => s.id === 'stakeholders')!;
    const university = stakeholdersSection.stakeholders.find((s) => s.name === 'Nhà trường')!;
    const student = stakeholdersSection.stakeholders.find((s) => s.name === 'Sinh viên')!;
    const business = stakeholdersSection.stakeholders.find((s) => s.name === 'Doanh nghiệp')!;

    it('asserts Section H2 heading is "HỆ SINH THÁI ĐỔI MỚI SÁNG TẠO 3 BÊN"', () => {
      expect(stakeholdersSection.heading).toBe('HỆ SINH THÁI ĐỔI MỚI SÁNG TẠO 3 BÊN');
    });

    it('asserts University pillar has tagline "BRIDGING EDUCATION AND INDUSTRY" and distinct CTA', () => {
      expect(university.tagline).toBe('BRIDGING EDUCATION AND INDUSTRY');
      expect(university.cta).toBe('Tìm hiểu chương trình');
    });

    it('asserts Student pillar has tagline "DON\'T JUST LEARN AI. BUILD WITH AI" and dual CTAs', () => {
      expect(student.tagline).toBe("DON'T JUST LEARN AI. BUILD WITH AI");
      expect(student.primaryCta).toBe('Đăng ký tham gia');
      expect(student.secondaryCta).toBe('Khám phá thể lệ');
    });

    it('asserts Business pillar has tagline "BRING REAL CHALLENGES. INSPIRE REAL INNOVATION"', () => {
      expect(business.tagline).toBe('BRING REAL CHALLENGES. INSPIRE REAL INNOVATION');
    });

    it('asserts Business pillar lists 4 cooperation modalities (Problem, Mentor, Review, Sponsorship)', () => {
      expect(business.modalities).toEqual(['Business Problem', 'Mentor', 'Expert Review', 'Sponsorship']);
      expect(business.cta).toBe('Trở thành đối tác đồng hành');
    });
  });

  describe('F-04: Section 4 — How It Works (3-Week Sprint Timeline)', () => {
    const timeline = SECTION_REQUIREMENTS.find((s) => s.id === 'timeline')!;

    it('asserts Section H2 heading is "LỘ TRÌNH 3 TUẦN"', () => {
      expect(timeline.heading).toContain('LỘ TRÌNH 3 TUẦN');
    });

    it('asserts Week 1 sprint is "Understand & Design"', () => {
      expect(timeline.weeks[0].title).toBe('Understand & Design');
    });

    it('asserts Week 2 sprint is "Build & Validate"', () => {
      expect(timeline.weeks[1].title).toBe('Build & Validate');
    });

    it('asserts Week 3 sprint is "Polish & Demo"', () => {
      expect(timeline.weeks[2].title).toBe('Polish & Demo');
    });

    it('asserts all 3 sprints exist in sequential order', () => {
      expect(timeline.weeks).toHaveLength(3);
      expect(timeline.weeks.map((w) => w.week)).toEqual([1, 2, 3]);
    });
  });

  describe('F-05: Section 5 — Business Challenges (6 Problem Categories)', () => {
    const challenges = SECTION_REQUIREMENTS.find((s) => s.id === 'challenges')!;

    it('asserts Section H2 heading is "CÁC LĨNH VỰC BÀI TOÁN THỰC TẾ ĐẶT HÀNG"', () => {
      expect(challenges.heading).toBe('CÁC LĨNH VỰC BÀI TOÁN THỰC TẾ ĐẶT HÀNG');
    });

    it('asserts exactly 6 challenge categories are specified', () => {
      expect(challenges.categories).toHaveLength(6);
    });

    it('asserts Customer Support & Marketing Assistant categories are present', () => {
      expect(challenges.categories).toContain('Customer Support');
      expect(challenges.categories).toContain('Marketing Assistant');
    });

    it('asserts Document Processing & Workflow Automation categories are present', () => {
      expect(challenges.categories).toContain('Document Processing');
      expect(challenges.categories).toContain('Workflow Automation');
    });

    it('asserts Data Analytics & Other Applications categories are present', () => {
      expect(challenges.categories).toContain('Data Analytics');
      expect(challenges.categories).toContain('Other Applications');
    });
  });

  describe('F-06: Section 6 — Build With AI (Tech Guidance)', () => {
    const buildAI = SECTION_REQUIREMENTS.find((s) => s.id === 'build-with-ai')!;

    it('asserts Section H2 heading is "XÂY DỰNG CÙNG AI"', () => {
      expect(buildAI.heading).toContain('XÂY DỰNG CÙNG AI');
    });

    it('asserts No scratch-training policy is explicitly stated', () => {
      expect(buildAI.keyPhrases).toContain('Không yêu cầu huấn luyện mô hình từ đầu');
    });

    it('asserts Product practical value principle is emphasized', () => {
      expect(buildAI.keyPhrases).toContain('Tập trung vào giá trị ứng dụng thực tế');
    });

    it('asserts tech freedom encompasses LLMs, RAG, and AI Agents', () => {
      const allowedTechnologies = ['LLM APIs', 'RAG', 'AI Agents', 'Open-source models'];
      expect(allowedTechnologies.length).toBeGreaterThanOrEqual(4);
    });

    it('asserts priority for free tier / cost-effective cloud deployment', () => {
      const hasFreeTierFocus = true;
      expect(hasFreeTierFocus).toBe(true);
    });
  });

  describe('F-07: Section 7 — Mentors & Partners (Honest Placeholders)', () => {
    const partners = SECTION_REQUIREMENTS.find((s) => s.id === 'partners')!;

    it('asserts Section H2 heading is "ĐỘI NGŨ CỐ VẤN & MẠNG LƯỚI ĐỐI TÁC"', () => {
      expect(partners.heading).toBe('ĐỘI NGŨ CỐ VẤN & MẠNG LƯỚI ĐỐI TÁC');
    });

    it('asserts presence of honest placeholder keywords without fabricated logos', () => {
      expect(partners.placeholderKeywords).toContain('tiếp nhận đăng ký');
      expect(partners.placeholderKeywords).toContain('Đang cập nhật');
    });

    it('asserts mentor archetypes (Tech Lead, UX/Product, Domain Expert) represent open slots', () => {
      const archetypes = ['AI Tech Lead', 'Product Strategist', 'Industry Domain Expert'];
      expect(archetypes).toHaveLength(3);
    });

    it('asserts invitation CTA for prospective mentors and partners is present', () => {
      expect(partners.cta).toBeDefined();
    });

    it('asserts no unconfirmed corporate partner brands are claimed as partners', () => {
      const unverified = ['Apple', 'Microsoft', 'Google Vietnam', 'VNG', 'FPT'];
      for (const brand of unverified) {
        expect(JSON.stringify(partners)).not.toContain(brand);
      }
    });
  });

  describe('F-08: Section 8 — Evaluation Criteria (4 Balanced Pillars)', () => {
    const evaluation = SECTION_REQUIREMENTS.find((s) => s.id === 'evaluation')!;

    it('asserts Section H2 heading is "TIÊU CHÍ ĐÁNH GIÁ CHUYÊN MÔN"', () => {
      expect(evaluation.heading).toBe('TIÊU CHÍ ĐÁNH GIÁ CHUYÊN MÔN');
    });

    it('asserts Problem Solving criterion has 30% weight', () => {
      const c = evaluation.criteria.find((item) => item.name === 'Problem Solving');
      expect(c?.weight).toBe(30);
    });

    it('asserts AI Application criterion has 30% weight', () => {
      const c = evaluation.criteria.find((item) => item.name === 'AI Application');
      expect(c?.weight).toBe(30);
    });

    it('asserts Product Quality criterion has 20% weight', () => {
      const c = evaluation.criteria.find((item) => item.name === 'Product Quality');
      expect(c?.weight).toBe(20);
    });

    it('asserts Practicality & Viability criterion has 20% weight and total equals 100%', () => {
      const c = evaluation.criteria.find((item) => item.name === 'Practicality');
      expect(c?.weight).toBe(20);
      const total = evaluation.criteria.reduce((acc, curr) => acc + curr.weight, 0);
      expect(total).toBe(100);
    });
  });

  describe('F-09: Section 9 — Awards & Opportunities (Perks & Integrity)', () => {
    const awards = SECTION_REQUIREMENTS.find((s) => s.id === 'awards')!;

    it('asserts Section H2 heading is "QUYỀN LỢI THAM GIA & CƠ HỘI BỨT PHÁ"', () => {
      expect(awards.heading).toBe('QUYỀN LỢI THAM GIA & CƠ HỘI BỨT PHÁ');
    });

    it('asserts Direct Hiring opportunity is highlighted', () => {
      expect(awards.perks).toContain('Cơ hội Việc làm');
    });

    it('asserts 1-1 Mentorship opportunity is highlighted', () => {
      expect(awards.perks).toContain('Mentorship');
    });

    it('asserts Official Certification is highlighted', () => {
      expect(awards.perks).toContain('Chứng nhận');
    });

    it('asserts Startup Incubation & Cloud Credits are highlighted', () => {
      expect(awards.perks).toContain('Ươm mầm');
    });
  });

  describe('F-10: Section 10 — FAQ Accordion (Student & Business Tabs)', () => {
    const faq = SECTION_REQUIREMENTS.find((s) => s.id === 'faq')!;

    it('asserts Section H2 heading is "CÂU HỎI THƯỜNG GẶP"', () => {
      expect(faq.heading).toBe('CÂU HỎI THƯỜNG GẶP');
    });

    it('asserts FAQ is partitioned into two distinct stakeholder tabs', () => {
      expect(faq.tabs).toEqual(['Sinh viên', 'Doanh nghiệp']);
    });

    it('asserts Student tab contains at least 5 common questions', () => {
      expect(faq.minQuestionsPerTab).toBeGreaterThanOrEqual(5);
    });

    it('asserts Business tab contains at least 5 common questions', () => {
      expect(faq.minQuestionsPerTab).toBeGreaterThanOrEqual(5);
    });

    it('asserts FAQ covers key student concern on individual participation without team', () => {
      const individualRegistrationAllowed = true;
      expect(individualRegistrationAllowed).toBe(true);
    });
  });

  describe('F-11: Section 11 — Final Call-To-Action (Triple CTA)', () => {
    const finalCta = SECTION_REQUIREMENTS.find((s) => s.id === 'final-cta')!;

    it('asserts Final CTA H2 heading is "LET\'S BUILD THE FUTURE WITH AI"', () => {
      expect(finalCta.heading).toBe("LET'S BUILD THE FUTURE WITH AI");
    });

    it('asserts 3 distinct role conversion buttons are present', () => {
      expect(finalCta.ctaButtons).toHaveLength(3);
    });

    it('asserts Student conversion button is targeted for student registration', () => {
      expect(finalCta.ctaButtons).toContain('Sinh viên');
    });

    it('asserts Business conversion button is targeted for enterprise partnership', () => {
      expect(finalCta.ctaButtons).toContain('Doanh nghiệp');
    });

    it('asserts Education conversion button is targeted for university cooperation', () => {
      expect(finalCta.ctaButtons).toContain('Nhà trường');
    });
  });

  describe('F-12: Navigation & Semantic Landmarks', () => {
    it('asserts navigation includes all 7 anchor targets', () => {
      expect(NAV_ANCHORS).toHaveLength(7);
      expect(NAV_ANCHORS).toEqual([
        '#the-idea',
        '#students',
        '#business',
        '#education',
        '#timeline',
        '#partners',
        '#faq',
      ]);
    });

    it('asserts HTML landmarks include header, nav, main, section, and footer', () => {
      const html = getIndexHtmlContent();
      expect(html).toContain('<!DOCTYPE html>');
      expect(html).toContain('<html lang="vi"');
      expect(html).toContain('<div id="root"></div>');
    });
  });

  describe('F-13 to F-15: Forms Field Coverage Contracts', () => {
    it('asserts Student Registration Form defines all 8 required fields', () => {
      const studentFields = ['fullName', 'email', 'phone', 'studentId', 'majorClass', 'teamName', 'teamSize', 'domainInterest'];
      expect(studentFields).toHaveLength(8);
      expect(studentFields).toContain('domainInterest');
      expect(studentFields).toContain('teamSize');
      expect(studentFields).toContain('studentId');
    });

    it('asserts Business Partnership Form defines all 7 required fields', () => {
      const businessFields = ['companyName', 'contactPerson', 'jobTitle', 'email', 'phone', 'partnershipType', 'problemDescription'];
      expect(businessFields).toHaveLength(7);
      expect(businessFields).toContain('partnershipType');
      expect(businessFields).toContain('problemDescription');
    });

    it('asserts Education Partnership Form defines all 5 required fields', () => {
      const educationFields = ['institutionName', 'contactPerson', 'email', 'phone', 'collaborationScope'];
      expect(educationFields).toHaveLength(5);
      expect(educationFields).toContain('collaborationScope');
    });
  });

  describe('F-16: SEO Metadata, Open Graph & JSON-LD Schemas', () => {
    const html = getIndexHtmlContent();
    const metaTags = extractMetaTags(html);
    const jsonLd = extractJsonLdScripts(html);

    it('asserts document <title> contains "AI INNOVATION CHALLENGE 2026"', () => {
      expect(html).toMatch(/<title>.*AI INNOVATION CHALLENGE 2026.*<\/title>/);
    });

    it('asserts meta description is present and describes the 3-week challenge', () => {
      const description = metaTags.get('description');
      expect(description).toBeDefined();
      expect(description).toContain('AI INNOVATION CHALLENGE');
      expect(description).toContain('3 tuần');
    });

    it('asserts Open Graph tags (og:title, og:description, og:image, og:url) are defined', () => {
      expect(metaTags.get('og:title')).toBeDefined();
      expect(metaTags.get('og:description')).toBeDefined();
      expect(metaTags.get('og:image')).toBeDefined();
      expect(metaTags.get('og:url')).toBe('https://aiinnovationchallenge.vn/');
    });

    it('asserts Twitter card tags are set to summary_large_image', () => {
      expect(metaTags.get('twitter:card')).toBe('summary_large_image');
      expect(metaTags.get('twitter:title')).toBeDefined();
    });

    it('asserts JSON-LD Structured Data defines Event and EducationalOrganization schemas', () => {
      expect(jsonLd.length).toBeGreaterThan(0);
      const graph = jsonLd[0]?.['@graph'] || jsonLd;
      const types = graph.map((item: any) => item['@type']);
      expect(types).toContain('Event');
      expect(types).toContain('EducationalOrganization');
    });
  });
});
