/*
  Этот файл показывает полноэкранный слайдер (герой).
  Он выводит видео-экран с основным предложением и кнопками для быстрого перехода.
  Пользователь сразу видит ценность бренда и может перейти в каталог или на консультацию.
*/
'use client';

import Link from 'next/link';

export default function HeroSlider() {
  return (
    <section className="hero-slider">
      <div className="hero-slide active">
        {/* Основное видео для крупных экранов, которое задает тон первого экрана. */}
        <video
          className="hero-slide-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/фото с 1.jpg"
        >
          <source src="/Generisanje_video_snimka_visokog_kvaliteta.mp4" type="video/mp4" />
        </video>

        {/* Статичный кадр для мобильных и пользователей с ограничением анимации. */}
        <div className="hero-slide-fallback" aria-hidden="true" />

        <div className="hero-overlay" />

        <div className="hero-content">
          <h1 className="hero-title">Мебель под ваш интерьер,<br />без долгих поисков</h1>
          <p className="hero-subtitle">
            Подберем диваны, кресла и кровати под планировку, бюджет и удобный срок доставки.
          </p>
          <div className="hero-actions">
            <Link href="/catalog" className="hero-btn hero-btn--primary">Подобрать мебель</Link>
            <Link href="/contacts" className="hero-btn hero-btn--outline">Консультация</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
