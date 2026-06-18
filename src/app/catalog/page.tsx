/*
Этот файл определяет страницу каталога мебели с фильтрами и секциями.
Он показывает категории товаров, карточки моделей и панель отбора по параметрам.
Пользователь может отфильтровать каталог и добавить товар в корзину.
*/
'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import Footer from '../components/Footer';
import { Color, Material, Product, SECTIONS, Style } from '../data/catalogProducts';
import { readCartFromStorage, upsertCartItem } from '../lib/cartStorage';

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

interface ProductDetails {
  description: string;
  sizes: string[];
  materials: string[];
  colors: string[];
  country: string;
}

const MATERIAL_LABELS: Record<Material, string> = {
  all: 'Комбинированные материалы',
  fabric: 'Ткань',
  leather: 'Кожа',
  velour: 'Велюр',
};

const COLOR_LABELS: Record<Color, string> = {
  all: 'Универсальный',
  beige: 'Бежевый',
  grey: 'Серый',
  brown: 'Коричневый',
  blue: 'Синий',
  green: 'Зеленый',
  black: 'Черный',
};

const STYLE_LABELS: Record<Style, string> = {
  all: 'Универсальный',
  modern: 'Современный',
  scandinavian: 'Скандинавский',
  classic: 'Классический',
  loft: 'Лофт',
};

