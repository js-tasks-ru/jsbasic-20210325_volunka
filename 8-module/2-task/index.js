import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
  }

  get elem() {
    return this._render();
  }



  _render() {
    const productsGrid = document.createElement("div");
    productsGrid.className = "products-grid";

    const productsGridInner = document.createElement("div");
    productsGridInner.className = "products-grid__inner";
    productsGrid.append(productsGridInner);

    const grid = [];

    for (const product of this.products) {
      const oneCard = this._renderOneCard(product);
      productsGridInner.append(oneCard);
      grid.push({ product: product, card: oneCard });
    }

    this._productsGrid = productsGrid;
    this._gridArray = grid;
    return productsGrid;
  }




  updateFilter(newFilter) {
    if (this._filter) {
      Object.assign(this._filter, newFilter);
    } else {
      this._filter = newFilter;
    };

    let { noNuts, vegeterianOnly, maxSpiciness, category } = this._filter;

    function filterNoNuts(item) {
      if (noNuts) {


        if (!item.product.nuts) {
          return true;
        } else {
          return false;
        };

      } else {
        return true;
      };
    }

    function filterVegeterianOnly(item) {
      if (vegeterianOnly) {

        if (item.product.vegeterian) {
          return true;
        } else {
          return false;
        };

      } else {
        return true;
      };
    }

    function filterMaxSpiciness(item) {
      if (!(maxSpiciness === undefined)) {

        if (item.product.spiciness <= maxSpiciness) {
          return true;
        } else {
          return false;
        };

      } else {
        return true;
      };
    }

    function filterCategory(item) {
      if (category) {

        if (item.product.category == category) {
          return true;
        } else {
          return false;
        };

      } else {
        return true;
      };
    }

    function filter(item) {
      if (filterCategory(item) && filterMaxSpiciness(item) && filterVegeterianOnly(item) && filterNoNuts(item)) {
        item.card.style.display = "";
      } else {
        item.card.style.display = "none";
      };
    }

      this._gridArray.map(filter);
  }



  _renderOneCard({ name, price, category, image, id, spiciness, nuts }) {

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
    divCardTitle.textContent = name;

    divCardBody.prepend(divCardTitle);
    divCardBody.append(button);

    img = document.createElement('img');
    img.src = `/assets/images/products/${image}`;
    img.alt = "product";
    img.className = "card__image";

    span.className = "card__price";
    span.textContent = `€${price.toFixed(2)}`;

    divCardTop.className = "card__top";
    divCardTop.prepend(img);
    divCardTop.append(span);

    divCard.prepend(divCardTop);
    divCard.append(divCardBody);
    divCard.className = "card";


    button.onclick = () => {
      let event = new CustomEvent("product-add", {
        detail: id,
        bubbles: true
      });
      divCard.dispatchEvent(event);
    };
    return divCard;
  }



}
