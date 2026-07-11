import { notFound } from 'next/navigation';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { assetBackground } from '../../lib/assetPath';

const CATEGORIES: Record<string, {
  title: string;
  description: string;
  image: string;
  products: { id: number; name: string; price: string; image: string }[];
}> = {
  'new': {
    title: 'Новые поступления',
    description: 'Свежие модели, только что добавленные в ассортимент.',
    image: '/фото с 1.jpg',
    products: [
      { id: 1, name: 'Диван Oslo', price: 'от 1 890 €', image: '/фото с 1.jpg' },
      { id: 2, name: 'Кресло Bergen', price: 'от 690 €', image: '/фото к 1.jpg' },
      { id: 3, name: 'Угловой Porto', price: 'от 2 490 €', image: '/фото с 2.jpg' },
      { id: 4, name: 'Кровать Lund', price: 'от 1 290 €', image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=600&q=80' },
      { id: 5, name: 'Пуф Visby', price: 'от 290 €', image: '/фото к2.jpg' },
      { id: 6, name: 'Комплект Tabou Set', price: 'от 3 490 €', image: '/фото т 1.jpg' },
    ],
  },
  'all': {
    title: 'Вся мебель',
    description: 'Полный каталог — диваны, кресла, кровати и аксессуары.',
    image: '/фото с 2.jpg',
    products: [
      { id: 1, name: 'Диван Oslo', price: 'от 1 890 €', image: '/фото с 1.jpg' },
      { id: 2, name: 'Угловой Porto', price: 'от 2 490 €', image: '/фото с 2.jpg' },
      { id: 3, name: 'Кресло Bergen', price: 'от 690 €', image: '/фото к 1.jpg' },
      { id: 4, name: 'Кресло Malmo', price: 'от 750 €', image: '/фото к2.jpg' },
      { id: 5, name: 'Tabou Classic', price: 'от 2 990 €', image: '/фото т 1.jpg' },
      { id: 6, name: 'Tabou Luxe', price: 'от 3 490 €', image: '/фото т 3.jpg' },
    ],
  },
  'corner-sofas': {
    title: 'Угловые диваны',
    description: 'Г- и П-образные модели для просторных гостиных и семейного отдыха.',
    image: '/фото с 1.jpg',
    products: [
      { id: 1, name: 'Угловой Porto L', price: 'от 2 490 €', image: '/фото с 1.jpg' },
      { id: 2, name: 'Угловой Porto P', price: 'от 2 890 €', image: '/фото с 2.jpg' },
      { id: 3, name: 'Corner Oslo', price: 'от 2 190 €', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80' },
      { id: 4, name: 'Corner Max', price: 'от 3 190 €', image: 'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&w=600&q=80' },
    ],
  },
  'sofas': {
    title: 'Диваны',
    description: 'Классические прямые модели для любой зоны: гостиной, кабинета или студии.',
    image: '/фото с 2.jpg',
    products: [
      { id: 1, name: 'Диван Oslo 2-местный', price: 'от 1 290 €', image: '/фото с 1.jpg' },
      { id: 2, name: 'Диван Oslo 3-местный', price: 'от 1 590 €', image: '/фото с 2.jpg' },
      { id: 3, name: 'Диван Bergen', price: 'от 1 890 €', image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=600&q=80' },
      { id: 4, name: 'Диван Relax', price: 'от 1 490 €', image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=600&q=80' },
    ],
  },
  'modular': {
    title: 'Модульная мебель',
    description: 'Соберите конфигурацию под свой интерьер — более 20 типов модулей.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
    products: [
      { id: 1, name: 'Модуль прямой', price: 'от 490 €', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80' },
      { id: 2, name: 'Модуль угловой', price: 'от 590 €', image: '/фото с 1.jpg' },
      { id: 3, name: 'Модуль шезлонг', price: 'от 690 €', image: '/фото с 2.jpg' },
      { id: 4, name: 'Модульный комплект S', price: 'от 1 690 €', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80' },
    ],
  },
  'sets': {
    title: 'Комплекты мебели',
    description: 'Подобранные сочетания мебели для цельного и спокойного интерьера.',
    image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=900&q=80',
    products: [
      { id: 1, name: 'Комплект Oslo Set', price: 'от 2 490 €', image: '/фото с 1.jpg' },
      { id: 2, name: 'Комплект Bergen Set', price: 'от 2 890 €', image: '/фото с 2.jpg' },
      { id: 3, name: 'Комплект Tabou Set', price: 'от 3 490 €', image: '/фото т 1.jpg' },
      { id: 4, name: 'Комплект Loft', price: 'от 1 990 €', image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=600&q=80' },
    ],
  },
  'chairs': {
    title: 'Кресла',
    description: 'Акцентные посадочные места для чтения, отдыха и уютных разговоров.',
    image: '/фото к 1.jpg',
    products: [
      { id: 1, name: 'Кресло Bergen', price: 'от 690 €', image: '/фото к 1.jpg' },
      { id: 2, name: 'Кресло Malmo', price: 'от 750 €', image: '/фото к2.jpg' },
      { id: 3, name: 'Кресло Relax Pro', price: 'от 990 €', image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=600&q=80' },
      { id: 4, name: 'Кресло Skansi', price: 'от 850 €', image: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&w=600&q=80' },
    ],
  },
  'beds': {
    title: 'Кровати',
    description: 'Выверенные пропорции, мягкие изголовья и поддержка для полноценного отдыха.',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=900&q=80',
    products: [
      { id: 1, name: 'Кровать Lund 160', price: 'от 1 290 €', image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=600&q=80' },
      { id: 2, name: 'Кровать Lund 180', price: 'от 1 490 €', image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80' },
      { id: 3, name: 'Кровать Bergen Bed', price: 'от 1 690 €', image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=600&q=80' },
      { id: 4, name: 'Кровать Tabou Bed', price: 'от 2 490 €', image: '/фото т 1.jpg' },
    ],
  },
  'poufs': {
    title: 'Пуфы',
    description: 'Мобильные предметы, которые дополняют интерьер и добавляют гибкость.',
    image: '/фото к2.jpg',
    products: [
      { id: 1, name: 'Пуф Visby S', price: 'от 190 €', image: '/фото к 1.jpg' },
      { id: 2, name: 'Пуф Visby L', price: 'от 290 €', image: '/фото к2.jpg' },
      { id: 3, name: 'Пуф Bergen Round', price: 'от 350 €', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80' },
      { id: 4, name: 'Пуф Tabou Cube', price: 'от 450 €', image: '/фото т 3.jpg' },
    ],
  },
};

// Список адресов категорий, которые нужно собрать заранее для публикации на GitHub Pages.
export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((slug) => ({ slug }));
}

export default async function FurnitureCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  // В Next.js 15+ параметры params стали асинхронными — нужно awaить
  const { slug } = await params;
  const category = CATEGORIES[slug];
  if (!category) notFound();

  return (
    <>
      <Navigation />

      <div className="inner-hero" style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), ${assetBackground(category.image)}`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="inner-hero__content">
          <p className="inner-hero__eyebrow">Каталог</p>
          <h1 className="inner-hero__title">{category.title}</h1>
          <p className="inner-hero__sub">{category.description}</p>
        </div>
      </div>

      <main className="page-content">
        <section>
          <div className="product-grid">
            {category.products.map((product) => (
              <article key={product.id} className="product-card">
                <div className="product-card__image" style={{ backgroundImage: assetBackground(product.image) }} />
                <div className="product-card__info">
                  <h3 className="product-card__name">{product.name}</h3>
                  <p className="product-card__price">{product.price}</p>
                  <Link href="/contacts" className="product-card__btn">Узнать цену</Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
