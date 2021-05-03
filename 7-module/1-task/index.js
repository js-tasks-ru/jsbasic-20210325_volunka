import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this._render();


    this._ribbon.addEventListener("click", (event) => {

      if (event.target.closest(".ribbon__arrow_left")) {
        this._nav.scrollBy(-350, 0);
      } else if (event.target.closest(".ribbon__arrow_right")) {
        this._nav.scrollBy(350, 0);
      }

    });


    this._nav.addEventListener("scroll", (event) => {
      this._hideButton();
    });


    this._nav.addEventListener("click", (event) => {
      if (event.target.closest("a.ribbon__item")) {
        event.preventDefault();
        this._nav.querySelector(".ribbon__item_active").classList.remove("ribbon__item_active");
        event.target.classList.add("ribbon__item_active");

        let ribbonSelectEvent = new CustomEvent('ribbon-select', { 
          detail: event.target.dataset.id, 
          bubbles: true 
        });

        this._ribbon.dispatchEvent(ribbonSelectEvent);
      };
    });


    this._ribbon.addEventListener("ribbon-select", (event) => {
      console.dir(event.detail);
    })
    

  }
  _render() {
    if (!this._ribbon) {
      this._ribbon = document.createElement('div');
      this._ribbon.className = "ribbon";

      this._ribbonButtonLeft = document.createElement('button');
      this._ribbonButtonLeft.classList.add("ribbon__arrow", "ribbon__arrow_left");
      this._ribbonButtonLeft.innerHTML = `<img src="/assets/images/icons/angle-icon.svg" alt="icon">`;

      this._nav = document.createElement('nav');
      this._nav.className = "ribbon__inner";

      this._ribbonButtonRight = document.createElement('button');
      this._ribbonButtonRight.classList.add("ribbon__arrow", "ribbon__arrow_right", "ribbon__arrow_visible");
      this._ribbonButtonRight.innerHTML = `<img src="/assets/images/icons/angle-icon.svg" alt="icon">`;
    } else {
      this._nav.innerHTML = "";
    }

    for (let { id, name } of this.categories) {
      this._nav.insertAdjacentHTML("beforeend",
        `<a href="#" class="ribbon__item" data-id=${id}>${name}</a>`);
    }

    this._nav.querySelector(".ribbon__item").classList.add("ribbon__item_active");

    this._ribbon.append(this._ribbonButtonLeft);
    this._ribbon.append(this._nav);
    this._ribbon.append(this._ribbonButtonRight);
  }

  get elem() {
    return this._ribbon;
  }

  _hideButton() {
    let scrollWidth = this._nav.scrollWidth;
    let clientWidth = this._nav.clientWidth;

    let scrollLeft = this._nav.scrollLeft;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (scrollLeft >= 1 && scrollRight >= 1) {

      if (!this._ribbonButtonLeft.classList.contains("ribbon__arrow_visible")) {
        this._ribbonButtonLeft.classList.add("ribbon__arrow_visible");
      };

      if (!this._ribbonButtonRight.classList.contains("ribbon__arrow_visible")) {
        this._ribbonButtonRight.classList.add("ribbon__arrow_visible");
      };

    };


    if (scrollLeft < 1) {
      this._ribbonButtonLeft.classList.remove("ribbon__arrow_visible");
    };

    if (scrollRight < 1) {
      this._ribbonButtonRight.classList.remove("ribbon__arrow_visible");
    };

  }
}
