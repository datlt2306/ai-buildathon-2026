# AI INNOVATION CHALLENGE — E2E Test Infrastructure & Specification

## 1. Executive Summary & Test Philosophy

### 1.1 Test Philosophy: Opaque-Box & Requirement-Driven
The testing strategy for the **AI INNOVATION CHALLENGE** landing page is strictly **opaque-box** and **requirement-driven**, derived directly from the authoritative specifications in `ORIGINAL_REQUEST.md` and `PROJECT.md`.
- **Zero Internal Coupling**: Tests interact solely with observable external contracts: rendered DOM elements, accessible roles (`banner`, `navigation`, `main`, `contentinfo`, `dialog`, `form`, `button`, `textbox`, `combobox`, `alert`, `status`), ARIA attributes, semantic headings (`h1`, `h2`, `h3`), public section anchor IDs (`#the-idea`, `#students`, `#business`, `#education`, `#timeline`, `#partners`, `#faq`), and user storage side effects (`localStorage` keys `aic_submissions_*`).
- **Complete Specification Fidelity**: Expected outputs and assertions are derived exclusively from user requirements rather than implementation source code. If implementation diverges from user requirements, the test asserts the requirement.
- **Progressive Testability & Verification**: Tests are partitioned into hierarchical tiers from unit validation and section rendering up to full multi-step user journeys and responsive boundary stress.

---

## 2. Feature Inventory Test Matrix

The test matrix maps all 11 content sections, 3 stakeholder tracks, 3 interactive forms, navigation landmarks, SEO schemas, and WCAG accessibility contracts.

| Feature ID | Feature Area | Key Requirements & Opaque Assertions | Priority |
| :--- | :--- | :--- | :---: |
| **F-01** | **Section 1: Hero** | • Eyebrow containing `"AI INNOVATION CHALLENGE"`<br>• H1 heading `"REAL PROBLEMS. REAL PEOPLE. REAL AI SOLUTIONS."`<br>• Subheading emphasizing 3 stakeholders & 3-week timeline<br>• Dual CTAs: `"Khám phá chương trình"` (scrolls to overview) and `"Trở thành đối tác đồng hành"` (opens business modal/scrolls)<br>• Metric highlights ticker (3 weeks, 6+ categories, 100% real problems, 1-1 mentors) | High |
| **F-02** | **Section 2: The Idea** | • H2 title `"KHÔNG CHỈ LÀ MỘT CUỘC THI CÔNG NGHỆ"`<br>• 4-step pipeline workflow rendered: 1. Doanh nghiệp chia sẻ bài toán → 2. Sinh viên phát triển giải pháp → 3. Mentor đồng hành → 4. Sản phẩm MVP demo & đánh giá | High |
| **F-03** | **Section 3: Three Stakeholders** | • H2 title `"HỆ SINH THÁI ĐỔI MỚI SÁNG TẠO 3 BÊN"`<br>• **Nhà trường**: `"BRIDGING EDUCATION AND INDUSTRY"` + CTA `"Tìm hiểu chương trình"`<br>• **Sinh viên**: `"DON'T JUST LEARN AI. BUILD WITH AI"` + Dual CTAs (`"Đăng ký tham gia"`, `"Khám phá thể lệ"`)<br>• **Doanh nghiệp**: `"BRING REAL CHALLENGES. INSPIRE REAL INNOVATION"` + 4 modalities (Problem, Mentor, Judge, Sponsor) + CTA `"Trở thành đối tác đồng hành"` | Critical |
| **F-04** | **Section 4: How It Works** | • H2 title `"LỘ TRÌNH 3 TUẦN: TỪ Ý TƯỞNG ĐẾN SẢN PHẨM KHẢ THI"`<br>• 3-week sprints: Tuần 1 (Understand & Design), Tuần 2 (Build & Validate), Tuần 3 (Polish & Demo)<br>• Clear deliverables per week (Solution Brief, Working Prototype, Live Demo MVP) | High |
| **F-05** | **Section 5: Business Challenges** | • H2 title `"CÁC LĨNH VỰC BÀI TOÁN THỰC TẾ ĐẶT HÀNG"`<br>• 6 distinct problem categories: Customer Support, Marketing Assistant, Document Processing, Workflow Automation, Data Analytics, Other Applications | High |
| **F-06** | **Section 6: Build With AI** | • H2 title `"XÂY DỰNG CÙNG AI: LINH HOẠT, THỰC TIỄN & TỐI ƯU CHI PHÍ"`<br>• Tech freedom principles: No scratch-training required, Free-tier/cost-effective priority, LLM APIs/RAG/Agents ecosystem | High |
| **F-07** | **Section 7: Mentors & Partners** | • H2 title `"ĐỘI NGŨ CỐ VẤN & MẠNG LƯỚI ĐỐI TÁC"`<br>• **Strict Data Integrity**: No fabricated corporate logos or fake mentor identities<br>• Honest placeholders: Mentor archetypes and call for partners with registration CTA | High |
| **F-08** | **Section 8: Evaluation** | • H2 title `"TIÊU CHÍ ĐÁNH GIÁ CHUYÊN MÔN"`<br>• 4 balanced criteria & weights: Problem Solving (30%), AI Application (30%), Product Quality (20%), Practicality (20%) | High |
| **F-09** | **Section 9: Awards & Opportunities** | • H2 title `"QUYỀN LỢI THAM GIA & CƠ HỘI BỨT PHÁ"`<br>• Perks: direct hiring, 1-1 mentorship, official certificates, incubation & cloud credits<br>• Honest prize placeholder: cash/in-kind prizes announced prior to kick-off | High |
| **F-10** | **Section 10: FAQ** | • H2 title `"CÂU HỎI THƯỜNG GẶP"`<br>• Dual tabbed accordion (Students FAQ vs Business/Education FAQ)<br>• 5 verified Q&As per stakeholder tab with accessible expand/collapse | High |
| **F-11** | **Section 11: Final CTA** | • H2 title `"LET'S BUILD THE FUTURE WITH AI"`<br>• Triple role-specific CTA buttons: Student, Business, School | High |
| **F-12** | **Navigation & Landmarks** | • Sticky navbar with 7 public anchor links: `#the-idea`, `#students`, `#business`, `#education`, `#timeline`, `#partners`, `#faq`<br>• Skip to main content link (`#main-content`)<br>• Semantic footer with copyright, contact placeholder & navigation | Critical |
| **F-13** | **Form 1: Student Registration** | • 8 fields: `fullName`, `email`, `phoneNumber`, `studentId`, `majorClass`, `teamName`, `teamSize`, `domainInterest`<br>• Client validation, loading state, success confirmation, localStorage persistence | Critical |
| **F-14** | **Form 2: Business Partnership** | • 7 fields: `companyName`, `contactPerson`, `jobTitle`, `email`, `phoneNumber`, `partnershipType`, `problemDescription`<br>• Client validation, loading state, success confirmation, localStorage persistence | Critical |
| **F-15** | **Form 3: Education Partnership** | • 5 fields: `institutionName`, `contactPerson`, `email`, `phoneNumber`, `collaborationScope`<br>• Client validation, loading state, success confirmation, localStorage persistence | Critical |
| **F-16** | **Modal Dialog Orchestrator** | • Accessible dialog container with `role="dialog"`, focus trap, Escape key handling, backdrop click dismiss, clean state reset | Critical |
| **F-17** | **SEO, Open Graph & JSON-LD** | • HTML document contains `<title>`, `<meta name="description">`, Open Graph (`og:title`, `og:image`, `og:description`), Twitter Card, and JSON-LD structured data (`Event` + `EducationalOrganization`) | High |
| **F-18** | **WCAG 2.2 AA Accessibility** | • High-contrast focus rings (`outline` >= 3:1), color contrast compliance, `aria-live` on form states, `htmlFor`/`id` input labeling, reduced-motion media query | Critical |

