/*
Этот файл показывает сетку карточек с основными направлениями мебели.
Он выводит категории с изображениями и коротким действием для перехода в нужный раздел.
Пользователь может открыть интересующую категорию и перейти в каталог или на тематическую страницу.
*/
'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, useCallback } from 'react';
import { assetBackground } from '../lib/assetPath';

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
            backgroundImage: assetBackground(src),
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
  // Флаг показывает, что экран мобильный и контент нужно выдавать компактно.
  const [isMobile, setIsMobile] = useState(false);
  // На мобильном эта кнопка раскрывает полный список категорий.
  const [showAllMobileCards, setShowAllMobileCards] = useState(false);
  // Здесь держим ссылки на DOM-элементы карточек для наблюдения за их появлением.
  const cardRefs = useRef<Record<number, HTMLAnchorElement | null>>({});
  // Храним id кадров анимации для плавного tilt-эффекта без лишних перерисовок.
  const frameRefs = useRef<Record<number, number | null>>({});
  // Флаг учитывает системное ограничение анимации у пользователя.
  const allowMotionRef = useRef(true);

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
      image: '/фото к2.jpg',
      href: '/furniture/chairs',
      hoverTone: 'preview-night',
      layout: 'standard',
    },
    {
      id: 7,
      title: 'Пуфы',
      cta: 'Смотреть пуфы',
      image: '/фото к 1.jpg',
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

  // На мобильном сначала показываем только ключевые направления, чтобы не перегружать экран.
  const offersForView = isMobile && !showAllMobileCards ? offers.slice(0, 6) : offers;

  // Сохраняем ссылку на карточку по ее id, чтобы потом отслеживать появление карточки.
  const setCardRef = (id: number) => (element: HTMLAnchorElement | null) => {
    cardRefs.current[id] = element;
  };

  // Сбрасываем наклон и блик карточки в нейтральное состояние.
  function resetCardTilt(id: number) {
    const card = cardRefs.current[id];
    if (!card) return;
    card.style.setProperty('--offer-tilt-x', '0deg');
    card.style.setProperty('--offer-tilt-y', '0deg');
    card.style.setProperty('--offer-shift-x', '0px');
    card.style.setProperty('--offer-shift-y', '0px');
    card.style.setProperty('--offer-sheen-x', '50%');
    card.style.setProperty('--offer-sheen-y', '50%');
    card.style.setProperty('--offer-sheen-opacity', '0');
  }

  // На движении курсора рассчитываем мягкий 3D-наклон и позицию блика.
  function handleCardPointerMove(id: number, event: React.PointerEvent<HTMLAnchorElement>) {
    if (!allowMotionRef.current || event.pointerType !== 'mouse') return;
    const card = cardRefs.current[id];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const clampedX = Math.min(1, Math.max(0, x));
    const clampedY = Math.min(1, Math.max(0, y));
    const rotateY = (clampedX - 0.5) * 7;
    const rotateX = (0.5 - clampedY) * 7;
    const shiftX = (clampedX - 0.5) * 8;
    const shiftY = (clampedY - 0.5) * 8;

    if (frameRefs.current[id]) {
      cancelAnimationFrame(frameRefs.current[id]!);
    }

    frameRefs.current[id] = requestAnimationFrame(() => {
      const activeCard = cardRefs.current[id];
      if (!activeCard) return;
      activeCard.style.setProperty('--offer-tilt-x', `${rotateX.toFixed(2)}deg`);
      activeCard.style.setProperty('--offer-tilt-y', `${rotateY.toFixed(2)}deg`);
      activeCard.style.setProperty('--offer-shift-x', `${shiftX.toFixed(2)}px`);
      activeCard.style.setProperty('--offer-shift-y', `${shiftY.toFixed(2)}px`);
      activeCard.style.setProperty('--offer-sheen-x', `${(clampedX * 100).toFixed(1)}%`);
      activeCard.style.setProperty('--offer-sheen-y', `${(clampedY * 100).toFixed(1)}%`);
      activeCard.style.setProperty('--offer-sheen-opacity', '1');
    });
  }

  // При уходе курсора плавно возвращаем карточку в спокойное положение.
  function handleCardPointerLeave(id: number) {
    if (frameRefs.current[id]) {
      cancelAnimationFrame(frameRefs.current[id]!);
      frameRefs.current[id] = null;
    }
    resetCardTilt(id);
  }

  // Определяем мобильный экран, чтобы упростить выдачу контента на главной.
  useEffect(() => {
    const query = window.matchMedia('(max-width: 768px)');
    function syncMobileMode() {
      setIsMobile(query.matches);
      if (!query.matches) {
        setShowAllMobileCards(false);
      }
    }
    syncMobileMode();
    query.addEventListener('change', syncMobileMode);
    return () => query.removeEventListener('change', syncMobileMode);
  }, []);

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
  }, [isMobile, showAllMobileCards]);

  // Слушаем системную настройку "уменьшить движение" и отключаем сложные эффекты при необходимости.
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const frameMap = frameRefs.current;
    allowMotionRef.current = !query.matches;
    function handleChange() {
      allowMotionRef.current = !query.matches;
      if (query.matches) {
        Object.keys(cardRefs.current).forEach((key) => resetCardTilt(Number(key)));
      }
    }
    query.addEventListener('change', handleChange);
    return () => {
      query.removeEventListener('change', handleChange);
      Object.values(frameMap).forEach((frameId) => {
        if (frameId) cancelAnimationFrame(frameId);
      });
    };
  }, []);

  return (
    // Основной визуальный блок с категориями и интерактивными карточками.
    <section className="offer-cards" aria-labelledby="offer-cards-title">
      <div className="offer-cards-shell">
        <div className="offer-cards-intro">
          <p className="offer-cards-intro__eyebrow">Каталог направлений</p>
          <h2 id="offer-cards-title" className="offer-cards-intro__title">
            Категории мебели
          </h2>
          <p className="offer-cards-intro__text">
            Подберите нужный раздел: от модульных решений до готовых комплектов для гостиной и спальни.
          </p>
        </div>

        <div className="offer-cards-container">
          {offersForView.map((offer, index) => {
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
                onPointerMove={(event) => handleCardPointerMove(offer.id, event)}
                onPointerLeave={() => handleCardPointerLeave(offer.id)}
                onPointerCancel={() => handleCardPointerLeave(offer.id)}
              >
                <div className="offer-card__media" aria-hidden="true">
                  {hasSlider ? (
                    <ImageSlider images={offer.images} />
                  ) : (
                    <div
                      className="offer-card__image"
                      style={{ backgroundImage: assetBackground(offer.image) }}
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
                        style={{ backgroundImage: assetBackground(offer.inlineImage) }}
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

        {/* На мобильном человек открывает оставшиеся карточки только если они ему реально нужны. */}
        {isMobile && !showAllMobileCards ? (
          <div className="offer-cards__more-wrap">
            <button
              type="button"
              className="offer-cards__more-btn"
              onClick={() => setShowAllMobileCards(true)}
            >
              Показать остальные категории
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
