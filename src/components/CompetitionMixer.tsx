import React, { useState } from 'react';

export const CompetitionMixer: React.FC = () => {
  const [faderLevels, setFaderLevels] = useState<{ [key: string]: number }>({
    weeks: 0.75,
    team: 0.6,
    free: 1.0,
  });

  const [activeCurvePoint, setActiveCurvePoint] = useState<number>(0.65);

  const handleFaderChange = (key: string, delta: number) => {
    setFaderLevels((prev) => ({
      ...prev,
      [key]: Math.min(1, Math.max(0.1, prev[key] + delta)),
    }));
  };

  return (
    <div className="mixer" role="group" aria-label="Bảng thông số cuộc thi AI Innovation Challenge">
      {/* Mixer Head */}
      <div className="mixer__head">
        <p className="mixer__title">AI Challenge 2026</p>
        <p className="mixer__status">
          <span className="led" aria-hidden="true" />
          <span>Đang mở đăng ký</span>
        </p>
      </div>

      {/* 3 Channels Recessed Bed */}
      <div className="mixer__channels">
        {/* Channel 1: Thời gian */}
        <div className="ch" data-ch="weeks" style={{ '--level': faderLevels.weeks } as React.CSSProperties}>
          <span className="ch__value">03</span>
          <div
            className="ch__fader"
            role="slider"
            tabIndex={0}
            aria-label="Thời gian thi đấu (tuần)"
            aria-valuemin={1}
            aria-valuemax={4}
            aria-valuenow={3}
            onKeyDown={(e) => {
              if (e.key === 'ArrowUp') handleFaderChange('weeks', 0.1);
              if (e.key === 'ArrowDown') handleFaderChange('weeks', -0.1);
            }}
          >
            <span className="ch__scale" />
            <span className="ch__slot">
              <span className="ch__glow" />
            </span>
            <span className="ch__cap" />
          </div>
          <span className="ch__name">Tuần thi đấu</span>
        </div>

        {/* Channel 2: Quy mô đội */}
        <div className="ch" data-ch="team" style={{ '--level': faderLevels.team } as React.CSSProperties}>
          <span className="ch__value">3-5</span>
          <div
            className="ch__fader"
            role="slider"
            tabIndex={0}
            aria-label="Thành viên mỗi đội thi"
            aria-valuemin={1}
            aria-valuemax={5}
            aria-valuenow={4}
            onKeyDown={(e) => {
              if (e.key === 'ArrowUp') handleFaderChange('team', 0.1);
              if (e.key === 'ArrowDown') handleFaderChange('team', -0.1);
            }}
          >
            <span className="ch__scale" />
            <span className="ch__slot">
              <span className="ch__glow" />
            </span>
            <span className="ch__cap" />
          </div>
          <span className="ch__name">Bạn / đội</span>
        </div>

        {/* Channel 3: Công cụ & Công nghệ */}
        <div className="ch" data-ch="free" style={{ '--level': faderLevels.free } as React.CSSProperties}>
          <span className="ch__value">Tự do</span>
          <div
            className="ch__fader"
            role="slider"
            tabIndex={0}
            aria-label="Công nghệ & Công cụ"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowUp') handleFaderChange('free', 0.1);
              if (e.key === 'ArrowDown') handleFaderChange('free', -0.1);
            }}
          >
            <span className="ch__scale" />
            <span className="ch__slot">
              <span className="ch__glow" />
            </span>
            <span className="ch__cap" />
          </div>
          <span className="ch__name">Sinh viên tự chọn</span>
        </div>
      </div>

      {/* Timeline Sprint Curve */}
      <div className="timer" style={{ '--t': activeCurvePoint } as React.CSSProperties}>
        <div className="timer__row">
          <span className="timer__label">Tiến độ 3 tuần</span>
          <span className="timer__value">Biến ý tưởng thành MVP</span>
        </div>
        <div
          className="timer__curve"
          role="slider"
          tabIndex={0}
          aria-label="Tiến độ cuộc thi"
          aria-valuemin={1}
          aria-valuemax={3}
          aria-valuenow={Math.round(activeCurvePoint * 3)}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = Math.max(0.1, Math.min(0.9, (e.clientX - rect.left) / rect.width));
            setActiveCurvePoint(clickPos);
          }}
        >
          <svg className="timer__svg" viewBox="0 0 300 56" preserveAspectRatio="none" focusable="false">
            <defs>
              <linearGradient id="fade-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="currentColor" stopOpacity="0.25" />
                <stop offset="1" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 8 C100 8, 140 18, 200 48 L300 52 L300 56 L0 56 Z"
              fill="url(#fade-fill)"
            />
            <path
              className="timer__line"
              d="M0 8 C100 8, 140 18, 200 48 L300 52"
              fill="none"
              stroke="currentColor"
            />
          </svg>
          <span className="timer__handle" style={{ left: `${activeCurvePoint * 100}%` }} />
        </div>
        <div className="timer__axis" aria-hidden="true">
          <span>Tuần 1: Thiết kế</span>
          <span>Tuần 2: Xây dựng</span>
          <span>Tuần 3: Demo Day</span>
        </div>
      </div>

      {/* Bottom CTA on the console */}
      <div>
        <a href="#register" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }}>
          Đăng ký tham gia ngay
        </a>
      </div>
    </div>
  );
};
