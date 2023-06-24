document.getElementById("payment").addEventListener("change", function() {
  var paymentMethod = this.value;
  var creditCardFields = document.getElementById("paymentMethodsFields");
  creditCardFields.style.display = paymentMethod === "creditcard" || paymentMethod === "debitcard" ? "block" : "none";
});

function verifyType(field) {
  field.addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '');
  });
}

function generateSummaryList() {
  const summaryList = document.getElementById('summaryList');
  summaryList.innerHTML = '';

  const cartData = localStorage.getItem('shoppingCartData');

  if (cartData) {
    const storedData = JSON.parse(cartData);
    const selectedProducts = storedData.selectedProducts;
    const totalPrice = storedData.totalPrice;

    selectedProducts.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <span class="item-id">${item.id}</span>
        <span class="item-name">${item.name}</span>
        <span class="item-price">$${item.price.toFixed(2)}</span>
        <span class="item-quantity">${item.quantity}</span>
        <button class="remove-button" onclick="removeItem(${item.id}, ${item.price}, ${item.quantity})">X</button>
      `;
      summaryList.appendChild(listItem);
    });

    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;

    const btnCheckout = document.getElementById('btnCheckout');
    btnCheckout.disabled = totalPrice === 0;
  }
}

function removeItem(itemId, price, quantity) {
  const cartData = localStorage.getItem('shoppingCartData');

  if (cartData) {
    const storedData = JSON.parse(cartData);
    const selectedProducts = storedData.selectedProducts;
    const totalPrice = storedData.totalPrice;

    const index = selectedProducts.findIndex(item => item.id === itemId);

    if (index !== -1) {
      selectedProducts.splice(index, 1);
      const newTotal = totalPrice - (price * quantity);

      const newStore = {
        selectedProducts: selectedProducts,
        totalPrice: newTotal
      };

      localStorage.setItem('shoppingCartData', JSON.stringify(newStore));

      generateSummaryList();
    }
  }
}

const cardNumber = document.getElementById('cardNumber');
const expiryMonth = document.getElementById('expiryMonth');
const expiryYear = document.getElementById('expiryYear');
const cvv = document.getElementById('cvv');

verifyType(cardNumber);
verifyType(expiryMonth);
verifyType(expiryYear);
verifyType(cvv);

generateSummaryList();
