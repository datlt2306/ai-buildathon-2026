import React from 'react';

export const DuskHeroRun: React.FC = () => {
  return (
    <div className="clear today" aria-label="Tóm tắt thông tin cuộc thi AI Buildathon 2026">
      <div className="today__head">
        <div>
          <p className="today__title">AI Buildathon 2026</p>
          <p className="today__date">03 tuần từ bài toán thực tế đến sản phẩm MVP</p>
        </div>
        <dl className="today__temps">
          <div>
            <dt>Quy mô</dt>
            <dd className="num">20–25</dd>
          </div>
          <div>
            <dt>Mỗi đội</dt>
            <dd className="num">~3 bạn</dd>
          </div>
        </dl>
      </div>

      <div className="slots">
        <div className="slot">
          <span className="slot__mark" aria-hidden="true">01</span>
          <div className="slot__name">
            <span>Sinh viên dự thi</span>
            <small>Đội khoảng 3 bạn hoặc cá nhân ghép đội</small>
          </div>
          <span className="slot__state">Đang mở</span>
        </div>

        <div className="slot">
          <span className="slot__mark" aria-hidden="true">02</span>
          <div className="slot__name">
            <span>Đề bài doanh nghiệp</span>
            <small>Bài toán nghiệp vụ thật, không lý thuyết</small>
          </div>
          <span className="slot__state">Đặt hàng</span>
        </div>

        <div className="slot">
          <span className="slot__mark" aria-hidden="true">03</span>
          <div className="slot__name">
            <span>Bootcamp & Mentor</span>
            <small>Hướng dẫn kỹ thuật và phản biện 1-1</small>
          </div>
          <span className="slot__state">Đồng hành</span>
        </div>

        <div className="slot">
          <span className="slot__mark" aria-hidden="true">04</span>
          <div className="slot__name">
            <span>Sản phẩm đầu ra</span>
            <small>MVP có giao diện, đưa vào portfolio</small>
          </div>
          <span className="slot__state">Demo Day</span>
        </div>
      </div>

      <div className="today__foot">
        <div>
          <span className="text-xs text-muted block">Lệ phí tham gia</span>
          <span className="text-xl font-display font-medium text-ink">0đ <small className="text-xs text-accent font-normal">Miễn phí 100%</small></span>
        </div>
        <a className="btn btn--sm" href="#register">
          Đăng ký ngay
        </a>
      </div>
    </div>
  );
};
