/*
  Этот файл показывает сетку категорий товаров.
  Выводит 3 карточки: Угловые диваны, Диваны, Модульная мебель.
  На каждой карточке есть изображение, название, описание и ссылка.
*/

import Link from 'next/link';

export default function CategoryGrid() {
  const categories = [
    {
      id: 1,
      title: 'Угловые диваны',
      description: 'Идеально для просторных гостиных и семейного отдыха.',
      image:
        'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1200&q=80',
      href: '/furniture/corner-sofas',
    },
    {
      id: 2,
      title: 'Диваны',
      description: 'Классические, раскладные и с функцией релаксации.',
      image:
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80',
      href: '/furniture/sofas',
    },
    {
      id: 3,
      title: 'Модульная мебель',
      description: 'Соберите свою конфигурацию под размер комнаты.',
      image:
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
      href: '/furniture/modular',
    },
  ];

  return (
    <section className="category-grid">
      {categories.map((category) => (
        <article key={category.id} className="category-card">
          <div
            className="category-image"
            style={{ backgroundImage: `url('${category.image}')` }}
          ></div>
          <h2>{category.title}</h2>
          <p>{category.description}</p>
          <Link href={category.href} className="category-link">
            Перейти к категории
          </Link>
        </article>
      ))}
    </section>
  );
}
