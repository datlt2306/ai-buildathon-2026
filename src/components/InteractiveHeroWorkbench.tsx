import React, { useState } from 'react';
import { interactiveChallenges } from '../constants/landingData';
import { Terminal, ArrowRight, Play, CheckCircle2, Zap } from 'lucide-react';

export const InteractiveHeroWorkbench: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>('customer-ai');
  const [selectedModel, setSelectedModel] = useState<string>('Gemini 2.0 Flash');
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const activeChallenge = interactiveChallenges.find((c) => c.id === activeTabId) || interactiveChallenges[0];

  const handleSimulate = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 600);
  };

  return (
    <div className="w-full mt-10 panel overflow-hidden">
      {/* Machined Instrument Header Bar */}
      <div className="px-4 sm:px-6 py-3.5 hairline flex flex-wrap items-center justify-between gap-3 bg-paper-2">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-xs text-muted">Phòng thí nghiệm MVP thực chiến</span>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-paper border border-rule">
          {interactiveChallenges.map((challenge) => {
            const isActive = challenge.id === activeTabId;
            return (
              <button
                key={challenge.id}
                type="button"
                onClick={() => {
                  setActiveTabId(challenge.id);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-paper-3 text-ink font-semibold shadow-sm border border-rule-2'
                    : 'text-muted hover:text-ink'
                }`}
              >
                {challenge.category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Control Rack (4 columns) */}
        <div className="lg:col-span-4 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-rule bg-paper-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-muted">Thông số mô hình</span>
              <span className="text-xs font-mono text-accent">0đ (Free tier)</span>
            </div>

            {/* Model Selector */}
            <div className="space-y-2 mb-5">
              <label className="text-xs font-medium text-ink flex items-center justify-between">
                <span>Mô hình AI:</span>
                <span className="text-muted font-mono text-xs">{selectedModel}</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Gemini 2.0 Flash', 'GPT-4o mini', 'Claude 3.5 Haiku', 'Llama 3.3'].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setSelectedModel(m)}
                    className={`py-1.5 px-2.5 rounded-md text-xs font-mono text-left transition-colors ${
                      selectedModel === m
                        ? 'bg-accent-soft text-accent border border-accent/40 font-semibold'
                        : 'bg-paper text-muted border border-rule hover:text-ink'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Gauges & Faders */}
            <div className="space-y-4 pt-3 border-t border-rule">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted">Độ trễ API:</span>
                  <span className="font-mono text-ink">{activeChallenge.interactiveDemo.latency}</span>
                </div>
                <div className="h-1.5 rounded-full bg-paper overflow-hidden border border-rule">
                  <div className="h-full bg-accent rounded-full w-1/4" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted">Độ chính xác mục tiêu:</span>
                  <span className="font-mono text-ink">94%</span>
                </div>
                <div className="h-1.5 rounded-full bg-paper overflow-hidden border border-rule">
                  <div className="h-full bg-accent rounded-full w-11/12" />
                </div>
              </div>

              <div className="pt-2">
                <span className="text-xs text-muted block mb-1">Công nghệ gợi ý:</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeChallenge.tech.map((t, idx) => (
                    <span key={idx} className="font-mono text-xs px-2 py-0.5 rounded bg-paper border border-rule text-ink">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Trigger Button */}
          <div className="mt-6 pt-4 border-t border-rule">
            <button
              type="button"
              onClick={handleSimulate}
              disabled={isRunning}
              className="btn btn-primary w-full flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {isRunning ? (
                <>
                  <Zap className="w-4 h-4 animate-spin" />
                  <span>Đang xử lý mô hình…</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Chạy thử nghiệm sản phẩm</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Product Screen & Output (8 columns) */}
        <div className="lg:col-span-8 p-5 sm:p-6 bg-paper flex flex-col justify-between">
          <div>
            {/* Screen Header */}
            <div className="flex items-center justify-between pb-3 hairline mb-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-accent" />
                <h4 className="text-sm font-semibold text-ink">{activeChallenge.title}</h4>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-paper-2 border border-rule text-muted">
                {activeChallenge.difficulty}
              </span>
            </div>

            {/* Input & Output Preview */}
            <div className="space-y-4">
              {/* Input Card */}
              <div className="p-3.5 rounded-xl bg-paper-2 border border-rule">
                <span className="text-xs text-muted block mb-1">
                  Đầu vào từ người dùng thực tế:
                </span>
                <p className="text-xs sm:text-sm text-ink leading-relaxed">
                  {activeChallenge.interactiveDemo.previewContent}
                </p>
              </div>

              {/* Output Result Card */}
              <div className="p-4 rounded-xl bg-paper-3 border border-rule-2 shadow-inner">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-accent flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Kết quả xử lý AI tức thì
                  </span>
                  <span className="text-xs font-mono text-muted">
                    Thời gian: {isRunning ? '…' : activeChallenge.interactiveDemo.latency}
                  </span>
                </div>

                {isRunning ? (
                  <div className="py-6 flex items-center justify-center text-xs text-muted font-mono animate-pulse">
                    Mô hình đang sinh kết quả qua API…
                  </div>
                ) : (
                  <pre className="text-xs sm:text-sm text-ink font-sans whitespace-pre-wrap leading-relaxed font-normal">
                    {activeChallenge.interactiveDemo.outputSample}
                  </pre>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Value Note */}
          <div className="mt-5 pt-3 hairline flex flex-wrap items-center justify-between text-xs text-muted gap-2">
            <div>
              <span className="text-ink font-medium">Giá trị thực tiễn: </span>
              {activeChallenge.solution}
            </div>
            <a href="#challenges" className="text-accent hover:underline flex items-center gap-1 text-xs">
              Xem thêm các bài toán khác <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
