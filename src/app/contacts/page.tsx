/*
Этот файл определяет страницу контактов.
Он показывает, как связаться с компанией, где находятся салоны и как отправить заявку.
Пользователь может быстро выбрать удобный способ связи и получить консультацию.
*/
'use client';

import { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function ContactsPage() {
  // Здесь храним введенные данные, чтобы человек видел свои значения до отправки.
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  // Здесь храним короткие подсказки об ошибках по каждому полю.
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  // Этот флаг показывает, что заявка успешно отправлена.
  const [isSent, setIsSent] = useState(false);
  // Этот флаг временно блокирует кнопку во время отправки.
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Обновляем конкретное поле формы, когда человек вводит данные.
  function handleFieldChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  // Проверяем обязательные поля перед отправкой заявки.
  function validateForm() {
    const nextErrors: Partial<typeof form> = {};

    if (!form.name.trim()) nextErrors.name = 'Введите имя';
    if (!form.phone.trim()) nextErrors.phone = 'Введите телефон';
    if (!form.email.trim() || !form.email.includes('@')) {
      nextErrors.email = 'Введите корректный email';
    }
    if (!form.message.trim()) nextErrors.message = 'Добавьте короткое описание задачи';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  // Отправляем заявку и показываем подтверждение без перезагрузки страницы.
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSent(false);
    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setIsSubmitting(false);
    setIsSent(true);
    setForm({ name: '', phone: '', email: '', message: '' });
  }

  return (
    <>
      <Navigation />

      <div className="inner-hero inner-hero--short">
        <div className="inner-hero__content">
          <p className="inner-hero__eyebrow">Связь</p>
          <h1 className="inner-hero__title">Свяжитесь с нами</h1>
          <p className="inner-hero__sub">Мы всегда рады обсудить ваш проект или помочь с подбором мебели.</p>
          {/* Кнопки быстрого перехода к самым частым запросам клиентов. */}
          <div className="inner-hero__actions">
            <a href="#contact-form" className="inner-hero__quick-btn">Замеры</a>
            <a href="#showrooms" className="inner-hero__quick-btn">Доставка</a>
            <a href="tel:+48777777777" className="inner-hero__quick-btn">Консультация</a>
          </div>
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
        <section className="showrooms" id="showrooms">
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
        <section className="contact-form-section" id="contact-form">
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
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              {isSent ? (
                <p className="contact-form__success" role="status">
                  Заявка отправлена. Мы свяжемся с вами в ближайшее время.
                </p>
              ) : null}
              <label>
                Имя
                <input
                  type="text"
                  name="name"
                  placeholder="Ваше имя"
                  value={form.name}
                  onChange={handleFieldChange}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                />
                {errors.name ? (
                  <span className="contact-form__error" id="contact-name-error">
                    {errors.name}
                  </span>
                ) : null}
              </label>
              <label>
                Телефон
                <input
                  type="tel"
                  name="phone"
                  placeholder="+48 000 000 000"
                  value={form.phone}
                  onChange={handleFieldChange}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                />
                {errors.phone ? (
                  <span className="contact-form__error" id="contact-phone-error">
                    {errors.phone}
                  </span>
                ) : null}
              </label>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleFieldChange}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                />
                {errors.email ? (
                  <span className="contact-form__error" id="contact-email-error">
                    {errors.email}
                  </span>
                ) : null}
              </label>
              <label>
                Сообщение
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Расскажите о вашем проекте"
                  value={form.message}
                  onChange={handleFieldChange}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                />
                {errors.message ? (
                  <span className="contact-form__error" id="contact-message-error">
                    {errors.message}
                  </span>
                ) : null}
              </label>
              <button type="submit" className="hero-btn hero-btn--primary" disabled={isSubmitting}>
                {isSubmitting ? 'Отправляем...' : 'Отправить заявку'}
              </button>
            </form>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
