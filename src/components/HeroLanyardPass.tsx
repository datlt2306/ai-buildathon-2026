import React, { useState, useEffect } from 'react';
import Lanyard from './Lanyard';

export const HeroLanyardPass: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  return (
    <div
      className="lanyard-stage relative w-full h-[600px] sm:h-[680px] lg:h-[760px] xl:h-[820px] flex items-center justify-center overflow-visible touch-none col-span-12 lg:col-span-5"
      role="region"
      aria-label="Thẻ tham dự 3D tương tác AI Buildathon 2026"
    >
      {prefersReducedMotion ? (
        /* Static High-Fidelity Fallback for Reduced Motion users */
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
          <img
            src="/assets/lanyard/card-front.svg"
            alt="AI Buildathon 2026 Participant Pass"
            className="max-h-[500px] w-auto rounded-3xl"
          />
        </div>
      ) : (
        <Lanyard
          frontImage="/assets/lanyard/card-front.svg"
          backImage="/assets/lanyard/card-back.svg"
          strapImage="/assets/lanyard/lanyard-strap.svg"
          cardColor="#0d0c18"
          orientation="portrait"
          finish="holographic"
          metal="graphite"
          cornerRadius={0.25}
          size={isMobile ? 0.58 : 0.65}
          anchor="center"
          strapLength={0.24}
          strapWidth={0.65}
          strapColor="#100e20"
          gravity={0.85}
          damping={0.52}
          elasticity={0.46}
          breeze={0.32}
          interactive={true}
          intro={true}
          className="w-full h-full"
        />
      )}
    </div>
  );
};

export default HeroLanyardPass;
