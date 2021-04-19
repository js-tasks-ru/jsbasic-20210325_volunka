function initCarousel() {
  const leftButton = document.querySelector("div.carousel__arrow.carousel__arrow_left");
  const rightButton = document.querySelector("div.carousel__arrow.carousel__arrow_right");
  const carousel = document.querySelector("div.carousel__inner");
  let offsetStep = carousel.querySelector("div.carousel__slide").offsetWidth;
  let carouselCurrenPosition = 1;
  let carouselSlideCount = carousel.querySelectorAll(".carousel__slide").length;


  function hideElement(element) {
    element.style.display = 'none';
  }


  function unHideElement(element) {
    element.style.display = '';
  }


  function moveCarouselLeft(carousel, offsetStep) {
    carousel.style.transform = `translateX(-${offsetStep * carouselCurrenPosition}px)`;
    carouselCurrenPosition++;
  }


  function moveCarouselRight(carousel, offsetStep) {
    carousel.style.transform = `translateX(-${offsetStep * (carouselCurrenPosition - 2)}px)`;
    carouselCurrenPosition--;
  }


  function leftButtonHandler() {
    if (carouselCurrenPosition == carouselSlideCount) {
      unHideElement(rightButton);
    }

    moveCarouselRight(carousel, offsetStep);

    if (carouselCurrenPosition == 1) {
      hideElement(leftButton);
    }
  }


  function rightButtonHandler() {
    if (carouselCurrenPosition == 1) {
      unHideElement(leftButton);
    }

    moveCarouselLeft(carousel, offsetStep);

    if (carouselCurrenPosition == carouselSlideCount) {
      hideElement(rightButton);
    }
  }

  hideElement(leftButton);
  leftButton.addEventListener("click", leftButtonHandler);
  rightButton.addEventListener("click", rightButtonHandler);

}
