/*
Этот файл определяет главную страницу блога компании.
Он показывает список статей с короткими описаниями и ссылками на подробный текст.
Пользователь может открыть интересную публикацию и изучить материалы по интерьеру.
*/
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { BLOG_POSTS } from '../data/blogPosts';

export default function BlogPage() {
  return (
    <>
      <Navigation />

      {/* Крупный заголовок страницы блога с пояснением назначения раздела. */}
      <div className="inner-hero inner-hero--short">
        <div className="inner-hero__content">
          <p className="inner-hero__eyebrow">Блог</p>
          <h1 className="inner-hero__title">Советы по интерьеру и мебели</h1>
          <p className="inner-hero__sub">
            Подборки, идеи и практические рекомендации для удобного и стильного дома.
          </p>
        </div>
      </div>

      <main className="page-content">
        {/* Список всех статей, доступных для чтения на сайте. */}
        <section className="blog-section">
          <div className="blog-container">
            <div className="blog-grid">
              {BLOG_POSTS.map((post) => (
                <article key={post.id} className="blog-card">
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
                    <h2 className="blog-card__title">{post.title}</h2>
                    <p className="blog-card__excerpt">{post.excerpt}</p>
                    <Link href={`/blog/${post.slug}`} className="blog-card__link">
                      Читать статью →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
