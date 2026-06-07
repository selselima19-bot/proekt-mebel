'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import Footer from '../components/Footer';

const NAV_ITEMS = [
  { label: 'Новые',     href: '#new' },
  { label: 'Мебель',    href: '#all' },
  { label: 'Углы',      href: '#corner-sofas' },
  { label: 'Диваны',    href: '#sofas' },
  { label: 'Модульная', href: '#modular' },
  { label: 'Комплекты', href: '#sets' },
  { label: 'Кресла',    href: '#chairs' },
  { label: 'Кровати',   href: '#beds' },
  { label: 'Пуфы',      href: '#poufs' },
];

type FurType  = 'all'|'sofa'|'corner'|'chair'|'bed'|'pouf'|'modular'|'set';
type Material = 'all'|'fabric'|'leather'|'velour';
type Color    = 'all'|'beige'|'grey'|'brown'|'blue'|'green'|'black';
type Style    = 'all'|'modern'|'scandinavian'|'classic'|'loft';
type Size     = 'all'|'small'|'medium'|'large';
type Price    = 'all'|'low'|'mid'|'high';
type Purpose  = 'all'|'home'|'office';

interface Product {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  image: string;
  type: FurType;
  material: Material;
  color: Color;
  style: Style;
  size: Size;
  purpose: Purpose;
}

