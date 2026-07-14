/*
Этот файл — API-роут для сохранения заказов из корзины.
Он принимает данные оформления заказа и сохраняет их в Supabase или локальный файл.
Страница корзины отправляет сюда POST-запрос при подтверждении заказа.
*/

import { NextResponse } from 'next/server';
import { isSupabaseConfigured, saveOrderLocally } from '../../lib/orderStorage';
import { createSupabaseClient } from '../../lib/supabase';

type DeliveryType = 'courier' | 'pickup';
type PaymentType = 'card' | 'transfer' | 'cash';

interface OrderItem {
  id: string;
  name: string;
  material?: string;
  color?: string;
  price: number;
  qty: number;
  image?: string;
}

interface OrderPayload {
  name: string;
  phone: string;
  email: string;
  city?: string;
  address?: string;
  delivery: DeliveryType;
  payment: PaymentType;
  comment?: string;
  items: OrderItem[];
  subtotal: number;
  delivery_cost: number;
  total: number;
}

// Проверяем, что в запросе есть все обязательные поля заказа.
function validateOrder(body: unknown): { ok: true; data: OrderPayload } | { ok: false; message: string } {
  if (!body || typeof body !== 'object') {
    return { ok: false, message: 'Некорректные данные заказа' };
  }

  const data = body as Partial<OrderPayload>;

  if (!data.name?.trim()) return { ok: false, message: 'Укажите имя' };
  if (!data.phone?.trim()) return { ok: false, message: 'Укажите телефон' };
  if (!data.email?.trim() || !data.email.includes('@')) {
    return { ok: false, message: 'Укажите корректный email' };
  }
  if (data.delivery !== 'courier' && data.delivery !== 'pickup') {
    return { ok: false, message: 'Выберите способ получения' };
  }
  if (data.payment !== 'card' && data.payment !== 'transfer' && data.payment !== 'cash') {
    return { ok: false, message: 'Выберите способ оплаты' };
  }
  if (data.delivery === 'courier' && !data.address?.trim()) {
    return { ok: false, message: 'Укажите адрес доставки' };
  }
  if (!Array.isArray(data.items) || data.items.length === 0) {
    return { ok: false, message: 'Корзина пуста' };
  }

  const itemsValid = data.items.every(
    (item) =>
      item &&
      typeof item.id === 'string' &&
      typeof item.name === 'string' &&
      typeof item.price === 'number' &&
      typeof item.qty === 'number' &&
      item.qty > 0
  );

  if (!itemsValid) {
    return { ok: false, message: 'Некорректный список товаров' };
  }

  if (typeof data.subtotal !== 'number' || typeof data.delivery_cost !== 'number' || typeof data.total !== 'number') {
    return { ok: false, message: 'Некорректная сумма заказа' };
  }

  return {
    ok: true,
    data: {
      name: data.name.trim(),
      phone: data.phone.trim(),
      email: data.email.trim(),
      city: data.city?.trim() || null,
      address: data.address?.trim() || null,
      delivery: data.delivery,
      payment: data.payment,
      comment: data.comment?.trim() || null,
      items: data.items,
      subtotal: data.subtotal,
      delivery_cost: data.delivery_cost,
      total: data.total,
    } as OrderPayload,
  };
}

// Сохраняем заказ в Supabase, если он настроен, иначе — в локальный файл.
async function persistOrder(order: OrderPayload): Promise<number> {
  if (isSupabaseConfigured()) {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
      .from('orders')
      .insert({
        name: order.name,
        phone: order.phone,
        email: order.email,
        city: order.city,
        address: order.address,
        delivery: order.delivery,
        payment: order.payment,
        comment: order.comment,
        items: order.items,
        subtotal: order.subtotal,
        delivery_cost: order.delivery_cost,
        total: order.total,
      })
      .select('id')
      .single();

    if (error) {
      console.error('Supabase insert error:', error);

      if (error.code === 'PGRST205') {
        throw new Error('Таблица orders не найдена в Supabase. Выполните SQL из файла supabase/schema.sql');
      }

      throw new Error('Не удалось сохранить заказ в Supabase');
    }

    return data.id;
  }

  return saveOrderLocally({
    name: order.name,
    phone: order.phone,
    email: order.email,
    city: order.city,
    address: order.address,
    delivery: order.delivery,
    payment: order.payment,
    comment: order.comment,
    items: order.items,
    subtotal: order.subtotal,
    delivery_cost: order.delivery_cost,
    total: order.total,
  });
}

// Принимаем новый заказ и сохраняем его.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validateOrder(body);

    if (!validation.ok) {
      return NextResponse.json({ error: validation.message }, { status: 400 });
    }

    const orderId = await persistOrder(validation.data);

    return NextResponse.json({
      ok: true,
      orderId,
      storage: isSupabaseConfigured() ? 'supabase' : 'local',
    });
  } catch (err) {
    console.error('Orders API error:', err);
    const message = err instanceof Error ? err.message : 'Внутренняя ошибка сервера';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
