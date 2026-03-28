/*
 Это главная страница магазина мебели Libro Meble.
 Она показывает премиум дизайн с полноэкранным слайдером, 
 категориями мебели, блогом и информацией о коллекции Tabou.
 Pользователь может изучить все виды мебели и прочитать статьи блога.
*/
import Navigation from "./components/Navigation";
import HeroSlider from "./components/HeroSlider";
import OfferCards from "./components/OfferCards";
import TabouCollection from "./components/TabouCollection";
import BlogSection from "./components/BlogSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      {/* Главная навигация */}
      <Navigation />
      
      {/* Полноэкранный слайдер */}
      <HeroSlider />
      
      <main className="main-content">
        {/* Категории и предложения мебели */}
        <OfferCards />

        {/* Коллекция Tabou */}
        <TabouCollection />

        {/* Блог с последними статьями */}
        <BlogSection />
      </main>

      {/* Подвал сайта */}
      <Footer />
    </>
  );
}
