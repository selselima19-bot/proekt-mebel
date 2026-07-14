-- Таблица заказов для MeblePro.
-- Выполните этот SQL в Supabase: SQL Editor → New query → Run.

create table if not exists public.orders (
  id bigint generated always as identity primary key,
  name text not null,
  phone text not null,
  email text not null,
  city text,
  address text,
  delivery text not null check (delivery in ('courier', 'pickup')),
  payment text not null check (payment in ('card', 'transfer', 'cash')),
  comment text,
  items jsonb not null,
  subtotal integer not null,
  delivery_cost integer not null default 0,
  total integer not null,
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

-- Разрешаем вставку заказов с сайта (publishable / anon key).
drop policy if exists "allow_insert_orders" on public.orders;

create policy "allow_insert_orders"
  on public.orders
  for insert
  to anon, authenticated
  with check (true);

grant insert on public.orders to anon, authenticated;
