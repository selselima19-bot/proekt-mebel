export type FurType = 'all' | 'sofa' | 'corner' | 'chair' | 'bed' | 'pouf' | 'modular' | 'set';
export type Material = 'all' | 'fabric' | 'leather' | 'velour';
export type Color = 'all' | 'beige' | 'grey' | 'brown' | 'blue' | 'green' | 'black';
export type Style = 'all' | 'modern' | 'scandinavian' | 'classic' | 'loft';
export type Size = 'all' | 'small' | 'medium' | 'large';
export type Purpose = 'all' | 'home' | 'office';

export interface Product {
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

export const SECTIONS: { id: string; title: string; products: Product[] }[] = [
  {
    id: 'new',
    title: 'Новые поступления',
    products: [
      { id: 1, name: 'Диван Oslo', price: 'от 1 890 €', priceNum: 1890, image: '/фото с 1.jpg', type: 'sofa', material: 'fabric', color: 'beige', style: 'scandinavian', size: 'medium', purpose: 'home' },
      { id: 2, name: 'Кресло Bergen', price: 'от 690 €', priceNum: 690, image: '/фото к 1.jpg', type: 'chair', material: 'fabric', color: 'grey', style: 'modern', size: 'small', purpose: 'home' },
      { id: 3, name: 'Угловой Porto', price: 'от 2 490 €', priceNum: 2490, image: '/фото с 2.jpg', type: 'corner', material: 'velour', color: 'blue', style: 'modern', size: 'large', purpose: 'home' },
      { id: 4, name: 'Tabou Luxe', price: 'от 3 490 €', priceNum: 3490, image: '/фото т 1.jpg', type: 'sofa', material: 'leather', color: 'brown', style: 'classic', size: 'large', purpose: 'home' },
    ],
  },
  {
    id: 'all',
    title: 'Вся мебель',
    products: [
      { id: 1, name: 'Диван Oslo', price: 'от 1 890 €', priceNum: 1890, image: '/фото с 1.jpg', type: 'sofa', material: 'fabric', color: 'beige', style: 'scandinavian', size: 'medium', purpose: 'home' },
      { id: 2, name: 'Диван Bergen', price: 'от 1 590 €', priceNum: 1590, image: '/фото с 2.jpg', type: 'sofa', material: 'fabric', color: 'grey', style: 'scandinavian', size: 'medium', purpose: 'home' },
      { id: 3, name: 'Кресло Bergen', price: 'от 690 €', priceNum: 690, image: '/фото к 1.jpg', type: 'chair', material: 'fabric', color: 'grey', style: 'modern', size: 'small', purpose: 'home' },
      { id: 4, name: 'Кресло Malmo', price: 'от 750 €', priceNum: 750, image: '/фото к2.jpg', type: 'chair', material: 'leather', color: 'black', style: 'modern', size: 'small', purpose: 'office' },
      { id: 5, name: 'Tabou Classic', price: 'от 2 990 €', priceNum: 2990, image: '/фото т 1.jpg', type: 'sofa', material: 'velour', color: 'brown', style: 'classic', size: 'large', purpose: 'home' },
      { id: 6, name: 'Tabou Luxe', price: 'от 3 490 €', priceNum: 3490, image: '/фото т 3.jpg', type: 'sofa', material: 'leather', color: 'brown', style: 'classic', size: 'large', purpose: 'home' },
      { id: 7, name: 'Угловой Porto L', price: 'от 2 490 €', priceNum: 2490, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80', type: 'corner', material: 'fabric', color: 'beige', style: 'modern', size: 'large', purpose: 'home' },
      { id: 8, name: 'Кровать Lund 160', price: 'от 1 290 €', priceNum: 1290, image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=600&q=80', type: 'bed', material: 'fabric', color: 'beige', style: 'scandinavian', size: 'medium', purpose: 'home' },
    ],
  },
  {
    id: 'corner-sofas',
    title: 'Угловые диваны',
    products: [
      { id: 1, name: 'Угловой Porto L', price: 'от 2 490 €', priceNum: 2490, image: '/фото с 1.jpg', type: 'corner', material: 'fabric', color: 'beige', style: 'modern', size: 'large', purpose: 'home' },
      { id: 2, name: 'Угловой Porto P', price: 'от 2 890 €', priceNum: 2890, image: '/фото с 2.jpg', type: 'corner', material: 'velour', color: 'blue', style: 'modern', size: 'large', purpose: 'home' },
      { id: 3, name: 'Corner Oslo', price: 'от 2 190 €', priceNum: 2190, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80', type: 'corner', material: 'fabric', color: 'grey', style: 'scandinavian', size: 'large', purpose: 'home' },
      { id: 4, name: 'Corner Max', price: 'от 1 490 €', priceNum: 1490, image: 'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&w=600&q=80', type: 'corner', material: 'fabric', color: 'beige', style: 'loft', size: 'large', purpose: 'home' },
    ],
  },
  {
    id: 'sofas',
    title: 'Диваны',
    products: [
      { id: 1, name: 'Диван Oslo 2-мест.', price: 'от 1 290 €', priceNum: 1290, image: '/фото с 1.jpg', type: 'sofa', material: 'fabric', color: 'beige', style: 'scandinavian', size: 'small', purpose: 'home' },
      { id: 2, name: 'Диван Oslo 3-мест.', price: 'от 1 590 €', priceNum: 1590, image: '/фото с 2.jpg', type: 'sofa', material: 'fabric', color: 'grey', style: 'scandinavian', size: 'medium', purpose: 'home' },
      { id: 3, name: 'Диван Bergen', price: 'от 690 €', priceNum: 690, image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=600&q=80', type: 'sofa', material: 'fabric', color: 'green', style: 'loft', size: 'medium', purpose: 'office' },
      { id: 4, name: 'Диван Relax', price: 'от 590 €', priceNum: 590, image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=600&q=80', type: 'sofa', material: 'velour', color: 'grey', style: 'modern', size: 'small', purpose: 'home' },
    ],
  },
  {
    id: 'modular',
    title: 'Модульная мебель',
    products: [
      { id: 1, name: 'Модуль прямой', price: 'от 490 €', priceNum: 490, image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80', type: 'modular', material: 'fabric', color: 'beige', style: 'modern', size: 'small', purpose: 'home' },
      { id: 2, name: 'Модуль угловой', price: 'от 590 €', priceNum: 590, image: '/фото с 1.jpg', type: 'modular', material: 'fabric', color: 'grey', style: 'scandinavian', size: 'medium', purpose: 'home' },
      { id: 3, name: 'Модуль шезлонг', price: 'от 690 €', priceNum: 690, image: '/фото с 2.jpg', type: 'modular', material: 'velour', color: 'blue', style: 'modern', size: 'medium', purpose: 'home' },
      { id: 4, name: 'Комплект S', price: 'от 1 690 €', priceNum: 1690, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80', type: 'modular', material: 'leather', color: 'black', style: 'loft', size: 'large', purpose: 'office' },
    ],
  },
  {
    id: 'sets',
    title: 'Комплекты мебели',
    products: [
      { id: 1, name: 'Oslo Set', price: 'от 2 490 €', priceNum: 2490, image: '/фото с 1.jpg', type: 'set', material: 'fabric', color: 'beige', style: 'scandinavian', size: 'large', purpose: 'home' },
      { id: 2, name: 'Bergen Set', price: 'от 1 890 €', priceNum: 1890, image: '/фото с 2.jpg', type: 'set', material: 'velour', color: 'grey', style: 'modern', size: 'large', purpose: 'home' },
      { id: 3, name: 'Tabou Set', price: 'от 3 490 €', priceNum: 3490, image: '/фото т 1.jpg', type: 'set', material: 'leather', color: 'brown', style: 'classic', size: 'large', purpose: 'home' },
      { id: 4, name: 'Loft Set', price: 'от 990 €', priceNum: 990, image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=600&q=80', type: 'set', material: 'fabric', color: 'black', style: 'loft', size: 'medium', purpose: 'office' },
    ],
  },
  {
    id: 'chairs',
    title: 'Кресла',
    products: [
      { id: 1, name: 'Кресло Bergen', price: 'от 690 €', priceNum: 690, image: '/фото к 1.jpg', type: 'chair', material: 'fabric', color: 'beige', style: 'scandinavian', size: 'small', purpose: 'home' },
      { id: 2, name: 'Кресло Malmo', price: 'от 750 €', priceNum: 750, image: '/фото к2.jpg', type: 'chair', material: 'leather', color: 'black', style: 'modern', size: 'small', purpose: 'office' },
      { id: 3, name: 'Кресло Relax Pro', price: 'от 990 €', priceNum: 990, image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=600&q=80', type: 'chair', material: 'velour', color: 'blue', style: 'modern', size: 'small', purpose: 'home' },
      { id: 4, name: 'Кресло Skansi', price: 'от 1 850 €', priceNum: 1850, image: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&w=600&q=80', type: 'chair', material: 'leather', color: 'brown', style: 'classic', size: 'small', purpose: 'office' },
    ],
  },
  {
    id: 'beds',
    title: 'Кровати',
    products: [
      { id: 1, name: 'Кровать Lund 160', price: 'от 1 290 €', priceNum: 1290, image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=600&q=80', type: 'bed', material: 'fabric', color: 'beige', style: 'scandinavian', size: 'medium', purpose: 'home' },
      { id: 2, name: 'Кровать Lund 180', price: 'от 1 490 €', priceNum: 1490, image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80', type: 'bed', material: 'fabric', color: 'grey', style: 'scandinavian', size: 'large', purpose: 'home' },
      { id: 3, name: 'Кровать Bergen', price: 'от 690 €', priceNum: 690, image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=600&q=80', type: 'bed', material: 'velour', color: 'blue', style: 'modern', size: 'medium', purpose: 'home' },
      { id: 4, name: 'Кровать Tabou', price: 'от 2 490 €', priceNum: 2490, image: '/фото т 1.jpg', type: 'bed', material: 'leather', color: 'brown', style: 'classic', size: 'large', purpose: 'home' },
    ],
  },
  {
    id: 'poufs',
    title: 'Пуфы',
    products: [
      { id: 1, name: 'Пуф Visby S', price: 'от 190 €', priceNum: 190, image: '/фото к 1.jpg', type: 'pouf', material: 'fabric', color: 'beige', style: 'scandinavian', size: 'small', purpose: 'home' },
      { id: 2, name: 'Пуф Visby L', price: 'от 290 €', priceNum: 290, image: '/фото к2.jpg', type: 'pouf', material: 'velour', color: 'grey', style: 'modern', size: 'small', purpose: 'home' },
      { id: 3, name: 'Пуф Bergen Round', price: 'от 350 €', priceNum: 350, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80', type: 'pouf', material: 'fabric', color: 'green', style: 'loft', size: 'small', purpose: 'office' },
      { id: 4, name: 'Пуф Tabou Cube', price: 'от 650 €', priceNum: 650, image: '/фото т 3.jpg', type: 'pouf', material: 'velour', color: 'brown', style: 'classic', size: 'small', purpose: 'home' },
    ],
  },
];
