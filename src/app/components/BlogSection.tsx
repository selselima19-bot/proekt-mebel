/*
  Этот файл показывает последние статьи из блога.
  Выводит 9 блога-карточек в 3-колонной сетке с изображениями и описаниями.
  Каждая статья имеет изображение, заголовок, описание и ссылку.
*/

import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS } from '../data/blogPosts';

export default function BlogSection() {
  // Берем статьи из единого источника, чтобы не дублировать данные.
  // Для главной оставляем только одну строку карточек.
  const posts = BLOG_POSTS.slice(0, 3);

  return (
    <section className="blog-section blog-section--home">
      <div className="blog-container">
        <p className="blog-kicker">Блог и идеи</p>
        <h2 className="blog-title">Что нового?</h2>
        <p className="blog-subtitle">Последние публикации в нашем блоге</p>

        <div className="blog-grid">
          {posts.map((post) => (
            <article key={post.id} className="blog-card">
              {/* Картинка статьи в оптимизированном формате для ускоренной загрузки. */}
              <div className="blog-card__image">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="blog-card__content">
                <h3 className="blog-card__title">{post.title}</h3>
                <p className="blog-card__excerpt">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="blog-card__link">
                  Читать дальше →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Кнопка ведет к полному списку публикаций, чтобы продолжить чтение. */}
        <div className="blog-section__actions">
          <Link href="/blog" className="blog-view-all">
            Смотреть все статьи
          </Link>
        </div>

      </div>
    </section>
  );
}
