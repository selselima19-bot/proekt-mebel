import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function ContactsPage() {
  return (
    <>
      <Navigation />

      <div className="inner-hero inner-hero--short">
        <div className="inner-hero__content">
          <p className="inner-hero__eyebrow">Связь</p>
          <h1 className="inner-hero__title">Свяжитесь с нами</h1>
          <p className="inner-hero__sub">Мы всегда рады обсудить ваш проект или помочь с подбором мебели.</p>
        </div>
      </div>

      <main className="page-content">

        {/* Три блока контактов */}
        <section className="contact-grid">
          <article className="contact-card">
            <div className="contact-card__icon">📍</div>
            <h2>Главный офис</h2>
            <p>г. Варшава, ул. Меркего, 21</p>
            <p>Пн–Пт 10:00–19:00, Сб 10:00–17:00</p>
          </article>
          <article className="contact-card">
            <div className="contact-card__icon">📞</div>
            <h2>Телефон и WhatsApp</h2>
            <p><a href="tel:+48777777777">+48 777 777 777</a></p>
            <p><a href="https://wa.me/48777777777" target="_blank" rel="noopener">Написать в WhatsApp</a></p>
          </article>
          <article className="contact-card">
            <div className="contact-card__icon">✉️</div>
            <h2>Email</h2>
            <p><a href="mailto:info@meblepro.pl">info@meblepro.pl</a></p>
            <p>Ответим в течение часа</p>
          </article>
        </section>

        {/* Салоны */}
        <section className="showrooms">
          <h2 className="showrooms__title">Наши салоны</h2>
          <div className="showrooms__grid">
            <article className="showroom-card">
              <h3>Варшава</h3>
              <p>ул. Меркего, 21</p>
              <p className="showroom-card__hours">Пн–Пт 10:00–19:00</p>
            </article>
            <article className="showroom-card">
              <h3>Краков</h3>
              <p>ул. Дзика, 8</p>
              <p className="showroom-card__hours">Пн–Пт 10:00–18:00</p>
            </article>
            <article className="showroom-card">
              <h3>Познань</h3>
              <p>ул. Коперника, 15</p>
              <p className="showroom-card__hours">Пн–Сб 10:00–18:00</p>
            </article>
          </div>
        </section>

        {/* Форма */}
        <section className="contact-form-section">
          <div className="contact-form-wrap">
            <div className="contact-form-info">
              <h2>Напишите нам</h2>
              <p>Оставьте заявку и менеджер свяжется с вами в течение 30 минут и предложит готовые решения под ваш бюджет.</p>
              <ul className="contact-form-perks">
                <li>Бесплатная консультация дизайнера</li>
                <li>3 варианта под ваш интерьер</li>
                <li>Доставка и сборка включены</li>
              </ul>
            </div>
            <form className="contact-form">
              <label>
                Имя
                <input type="text" name="name" placeholder="Ваше имя" />
              </label>
              <label>
                Телефон
                <input type="tel" name="phone" placeholder="+48 000 000 000" />
              </label>
              <label>
                Email
                <input type="email" name="email" placeholder="you@example.com" />
              </label>
              <label>
                Сообщение
                <textarea name="message" rows={4} placeholder="Расскажите о вашем проекте" />
              </label>
              <button type="submit" className="hero-btn hero-btn--primary">Отправить заявку</button>
            </form>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
