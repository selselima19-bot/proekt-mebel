import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">

        {/* Бренд + контакты */}
        <div className="footer-section">
          <p className="footer-section-title" style={{ fontSize: '18px', marginBottom: '10px' }}>MeblePro</p>
          <a href="tel:+48777777777" className="footer-link">+48 777 777 777</a>
          <a href="mailto:info@meblepro.pl" className="footer-link">info@meblepro.pl</a>
        </div>

        {/* Навигация */}
        <div className="footer-section">
          <p className="footer-section-title">Навигация</p>
          <nav>
            <Link href="/catalog" className="footer-link">Каталог</Link>
            <Link href="/about" className="footer-link">О нас</Link>
            <Link href="/blog" className="footer-link">Блог</Link>
            <Link href="/contacts" className="footer-link">Контакты</Link>
          </nav>
        </div>

        {/* Соцсети */}
        <div className="footer-section">
          <p className="footer-section-title">Соцсети</p>
          <div className="footer-social">
            <a href="#" className="footer-social-link">Instagram</a>
            <a href="#" className="footer-social-link">Facebook</a>
            <a href="https://wa.me/48777777777" className="footer-social-link" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">© 2026 MeblePro. Все права защищены.</p>
      </div>
    </footer>
  );
}