const SECTIONS: { id: string; title: string; products: Product[] }[] = [
  {
    id: 'new',
    title: 'Новые поступления',
    products: [
      { id:1, name:'Диван Oslo',    price:'от 1 890 €', priceNum:1890, image:'/фото с 1.jpg',  type:'sofa',   material:'fabric',  color:'beige', style:'scandinavian', size:'medium', purpose:'home' },
      { id:2, name:'Кресло Bergen', price:'от 690 €',   priceNum:690,  image:'/фото к 1.jpg',  type:'chair',  material:'fabric',  color:'grey',  style:'modern',       size:'small',  purpose:'home' },
      { id:3, name:'Угловой Porto', price:'от 2 490 €', priceNum:2490, image:'/фото с 2.jpg',  type:'corner', material:'velour',  color:'blue',  style:'modern',       size:'large',  purpose:'home' },
      { id:4, name:'Tabou Luxe',    price:'от 3 490 €', priceNum:3490, image:'/фото т 1.jpg',  type:'sofa',   material:'leather', color:'brown', style:'classic',      size:'large',  purpose:'home' },
    ],
  },
  {
    id: 'all',
    title: 'Вся мебель',
    products: [
      { id:1, name:'Диван Oslo',       price:'от 1 890 €', priceNum:1890, image:'/фото с 1.jpg',  type:'sofa',   material:'fabric',  color:'beige', style:'scandinavian', size:'medium', purpose:'home' },
      { id:2, name:'Диван Bergen',     price:'от 1 590 €', priceNum:1590, image:'/фото с 2.jpg',  type:'sofa',   material:'fabric',  color:'grey',  style:'scandinavian', size:'medium', purpose:'home' },
      { id:3, name:'Кресло Bergen',    price:'от 690 €',   priceNum:690,  image:'/фото к 1.jpg',  type:'chair',  material:'fabric',  color:'grey',  style:'modern',       size:'small',  purpose:'home' },
      { id:4, name:'Кресло Malmo',     price:'от 750 €',   priceNum:750,  image:'/фото к2.jpg',   type:'chair',  material:'leather', color:'black', style:'modern',       size:'small',  purpose:'office' },
      { id:5, name:'Tabou Classic',    price:'от 2 990 €', priceNum:2990, image:'/фото т 1.jpg',  type:'sofa',   material:'velour',  color:'brown', style:'classic',      size:'large',  purpose:'home' },
      { id:6, name:'Tabou Luxe',       price:'от 3 490 €', priceNum:3490, image:'/фото т 3.jpg',  type:'sofa',   material:'leather', color:'brown', style:'classic',      size:'large',  purpose:'home' },
      { id:7, name:'Угловой Porto L',  price:'от 2 490 €', priceNum:2490, image:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80', type:'corner', material:'fabric', color:'beige', style:'modern', size:'large', purpose:'home' },
      { id:8, name:'Кровать Lund 160', price:'от 1 290 €', priceNum:1290, image:'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=600&q=80', type:'bed', material:'fabric', color:'beige', style:'scandinavian', size:'medium', purpose:'home' },
    ],
  },
  {
    id: 'corner-sofas',
    title: 'Угловые диваны',
    products: [
      { id:1, name:'Угловой Porto L', price:'от 2 490 €', priceNum:2490, image:'/фото с 1.jpg',  type:'corner', material:'fabric',  color:'beige', style:'modern',       size:'large', purpose:'home' },
      { id:2, name:'Угловой Porto P', price:'от 2 890 €', priceNum:2890, image:'/фото с 2.jpg',  type:'corner', material:'velour',  color:'blue',  style:'modern',       size:'large', purpose:'home' },
      { id:3, name:'Corner Oslo',     price:'от 2 190 €', priceNum:2190, image:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80', type:'corner', material:'fabric', color:'grey',  style:'scandinavian', size:'large', purpose:'home' },
      { id:4, name:'Corner Max',      price:'от 1 490 €', priceNum:1490, image:'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&w=600&q=80', type:'corner', material:'fabric', color:'beige', style:'loft',         size:'large', purpose:'home' },
    ],
  },
  {
    id: 'sofas',
    title: 'Диваны',
    products: [
      { id:1, name:'Диван Oslo 2-мест.', price:'от 1 290 €', priceNum:1290, image:'/фото с 1.jpg',  type:'sofa', material:'fabric',  color:'beige', style:'scandinavian', size:'small',  purpose:'home' },
      { id:2, name:'Диван Oslo 3-мест.', price:'от 1 590 €', priceNum:1590, image:'/фото с 2.jpg',  type:'sofa', material:'fabric',  color:'grey',  style:'scandinavian', size:'medium', purpose:'home' },
      { id:3, name:'Диван Bergen',       price:'от 690 €',   priceNum:690,  image:'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=600&q=80', type:'sofa', material:'fabric',  color:'green', style:'loft', size:'medium', purpose:'office' },
      { id:4, name:'Диван Relax',        price:'от 590 €',   priceNum:590,  image:'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=600&q=80', type:'sofa', material:'velour',  color:'grey',  style:'modern', size:'small', purpose:'home' },
    ],
  },
  {
    id: 'modular',
    title: 'Модульная мебель',
    products: [
      { id:1, name:'Модуль прямой',  price:'от 490 €',   priceNum:490,  image:'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80', type:'modular', material:'fabric',  color:'beige', style:'modern',       size:'small',  purpose:'home' },
      { id:2, name:'Модуль угловой', price:'от 590 €',   priceNum:590,  image:'/фото с 1.jpg',  type:'modular', material:'fabric',  color:'grey',  style:'scandinavian', size:'medium', purpose:'home' },
      { id:3, name:'Модуль шезлонг', price:'от 690 €',   priceNum:690,  image:'/фото с 2.jpg',  type:'modular', material:'velour',  color:'blue',  style:'modern',       size:'medium', purpose:'home' },
      { id:4, name:'Комплект S',     price:'от 1 690 €', priceNum:1690, image:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80', type:'modular', material:'leather', color:'black', style:'loft', size:'large', purpose:'office' },
    ],
  },
  {
    id: 'sets',
    title: 'Комплекты мебели',
    products: [
      { id:1, name:'Oslo Set',   price:'от 2 490 €', priceNum:2490, image:'/фото с 1.jpg',  type:'set', material:'fabric',  color:'beige', style:'scandinavian', size:'large', purpose:'home' },
      { id:2, name:'Bergen Set', price:'от 1 890 €', priceNum:1890, image:'/фото с 2.jpg',  type:'set', material:'velour',  color:'grey',  style:'modern',       size:'large', purpose:'home' },
      { id:3, name:'Tabou Set',  price:'от 3 490 €', priceNum:3490, image:'/фото т 1.jpg',  type:'set', material:'leather', color:'brown', style:'classic',      size:'large', purpose:'home' },
      { id:4, name:'Loft Set',   price:'от 990 €',   priceNum:990,  image:'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=600&q=80', type:'set', material:'fabric', color:'black', style:'loft', size:'medium', purpose:'office' },
    ],
  },
  {
    id: 'chairs',
    title: 'Кресла',
    products: [
      { id:1, name:'Кресло Bergen',    price:'от 690 €',   priceNum:690,  image:'/фото к 1.jpg',  type:'chair', material:'fabric',  color:'beige', style:'scandinavian', size:'small', purpose:'home' },
      { id:2, name:'Кресло Malmo',     price:'от 750 €',   priceNum:750,  image:'/фото к2.jpg',   type:'chair', material:'leather', color:'black', style:'modern',       size:'small', purpose:'office' },
      { id:3, name:'Кресло Relax Pro', price:'от 990 €',   priceNum:990,  image:'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=600&q=80', type:'chair', material:'velour', color:'blue', style:'modern', size:'small', purpose:'home' },
      { id:4, name:'Кресло Skansi',    price:'от 1 850 €', priceNum:1850, image:'https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&w=600&q=80', type:'chair', material:'leather', color:'brown', style:'classic', size:'small', purpose:'office' },
    ],
  },
  {
    id: 'beds',
    title: 'Кровати',
    products: [
      { id:1, name:'Кровать Lund 160', price:'от 1 290 €', priceNum:1290, image:'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=600&q=80', type:'bed', material:'fabric',  color:'beige', style:'scandinavian', size:'medium', purpose:'home' },
      { id:2, name:'Кровать Lund 180', price:'от 1 490 €', priceNum:1490, image:'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80', type:'bed', material:'fabric',  color:'grey',  style:'scandinavian', size:'large',  purpose:'home' },
      { id:3, name:'Кровать Bergen',   price:'от 690 €',   priceNum:690,  image:'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=600&q=80', type:'bed',  material:'velour',  color:'blue',  style:'modern',       size:'medium', purpose:'home' },
      { id:4, name:'Кровать Tabou',    price:'от 2 490 €', priceNum:2490, image:'/фото т 1.jpg',  type:'bed',  material:'leather', color:'brown', style:'classic',      size:'large',  purpose:'home' },
    ],
  },
  {
    id: 'poufs',
    title: 'Пуфы',
    products: [
      { id:1, name:'Пуф Visby S',      price:'от 190 €', priceNum:190, image:'/фото к 1.jpg',  type:'pouf', material:'fabric',  color:'beige', style:'scandinavian', size:'small', purpose:'home' },
      { id:2, name:'Пуф Visby L',      price:'от 290 €', priceNum:290, image:'/фото к2.jpg',   type:'pouf', material:'velour',  color:'grey',  style:'modern',       size:'small', purpose:'home' },
      { id:3, name:'Пуф Bergen Round', price:'от 350 €', priceNum:350, image:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80', type:'pouf', material:'fabric', color:'green', style:'loft', size:'small', purpose:'office' },
      { id:4, name:'Пуф Tabou Cube',   price:'от 650 €', priceNum:650, image:'/фото т 3.jpg',  type:'pouf', material:'velour',  color:'brown', style:'classic',      size:'small', purpose:'home' },
    ],
  },
];

interface FilterOption { value: string; label: string; }
interface FilterConfig  { label: string; options: FilterOption[]; }

type FilterKey = 'type' | 'color' | 'material' | 'style' | 'size' | 'price' | 'purpose';

// Опции для каждого фильтра
const FILTERS: Record<FilterKey, FilterConfig> = {
  type: {
    label: 'Тип мебели',
    options: [
      { value: 'all',     label: 'Все типы' },
      { value: 'sofa',    label: 'Диваны' },
      { value: 'corner',  label: 'Угловые диваны' },
      { value: 'chair',   label: 'Кресла' },
      { value: 'bed',     label: 'Кровати' },
      { value: 'pouf',    label: 'Пуфы' },
      { value: 'modular', label: 'Модульная мебель' },
      { value: 'set',     label: 'Комплекты' },
    ],
  },
  color: {
    label: 'Цвет',
    options: [
      { value: 'all',   label: 'Любой цвет' },
      { value: 'beige', label: 'Бежевый' },
      { value: 'grey',  label: 'Серый' },
      { value: 'brown', label: 'Коричневый' },
      { value: 'blue',  label: 'Синий' },
      { value: 'green', label: 'Зелёный' },
      { value: 'black', label: 'Чёрный' },
    ],
  },
  material: {
    label: 'Материал',
    options: [
      { value: 'all',     label: 'Все материалы' },
      { value: 'fabric',  label: 'Ткань' },
      { value: 'leather', label: 'Кожа' },
      { value: 'velour',  label: 'Велюр' },
    ],
  },
  style: {
    label: 'Стиль',
    options: [
      { value: 'all',          label: 'Все стили' },
      { value: 'modern',       label: 'Современный' },
      { value: 'scandinavian', label: 'Скандинавский' },
      { value: 'classic',      label: 'Классический' },
      { value: 'loft',         label: 'Лофт' },
    ],
  },
  size: {
    label: 'Размер',
    options: [
      { value: 'all',    label: 'Любой размер' },
      { value: 'small',  label: 'Компактный' },
      { value: 'medium', label: 'Средний' },
      { value: 'large',  label: 'Большой' },
    ],
  },
  price: {
    label: 'Цена (€)',
    options: [
      { value: 'all',  label: 'Любая цена' },
      { value: 'low',  label: 'до 800 €' },
      { value: 'mid',  label: '800 – 2 000 €' },
      { value: 'high', label: 'от 2 000 €' },
    ],
  },
  purpose: {
    label: 'Для кого',
    options: [
      { value: 'all',    label: 'Для всех' },
      { value: 'home',   label: 'Для дома' },
      { value: 'office', label: 'Для офиса' },
    ],
  },
};

const FILTER_KEYS: FilterKey[] = ['type', 'color', 'material', 'style', 'size', 'price', 'purpose'];

export default function CatalogPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState<FilterKey | null>(null);
  const [selected, setSelected] = useState<Record<FilterKey, string>>({
    type: 'all', color: 'all', material: 'all',
    style: 'all', size: 'all', price: 'all', purpose: 'all',
  });
  const filtersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOut(e: MouseEvent) {
      if (filtersRef.current && !filtersRef.current.contains(e.target as Node)) {
        setOpenDrop(null);
      }
    }
    document.addEventListener('mousedown', onOut);
    return () => document.removeEventListener('mousedown', onOut);
  }, []);

  function pick(key: FilterKey, value: string) {
    setSelected((prev) => ({ ...prev, [key]: value }));
    setOpenDrop(null);
  }

  function filterProducts(products: Product[]) {
    return products.filter((p) => {
      if (selected.type    !== 'all' && p.type     !== selected.type)    return false;
      if (selected.color   !== 'all' && p.color    !== selected.color)   return false;
      if (selected.material!== 'all' && p.material !== selected.material)return false;
      if (selected.style   !== 'all' && p.style    !== selected.style)   return false;
      if (selected.size    !== 'all' && p.size     !== selected.size)    return false;
      if (selected.purpose !== 'all' && p.purpose  !== selected.purpose) return false;
      if (selected.price === 'low'  && p.priceNum >= 800)  return false;
      if (selected.price === 'mid'  && (p.priceNum < 800 || p.priceNum > 2000)) return false;
      if (selected.price === 'high' && p.priceNum <= 2000) return false;
      return true;
    });
  }

  const isFiltered = Object.values(selected).some((v) => v !== 'all');

  function resetAll() {
    setSelected({ type:'all', color:'all', material:'all', style:'all', size:'all', price:'all', purpose:'all' });
  }

  // Подпись на кнопке: категория или выбранное значение
  function btnLabel(key: FilterKey): string {
    const val = selected[key];
    const cfg = FILTERS[key];
    if (val === 'all') return cfg.label;
    const found = cfg.options.find((o: FilterOption) => o.value === val);
    return found ? found.label : cfg.label;
  }

  return (
    <>
      {/* ======= ПОЛНОЭКРАННЫЙ ГЕРОЙ ======= */}
      <div className="cat-hero">
        <div className="cat-hero__bg" />
        <div className="cat-hero__overlay" />

        <header className="cat-hero__header">
          <div className="cat-hero__left">
            <Link href="/" className="cat-hero__logo">MeblePro</Link>
            <nav className="cat-hero__vnav">
              {NAV_ITEMS.map((item) => (
                <a key={item.href} href={item.href} className="cat-hero__vlink">{item.label}</a>
              ))}
            </nav>
          </div>

          <div className="cat-hero__right">
            <nav className="cat-hero__mainnav">
              <Link href="/">Главная</Link>
              <Link href="/catalog" className="cat-hero__mainnav--active">Категории</Link>
              <Link href="/contacts">Контакты</Link>
            </nav>

            <div className="social-drop">
              <a href="tel:+48777777777" className="icon-circle social-drop__trigger" aria-label="Контакты">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 3h3l2 5-2 1c1.7 4 4.3 6.6 8.3 8.3l1-2 4.7 2v3c0 1-1 2-2 2A17 17 0 0 1 2 6c0-1 .9-2 2-2z"/></svg>
              </a>
              <div className="social-drop__panel">
                <a href="#" className="icon-circle" aria-label="WhatsApp">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 20.5l1.7-5.7A8 8 0 1 1 12 20a7.9 7.9 0 0 1-3.6-.8Z"/><path d="M8.8 10.7c.3 1.5 2.3 3.4 3.7 3.9l1.1-.6"/></svg>
                </a>
                <a href="tel:+48777777777" className="icon-circle" aria-label="Позвонить">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 3h3l2 5-2 1c1.7 4 4.3 6.6 8.3 8.3l1-2 4.7 2v3c0 1-1 2-2 2A17 17 0 0 1 2 6c0-1 .9-2 2-2z"/></svg>
                </a>
                <a href="#" className="icon-circle" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 8h-2a1 1 0 0 0-1 1v2h3l-.4 3h-2.6v8h-3v-8H7v-3h2V9a4 4 0 0 1 4-4h2z"/></svg>
                </a>
                <a href="#" className="icon-circle" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.2"/><circle cx="17" cy="7" r="1.2"/></svg>
                </a>
                <a href="#" className="icon-circle" aria-label="YouTube">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="7" width="16" height="10" rx="3"/><path d="M11 10.5l4 2.5-4 2.5z"/></svg>
                </a>
                <Link href="/" className="icon-circle" aria-label="Главная">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11l8-6 8 6"/><path d="M6 10v9h4v-5h4v5h4v-9"/></svg>
                </Link>
              </div>
            </div>

            <button className="cat-hero__burger" onClick={() => setMenuOpen(true)} aria-label="Меню">☰</button>
          </div>
        </header>

        <div className="cat-hero__bottom">
          <h1 className="cat-hero__title">Категории мебели MeblePro</h1>
          <p className="cat-hero__sub">Выберите нужное направление: угловые диваны, классические модели или модульные конструкции.</p>
        </div>
      </div>

      {/* Мобильное меню */}
      {menuOpen && (
        <>
          <div className="mobile-menu__backdrop" onClick={() => setMenuOpen(false)} />
          <div className="mobile-menu mobile-menu--open">
            <button className="mobile-menu__close" onClick={() => setMenuOpen(false)}>✕</button>
            <div className="mobile-menu__logo">MeblePro</div>
            <nav className="mobile-menu__nav">
              <Link href="/" onClick={() => setMenuOpen(false)}>Главная</Link>
              <Link href="/catalog" onClick={() => setMenuOpen(false)}>Категории</Link>
              <Link href="/contacts" onClick={() => setMenuOpen(false)}>Контакты</Link>
            </nav>
            <div className="mobile-menu__divider" />
            <nav className="mobile-menu__catalog">
              {NAV_ITEMS.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
              ))}
            </nav>
          </div>
        </>
      )}

      {/* ======= ФИЛЬТРЫ ======= */}
      <div className="cat-filters" ref={filtersRef}>
        <div className="cat-filters__row">
          {FILTER_KEYS.map((key) => (
            <div
              key={key}
              className={`cat-drop${openDrop === key ? ' cat-drop--open' : ''}${selected[key] !== 'all' ? ' cat-drop--active' : ''}`}
            >
              <button className="cat-drop__btn" onClick={() => setOpenDrop(openDrop === key ? null : key)}>
                {btnLabel(key)}
                <svg className="cat-drop__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              {openDrop === key && (
                <div className="cat-drop__panel">
                  {FILTERS[key].options.map((opt) => (
                    <button
                      key={opt.value}
                      className={`cat-drop__option${selected[key] === opt.value ? ' cat-drop__option--active' : ''}`}
                      onClick={() => pick(key, opt.value)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isFiltered && (
            <button className="cat-filters__reset" onClick={resetAll}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13"><path d="M18 6L6 18M6 6l12 12"/></svg>
              Сбросить фильтры
            </button>
          )}
        </div>
      </div>

      {/* ======= КАТАЛОГ ======= */}
      <main className="page-content">
        {SECTIONS.map((section) => {
          const filtered = filterProducts(section.products);
          if (filtered.length === 0) return null;
          return (
            <section key={section.id} id={section.id} className="catalog-section">
              <h2 className="catalog-section__title">{section.title}</h2>
              <div className="product-grid">
                {filtered.map((product) => (
                  <article key={product.id} className="product-card">
                    <div className="product-card__image" style={{ backgroundImage: `url('${product.image}')` }} />
                    <div className="product-card__info">
                      <h3 className="product-card__name">{product.name}</h3>
                      <p className="product-card__price">{product.price}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </main>

      <Footer />
    </>
  );
}
