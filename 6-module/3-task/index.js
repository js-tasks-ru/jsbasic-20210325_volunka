import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides; this._carouselSlidesCount = slides.length;
    this._carouselCurrenPosition = 1;
    this._carouselInner = {};
    this._render();


  }
  _render() {
    const divCarousel = document.createElement('div');
    this._carouselArrowRight = document.createElement('div');
    this._carouselArrowLeft = document.createElement('div');
    const divCarouselInner = document.createElement('div');
    let img = document.createElement('img');

    this._carouselInner = divCarouselInner;

    this._carouselArrowRight.className = "carousel__arrow";
    this._carouselArrowRight.classList.add("carousel__arrow_right");

    img.src = `/assets/images/icons/angle-icon.svg`;
    img.alt = "icon";
    this._carouselArrowRight.append(img);


    this._carouselArrowLeft.className = "carousel__arrow";
    this._carouselArrowLeft.classList.add("carousel__arrow_left");

    img = document.createElement('img');
    img.src = `/assets/images/icons/angle-left-icon.svg`;
    img.alt = "icon";
    this._carouselArrowLeft.append(img);

    divCarouselInner.className = "carousel__inner";

    divCarousel.className = "carousel";
    divCarousel.append(this._carouselArrowRight);
    divCarousel.append(this._carouselArrowLeft);
    divCarousel.append(divCarouselInner);

    for (let slide of this.slides) {
      divCarouselInner.append(this._renderCarouselSlide(slide));
    }

    this._carouselArrowLeft.style.display = 'none';
    this.elem = divCarousel;

    this._carouselArrowLeft.addEventListener("click", () => {
      if (this._carouselCurrenPosition == this._carouselSlidesCount) {
        this._carouselArrowRight.style.display = '';
      }
      this._moveCarouselRight();
      if (this._carouselCurrenPosition == 1) {
        this._carouselArrowLeft.style.display = 'none';
      }
    });

    this._carouselArrowRight.addEventListener("click", () => {
      if (this._carouselCurrenPosition == 1) {
        this._carouselArrowLeft.style.display = '';
      }
      this._moveCarouselLeft();
      if (this._carouselCurrenPosition == this._carouselSlidesCount) {
        this._carouselArrowRight.style.display = 'none';
      }
    });

    this.elem.onclick = (click) => {
      if (click.target.closest(".carousel__button")) {
        let event = new CustomEvent("product-add", {
          detail: click.target.closest(".carousel__slide").dataset.id,
          bubbles: true
        });
        this.elem.dispatchEvent(event);
      };
    }
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