/*
Этот файл определяет страницу одной статьи блога по ее адресу.
Он показывает заголовок, краткое описание и полный текст публикации.
Пользователь может прочитать материал и вернуться к списку всех статей.
*/
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { BLOG_POSTS, BLOG_POSTS_BY_SLUG } from '../../data/blogPosts';

// Список адресов статей, которые нужно собрать заранее для публикации на GitHub Pages.
export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  // Получаем адрес статьи из URL, чтобы найти нужный материал.
  const { slug } = await params;
  const post = BLOG_POSTS_BY_SLUG[slug];

  // Если статья не найдена, показываем стандартную страницу 404.
  if (!post) notFound();

  return (
    <>
      <Navigation />

      {/* Верхний блок с заголовком и кратким описанием статьи. */}
      <div className="inner-hero inner-hero--short">
        <div className="inner-hero__content">
          <p className="inner-hero__eyebrow">Статья</p>
          <h1 className="inner-hero__title">{post.title}</h1>
          <p className="inner-hero__sub">{post.excerpt}</p>
        </div>
      </div>

      <main className="page-content">
        {/* Основной текст статьи с абзацами и ссылкой обратно к списку публикаций. */}
        <section className="catalog-section">
          <div className="product-card" style={{ maxWidth: '940px', margin: '0 auto' }}>
            <div className="product-card__image" style={{ minHeight: '320px', position: 'relative' }}>
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 960px) 100vw, 940px"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="product-card__info">
              {post.body.map((paragraph, index) => (
                <p key={index} style={{ marginBottom: '14px' }}>
                  {paragraph}
                </p>
              ))}
              <Link href="/blog" className="product-card__btn">
                ← Вернуться к блогу
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
