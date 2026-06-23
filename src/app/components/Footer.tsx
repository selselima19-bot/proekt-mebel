/*
Этот файл определяет подвал сайта с контактами и навигацией.
Он показывает телефон, email, быстрые ссылки и ссылки на соцсети.
Пользователь может перейти в нужный раздел или связаться с компанией.
*/
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      {/* Основной декоративный блок футера сделан как компактная полка в цветах сайта. */}
      <div className="footer-cabinet">
        {/* Каждая полка хранит отдельный раздел, чтобы человеку было проще найти нужное. */}
        <div className="footer-shelf">
          <p className="footer-shelf__title">Контакты</p>
          <div className="footer-shelf__content">
            <p className="footer-brand">MeblePro</p>
            <a href="tel:+48777777777" className="footer-link">+48 777 777 777</a>
            <a href="mailto:info@meblepro.pl" className="footer-link">info@meblepro.pl</a>
            <Link href="/contacts" className="footer-link">Где мы находимся</Link>
          </div>
        </div>

        <div className="footer-shelf">
          <p className="footer-shelf__title">Навигация</p>
          <nav className="footer-shelf__content">
            <Link href="/" className="footer-link">Главная</Link>
            <Link href="/catalog" className="footer-link">Каталог</Link>
            <Link href="/about" className="footer-link">О нас</Link>
            <Link href="/blog" className="footer-link">Блог</Link>
            <Link href="/contacts" className="footer-link">Контакты</Link>
          </nav>
        </div>

        <div className="footer-shelf">
          <p className="footer-shelf__title">Категории мебели</p>
          <nav className="footer-shelf__content">
            <Link href="/catalog#corner-sofas" className="footer-link">Угловые диваны</Link>
            <Link href="/catalog#sofas" className="footer-link">Диваны</Link>
            <Link href="/catalog#chairs" className="footer-link">Кресла</Link>
            <Link href="/catalog#beds" className="footer-link">Кровати</Link>
            <Link href="/catalog#poufs" className="footer-link">Пуфы</Link>
          </nav>
        </div>

        <div className="footer-shelf">
          <p className="footer-shelf__title">Соцсети</p>
          <div className="footer-shelf__content footer-social">
            <a href="https://instagram.com" className="footer-social-link" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://facebook.com" className="footer-social-link" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://wa.me/48777777777" className="footer-social-link" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href="https://t.me" className="footer-social-link" target="_blank" rel="noopener noreferrer">Telegram</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">© 2026 MeblePro. Все права защищены.</p>
      </div>
    </footer>
  );
}
