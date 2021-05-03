import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, { once: true });

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    const icon = this.elem;
    const container = document.querySelector('.container');
    let initialTopCoord;


    if (this._initialTopCoord) {
      initialTopCoord = this._initialTopCoord;
    } else {
      initialTopCoord = icon.getBoundingClientRect().top + window.pageYOffset;
      this._initialTopCoord = initialTopCoord;
    };

    let clientWidth = document.documentElement.clientWidth;

    if (clientWidth <= 767) {
      icon.style.zIndex = "";
      icon.style.position = "";
      icon.style.top = "";
      icon.style.left = "";
    } else {
      let iconWidth = icon.offsetWidth;

      let positionRelativeContainer = container.getBoundingClientRect().right + 20;
      let positionRelativeRightCorner = clientWidth - 10 - iconWidth;

      let leftIndent = Math.min(positionRelativeContainer, positionRelativeRightCorner) + "px";

      if (initialTopCoord < window.pageYOffset) {
        icon.style.zIndex = "1000";
        icon.style.position = "fixed";
        icon.style.top = "50px";
        icon.style.left = leftIndent;
      } else {
        icon.style.zIndex = "";
        icon.style.position = "";
        icon.style.top = "";
        icon.style.left = "";
      };
    }
  }
}