// Подробные описания моделей, чтобы у каждой карточки был свой текст, а не общий шаблон.
const PRODUCT_DESCRIPTIONS: Record<string, string> = {
  'Диван Oslo': 'Сбалансированная модель для гостиной с комфортной посадкой и аккуратными формами.',
  'Диван Bergen': 'Компактный диван для современных пространств и ежедневного использования.',
  'Tabou Luxe': 'Премиальная модель с глубокой посадкой и выразительной отделкой.',
  'Угловой Porto': 'Угловой диван для семейной гостиной с удобным местом для отдыха.',
  'Угловой Porto L': 'Большая угловая версия для просторных интерьеров.',
  'Угловой Porto P': 'Угловая модель с мягкими боковинами и комфортной спинкой.',
  'Кровать Lund 160': 'Мягкая кровать с высоким изголовьем для ежедневного комфорта.',
  'Кровать Tabou': 'Премиальная кровать с акцентом на статусный внешний вид.',
};

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
  // Состояние мобильного меню в шапке страницы каталога.
  const [menuOpen, setMenuOpen] = useState(false);
  // Здесь храним, какой выпадающий фильтр сейчас открыт.
  const [openDrop, setOpenDrop] = useState<FilterKey | null>(null);
  // Здесь фиксируются выбранные пользователем значения фильтров.
  const [selected, setSelected] = useState<Record<FilterKey, string>>({
    type: 'all', color: 'all', material: 'all',
    style: 'all', size: 'all', price: 'all', purpose: 'all',
  });
  // Короткое сообщение после добавления товара в корзину.
  const [cartNotice, setCartNotice] = useState<string>('');
  // Быстрый словарь "id товара в корзине -> количество", чтобы показывать метки прямо на карточках.
  const [cartQtyById, setCartQtyById] = useState<Record<string, number>>({});
  // Общее количество позиций в корзине для бейджа на иконке корзины.
  const [cartTotalQty, setCartTotalQty] = useState(0);
  // Выбранный товар для показа детального описания в отдельном окне.
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  // Ссылка на контейнер фильтров для закрытия выпадающего списка при клике вне блока.
  const filtersRef = useRef<HTMLDivElement>(null);

  // Автоматически закрываем открытый фильтр, если пользователь кликнул вне панели фильтров.
  useEffect(() => {
    function onOut(e: MouseEvent) {
      if (filtersRef.current && !filtersRef.current.contains(e.target as Node)) {
        setOpenDrop(null);
      }
    }
    document.addEventListener('mousedown', onOut);
    return () => document.removeEventListener('mousedown', onOut);
  }, []);

  // Закрываем окно с описанием товара по Escape.
  useEffect(() => {
    function onEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setSelectedProduct(null);
      }
    }
    document.addEventListener('keydown', onEscape);
    return () => document.removeEventListener('keydown', onEscape);
  }, []);

  // Считываем корзину из localStorage и обновляем метки на карточках и иконке корзины.
  useEffect(() => {
    function syncCartBadges() {
      const cart = readCartFromStorage();
      const nextQtyById: Record<string, number> = {};
      let nextTotal = 0;
      cart.forEach((item) => {
        nextQtyById[item.id] = item.qty;
        nextTotal += item.qty;
      });
      setCartQtyById(nextQtyById);
      setCartTotalQty(nextTotal);
    }

    syncCartBadges();
    window.addEventListener('storage', syncCartBadges);
    return () => window.removeEventListener('storage', syncCartBadges);
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

  // Собираем стабильный id карточки, чтобы корректно связать товар с записью в корзине.
  function buildCartId(product: Product): string {
    return `${product.type}-${product.id}-${product.name}`;
  }

  // Собираем детальные характеристики конкретной модели для окна с описанием товара.
  function getProductDetails(product: Product): ProductDetails {
    const sizeLabel =
      product.size === 'small'
        ? 'Компактный формат'
        : product.size === 'medium'
        ? 'Средний формат'
        : 'Большой формат';
    const typeLabel =
      product.type === 'sofa'
        ? 'Диван'
        : product.type === 'corner'
        ? 'Угловая модель'
        : product.type === 'chair'
        ? 'Кресло'
        : product.type === 'bed'
        ? 'Кровать'
        : product.type === 'pouf'
        ? 'Пуф'
        : product.type === 'modular'
        ? 'Модуль'
        : 'Комплект';

    const materials = [
      MATERIAL_LABELS[product.material],
      'Надежный каркас',
      product.purpose === 'office' ? 'Усиленная износостойкость' : 'Комфорт для дома',
    ];
    const colors = [
      COLOR_LABELS[product.color],
      product.style === 'classic' ? 'Светлый бежевый' : 'Графит',
      product.style === 'modern' ? 'Песочный' : 'Молочный',
    ];
    const sizes = [
      sizeLabel,
      product.size === 'small' ? 'Для компактных пространств' : product.size === 'medium' ? 'Для стандартных комнат' : 'Для просторных комнат',
      typeLabel,
    ];

    return {
      description:
        PRODUCT_DESCRIPTIONS[product.name] ??
        `${typeLabel} ${product.name} в стиле "${STYLE_LABELS[product.style]}", рассчитанный на ежедневное использование.`,
      sizes,
      materials,
      colors,
      country: product.purpose === 'office' ? 'Польша' : 'Польша',
    };
  }

  // Добавляем выбранный товар в локальную корзину и показываем короткое подтверждение.
  function addProductToCart(product: Product) {
    const nextCart = upsertCartItem(
      {
        id: buildCartId(product),
        name: product.name,
        material: product.material,
        color: product.color,
        price: product.priceNum,
        image: product.image,
      },
      1
    );
    // Сразу обновляем метки на карточках и иконке без перезагрузки страницы.
    const nextQtyById: Record<string, number> = {};
    let nextTotal = 0;
    nextCart.forEach((item) => {
      nextQtyById[item.id] = item.qty;
      nextTotal += item.qty;
    });
    setCartQtyById(nextQtyById);
    setCartTotalQty(nextTotal);
    setCartNotice(`"${product.name}" добавлен в корзину`);
    window.setTimeout(() => setCartNotice(''), 1800);
  }

  // Открываем окно с описанием и характеристиками товара.
  function openProductDetails(product: Product) {
    setSelectedProduct(product);
  }

  // Закрываем окно с описанием товара.
  function closeProductDetails() {
    setSelectedProduct(null);
  }

  const selectedProductDetails = selectedProduct ? getProductDetails(selectedProduct) : null;
  const consultantMessage = selectedProduct
    ? `Здравствуйте! Интересует товар: ${selectedProduct.name}. Цена: ${selectedProduct.price}. Хочу уточнить размеры, материалы, цвета, доставку и оплату.`
    : '';
  const consultantWhatsAppLink = selectedProduct
    ? `https://wa.me/48777777777?text=${encodeURIComponent(consultantMessage)}`
    : '#';
  const consultantContactsLink = selectedProduct
    ? `/contacts?product=${encodeURIComponent(selectedProduct.name)}`
    : '/contacts';

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
              <Link href="/cart" className="cat-hero__cart-link" aria-label="Корзина" title="Корзина">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18" aria-hidden="true">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
                {cartTotalQty > 0 && <span className="cat-hero__cart-badge">{cartTotalQty}</span>}
              </Link>
            </nav>

            <div className="social-drop">
              <a href="tel:+48777777777" className="icon-circle social-drop__trigger" aria-label="Контакты">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 3h3l2 5-2 1c1.7 4 4.3 6.6 8.3 8.3l1-2 4.7 2v3c0 1-1 2-2 2A17 17 0 0 1 2 6c0-1 .9-2 2-2z"/></svg>
              </a>
              <div className="social-drop__panel">
                <a href="https://wa.me/48777777777" className="icon-circle" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 20.5l1.7-5.7A8 8 0 1 1 12 20a7.9 7.9 0 0 1-3.6-.8Z"/><path d="M8.8 10.7c.3 1.5 2.3 3.4 3.7 3.9l1.1-.6"/></svg>
                </a>
                <a href="tel:+48777777777" className="icon-circle" aria-label="Позвонить">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 3h3l2 5-2 1c1.7 4 4.3 6.6 8.3 8.3l1-2 4.7 2v3c0 1-1 2-2 2A17 17 0 0 1 2 6c0-1 .9-2 2-2z"/></svg>
                </a>
                <a href="https://facebook.com" className="icon-circle" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 8h-2a1 1 0 0 0-1 1v2h3l-.4 3h-2.6v8h-3v-8H7v-3h2V9a4 4 0 0 1 4-4h2z"/></svg>
                </a>
                <a href="https://instagram.com" className="icon-circle" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.2"/><circle cx="17" cy="7" r="1.2"/></svg>
                </a>
                <a href="https://youtube.com" className="icon-circle" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
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
        {cartNotice && <p className="catalog-cart-notice">{cartNotice}</p>}
        {SECTIONS.map((section) => {
          const filtered = filterProducts(section.products);
          if (filtered.length === 0) return null;
          return (
            <section key={section.id} id={section.id} className="catalog-section">
              <h2 className="catalog-section__title">{section.title}</h2>
              <div className="product-grid">
                {filtered.map((product) => (
                  <article key={product.id} className={`product-card ${cartQtyById[buildCartId(product)] ? 'product-card--in-cart' : ''}`}>
                    <button
                      type="button"
                      className="product-card__image product-card__image-btn"
                      style={{ backgroundImage: `url('${product.image}')` }}
                      onClick={() => openProductDetails(product)}
                      aria-label={`Открыть описание товара ${product.name}`}
                    >
                      {cartQtyById[buildCartId(product)] ? (
                        <span className="product-card__in-cart-badge">В корзине: {cartQtyById[buildCartId(product)]}</span>
                      ) : null}
                    </button>
                    <div className="product-card__info">
                      <h3 className="product-card__name">{product.name}</h3>
                      <p className="product-card__price">{product.price}</p>
                      {/* Кнопки действий по товару: обычное добавление или быстрый плюс, если товар уже в корзине. */}
                      {cartQtyById[buildCartId(product)] ? (
                        <div className="product-card__actions">
                          <span className="product-card__in-cart-text">Уже в корзине ({cartQtyById[buildCartId(product)]})</span>
                          <button
                            type="button"
                            className="product-card__plus-btn"
                            onClick={() => addProductToCart(product)}
                            aria-label={`Добавить еще один товар ${product.name}`}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button type="button" className="product-card__btn" onClick={() => addProductToCart(product)}>
                          В корзину
                        </button>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </main>

      {selectedProduct && selectedProductDetails && (
        <>
          <div className="product-details-backdrop" onClick={closeProductDetails} />
          <section
            className="product-details-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Описание товара ${selectedProduct.name}`}
          >
            <button type="button" className="product-details-close" onClick={closeProductDetails} aria-label="Закрыть окно">
              ✕
            </button>
            <div
              className="product-details-hero"
              style={{ backgroundImage: `url('${selectedProduct.image}')` }}
              aria-hidden="true"
            />
            <h2 className="product-details-title">{selectedProduct.name}</h2>
            <p className="product-details-price">{selectedProduct.price}</p>
            <p className="product-details-description">{selectedProductDetails.description}</p>

            <div className="product-details-grid">
              <article>
                <h3>Размеры</h3>
                <ul>
                  {selectedProductDetails.sizes.map((size) => (
                    <li key={size}>{size}</li>
                  ))}
                </ul>
              </article>

              <article>
                <h3>Материалы</h3>
                <ul>
                  {selectedProductDetails.materials.map((material) => (
                    <li key={material}>{material}</li>
                  ))}
                </ul>
              </article>

              <article>
                <h3>Цвета</h3>
                <ul>
                  {selectedProductDetails.colors.map((color) => (
                    <li key={color}>{color}</li>
                  ))}
                </ul>
              </article>

              <article>
                <h3>Страна производства</h3>
                <p>{selectedProductDetails.country}</p>
              </article>
            </div>

            {/* Блок для быстрого контакта: консультант сразу видит, какой товар выбрал клиент. */}
            <div className="product-details-contact">
              <h3>Связаться с консультантом</h3>
              <p>
                Отправим консультанту название выбранного товара, чтобы сразу обсудить размеры, доставку и оплату без лишних уточнений.
              </p>
              <div className="product-details-contact-actions">
                <a href={consultantWhatsAppLink} target="_blank" rel="noopener noreferrer" className="product-details-contact-btn product-details-contact-btn--primary">
                  Написать в WhatsApp
                </a>
                <Link href={consultantContactsLink} className="product-details-contact-btn product-details-contact-btn--outline">
                  Открыть форму консультации
                </Link>
              </div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </>
  );
}
