import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    let id = product.id;
    let existCartItemIndex;
    const existCartItem = this.cartItems.find((item, index) => {

      if (id === item.product.id) {
        existCartItemIndex = index;
        return true;
      } else {
        return false;
      };

    });

    if (existCartItem) {
      this.cartItems[existCartItemIndex].count++;
      this.onProductUpdate(existCartItem);
    } else {
      const productItemToAdd = {
        product: product,
        count: 1,
      };

      this.cartItems.push(productItemToAdd);
      this.onProductUpdate(productItemToAdd);
    }
  }

  updateProductCount(productId, amount) {
    let targetCartItemIndex;
    const targetCartItem = this.cartItems.find((item, index) => {

      if (productId === item.product.id) {
        targetCartItemIndex = index;
        return true;
      } else {
        return false;
      };

    });

    if (targetCartItem) {
      this.cartItems[targetCartItemIndex].count += amount;
      if (this.cartItems[targetCartItemIndex].count <= 0) {
        this.cartItems.splice(targetCartItemIndex, 1);
        this.onProductUpdate(targetCartItem);
      } else {
        this.onProductUpdate(targetCartItem);
      };
    };

  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((previousValue, item) => previousValue += item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((previousValue, item) => previousValue += item.count * item.product.price, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id
      }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
      2
    )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    let modal = new Modal();
    modal.open();
    modal.setTitle("Your order");

    const modalBody = document.createElement('div');
    this.cartItems.forEach((item) => {
      modalBody.append(this.renderProduct(item.product, item.count));
    });
    modalBody.append(this.renderOrderForm());
    modal.setBody(modalBody);

    this._modalBody = modalBody;
    this._modal = modal;

    modalBody.addEventListener("click", (event) => {
      let button = event.target.closest(".cart-counter__button");
      if (button) {
        const targetProduct = button.closest(".cart-product");
        const targetProductId = targetProduct.dataset.productId;
        let ammount;
        button.classList.contains("cart-counter__button_minus") ? ammount = -1 : ammount = 1;
        this.updateProductCount(targetProductId, ammount);

        const targetCartItem = this.cartItems.find((item) => {
          return item.product.id === targetProductId;
        });
        this.onProductUpdate(targetCartItem);
      } else {
        return;
      };
    });

    modalBody.addEventListener("submit", async (event) => {
      event.preventDefault();
      this.onSubmit(event);
    });
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (document.body.classList.contains("is-modal-open") && cartItem) {
      if (this.getTotalCount() > 0) {
        let productId = cartItem.product.id;
        const modalBody = this._modalBody;
        const productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
        const productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
        const infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);
        if (cartItem.count >= 1) {
          productCount.innerHTML = cartItem.count;
          productPrice.innerHTML = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;
          infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
        } else {
          modalBody.querySelector(`[data-product-id="${productId}"].cart-product`).remove();
        };

      } else {
        this._modal.close();
      };
    };
  }

  async onSubmit(event) {
    const form = event.target;
    form.querySelector(`button[type="submit"]`).classList.add("is-loading");
    const response = await fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(form)
    });
    if (response.ok) {
      this._modal.setTitle('Success!');
      this.cartItems.length = 0;
      this.cartIcon.update(this);
      const newModalBody = createElement(`<div class="modal__body-inner">
      <p>
        Order successful! Your order is being cooked :) <br>
        We’ll notify you about delivery time shortly.<br>
        <img src="/assets/images/delivery.gif">
      </p>
    </div>`);
    this._modal.setBody(newModalBody);
    };
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

