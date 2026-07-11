/*
Этот файл помогает правильно собирать адреса картинок и видео.
На GitHub Pages сайт открывается из подпапки, поэтому обычные пути вида /фото.jpg не работают.
Эта функция добавляет нужный префикс и безопасно кодирует адрес для браузера.
*/

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Возвращает полный адрес файла с учетом публикации на GitHub Pages.
export function assetPath(path: string): string {
  if (!path) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;
  return encodeURI(`${basePath}${normalized}`);
}

// Возвращает адрес в формате для CSS background-image.
export function assetBackground(path: string): string {
  return `url('${assetPath(path)}')`;
}
