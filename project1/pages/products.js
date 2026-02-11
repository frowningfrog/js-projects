import {products} from '../data/products.js';
function loadProducts() {
    document.getElementById('box').innerHTML = `
    <p class="text-3xl font-bold mb-4">Products</p>
    ${products.map(product =>
        `<div class="product-card border p-4 mb-4">
        <h2 class="text-xl font-semibold mb-2">${product.name}</h2>
        <p class="text-gray-700 mb-2">$${product.price.toFixed(2)}</p>
        </div>`).join('')}`
}

loadProducts();