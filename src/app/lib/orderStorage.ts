/*
Этот файл сохраняет заказы в локальный JSON-файл на сервере.
Он работает без Supabase и нужен, когда ключи базы ещё не настроены.
Заказы можно посмотреть в файле data/orders.json в корне проекта.
*/

import { promises as fs } from 'fs';
import path from 'path';

export interface StoredOrder {
  id: number;
  name: string;
  phone: string;
  email: string;
  city: string | null;
  address: string | null;
  delivery: string;
  payment: string;
  comment: string | null;
  items: unknown[];
  subtotal: number;
  delivery_cost: number;
  total: number;
  created_at: string;
}

// Путь к файлу, где лежат все сохранённые заказы.
const ordersFilePath = path.join(process.cwd(), 'data', 'orders.json');

// Проверяем, настроен ли Supabase через переменные окружения.
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project') &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'your-anon-key'
  );
}

// Читаем список заказов из файла.
async function readOrders(): Promise<StoredOrder[]> {
  try {
    const raw = await fs.readFile(ordersFilePath, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Сохраняем новый заказ в локальный файл и возвращаем его номер.
export async function saveOrderLocally(
  order: Omit<StoredOrder, 'id' | 'created_at'>
): Promise<number> {
  await fs.mkdir(path.dirname(ordersFilePath), { recursive: true });

  const existing = await readOrders();
  const nextId = existing.length > 0 ? Math.max(...existing.map((o) => o.id)) + 1 : 1;

  const stored: StoredOrder = {
    id: nextId,
    created_at: new Date().toISOString(),
    ...order,
  };

  existing.push(stored);
  await fs.writeFile(ordersFilePath, JSON.stringify(existing, null, 2), 'utf8');

  return nextId;
}
