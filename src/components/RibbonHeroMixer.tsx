import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface AIModel {
  id: string;
  name: string;
  latency: string;
}

export const RibbonHeroMixer: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<string>('gemini');

  const models: AIModel[] = [
    { id: 'gemini', name: 'Gemini 2.0 Flash', latency: '190ms' },
    { id: 'gpt', name: 'GPT-4o mini', latency: '220ms' },
    { id: 'claude', name: 'Claude 3.5 Haiku', latency: '240ms' },
  ];

  const stages = [
    {
      num: '01',
      title: 'Đề bài từ Doanh nghiệp',
      desc: '6 nhóm bài toán thực tiễn cần giải quyết',
      state: 'Xác nhận',
    },
    {
      num: '02',
      title: 'Mentor đồng hành 1-1',
      desc: 'Cố vấn giải pháp kỹ thuật và phản biện',
      state: 'Hàng tuần',
    },
    {
      num: '03',
      title: 'Đầu ra sản phẩm MVP',
      desc: 'Có giao diện sử dụng được & demo trực tiếp',
      state: 'Demo Day',
    },
  ];

  return (
    <div className="mixer" role="region" aria-label="Bảng điều phối cuộc thi AI Buildathon 2026">
      {/* Header */}
      <div className="mixer__head">
        <div>
          <h2 className="mixer__title">Bảng điều phối cuộc thi</h2>
          <p className="mixer__sub">Hành trình 03 tuần từ đề bài đến MVP</p>
        </div>
        <div className="status-pill">
          <span className="status-dot" aria-hidden="true" />
          <span>ĐANG NHẬN ĐƠN</span>
        </div>
      </div>

      {/* AI Model Selector */}
      <div className="model-bar">
        <div className="model-bar__head">
          <span className="model-bar__label">Mô hình AI gợi ý sử dụng:</span>
          <span className="model-bar__free">Ưu tiên 0đ chi phí</span>
        </div>

        <div className="model-grid" role="radiogroup" aria-label="Lựa chọn mô hình AI gợi ý">
          {models.map((model) => {
            const isSelected = selectedModel === model.id;
            return (
              <button
                key={model.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setSelectedModel(model.id)}
                className={`model-card ${isSelected ? 'is-selected' : ''}`}
              >
                <span className="model-card__name">{model.name}</span>
                <span className="model-card__latency">{model.latency}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3 Step Stages */}
      <div className="stage-list">
        {stages.map((st) => (
          <div key={st.num} className="stage-card">
            <div className="stage-card__lead">
              <span className="stage-card__num" aria-hidden="true">
                {st.num}
              </span>
              <div className="stage-card__info">
                <p className="stage-card__title">{st.title}</p>
                <p className="stage-card__desc">{st.desc}</p>
              </div>
            </div>
            <span className="stage-card__state">{st.state}</span>
          </div>
        ))}
      </div>

      {/* Bottom CTA Button */}
      <a href="#register" className="mixer__cta">
        <span className="mixer__cta-label whitespace-nowrap">
          Đăng ký tham gia (Nhóm 3–5 hoặc Cá nhân ghép đội)
        </span>
        <span className="mixer__cta-action whitespace-nowrap">
          Đăng ký ngay
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </a>
    </div>
  );
};
