/*
  Этот файл показывает последние статьи из блога.
  Выводит 9 блога-карточек в 3-колонной сетке с изображениями и описаниями.
  Каждая статья имеет изображение, заголовок, описание и ссылку.
*/

import Link from 'next/link';

export default function BlogSection() {
  const posts = [
    {
      id: 1,
      title: 'Софы из бульклэ – стильный тренд или временная мода?',
      excerpt:
        'В последние сезоны ткань бульклэ доминирует на мебельном рынке, особенно в сегменте диванов и кресел.',
      image:
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
      href: '/blog/sofas-bukle',
    },
    {
      id: 2,
      title: 'Диван плюс кресло – этот дуэт имеет скрытые преимущества',
      excerpt:
        'Когда в моде гигантские угловые диваны и интегрированные модульные гарнитуры, набор диван плюс кресло может быть интересной альтернативой.',
      image:
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=600&q=80',
      href: '/blog/sofa-plus-chair',
    },
    {
      id: 3,
      title: 'Стоит ли выбирать итальянскую систему раскладывания?',
      excerpt:
        'Когда вы обустраиваете квартиру и ищете удобную, функциональную и стильную мебель, система раскладывания очень важна.',
      image:
        'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=600&q=80',
      href: '/blog/italian-system',
    },
    {
      id: 4,
      title: 'Бежевый диван в гостиной – модный тренд',
      excerpt:
        'Бежевая софа – один из самых горячих трендов в дизайне интерьеров последних лет. Почему? Потому что она универсальна и стильна.',
      image:
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
      href: '/blog/beige-sofa',
    },
    {
      id: 5,
      title: 'Удобное одноместное спальное кресло – на что обратить внимание?',
      excerpt:
        'Задаетесь вопросом, что может сделать раскладное кресло, чего не может обычное кресло? А помните, сколько места оно займет в комнате?',
      image:
        'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=600&q=80',
      href: '/blog/armchair-bed',
    },
    {
      id: 6,
      title: 'Как разместить очень большой угловой диван в гостиной?',
      excerpt:
        'Очень большой угловой диван для гостиной – мечта многих из нас: удобный, просторный, идеальный для семей.',
      image:
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
      href: '/blog/large-sofa',
    },
    {
      id: 7,
      title: 'Бежевые угловые диваны – вдохновение',
      excerpt:
        'В мире дизайна интерьеров бежевый угловой диван набирает все большую популярность благодаря своему универсальному цвету.',
      image:
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=600&q=80',
      href: '/blog/beige-corners',
    },
    {
      id: 8,
      title: 'Биофилия в интерьере – модный тренд 2025 года',
      excerpt:
        'Биофилия. Звучит загадочно, правда? А это ничто иное, как любовь к природе, которую мы будем видеть в интерьерах.',
      image:
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
      href: '/blog/biophilia',
    },
    {
      id: 9,
      title: 'Старые деньги – стили интерьера',
      excerpt:
        'Стиль «old money» уже много лет привлекает тех, кто ценит элегантность и утонченность в интерьерах.',
      image:
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=80',
      href: '/blog/old-money',
    },
  ];

  return (
    <section className="blog-section">
      <div className="blog-container">
        <h2 className="blog-title">Что нового?</h2>
        <p className="blog-subtitle">Последние публикации в нашем блоге</p>

        <div className="blog-grid">
          {posts.map((post) => (
            <article key={post.id} className="blog-card">
              <div
                className="blog-card__image"
                style={{ backgroundImage: `url('${post.image}')` }}
              ></div>
              <div className="blog-card__content">
                <h3 className="blog-card__title">{post.title}</h3>
                <p className="blog-card__excerpt">{post.excerpt}</p>
                <Link href={post.href} className="blog-card__link">
                  Читать дальше →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <Link href="/blog" className="blog-view-all">
          Смотреть больше
        </Link>
      </div>
    </section>
  );
}
