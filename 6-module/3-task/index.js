import createElement from '../../assets/lib/create-element.js';
import slides from './slides.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this._carouselSlidesCount = slides.length;
    this._carouselCurrenPosition = 1;
    this._carouselInner = {};
    this.elem = this._render();
  }
  _render() {
    const divCarousel = document.createElement('div');
    const divCarouselArrowRight = document.createElement('div');
    const divCarouselArrowLeft = document.createElement('div');
    const divCarouselInner = document.createElement('div');
    let img = document.createElement('img');

    this._carouselInner = divCarouselInner;

    divCarouselArrowRight.className = "carousel__arrow";
    divCarouselArrowRight.classList.add("carousel__arrow_right");

    img.src = `/assets/images/icons/angle-icon.svg`;
    img.alt = "icon";
    divCarouselArrowRight.append(img);


    divCarouselArrowLeft.className = "carousel__arrow";
    divCarouselArrowLeft.classList.add("carousel__arrow_left");

    img = document.createElement('img');
    img.src = `/assets/images/icons/angle-left-icon.svg`;
    img.alt = "icon";
    divCarouselArrowLeft.append(img);

    divCarouselInner.className = "carousel__inner";

    divCarousel.className = "carousel";
    divCarousel.append(divCarouselArrowRight);
    divCarousel.append(divCarouselArrowLeft);
    divCarousel.append(divCarouselInner);


    for (let slide of this.slides) {
      divCarouselInner.append(this._renderCarouselSlide(slide));
    }

    divCarousel.onclick = (click) => {
      if (click.target.closest(".carousel__button")) {
        let event = new CustomEvent("product-add", {
          detail: click.target.closest(".carousel__slide").dataset.id,
          bubbles: true
        });
        divCarousel.dispatchEvent(event);
      };
    }

    document.body.addEventListener("product-add", (event) => {
      console.dir(event.detail);
      console.dir(event.target);
    })

    divCarouselArrowLeft.style.display = 'none';

    divCarouselArrowLeft.addEventListener("click", () => {
      if (this._carouselCurrenPosition == this._carouselSlidesCount) {
        divCarouselArrowRight.style.display = '';
      }
      this._moveCarouselRight();
      if (this._carouselCurrenPosition == 1) {
        divCarouselArrowLeft.style.display = 'none';
      }
    });

    divCarouselArrowRight.addEventListener("click", () => {
      if (this._carouselCurrenPosition == 1) {
        divCarouselArrowLeft.style.display = '';
      }
      this._moveCarouselLeft();
      if (this._carouselCurrenPosition == this._carouselSlidesCount) {
        divCarouselArrowRight.style.display = 'none';
      }
    });

    return divCarousel;
  }

  _renderCarouselSlide({ name, price, image, id }) {
    const divCarouselSlide = document.createElement('div');
    const divCarouselCaption = document.createElement('div');
    const divCarouselTitle = document.createElement('div');
    let img = document.createElement('img');
    const span = document.createElement('span');
    const button = document.createElement('button');


    button.type = "button";
    button.className = "carousel__button";

    img.src = `/assets/images/icons/plus-icon.svg`;
    img.alt = "icon";
    button.append(img);

    divCarouselTitle.className = "carousel__title";
    divCarouselTitle.textContent = name;

    span.className = "carousel__price";
    span.textContent = `€${price.toFixed(2)}`;

    divCarouselCaption.className = "carousel__caption";
    divCarouselCaption.append(span);
    divCarouselCaption.append(divCarouselTitle);
    divCarouselCaption.append(button);

    img = document.createElement('img');
    img.src = `/assets/images/carousel/${image}`;
    img.alt = "slide";
    img.className = "carousel__img";

    divCarouselSlide.className = "carousel__slide";
    divCarouselSlide.dataset.id = id;

    divCarouselSlide.append(img);
    divCarouselSlide.append(divCarouselCaption);

    return divCarouselSlide;
  }

  _moveCarouselLeft() {
    this._carouselInner.style.transform =
      `translateX(-${this._carouselInner.querySelector("div.carousel__slide").offsetWidth * this._carouselCurrenPosition}px)`;
    this._carouselCurrenPosition++;
  }

  _moveCarouselRight() {
    this._carouselInner.style.transform =
      `translateX(-${this._carouselInner.querySelector("div.carousel__slide").offsetWidth * (this._carouselCurrenPosition - 2)}px)`;
    this._carouselCurrenPosition--;
  }
}
