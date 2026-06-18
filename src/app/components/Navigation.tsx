/*
Этот файл определяет верхнюю навигацию сайта для всех страниц.
Он показывает логотип, переходы по разделам, кнопку корзины и контакты в выпадающем списке.
Пользователь может быстро перейти к нужной странице или открыть мобильное меню.
*/
'use client';

// Навигация сайта: верхняя панель + строка категорий + мобильное меню
// Кнопка соцсетей всегда видна (и на мобильном, и на десктопе)
// Дропдаун соцсетей закрывается при открытии мобильного меню

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function Navigation() {
  // Состояние мобильного меню (бургер-панель)
  const [isOpen, setIsOpen] = useState(false);
  // Состояние выпадающего списка соцсетей
  const [isSocialOpen, setIsSocialOpen] = useState(false);

  // Ссылка на блок соцсетей — для закрытия при клике вне него
  const socialRef = useRef<HTMLDivElement>(null);

  // При открытии мобильного меню — закрываем дропдаун соцсетей
  function openMobileMenu() {
    setIsSocialOpen(false);
    setIsOpen(true);
  }

  // Закрываем дропдаун соцсетей при клике в любом другом месте страницы
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (socialRef.current && !socialRef.current.contains(e.target as Node)) {
        setIsSocialOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="site-header">
      <div className="top-bar">

        {/* Логотип — слева */}
        <div className="logo">
          <Link href="/">MeblePro</Link>
        </div>

        {/* Навигация — скрыта на мобильном */}
        <div className="nav-with-icons">
          <nav className="main-nav">
            <ul>
              <li><Link href="/" className="is-active">Главная</Link></li>
              <li><Link href="/catalog">Категории</Link></li>
              <li><Link href="/contacts">Контакты</Link></li>
            </ul>
          </nav>

          {/* Иконка корзины — только на десктопе (внутри nav-with-icons) */}
          <Link href="/cart" className="nav-cart nav-cart--desktop" aria-label="Корзина">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22" aria-hidden="true">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </Link>
        </div>

        {/* Кнопка соцсетей — ВСЕГДА видна (и на мобильном, и на десктопе) */}
        {/* Вынесена за пределы nav-with-icons специально */}
        <div className="social-dropdown" ref={socialRef}>
          <button
            className={`social-dropdown__trigger${isSocialOpen ? ' social-dropdown__trigger--open' : ''}`}
            onClick={() => setIsSocialOpen(!isSocialOpen)}
            aria-label="Социальные сети"
            aria-expanded={isSocialOpen}
            type="button"
          >
            {/* Иконка "поделиться/связаться" */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18" aria-hidden="true">
              <circle cx="18" cy="5" r="3"/>
              <circle cx="6" cy="12" r="3"/>
              <circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
            <span className="social-dropdown__label">Связаться</span>
            <svg
              className={`social-dropdown__arrow${isSocialOpen ? ' social-dropdown__arrow--up' : ''}`}
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12" aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          {/* Выпадающий список — показывается после нажатия на кнопку */}
          {isSocialOpen && (
            <div className="social-dropdown__menu" role="menu">
              <a
                href="https://wa.me/48777777777"
                className="social-dropdown__item"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsSocialOpen(false)}
                role="menuitem"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
                  <path d="M3 20.5l1.7-5.7A8 8 0 1 1 12 20a7.9 7.9 0 0 1-3.6-.8Z"/>
                  <path d="M8.8 10.7c.3 1.5 2.3 3.4 3.7 3.9l1.1-.6"/>
                </svg>
                <span>WhatsApp</span>
              </a>

              <a
                href="tel:+48777777777"
                className="social-dropdown__item"
                onClick={() => setIsSocialOpen(false)}
                role="menuitem"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
                  <path d="M4 3h3l2 5-2 1c1.7 4 4.3 6.6 8.3 8.3l1-2 4.7 2v3c0 1-1 2-2 2A17 17 0 0 1 2 6c0-1 .9-2 2-2z"/>
                </svg>
                <span>+48 777 777 777</span>
              </a>

              <a
                href="https://facebook.com"
                className="social-dropdown__item"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsSocialOpen(false)}
                role="menuitem"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
                  <path d="M15 8h-2a1 1 0 0 0-1 1v2h3l-.4 3h-2.6v8h-3v-8H7v-3h2V9a4 4 0 0 1 4-4h2z"/>
                </svg>
                <span>Facebook</span>
              </a>

              <a
                href="https://instagram.com"
                className="social-dropdown__item"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsSocialOpen(false)}
                role="menuitem"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
                  <rect x="4" y="4" width="16" height="16" rx="5"/>
                  <circle cx="12" cy="12" r="3.2"/>
                  <circle cx="17" cy="7" r="1.2"/>
                </svg>
                <span>Instagram</span>
              </a>

              <a
                href="https://youtube.com"
                className="social-dropdown__item"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsSocialOpen(false)}
                role="menuitem"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
                  <rect x="4" y="7" width="16" height="10" rx="3"/>
                  <path d="M11 10.5l4 2.5-4 2.5z"/>
                </svg>
                <span>YouTube</span>
              </a>
            </div>
          )}
        </div>

        {/* Иконка корзины рядом с бургером — только на мобильном */}
        <Link href="/cart" className="nav-cart nav-cart--mobile" aria-label="Корзина">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22" aria-hidden="true">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
        </Link>

        {/* Кнопка бургер-меню — только на мобильных */}
        <button
          className="burger"
          aria-label="Открыть меню"
          aria-expanded={isOpen}
          onClick={openMobileMenu}
        >
          ☰
        </button>
      </div>

      {/* Строка с категориями мебели — скрыта на мобильном */}
      <nav className="catalog-nav">
        <ul>
          <li><Link href="/catalog#new">Новые</Link></li>
          <li><Link href="/catalog#all">Мебель</Link></li>
          <li><Link href="/catalog#corner-sofas">Углы</Link></li>
          <li><Link href="/catalog#sofas">Диваны</Link></li>
          <li><Link href="/catalog#modular">Модульная</Link></li>
          <li><Link href="/catalog#sets">Комплекты</Link></li>
          <li><Link href="/catalog#chairs">Кресла</Link></li>
          <li><Link href="/catalog#beds">Кровати</Link></li>
          <li><Link href="/catalog#poufs">Пуфы</Link></li>
        </ul>
      </nav>

      {/* Мобильное меню — боковая панель */}
      <div
        className={`mobile-menu${isOpen ? ' mobile-menu--open' : ''}`}
        aria-hidden={!isOpen}
      >
        <button
          className="mobile-menu__close"
          aria-label="Закрыть меню"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>

        <div className="mobile-menu__logo">MeblePro</div>

        <nav className="mobile-menu__nav">
          <Link href="/" onClick={() => setIsOpen(false)}>Главная</Link>
          <Link href="/catalog" onClick={() => setIsOpen(false)}>Категории</Link>
          <Link href="/contacts" onClick={() => setIsOpen(false)}>Контакты</Link>
        </nav>

        <div className="mobile-menu__divider" />

        <nav className="mobile-menu__catalog">
          <Link href="/catalog#new" onClick={() => setIsOpen(false)}>Новые</Link>
          <Link href="/catalog#sofas" onClick={() => setIsOpen(false)}>Диваны</Link>
          <Link href="/catalog#corner-sofas" onClick={() => setIsOpen(false)}>Угловые диваны</Link>
          <Link href="/catalog#modular" onClick={() => setIsOpen(false)}>Модульная мебель</Link>
          <Link href="/catalog#sets" onClick={() => setIsOpen(false)}>Комплекты</Link>
          <Link href="/catalog#chairs" onClick={() => setIsOpen(false)}>Кресла</Link>
          <Link href="/catalog#beds" onClick={() => setIsOpen(false)}>Кровати</Link>
          <Link href="/catalog#poufs" onClick={() => setIsOpen(false)}>Пуфы</Link>
        </nav>

        <div className="mobile-menu__contacts">
          <a href="tel:+48777777777">+48 777 777 777</a>
          <a href="mailto:info@meblepro.pl">info@meblepro.pl</a>
        </div>
      </div>

      {/* Затемнение фона при открытом мобильном меню */}
      {isOpen && (
        <div
          className="mobile-menu__backdrop"
          onClick={() => setIsOpen(false)}
        />
      )}
    </header>
  );
}
