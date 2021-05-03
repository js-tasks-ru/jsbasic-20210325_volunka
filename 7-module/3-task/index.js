export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this._config = { steps, value };
    this._render();
    this._slider.addEventListener("click", (event) => {
      let currenPosition = +this._sliderThumb.querySelector(".slider__value").innerText;
      let newPosition = this._calculateNewSliderPosition(event, this._config.steps);
      
      if (currenPosition != newPosition) {
        this._changeSlider(this._config.steps, newPosition);

        let changeSliderEvent = new CustomEvent('slider-change', { 
          detail: newPosition, 
          bubbles: true 
        });

        this._slider.dispatchEvent(changeSliderEvent);
      }
    });

    document.addEventListener("slider-change", (event) => {
      console.log(event.detail);
    })
  }

  _render() {
    if (!this._slider) {
      this._slider = document.createElement("div");
      this._slider.className = "slider";

      this._sliderThumb = document.createElement("div");
      this._sliderThumb.className = "slider__thumb";
      this._sliderThumb.style.left = `${this._calculatePercent(this._config.steps, this._config.value)}%`;
      this._sliderThumb.innerHTML = `<span class="slider__value">${this._config.value}/span>`;

      this._sliderProgress = document.createElement("div");
      this._sliderProgress.className = "slider__progress";
      this._sliderProgress.style.width = `${this._calculatePercent(this._config.steps, this._config.value)}%`;

      this._sliderSteps = document.createElement("div");
      this._sliderSteps.className = "slider__steps";

      this._slider.append(this._sliderThumb);
      this._slider.append(this._sliderProgress);
      this._slider.append(this._sliderSteps);
    }

    this._changeSlider(this._config.steps, this._config.value);
  }

  get elem() {
    return this._slider;
  }

  _calculateNewSliderPosition(mouseClickEvent, steps) {
    let xCorrection = this._sliderProgress.getBoundingClientRect().x;
    let widthSliderProgress = this._slider.getBoundingClientRect().width;

    let finalXcoordinate = mouseClickEvent.clientX - xCorrection;

    if (finalXcoordinate >= widthSliderProgress) {
      return steps - 1;
    };

    return Math.round(finalXcoordinate / (widthSliderProgress / (steps - 1)));
  }

  _calculatePercent(steps, value) {
    return (value / (steps - 1) * 100).toFixed(2);
  }

  _changeSlider(steps, value) {
    this._sliderThumb.querySelector("span.slider__value").textContent = value;
    this._sliderThumb.style.left = `${this._calculatePercent(steps, value)}%`;

    if (this._sliderSteps.querySelectorAll("span").length != steps) {
      this._sliderSteps.innerHTML = "";

      for (let i = 0; i < steps; i++) {
        this._sliderSteps.insertAdjacentHTML("beforeend",
          `<span${(i == value) ? " class=slider__step-active" : ""}></span>`);
      };
    } else {
      this._sliderSteps.querySelector("span.slider__step-active").classList.remove("slider__step-active");
      this._sliderSteps.querySelectorAll("span")[value].classList.add("slider__step-active");
    };

    this._sliderProgress.style.width = `${this._calculatePercent(steps, value)}%`;
  }

}
