import {products} from '../data/products.js';
function loadProducts() {
  document.getElementById('box').innerHTML = `
    ${products.map(product => `
      <div class="product-card border p-4 m-3">
        <h2 class="text-xl font-semibold mb-2">${product.name}</h2>
        <p class="text-gray-700 mb-2">$${product.price.toFixed(2)}</p>
        <button id="add-to-cart-btn" class="bg-green-500 text-white px-4 py-2 rounded" data-productname="${product.name}">Add to Cart</button>
      </div>`).join('')}`
}

loadProducts();

document.addEventListener('click', function(event) {
  const eventTarget = event.target;

  if(eventTarget.matches('#add-to-cart-btn')) {
    const productName = eventTarget.getAttribute("data-productname");
    console.log('added', productName, 'to cart');
  }
});