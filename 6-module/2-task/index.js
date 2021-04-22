import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.elem = this._render();

  }
  _render() {
    const divCard = document.createElement('div');
    const divCardTop = document.createElement('div');
    const divCardBody = document.createElement('div');
    const divCardTitle = document.createElement('div');
    let img = document.createElement('img');
    const span = document.createElement('span');
    const button = document.createElement('button');


    button.type = "button";
    button.className = "card__button";

    img.src = `/assets/images/icons/plus-icon.svg`;
    img.alt = "icon";
    button.append(img);

    divCardBody.className = "card__body";

    divCardTitle.className = "card__title";
    divCardTitle.textContent = this.product.name;

    divCardBody.prepend(divCardTitle);
    divCardBody.append(button);

    img = document.createElement('img');
    img.src = `/assets/images/products/${this.product.image}`;
    img.alt = "product";
    img.className = "card__image";

    span.className = "card__price";
    span.textContent = `€${this.product.price.toFixed(2)}`;

    divCardTop.className = "card__top";
    divCardTop.prepend(img);
    divCardTop.append(span);

    divCard.prepend(divCardTop);
    divCard.append(divCardBody);
    divCard.className = "card";


    button.onclick = () => {
      let event = new CustomEvent("product-add", {
        detail: this.product.id,
        bubbles: true
      });
      divCard.dispatchEvent(event);
    };


    return divCard;
  }
}
