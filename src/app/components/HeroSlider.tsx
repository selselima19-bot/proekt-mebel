/*
  Этот файл показывает полноэкранный слайдер (герой).
  Он выводит одно большое видео на первом экране.
  Пользователь видит видео сразу при открытии страницы.
*/

import Link from 'next/link';

export default function HeroSlider() {
  return (
    <section className="hero-slider">
      <div className="hero-slide active">
        <video
          className="hero-slide-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/Generisanje_video_snimka_visokog_kvaliteta.mp4" type="video/mp4" />
        </video>

        <div className="hero-overlay" />

        <div className="hero-content">
          <h1 className="hero-title">Создайте интерьер,<br />который вдохновляет</h1>
          <p className="hero-subtitle">Диваны, кресла и кровати из высококачественных материалов</p>
          <div className="hero-actions">
            <Link href="/catalog" className="hero-btn hero-btn--primary">Смотреть каталог</Link>
            <Link href="/contacts" className="hero-btn hero-btn--outline">Связаться с нами</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
