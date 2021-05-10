import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    this.carousel = new Carousel(slides);
    document.querySelector("[data-carousel-holder]").append(this.carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    document.querySelector("[data-ribbon-holder]").append(this.ribbonMenu.elem);

    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
    document.querySelector("[data-slider-holder]").append(this.stepSlider.elem);

    this.cartIcon = new CartIcon;
    document.querySelector("[data-cart-icon-holder]").append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);

    let response = await fetch("products.json");
    let products = await response.json();

    this.productsGrid = new ProductsGrid(products);
    document.querySelector("[data-products-grid-holder]").innerHTML = "";
    document.querySelector("[data-products-grid-holder]").append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: +this.stepSlider.elem.querySelector(".slider__value").textContent,
      category: this.ribbonMenu.elem.querySelector(".ribbon__item.ribbon__item_active").dataset.id
    });

    document.body.addEventListener("product-add", (event) => {
      let targetId = event.detail;
      const targetProduct = products.find(item => item.id === targetId);
      this.cart.addProduct(targetProduct);
    });

    this.stepSlider.elem.addEventListener("slider-change", (event) => {
      let newSpiciness = event.detail;
      this.productsGrid.updateFilter({
        maxSpiciness: newSpiciness
      });
    });

    this.ribbonMenu.elem.addEventListener("ribbon-select", (event) => {
      let targetCategory = event.detail;
      this.productsGrid.updateFilter({
        category: targetCategory
      });
    });

    document.querySelector("#nuts-checkbox").addEventListener("change", () => {
      this.productsGrid.updateFilter({
        noNuts: document.querySelector("#nuts-checkbox").checked
      });
    });

    document.querySelector("#vegeterian-checkbox").addEventListener("change", () => {
      this.productsGrid.updateFilter({
        vegeterianOnly: document.querySelector("#vegeterian-checkbox").checked
      });
    });
  }
}
