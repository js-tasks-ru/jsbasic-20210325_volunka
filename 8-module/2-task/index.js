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
      const oneCard = new ProductCard(product);
      productsGridInner.append(oneCard.elem);
      grid.push(oneCard);
    }

    this._productsGrid = productsGrid;
    this._gridArray = grid;
    return productsGrid;
  }




  updateFilter(newFilter) {
    Object.assign(this.filters, newFilter);
    let { noNuts, vegeterianOnly, maxSpiciness, category } = this.filters;

    const productsGridInner = this._productsGrid.querySelector(".products-grid__inner");
    productsGridInner.innerHTML = "";


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
        productsGridInner.append(item.elem);
      };
    }

    this._gridArray.forEach(filter);
  }

}
