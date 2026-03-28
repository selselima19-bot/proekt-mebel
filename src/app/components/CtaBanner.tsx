/*
  Этот файл показывает призыв к действию (баннер CTA).
  Выводит текст "Нужна помощь с выбором?" и кнопку "Написать нам".
  По клику пользователь переходит на страницу контактов.
*/

import Link from 'next/link';

export default function CtaBanner() {
  return (
    <section className="cta-banner">
      <div className="cta-banner__content">
        <p className="cta-kicker">Нужна помощь с выбором?</p>
        <h2>Соберём идеальный комплект для вашего дома</h2>
        <p>
          Оставьте заявку, и менеджер предложит 3 готовых решения под ваш
          бюджет и стиль.
        </p>
        <Link href="/contacts" className="hero-btn">
          Написать нам
        </Link>
      </div>
    </section>
  );
}
