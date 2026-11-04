/**
 * Unit Test Suite: Data Integrity & Preservation
 * Verifies compliance with ORIGINAL_REQUEST.md lines 28, 60 & PROJECT.md
 * Rule: Zero fabricated partner names/logos, zero fabricated prize values, honest placeholders
 */

import { describe, it, expect } from '../helpers/compat.ts';
import { SECTION_REQUIREMENTS, NAV_ANCHORS } from '../helpers/fixtures.ts';

describe('Unit: Data Integrity & Specification Conformance', () => {
  describe('Strict Partner & Sponsor Integrity (No Fabrications)', () => {
    it('ensures partner section uses honest placeholder archetypes and disclaimer', () => {
      const partnerSection = SECTION_REQUIREMENTS.find((s) => s.id === 'partners');
      expect(partnerSection).toBeDefined();
      expect(partnerSection?.placeholderKeywords.length).toBeGreaterThan(0);
      expect(partnerSection?.cta).toBeDefined();
    });

    it('prohibits arbitrary fabricated enterprise brands from unverified claims', () => {
      // Forbidden fabricated brands in public claims without official contracts
      const forbiddenFabrications = [
        'FPT Telecom',
        'Viettel Solutions',
        'VNG Corporation',
        'Techcombank Securities',
        'Shopee Vietnam',
        'Google Cloud Partner Official',
        'Microsoft Vietnam Official Sponsor',
      ];

      // Verifies that fixtures and requirement definitions do not fabricate these brands
      const serialized = JSON.stringify(SECTION_REQUIREMENTS);
      for (const brand of forbiddenFabrications) {
        expect(serialized).not.toContain(brand);
      }
    });
  });

  describe('Prize Structure Integrity', () => {
    it('verifies awards focus on genuine opportunities, mentorship, and transparent prize notes', () => {
      const awardSection = SECTION_REQUIREMENTS.find((s) => s.id === 'awards');
      expect(awardSection).toBeDefined();
      expect(awardSection?.perks).toContain('Cơ hội Việc làm');
      expect(awardSection?.perks).toContain('Mentorship');
      expect(awardSection?.perks).toContain('Chứng nhận');
      expect(awardSection?.perks).toContain('Ươm mầm');
    });

    it('prohibits unauthorized hardcoded cash amounts presented as final', () => {
      // Must not claim unconfirmed monetary numbers like "Tổng giải thưởng 500 triệu"
      const serialized = JSON.stringify(SECTION_REQUIREMENTS);
      expect(serialized).not.toContain('500.000.000');
      expect(serialized).not.toContain('1.000.000.000');
    });
  });

  describe('3-Week Timeline Relative Structure', () => {
    it('enforces relative sprint milestones rather than rigid unconfirmed dates', () => {
      const timelineSection = SECTION_REQUIREMENTS.find((s) => s.id === 'timeline');
      expect(timelineSection).toBeDefined();
      expect(timelineSection?.weeks).toHaveLength(3);
      expect(timelineSection?.weeks[0].title).toBe('Understand & Design');
      expect(timelineSection?.weeks[1].title).toBe('Build & Validate');
      expect(timelineSection?.weeks[2].title).toBe('Polish & Demo');
    });
  });

  describe('11 Sections Specification Coverage', () => {
    it('defines specifications for all 11 mandatory landing page sections', () => {
      expect(SECTION_REQUIREMENTS).toHaveLength(11);
      const sectionIds = SECTION_REQUIREMENTS.map((s) => s.id);
      expect(sectionIds).toEqual([
        'hero',
        'the-idea',
        'stakeholders',
        'timeline',
        'challenges',
        'build-with-ai',
        'partners',
        'evaluation',
        'awards',
        'faq',
        'final-cta',
      ]);
    });
  });

  describe('Navigation Anchor Coverage', () => {
    it('defines 7 standard navigation anchor targets corresponding to sections', () => {
      expect(NAV_ANCHORS).toHaveLength(7);
      expect(NAV_ANCHORS).toContain('#the-idea');
      expect(NAV_ANCHORS).toContain('#students');
      expect(NAV_ANCHORS).toContain('#business');
      expect(NAV_ANCHORS).toContain('#education');
      expect(NAV_ANCHORS).toContain('#timeline');
      expect(NAV_ANCHORS).toContain('#partners');
      expect(NAV_ANCHORS).toContain('#faq');
    });
  });
});
