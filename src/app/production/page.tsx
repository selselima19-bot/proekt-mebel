/*
Этот файл определяет страницу о процессе производства мебели.
Он показывает, как создаются модели: от идеи и проектирования до финальной проверки.
Пользователь может понять этапы изготовления и уровень контроля качества.
*/
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function ProductionPage() {
  return (
    <>
      <Navigation />

      {/* Заголовочный блок, который объясняет назначение страницы. */}
      <div className="inner-hero inner-hero--short">
        <div className="inner-hero__content">
          <p className="inner-hero__eyebrow">Производство</p>
          <h1 className="inner-hero__title">Как создается наша мебель</h1>
          <p className="inner-hero__sub">
            Прозрачный процесс: разработка, отбор материалов, сборка и финальный контроль.
          </p>
        </div>
      </div>

      <main className="page-content">
        {/* Три ключевых этапа изготовления мебели. */}
        <section className="showrooms">
          <h2 className="showrooms__title">Этапы производства</h2>
          <div className="showrooms__grid">
            <article className="showroom-card">
              <h3>1. Проектирование</h3>
              <p>Определяем конструкцию, эргономику и функциональность каждой модели.</p>
            </article>
            <article className="showroom-card">
              <h3>2. Изготовление</h3>
              <p>Собираем каркас, подбираем наполнители и обивку, проверяем геометрию.</p>
            </article>
            <article className="showroom-card">
              <h3>3. Контроль качества</h3>
              <p>Тестируем готовое изделие перед отправкой клиенту.</p>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
