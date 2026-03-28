/*
  Этот файл показывает компактный подвал сайта.
  Он выводит только самое необходимое: название, контакты и копирайт.
  Пользователь может быстро увидеть телефон и email для связи.
*/

export default function Footer() {
  return (
    <footer className="site-footer">
      {/* Компактный блок с названием бренда и основными контактами. */}
      <div className="footer-minimal">
        <p className="footer-brand">MeblePro</p>
        <a href="tel:+48777777777" className="footer-contact">
          +48 777 777 777
        </a>
        <a href="mailto:info@meblepro.pl" className="footer-contact">
          info@meblepro.pl
        </a>
        {/* Краткая строка копирайта. */}
        <p className="footer-copyright">Copyright © 2026 MeblePro</p>
      </div>
    </footer>
  );
}
