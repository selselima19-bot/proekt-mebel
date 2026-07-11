/*
  Этот файл показывает коллекцию мебели Tabou.
  Он раскрывает сильные стороны премиальной линейки для разных форматов интерьера.
  Пользователь может понять ценность коллекции и перейти к детальному просмотру.
*/

import Link from 'next/link';
import Image from 'next/image';
import { assetPath } from '../lib/assetPath';

export default function TabouCollection() {
  return (
    /* Основной блок секции с презентацией коллекции Tabou. */
    <section className="tabou-section">
      <div className="tabou-container">
        <h2 className="tabou-title">Коллекция мебели Tabou</h2>
        <p className="tabou-subtitle">Премиальная линейка для современного дома</p>

        <div className="tabou-content">
          <div className="tabou-text">
            <p>
              Tabou создана для тех, кому важны долговечность, тактильный комфорт и
              аккуратная эстетика в каждой детали.
            </p>

            <p>
              В коллекции сочетаются выразительный дизайн, эргономика и материалы,
              рассчитанные на ежедневное использование без потери внешнего вида.
            </p>

            <p>
              Это выбор для интерьеров, где важны и визуальная чистота пространства,
              и удобство в реальной жизни.
            </p>

            <Link href="/tabou" className="tabou-btn">
              Смотреть коллекцию Tabou
            </Link>
          </div>

          <div className="tabou-gallery">
            <Image
              src={assetPath('/фото т 2.jpg')}
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
