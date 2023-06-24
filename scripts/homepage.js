import products from '../MassOfData/products.js';

const totalPriceLabel = document.getElementById('totalPrice');
const selectedProducts = [];
let totalPrice = 0;

function renderProducts() {
  const productContainer = document.getElementById('product-container');

  products.forEach(product => {
    const card = createCard(product);
    productContainer.appendChild(card);
  });
}

function createCard(product) {
  const card = document.createElement('div');
  card.id = `card-${product.id}`
  card.className = 'product';

  const image = document.createElement('img');
  image.src = product.image;
  image.alt = product.name;

  const title = document.createElement('h3');
  title.textContent = product.name;

  const description = document.createElement('p');
  description.textContent = product.description;

  const price = document.createElement('p');
  price.textContent = `R$ ${product.price.toFixed(2)}`;

  const quantityInput = document.createElement('input');
  quantityInput.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '');
  });
  quantityInput.value = 0;
  quantityInput.min = 0;
  quantityInput.id = `quantity-input-${product.id}`
  quantityInput.className = 'quantity-input';

  const increaseButton = document.createElement('button');
  increaseButton.textContent = '+';
  increaseButton.className = 'quantity-button increase';
  increaseButton.addEventListener('click', () => {
    quantityInput.value = parseInt(quantityInput.value) + 1;
    storeSelectedProducts();
  });

  const decreaseButton = document.createElement('button');
  decreaseButton.textContent = '-';
  decreaseButton.className = 'quantity-button decrease';
  decreaseButton.addEventListener('click', () => {
    const currentValue = parseInt(quantityInput.value);
    if (currentValue >= 1) {
      quantityInput.value = currentValue - 1;
      storeSelectedProducts();
    }
  });

  const buyButton = document.getElementById('buy-button')

  buyButton.addEventListener('click', function () {
    storeSelectedProducts();
    const store = {
      selectedProducts: selectedProducts,
      totalPrice: parseFloat(totalPrice.toFixed(2))
    };

    localStorage.setItem('shoppingCartData', JSON.stringify(store));
    window.location.href = "./checkout.html";
  })

  card.appendChild(image);
  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(price);
  card.appendChild(decreaseButton);
  card.appendChild(quantityInput);
  card.appendChild(increaseButton);

  return card;
}

function storeSelectedProducts() {
  selectedProducts.length = 0;
  totalPrice = 0;

  products.forEach((product, index) => {
    const quantityInputId = document.getElementById(`quantity-input-${index + 1}`);
    const quantity = parseInt(quantityInputId.value) || 0;

    if (quantity > 0) {
      const existingProductIndex = selectedProducts.findIndex(item => item.id === product.id);

      if (existingProductIndex !== -1) {
        selectedProducts[existingProductIndex].quantity = quantity;
      } else {
        const selectedProduct = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity
        };
        selectedProducts.push(selectedProduct);

        totalPrice += quantity * product.price;
      }
    }
  });

  totalPriceLabel.innerHTML = `R$ ${totalPrice.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', function () {
  const increaseButtons = document.querySelectorAll('.quantity-button.increase');
  const decreaseButtons = document.querySelectorAll('.quantity-button.decrease');

  increaseButtons.forEach(button => {
    button.addEventListener('click', function () {
      storeSelectedProducts();
    });
  });

  decreaseButtons.forEach(button => {
    button.addEventListener('click', function () {
      storeSelectedProducts();
    });
  });
});

renderProducts();
