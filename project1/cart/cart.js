export const cart = [];
export const retrieveCart = JSON.parse(localStorage.getItem('cart')) || [];

export function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}