/*
  Этот файл показывает полноэкранный слайдер (герой).
  Он выводит одно большое видео на первом экране.
  Пользователь видит видео сразу при открытии страницы.
*/

export default function HeroSlider() {
  return (
    /* Главный блок с единственным видео на весь экран. */
    <section className="hero-slider">
      {/* Видео из папки public, которое всегда показывается на главной. */}
      <div className="hero-slide active" role="img" aria-label="Главный экран с видео">
        {/* Видео из папки public как фон для главного экрана. */}
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
      </div>
    </section>
  );
}
