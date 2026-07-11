/*
Этот файл определяет страницу коллекции Tabou.
Он показывает описание премиальной линейки и основные сильные стороны коллекции.
Пользователь может понять отличия коллекции и перейти к каталогу для выбора моделей.
*/
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { assetBackground } from '../lib/assetPath';

export default function TabouPage() {
  return (
    <>
      <Navigation />

      {/* Верхний блок с ключевым сообщением о коллекции Tabou. */}
      <div className="inner-hero" style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.35)), ${assetBackground('/фото т 2.jpg')}` }}>
        <div className="inner-hero__content">
          <p className="inner-hero__eyebrow">Коллекция Tabou</p>
          <h1 className="inner-hero__title">Премиальные решения для современного интерьера</h1>
          <p className="inner-hero__sub">
            Элегантный дизайн, продуманные детали и материалы высокого класса для ежедневного комфорта.
          </p>
        </div>
      </div>

      <main className="page-content">
        {/* Контентная часть с описанием преимуществ и ссылкой в каталог. */}
        <section className="catalog-section">
          <h2 className="catalog-section__title">Что выделяет линейку Tabou</h2>
          <div className="product-grid">
            <article className="product-card">
              <div className="product-card__info">
                <p>
                  Линейка Tabou создается для тех, кто ценит сочетание визуальной легкости и высокой износостойкости.
                </p>
                <p>
                  В центре внимания - комфорт посадки, долговечные ткани и дизайн, который остается актуальным надолго.
                </p>
                <p>
                  Коллекция хорошо подходит как для спокойных минималистичных интерьеров, так и для выразительных проектов.
                </p>
                <Link href="/catalog" className="product-card__btn">
                  Перейти в каталог
                </Link>
              </div>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
