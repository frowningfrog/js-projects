import {products} from '../data/products.js';
import {cart, saveCartToLocalStorage, retrieveCart} from '../cart/cart.js';

function loadProducts() {
  document.getElementById('box').innerHTML = `
    ${products.map(product => `
      <div class="product-card border p-4 m-3">
        <h2 class="text-xl font-semibold mb-2">${product.name}</h2>
        <p class="text-gray-700 mb-2">$${product.price.toFixed(2)}</p>
        <button id="add-to-cart-btn" class="bg-green-500 text-white px-4 py-2 rounded"
        data-product-id="${product.id}">Add to Cart</button>
      </div>`).join('')}`
}

loadProducts();
cart.push(...retrieveCart);

document.addEventListener('click', function(event) {
  const eventTarget = event.target;
  if(eventTarget.matches('#add-to-cart-btn')) {
    const productid = eventTarget.getAttribute("data-product-id");
    const foundProduct = products.find(item => {
      return item.id === +productid;
    });

    let here = false;

    for(let i = 0; i < cart.length; i++) {
      if(cart[i].id === foundProduct.id) {
        cart[i].count++;
        here = true;
      }
      if(i === cart.length-1 && here === false) {
        cart.push(foundProduct);
        break;
      }
    }

    if(cart.length === 0) {
      cart.push(foundProduct);
    }
    
    console.log('Added', foundProduct);
    saveCartToLocalStorage();
  }
});