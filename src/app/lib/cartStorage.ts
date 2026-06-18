export interface CartItem {
  id: string;
  name: string;
  material: string;
  color: string;
  price: number;
  qty: number;
  image: string;
}

const CART_STORAGE_KEY = 'meblepro-cart-v1';

export function readCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item) =>
        item &&
        typeof item.id === 'string' &&
        typeof item.name === 'string' &&
        typeof item.price === 'number' &&
        typeof item.qty === 'number'
    ) as CartItem[];
  } catch {
    return [];
  }
}

export function writeCartToStorage(cart: CartItem[]): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

export function upsertCartItem(item: Omit<CartItem, 'qty'>, qtyToAdd = 1): CartItem[] {
  const currentCart = readCartFromStorage();
  const nextCart = [...currentCart];
  const existingIndex = nextCart.findIndex((cartItem) => cartItem.id === item.id);

  if (existingIndex >= 0) {
    nextCart[existingIndex] = {
      ...nextCart[existingIndex],
      qty: nextCart[existingIndex].qty + Math.max(1, qtyToAdd),
    };
  } else {
    nextCart.push({ ...item, qty: Math.max(1, qtyToAdd) });
  }

  writeCartToStorage(nextCart);
  return nextCart;
}
