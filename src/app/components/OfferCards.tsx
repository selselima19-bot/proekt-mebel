'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const COLORS = {
  beige:     { name: 'Бежевый',   hex: '#C4A882' },
  grey:      { name: 'Серый',     hex: '#8B8B8B' },
  anthracite:{ name: 'Антрацит',  hex: '#3C3C3C' },
  blue:      { name: 'Синий',     hex: '#4A6FA5' },
  green:     { name: 'Зелёный',   hex: '#5B7A61' },
  terracotta:{ name: 'Терракот',  hex: '#C2714F' },
  brown:     { name: 'Коричневый',hex: '#6B4226' },
  mustard:   { name: 'Горчичный', hex: '#C4962A' },
  white:     { name: 'Молочный',  hex: '#E8E4DF' },
  gold:      { name: 'Золотой',   hex: '#C9A84C' },
  burgundy:  { name: 'Бордо',     hex: '#7A2B35' },
};

export default function OfferCards() {
  const [visibleCards, setVisibleCards] = useState<Record<number, boolean>>({});
  const [selectedColors, setSelectedColors] = useState<Record<number, string>>({});
  const cardRefs = useRef<Record<number, HTMLAnchorElement | null>>({});

  const offers = [
    {
      id: 1,
      title: 'Угловые диваны',
      cta: 'Смотреть коллекцию',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
      href: '/furniture/corner-sofas',
      hoverTone: 'preview-warm',
      layout: 'hero',
      colors: [COLORS.beige, COLORS.grey, COLORS.anthracite, COLORS.blue],
    },
    {
      id: 2,
      title: 'Диваны',
      cta: 'Перейти в раздел',
      image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1000&q=80',
      href: '/furniture/sofas',
      hoverTone: 'preview-cool',
      layout: 'wide',
      colors: [COLORS.beige, COLORS.green, COLORS.terracotta, COLORS.grey],
    },
    {
      id: 3,
      title: 'Модульная мебель',
      cta: 'Собрать вариант',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
      href: '/furniture/modular',
      hoverTone: 'preview-olive',
      layout: 'standard',
      slideDir: 'left' as const,
      colors: [COLORS.beige, COLORS.grey, COLORS.anthracite, COLORS.brown],
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
      colors: [COLORS.beige, COLORS.grey, COLORS.blue, COLORS.green],
    },
    {
      id: 5,
      title: 'Кровати',
      cta: 'Открыть модели',
      image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1000&q=80',
      href: '/furniture/beds',
      hoverTone: 'preview-sand',
      layout: 'standard',
      colors: [COLORS.white, COLORS.beige, COLORS.grey, COLORS.anthracite],
    },
    {
      id: 6,
      title: 'Кресла',
      cta: 'Выбрать кресло',
      image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=1000&q=80',
      href: '/furniture/chairs',
      hoverTone: 'preview-night',
      layout: 'standard',
      colors: [COLORS.mustard, COLORS.blue, COLORS.green, COLORS.terracotta],
    },
    {
      id: 7,
      title: 'Пуфы',
      cta: 'Смотреть пуфы',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
      href: '/furniture/poufs',
      hoverTone: 'preview-emerald',
      layout: 'standard',
      colors: [COLORS.terracotta, COLORS.green, COLORS.beige, COLORS.mustard],
    },
    {
      id: 8,
      title: 'Онлайн-каталог',
      cta: 'Открыть каталог',
      image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1000&q=80',
      href: '/catalog',
      hoverTone: 'preview-sky',
      layout: 'standard',
      colors: [COLORS.beige, COLORS.grey, COLORS.blue, COLORS.anthracite],
    },
    {
      id: 9,
      title: 'Как создается мебель',
      cta: 'Узнать процесс',
      image: 'https://images.unsplash.com/photo-1565193566173-7ace0ee75741?auto=format&fit=crop&w=1000&q=80',
      href: '/production',
      hoverTone: 'preview-violet',
      layout: 'wide',
      colors: [COLORS.brown, COLORS.beige, COLORS.grey, COLORS.anthracite],
    },
    {
      id: 10,
      title: 'Коллекция Tabou',
      cta: 'Перейти в Tabou',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
      href: '/tabou',
      hoverTone: 'preview-amber',
      layout: 'hero',
      colors: [COLORS.gold, COLORS.anthracite, COLORS.beige, COLORS.burgundy],
    },
  ];

  const setCardRef = (id: number) => (element: HTMLAnchorElement | null) => {
    cardRefs.current[id] = element;
  };

  const handleColorPick = (e: React.MouseEvent, cardId: number, hex: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedColors((prev) =>
      prev[cardId] === hex ? { ...prev, [cardId]: '' } : { ...prev, [cardId]: hex }
    );
  };

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
    <section className="offer-cards" aria-labelledby="offer-cards-title">
      <div className="offer-cards-shell">
        <div className="offer-cards-intro">
          <h2 id="offer-cards-title" className="offer-cards-intro__title">
            Категории мебели
          </h2>
        </div>

        <div className="offer-cards-container">
          {offers.map((offer) => {
            const activeTint = selectedColors[offer.id] || '';
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
                style={{ transitionDelay: `${offer.id * 60}ms` }}
              >
                <div className="offer-card__media" aria-hidden="true">
                  <div
                    className="offer-card__image"
                    style={{ backgroundImage: `url('${offer.image}')` }}
                  />
                  {activeTint && (
                    <div
                      className="offer-card__color-tint"
                      style={{ backgroundColor: activeTint }}
                    />
                  )}
                  <div className="offer-card__glow" />
                </div>

                <div className="offer-card__content">
                  <div className="offer-card__body">
                    <h3 className="offer-card__title">{offer.title}</h3>
                  </div>

                  <div className="offer-card__footer">
                    <div className="offer-card__swatches">
                      {offer.colors.map((color) => (
                        <button
                          key={color.hex}
                          type="button"
                          className={`offer-card__swatch${activeTint === color.hex ? ' offer-card__swatch--active' : ''}`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                          onClick={(e) => handleColorPick(e, offer.id, color.hex)}
                        />
                      ))}
                    </div>

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
