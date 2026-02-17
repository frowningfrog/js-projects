import {retrieveCart} from '../cart/cart.js';

function displayCart() {
  document.getElementById('cart').innerHTML = `
    ${retrieveCart.map(product => `
      <div class="product-card border p-4 m-3">
        <h2 class="text-xl font-semibold mb-2">${product.name}</h2>
        <p class="text-gray-700 mb-2">$${product.price.toFixed(2)}</p>
        <button id="remove-from-cart-btn" class="bg-red-500 text-white px-4 py-2 rounded" data-product-id="${product.id}">Remove</button>
      </div>`).join('')}`
}

displayCart();

console.log(retrieveCart);

document.addEventListener('click', function(event) {
  const eventTarget = event.target;
  if(eventTarget.matches('#remove-from-cart-btn')) {
    const productid = eventTarget.getAttribute("data-product-id");
    retrieveCart.splice(retrieveCart.findIndex(item => item.id === +productid), 1);
    localStorage.setItem('cart', JSON.stringify(retrieveCart));
    displayCart();
  }
  console.log(retrieveCart);
});