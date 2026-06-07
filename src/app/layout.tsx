/*
Этот файл задает общий каркас всех страниц сайта.
Он подключает глобальные стили и шрифты, а также оборачивает весь интерфейс.
Пользователь видит одинаковую базовую структуру на каждой странице.
*/

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MeblePro — Премиум мебель для дома",
  description: "Диваны, кресла и кровати из высококачественных материалов",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
