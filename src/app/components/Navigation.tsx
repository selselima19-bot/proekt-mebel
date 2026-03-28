/*
  Этот файл определяет шапку сайта.
  Он показывает логотип, верхнее меню, ряд круглых иконок,
  кнопку языка, кнопку мобильного меню и нижнее меню каталога.
  Пользователь может использовать шапку для перехода по основным разделам.
*/

export default function Navigation() {
  return (
    <header className="site-header">
      <div className="top-bar">
        {/* Логотип в левом верхнем углу шапки. */}
        <div className="logo">
          <a href="#">MeblePro</a>
        </div>

        {/* Верхний ряд: главное меню и ряд иконок. */}
        <div className="nav-with-icons">
          <nav className="main-nav">
            <ul>
              <li>
                <a href="#" className="is-active">
                  Главная
                </a>
              </li>
              <li>
                <a href="#">Категории</a>
              </li>
              <li>
                <a href="#">Контакты</a>
              </li>
            </ul>
          </nav>

          {/* Блок иконок для быстрых действий и соцсетей. */}
          <div className="social-icons">
            <a href="#" className="icon-circle" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 20.5l1.7-5.7A8 8 0 1 1 12 20a7.9 7.9 0 0 1-3.6-.8Z"></path>
                <path d="M8.8 10.7c.3 1.5 2.3 3.4 3.7 3.9l1.1-.6"></path>
              </svg>
            </a>
            <a href="#" className="icon-circle" aria-label="Позвонить">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 3h3l2 5-2 1c1.7 4 4.3 6.6 8.3 8.3l1-2 4.7 2v3c0 1-1 2-2 2A17 17 0 0 1 2 6c0-1 .9-2 2-2z"></path>
              </svg>
            </a>
            <a href="#" className="icon-circle" aria-label="Facebook">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 8h-2a1 1 0 0 0-1 1v2h3l-.4 3h-2.6v8h-3v-8H7v-3h2V9a4 4 0 0 1 4-4h2z"></path>
              </svg>
            </a>
            <a href="#" className="icon-circle" aria-label="Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="4" y="4" width="16" height="16" rx="5"></rect>
                <circle cx="12" cy="12" r="3.2"></circle>
                <circle cx="17" cy="7" r="1.2"></circle>
              </svg>
            </a>
            <a href="#" className="icon-circle" aria-label="YouTube">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="4" y="7" width="16" height="10" rx="3"></rect>
                <path d="M11 10.5l4 2.5-4 2.5z"></path>
              </svg>
            </a>
            <a href="#" className="icon-circle" aria-label="Главная">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 11l8-6 8 6"></path>
                <path d="M6 10v9h4v-5h4v5h4v-9"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Бургер для мобильной версии. */}
        <button className="burger" id="burgerBtn" aria-label="Открыть меню">
          ☰
        </button>
      </div>

      {/* Нижний ряд категорий с разделительной линией сверху. */}
      <nav className="catalog-nav">
        <ul>
          <li>
            <a href="#">Новые</a>
          </li>
          <li>
            <a href="#">Мебель</a>
          </li>
          <li>
            <a href="#">Углы</a>
          </li>
          <li>
            <a href="#">Диваны</a>
          </li>
          <li>
            <a href="#">Модульная</a>
          </li>
          <li>
            <a href="#">Комплекты</a>
          </li>
          <li>
            <a href="#">Кресла</a>
          </li>
          <li>
            <a href="#">Кровати</a>
          </li>
          <li>
            <a href="#">Пуфы</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
