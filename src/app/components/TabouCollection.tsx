/*
  Этот файл показывает коллекцию мебели Tabou.
  Выводит описание премиум-коллекции с изображениями и текстом о качестве.
  Tabou - это премиум линия с элегантным дизайном и высокими тканями.
*/

import Link from 'next/link';
import Image from 'next/image';

export default function TabouCollection() {
  return (
    /* Основной блок секции с презентацией коллекции Tabou. */
    <section className="tabou-section">
      <div className="tabou-container">
        <h2 className="tabou-title">Коллекция мебели Tabou</h2>
        <p className="tabou-subtitle">Узнайте больше о мебели Tabou</p>

        <div className="tabou-content">
          <div className="tabou-text">
            <p>
              Коллекция Tabou – отличное качество и элегантность на первом месте. Для
              тех, кто ожидает от мебели «больше», приглашаем ознакомиться с уникальной
              коллекцией.
            </p>

            <p>
              Бренд Tabou предлагает оригинальный дизайн, высокий комфорт, замечательные
              детали и изысканные ткани, ориентированные на клиентов, ценящих сочетание
              качества, роскоши и современных решений.
            </p>

            <p>
              Благодаря высококачественным тканям мы создаем современные предложения
              мебели, оформленные в функциональные и дизайнерские текстили. Мебель Tabou
              выделяется элегантностью и безупречным видом.
            </p>

            <Link href="/tabou" className="tabou-btn">
              Подробнее о мебели Tabou
            </Link>
          </div>

          <div className="tabou-gallery">
            <Image
              src="/фото т 2.jpg"
              alt="Коллекция мебели Tabou"
              className="tabou-image"
              width={600}
              height={400}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
