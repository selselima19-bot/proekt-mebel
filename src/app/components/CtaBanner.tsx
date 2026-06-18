/*
  Этот файл показывает призыв к действию (баннер CTA).
  Он предлагает быстрый контакт для подбора мебели под конкретный бюджет и сроки.
  Пользователь может отправить заявку и получить персональные варианты.
*/

import Link from 'next/link';

export default function CtaBanner() {
  return (
    <section className="cta-banner">
      <div className="cta-banner__content">
        <p className="cta-kicker">Быстрый подбор за 30 минут</p>
        <h2>Подберем комплект мебели под ваш интерьер и бюджет</h2>
        <p>
          Оставьте заявку, и менеджер предложит 3 подходящих решения с понятной
          стоимостью и сроками доставки.
        </p>
        <Link href="/contacts" className="hero-btn">
          Получить подбор
        </Link>
      </div>
    </section>
  );
}
