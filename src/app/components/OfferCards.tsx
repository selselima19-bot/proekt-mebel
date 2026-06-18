/*
Этот файл показывает сетку карточек с основными направлениями мебели.
Он выводит категории с изображениями и коротким действием для перехода в нужный раздел.
Пользователь может открыть интересующую категорию и перейти в каталог или на тематическую страницу.
*/
'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, useCallback } from 'react';

/* ── Слайдер картинок ── */
function ImageSlider({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    timer.current = setTimeout(next, 3200);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [current, next]);

  const goTo = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (timer.current) clearTimeout(timer.current);
    setCurrent(idx);
  };

  return (
    <>
      {images.map((src, i) => (
        <div
          key={src}
          className="offer-card__image offer-card__slide"
          style={{
            backgroundImage: `url('${src}')`,
            opacity: i === current ? 1 : 0,
            transition: 'opacity 0.7s ease',
            position: i === 0 ? 'relative' : 'absolute',
            inset: 0,
          }}
        />
      ))}
      {/* Точки-индикаторы */}
      <div className="offer-slider-dots" onClick={(e) => e.preventDefault()}>
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`offer-slider-dot${i === current ? ' offer-slider-dot--active' : ''}`}
            onClick={(e) => goTo(e, i)}
            aria-label={`Слайд ${i + 1}`}
          />
        ))}
      </div>
    </>
  );
}

type OfferCardItem = {
  id: number;
  title: string;
  cta: string;
  image: string;
  href: string;
  hoverTone: string;
  layout: 'hero' | 'wide' | 'standard';
  images?: string[];
  slideDir?: 'left' | 'right';
  inlineImage?: string;
};

function hasSliderImages(offer: OfferCardItem): offer is OfferCardItem & { images: string[] } {
  return Array.isArray(offer.images) && offer.images.length > 1;
}

export default function OfferCards() {
  // Здесь храним, какие карточки уже появились на экране и должны анимироваться.
  const [visibleCards, setVisibleCards] = useState<Record<number, boolean>>({});
  // Здесь держим ссылки на DOM-элементы карточек для наблюдения за их появлением.
  const cardRefs = useRef<Record<number, HTMLAnchorElement | null>>({});

  // Список карточек категорий, который выводится на главной странице.
  const offers: OfferCardItem[] = [
    {
      id: 1,
      title: 'Угловые диваны',
      cta: 'Смотреть коллекцию',
      image: '/фото с 1.jpg',
      images: [
        '/фото с 1.jpg',
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1000&q=80',
      ],
      href: '/furniture/corner-sofas',
      hoverTone: 'preview-warm',
      layout: 'hero',
    },
    {
      id: 2,
      title: 'Диваны',
      cta: 'Перейти в раздел',
      image: '/фото с 2.jpg',
      images: [
        '/фото с 2.jpg',
        'https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=1000&q=80',
      ],
      href: '/furniture/sofas',
      hoverTone: 'preview-cool',
      layout: 'wide',
    },
    {
      id: 3,
      title: 'Модульная мебель',
      cta: 'Собрать вариант',
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80',
      href: '/furniture/modular',
      hoverTone: 'preview-olive',
      layout: 'standard',
      slideDir: 'left' as const,
    },
    {
      id: 4,
      title: 'Комплекты мебели',
      cta: 'Посмотреть наборы',
      image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1000&q=80',
      href: '/furniture/sets',
      hoverTone: 'preview-rose',
      layout: 'standard',
      slideDir: 'right' as const,
    },
    {
      id: 5,
      title: 'Кровати',
      cta: 'Открыть модели',
      image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1000&q=80',
      href: '/furniture/beds',
      hoverTone: 'preview-sand',
      layout: 'standard',
    },
    {
      id: 6,
      title: 'Кресла',
      cta: 'Выбрать кресло',
      image: '/фото к 1.jpg',
      href: '/furniture/chairs',
      hoverTone: 'preview-night',
      layout: 'standard',
    },
    {
      id: 7,
      title: 'Пуфы',
      cta: 'Смотреть пуфы',
      image: '/фото к2.jpg',
      href: '/furniture/poufs',
      hoverTone: 'preview-emerald',
      layout: 'standard',
    },
    {
      id: 8,
      title: 'Онлайн-каталог',
      cta: 'Открыть каталог',
      image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1000&q=80',
      href: '/catalog',
      hoverTone: 'preview-sky',
      layout: 'standard',
    },
    {
      id: 9,
      title: 'Производство мебели',
      cta: 'Подробнее',
      image: '/фото т 2.jpg',
      href: '/production',
      hoverTone: 'preview-violet',
      layout: 'wide',
    },
    {
      id: 10,
      title: 'Коллекция Tabou',
      cta: 'Перейти в Tabou',
      image: '/фото т 1.jpg',
      href: '/tabou',
      hoverTone: 'preview-amber',
      layout: 'hero',
    },
  ];

  // Сохраняем ссылку на карточку по ее id, чтобы потом отслеживать появление карточки.
  const setCardRef = (id: number) => (element: HTMLAnchorElement | null) => {
    cardRefs.current[id] = element;
  };

  // Когда карточка попадает в экран, плавно показываем ее и больше не наблюдаем за ней.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = Number((entry.target as HTMLElement).dataset.offerId);
          if (!id || Number.isNaN(id)) return;
          setVisibleCards((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    Object.values(cardRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    // Основной визуальный блок с категориями и интерактивными карточками.
    <section className="offer-cards" aria-labelledby="offer-cards-title">
      <div className="offer-cards-shell">
        <div className="offer-cards-intro">
          <h2 id="offer-cards-title" className="offer-cards-intro__title">
            Категории мебели
          </h2>
        </div>

        <div className="offer-cards-container">
          {offers.map((offer, index) => {
            const hasSlider = hasSliderImages(offer);
            return (
              <Link
                key={offer.id}
                href={offer.href}
                ref={setCardRef(offer.id)}
                data-offer-id={offer.id}
                className={`offer-card ${offer.hoverTone} offer-card--${offer.layout} ${
                  visibleCards[offer.id]
                    ? 'offer-card--visible'
                    : 'slideDir' in offer && offer.slideDir === 'left'
                    ? 'offer-card--hidden-left'
                    : 'slideDir' in offer && offer.slideDir === 'right'
                    ? 'offer-card--hidden-right'
                    : 'offer-card--hidden'
                }`}
                style={{ transitionDelay: visibleCards[offer.id] ? `${index * 65}ms` : '0ms' }}
              >
                <div className="offer-card__media" aria-hidden="true">
                  {hasSlider ? (
                    <ImageSlider images={offer.images} />
                  ) : (
                    <div
                      className="offer-card__image"
                      style={{ backgroundImage: `url('${offer.image}')` }}
                    />
                  )}
                  <div className="offer-card__glow" />
                </div>

                <div className="offer-card__content">
                  <div className="offer-card__body">
                    <h3 className="offer-card__title">{offer.title}</h3>
                    {'inlineImage' in offer && offer.inlineImage && (
                      <div
                        className="offer-card__inline-img"
                        style={{ backgroundImage: `url('${offer.inlineImage}')` }}
                      />
                    )}
                  </div>

                  <div className="offer-card__footer">
                    <span className="offer-card__cta">
                      <span>{offer.cta}</span>
                      <span aria-hidden="true" className="offer-card__cta-icon">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