---

## 3. Test Architecture & Directory Organization

```
tests/
├── e2e/
│   ├── tier1-features.test.ts      # Tier 1: Sanity & Feature Coverage (Every section, title, CTA, form)
│   ├── tier2-boundaries.test.ts    # Tier 2: Boundary & Validation Stress (Empty fields, regex, length, rapid submits)
│   ├── tier3-combinations.test.ts  # Tier 3: Cross-Feature Combinations (Nav anchors, modal triggers, tab switches)
│   └── tier4-scenarios.test.ts     # Tier 4: Real-World E2E Scenarios (3 Stakeholder application journeys)
├── unit/
│   ├── validation.test.ts          # Pure engine tests (VN phone, RFC email, required fields, string limits)
│   └── data-integrity.test.ts      # Verifies data layer constants adhere strictly to zero-fabrication rules
├── helpers/
│   ├── dom-helper.ts               # DOM test setup, event dispatchers, mock localStorage
│   └── test-fixtures.ts            # Valid & invalid payloads for all 3 forms
└── runner.mjs                      # Self-contained zero-config test runner executable directly via Node
```

### 3.1 Test Execution Commands
- **Standard vitest run**:
  ```bash
  npm test
  # or
  npx vitest run
  ```
- **Self-contained automated runner**:
  ```bash
  npm run test:e2e
  # or
  node tests/runner.mjs
  ```
- **Unit & Validation tests only**:
  ```bash
  npx vitest run tests/unit/
  ```

---

## 4. Coverage Thresholds & Quality Gates

| Tier | Category | Minimum Coverage Threshold | Verification Method |
| :---: | :--- | :--- | :--- |
| **Tier 1** | **Feature Coverage** | **>= 5 assertions / tests per feature** across all 11 sections, 3 stakeholders, 3 forms, navbar, footer, SEO metadata. | Automated DOM snapshot / text presence / ARIA role queries. |
| **Tier 2** | **Boundary & Validation Stress** | **>= 5 test cases per feature / form**: empty inputs, boundary lengths (min/max), invalid telecom prefixes, RFC email anomalies, rapid multi-click submissions, whitespace edge cases. | Form validation engine & DOM event simulation. |
| **Tier 3** | **Cross-Feature Combinations** | **Pairwise & state matrix**: Navigation links to target IDs, multi-section CTA modal triggers, form switching, modal open/close cleanup, keyboard Esc dismiss, localStorage persistence synchronization. | Multi-component integration test. |
| **Tier 4** | **Real-World Scenarios** | **>= 5 comprehensive user journeys**: Student Registration, Business Problem Provider, University Academic Partnership, Keyboard Accessibility & Focus Trap, Mobile Viewport Navigation. | End-to-end multi-step flow execution. |

---

## 5. Expected Output Derivation & Authoritative Sources

All assertions in tests are derived from:
1. `ORIGINAL_REQUEST.md` (Sections R1 to R5 and Acceptance Criteria).
2. `PROJECT.md` (Feature Inventory F01-F28 and Interface Contracts).
3. Vietnamese Telecom Regulatory Standards for mobile prefixes (`03x`, `05x`, `07x`, `08x`, `09x`, `+84`).
4. RFC 5322 Standard for email validation.
5. W3C WCAG 2.2 AA Guidelines for focus visibility, interactive target sizing, and live announcements.
