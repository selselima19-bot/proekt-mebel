/*
Этот файл определяет страницу "О нас".
Он показывает информацию о компании, подходе к качеству и сервисе.
Пользователь может узнать, чем занимается бренд и как строится работа с клиентом.
*/
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <>
      <Navigation />

      {/* Короткий вступительный экран с основным смыслом страницы. */}
      <div className="inner-hero inner-hero--short">
        <div className="inner-hero__content">
          <p className="inner-hero__eyebrow">О компании</p>
          <h1 className="inner-hero__title">MeblePro - мебель для комфортной жизни</h1>
          <p className="inner-hero__sub">
            Проектируем и подбираем мебельные решения для дома, квартиры и коммерческих пространств.
          </p>
        </div>
      </div>

      <main className="page-content">
        {/* Основные блоки с фактами о бренде и принципах работы. */}
        <section className="showrooms">
          <h2 className="showrooms__title">Почему выбирают нас</h2>
          <div className="showrooms__grid">
            <article className="showroom-card">
              <h3>Качество материалов</h3>
              <p>Используем прочные ткани, надежные каркасы и проверенную фурнитуру.</p>
            </article>
            <article className="showroom-card">
              <h3>Индивидуальный подбор</h3>
              <p>Подбираем конфигурации, размеры и цвет под конкретный интерьер.</p>
            </article>
            <article className="showroom-card">
              <h3>Сервис под ключ</h3>
              <p>Организуем консультацию, доставку, сборку и поддержку после покупки.</p>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
