/*
Этот файл создаёт подключение к базе Supabase на сервере.
Он нужен API-роутам, чтобы сохранять заказы в таблицу orders.
Если ключи не заданы, заказы сохраняются в локальный файл data/orders.json.
*/

import { createClient } from '@supabase/supabase-js';
import { isSupabaseConfigured } from './orderStorage';

// Создаём клиент Supabase для серверных запросов.
export function createSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!isSupabaseConfigured() || !supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase не настроен');
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}
