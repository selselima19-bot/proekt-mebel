/*
Этот файл определяет страницу корзины и оформления заказа.
Он показывает товары, шаги покупки, форму доставки и подтверждение заказа.
Пользователь может изменить количество, удалить позиции и завершить оформление.
*/
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { CartItem, readCartFromStorage, writeCartToStorage } from '../lib/cartStorage';
import { assetBackground } from '../lib/assetPath';

type Step = 'cart' | 'checkout' | 'done';

export default function CartPage() {
  // Основной список товаров, которые пользователь добавил в корзину.
  const [cart, setCart] = useState<CartItem[]>(() => readCartFromStorage());
  // Текущий шаг покупки: корзина, оформление или экран успеха.
  const [step, setStep] = useState<Step>('cart');
  // Подтверждение согласия с условиями перед отправкой заказа.
  const [agreed, setAgreed] = useState(false);
  // Данные формы для доставки и контактов.
  const [form, setForm] = useState({
    name: '', phone: '', email: '', city: '', address: '', delivery: 'courier', payment: 'card', comment: '',
  });
  // Сообщения об ошибках в обязательных полях.
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  // После любого изменения корзины сохраняем данные в localStorage.
  useEffect(() => {
    writeCartToStorage(cart);
  }, [cart]);

  /* ---- корзина ---- */
  // Меняем количество выбранного товара.
  function changeQty(id: string, delta: number) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  }

  // Удаляем конкретный товар из корзины.
  function remove(id: string) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  const subtotal  = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery  = cart.length > 0 && form.delivery === 'courier' ? 99 : 0;
  const total     = subtotal + delivery;

  /* ---- форма ---- */
  // Обновляем конкретное поле формы при вводе пользователя.
  function handleField(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  // Проверяем обязательные поля перед отправкой заказа.
  function validate(): boolean {
    const e: Partial<typeof form> = {};
    if (!form.name.trim())  e.name  = 'Укажите имя';
    if (!form.phone.trim()) e.phone = 'Укажите телефон';
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Укажите корректный email';
    if (form.delivery === 'courier' && !form.address.trim()) e.address = 'Укажите адрес';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // Обрабатываем отправку заказа и переводим пользователя на экран успеха.
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (validate() && agreed) setStep('done');
  }

  /* ---- шаги ---- */
  const steps = [
    { key: 'cart',     label: '1. Корзина' },
    { key: 'checkout', label: '2. Оформление' },
    { key: 'done',     label: '3. Готово' },
  ];

  return (
    <>
      <Navigation />

      {/* Шапка страницы */}
      <div className="cart-hero">
        <div className="cart-hero__inner">
          <p className="inner-hero__eyebrow">MeblePro</p>
          <h1 className="cart-hero__title">
            {step === 'cart' ? 'Корзина' : step === 'checkout' ? 'Оформление заказа' : 'Заказ принят'}
          </h1>
        </div>
      </div>

      <main className="page-content">

        {/* Прогресс-бар */}
        <div className="cart-steps">
          {steps.map((s, i) => (
            <div key={s.key} className={`cart-steps__item${step === s.key ? ' cart-steps__item--active' : ''}${(step === 'checkout' && i < 1) || (step === 'done' && i < 2) ? ' cart-steps__item--done' : ''}`}>
              <span className="cart-steps__dot">{(step === 'checkout' && i < 1) || (step === 'done' && i < 2) ? '✓' : i + 1}</span>
              <span className="cart-steps__label">{s.label.slice(3)}</span>
            </div>
          ))}
        </div>

        {/* ===== ШАГ 1: КОРЗИНА ===== */}
        {step === 'cart' && (
          <div className="cart-layout">
            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="cart-empty">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#C4A882" strokeWidth="1.5" width="56" height="56" aria-hidden="true">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 01-8 0"/>
                  </svg>
                  <p>Корзина пуста</p>
                  <Link href="/catalog" className="cart-empty__link">Перейти в каталог</Link>
                </div>
              ) : cart.map((item) => (
                <article key={item.id} className="cart-item">
                  <div className="cart-item__img" style={{ backgroundImage: assetBackground(item.image) }} />
                  <div className="cart-item__info">
                    <h3 className="cart-item__name">{item.name}</h3>
                    <p className="cart-item__meta">{item.material} · {item.color}</p>
                    <p className="cart-item__price">{(item.price * item.qty).toLocaleString('ru-RU')} €</p>
                  </div>
                  <div className="cart-item__controls">
                    <div className="cart-qty">
                      <button className="cart-qty__btn" onClick={() => changeQty(item.id, -1)} aria-label="Меньше">−</button>
                      <span className="cart-qty__val">{item.qty}</span>
                      <button className="cart-qty__btn" onClick={() => changeQty(item.id, +1)} aria-label="Больше">+</button>
                    </div>
                    <button className="cart-item__remove" onClick={() => remove(item.id)} aria-label="Удалить">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Итого */}
            <aside className="cart-summary">
              <h2 className="cart-summary__title">Итого</h2>
              <div className="cart-summary__row">
                <span>Товары ({cart.reduce((s, i) => s + i.qty, 0)} шт.)</span>
                <span>{subtotal.toLocaleString('ru-RU')} €</span>
              </div>
              <div className="cart-summary__row">
                <span>Доставка</span>
                <span>{delivery > 0 ? `${delivery} €` : 'Бесплатно'}</span>
              </div>
              <div className="cart-summary__divider" />
              <div className="cart-summary__total">
                <span>К оплате</span>
                <span>{(subtotal + delivery).toLocaleString('ru-RU')} €</span>
              </div>
              <button
                className="cart-summary__btn"
                onClick={() => setStep('checkout')}
                disabled={cart.length === 0}
              >
                Оформить заказ
              </button>
              <Link href="/catalog" className="cart-summary__back">← Продолжить покупки</Link>
            </aside>
          </div>
        )}

        {/* ===== ШАГ 2: ОФОРМЛЕНИЕ ===== */}
        {step === 'checkout' && (
          <div className="cart-layout">
            <form className="checkout-form" onSubmit={submit} noValidate>

              {/* Личные данные */}
              <section className="checkout-section">
                <h2 className="checkout-section__title">Ваши данные</h2>
                <div className="checkout-grid">
                  <div className="checkout-field">
                    <label>Имя и фамилия *</label>
                    <input name="name" value={form.name} onChange={handleField} placeholder="Иван Иванов" className={errors.name ? 'checkout-field__input--error' : ''} />
                    {errors.name && <span className="checkout-field__error">{errors.name}</span>}
                  </div>
                  <div className="checkout-field">
                    <label>Телефон *</label>
                    <input name="phone" value={form.phone} onChange={handleField} placeholder="+48 000 000 000" className={errors.phone ? 'checkout-field__input--error' : ''} />
                    {errors.phone && <span className="checkout-field__error">{errors.phone}</span>}
                  </div>
                  <div className="checkout-field checkout-field--wide">
                    <label>Email *</label>
                    <input name="email" type="email" value={form.email} onChange={handleField} placeholder="example@mail.com" className={errors.email ? 'checkout-field__input--error' : ''} />
                    {errors.email && <span className="checkout-field__error">{errors.email}</span>}
                  </div>
                </div>
              </section>

              {/* Доставка */}
              <section className="checkout-section">
                <h2 className="checkout-section__title">Способ получения</h2>
                <div className="checkout-delivery">
                  <label className={`delivery-option${form.delivery === 'courier' ? ' delivery-option--active' : ''}`}>
                    <input type="radio" name="delivery" value="courier" checked={form.delivery === 'courier'} onChange={handleField} />
                    <div className="delivery-option__icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="24" height="24"><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                    </div>
                    <div>
                      <p className="delivery-option__name">Доставка курьером</p>
                      <p className="delivery-option__desc">99 € · 3–7 рабочих дней</p>
                    </div>
                  </label>
                  <label className={`delivery-option${form.delivery === 'pickup' ? ' delivery-option--active' : ''}`}>
                    <input type="radio" name="delivery" value="pickup" checked={form.delivery === 'pickup'} onChange={handleField} />
                    <div className="delivery-option__icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="24" height="24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    </div>
                    <div>
                      <p className="delivery-option__name">Самовывоз из салона</p>
                      <p className="delivery-option__desc">Бесплатно · Варшава, Краков, Познань</p>
                    </div>
                  </label>
                </div>

                {form.delivery === 'courier' && (
                  <div className="checkout-grid" style={{ marginTop: '20px' }}>
                    <div className="checkout-field">
                      <label>Город</label>
                      <input name="city" value={form.city} onChange={handleField} placeholder="Варшава" />
                    </div>
                    <div className="checkout-field">
                      <label>Адрес доставки *</label>
                      <input name="address" value={form.address} onChange={handleField} placeholder="ул. Примерная, 1, кв. 10" className={errors.address ? 'checkout-field__input--error' : ''} />
                      {errors.address && <span className="checkout-field__error">{errors.address}</span>}
                    </div>
                  </div>
                )}
              </section>

              {/* Оплата */}
              <section className="checkout-section">
                <h2 className="checkout-section__title">Способ оплаты</h2>
                <div className="checkout-delivery">
                  <label className={`delivery-option${form.payment === 'card' ? ' delivery-option--active' : ''}`}>
                    <input type="radio" name="payment" value="card" checked={form.payment === 'card'} onChange={handleField} />
                    <div className="delivery-option__icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="24" height="24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                    </div>
                    <div>
                      <p className="delivery-option__name">Банковская карта</p>
                      <p className="delivery-option__desc">Visa, Mastercard, BLIK</p>
                    </div>
                  </label>
                  <label className={`delivery-option${form.payment === 'transfer' ? ' delivery-option--active' : ''}`}>
                    <input type="radio" name="payment" value="transfer" checked={form.payment === 'transfer'} onChange={handleField} />
                    <div className="delivery-option__icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="24" height="24"><path d="M3 12h18M3 6h18M3 18h12"/></svg>
                    </div>
                    <div>
                      <p className="delivery-option__name">Банковский перевод</p>
                      <p className="delivery-option__desc">Оплата по счёту в течение 3 дней</p>
                    </div>
                  </label>
                  <label className={`delivery-option${form.payment === 'cash' ? ' delivery-option--active' : ''}`}>
                    <input type="radio" name="payment" value="cash" checked={form.payment === 'cash'} onChange={handleField} />
                    <div className="delivery-option__icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="24" height="24"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/></svg>
                    </div>
                    <div>
                      <p className="delivery-option__name">Наличными</p>
                      <p className="delivery-option__desc">При получении или в салоне</p>
                    </div>
                  </label>
                </div>
              </section>

              {/* Комментарий */}
              <section className="checkout-section">
                <h2 className="checkout-section__title">Комментарий к заказу</h2>
                <div className="checkout-field checkout-field--wide">
                  <textarea name="comment" value={form.comment} onChange={handleField} placeholder="Особые пожелания, удобное время доставки..." rows={3} />
                </div>
              </section>

              {/* Согласие */}
              <label className="checkout-agree">
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                <span>Я согласен с <Link href="/contacts">условиями доставки</Link> и <Link href="/contacts">политикой конфиденциальности</Link></span>
              </label>

              <button type="submit" className="checkout-submit" disabled={!agreed}>
                Подтвердить заказ
              </button>
            </form>

            {/* Мини-итого при оформлении */}
            <aside className="cart-summary cart-summary--sticky">
              <h2 className="cart-summary__title">Ваш заказ</h2>
              {cart.map((item) => (
                <div key={item.id} className="cart-summary__item">
                  <div className="cart-summary__item-img" style={{ backgroundImage: assetBackground(item.image) }} />
                  <div className="cart-summary__item-info">
                    <p className="cart-summary__item-name">{item.name}</p>
                    <p className="cart-summary__item-qty">{item.qty} шт. · {(item.price * item.qty).toLocaleString('ru-RU')} €</p>
                  </div>
                </div>
              ))}
              <div className="cart-summary__divider" />
              <div className="cart-summary__row">
                <span>Товары</span>
                <span>{subtotal.toLocaleString('ru-RU')} €</span>
              </div>
              <div className="cart-summary__row">
                <span>Доставка</span>
                <span>{delivery > 0 ? `${delivery} €` : 'Бесплатно'}</span>
              </div>
              <div className="cart-summary__divider" />
              <div className="cart-summary__total">
                <span>К оплате</span>
                <span>{total.toLocaleString('ru-RU')} €</span>
              </div>
              <button className="cart-summary__back-link" onClick={() => setStep('cart')}>← Изменить корзину</button>
            </aside>
          </div>
        )}

        {/* ===== ШАГ 3: УСПЕХ ===== */}
        {step === 'done' && (
          <div className="cart-done">
            <div className="cart-done__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#C4A882" strokeWidth="1.5" width="64" height="64"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/></svg>
            </div>
            <h2 className="cart-done__title">Заказ оформлен!</h2>
            <p className="cart-done__sub">Спасибо, {form.name || 'дорогой клиент'}. Мы свяжемся с вами по номеру <strong>{form.phone}</strong> в течение часа для подтверждения заказа.</p>
            <div className="cart-done__info">
              <div className="cart-done__info-item">
                <span className="cart-done__info-label">Сумма заказа</span>
                <span className="cart-done__info-val">{total.toLocaleString('ru-RU')} €</span>
              </div>
              <div className="cart-done__info-item">
                <span className="cart-done__info-label">Доставка</span>
                <span className="cart-done__info-val">{form.delivery === 'courier' ? 'Курьером' : 'Самовывоз'}</span>
              </div>
              <div className="cart-done__info-item">
                <span className="cart-done__info-label">Оплата</span>
                <span className="cart-done__info-val">{form.payment === 'card' ? 'Картой' : form.payment === 'transfer' ? 'Переводом' : 'Наличными'}</span>
              </div>
            </div>
            <div className="cart-done__actions">
              <Link href="/catalog" className="cart-done__btn cart-done__btn--primary">Продолжить покупки</Link>
              <Link href="/contacts" className="cart-done__btn cart-done__btn--outline">Связаться с нами</Link>
            </div>
          </div>
        )}

      </main>
      <Footer />
    </>
  );
}
