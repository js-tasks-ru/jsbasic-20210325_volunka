export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this._config = { steps, value };
    this._render();

    this._slider.addEventListener("click", (event) => {
      let currenPosition = +this._sliderThumb.querySelector(".slider__value").innerText;
      let newPosition = this._calculateNewSliderPosition(event, this._config.steps).currentStep;

      if (currenPosition != newPosition) {
        this._changeSlider(newPosition, true);

        let changeSliderEvent = new CustomEvent('slider-change', {
          detail: newPosition,
          bubbles: true
        });

        this._slider.dispatchEvent(changeSliderEvent);
      }
    });

    this._sliderThumb.addEventListener("dragstart", (event) => {
      event.preventDefault();
    });
    this._sliderThumb.addEventListener("pointerdown", (event) => {
      event.preventDefault();
    });
    this._sliderThumb.addEventListener("pointermove", (event) => {
      event.preventDefault();
    });

    function moveSlider(event) {
      let position = this._calculateNewSliderPosition(event);
      this._changeSlider(position.currentStep, false, position.currentPercent);
    };

    function stopMoveSlider(event) {
      let position = this._calculateNewSliderPosition(event);
      this._changeSlider(position.currentStep, true);
    }
    let moveSliderContext = moveSlider.bind(this);
    let stopMoveSliderContext = stopMoveSlider.bind(this);


    this._sliderThumb.addEventListener("pointerdown", (event) => {
      const slider = this._slider;
      const container = this._slider.closest(".container");
      const thumb = this._sliderThumb;
      let previoursPosition = +thumb.querySelector(".slider__value").innerText;


      slider.classList.add("slider_dragging");

      moveSliderContext(event);

      container.addEventListener("pointermove", moveSliderContext);

      container.onpointerup = function (event) {
        stopMoveSliderContext(event);
        container.removeEventListener("pointermove", moveSliderContext);
        container.onpointerup = null;
        slider.classList.remove("slider_dragging");

        let newPosition = +thumb.querySelector(".slider__value").innerText;
        if (previoursPosition != newPosition) {
          let changeSliderEvent = new CustomEvent('slider-change', {
            detail: newPosition,
            bubbles: true
          });
          slider.dispatchEvent(changeSliderEvent);
        };
      };
    });

  }

  _render() {
    let value = this._config.value;
    this._slider = document.createElement("div");
    this._slider.className = "slider";

    this._sliderThumb = document.createElement("div");
    this._sliderThumb.className = "slider__thumb";
    this._sliderThumb.innerHTML = `<span class="slider__value"></span>`;

    this._sliderProgress = document.createElement("div");
    this._sliderProgress.className = "slider__progress";

    this._sliderSteps = document.createElement("div");
    this._sliderSteps.className = "slider__steps";

    this._slider.append(this._sliderThumb);
    this._slider.append(this._sliderProgress);
    this._slider.append(this._sliderSteps);

    this._changeSlider(value, true);
  }

  get elem() {
    return this._slider;
  }

  _calculateNewSliderPosition(pointerEvent) {
    let steps = this._config.steps;
    let xCorrection = this._sliderProgress.getBoundingClientRect().x;
    let widthSliderProgress = this._slider.getBoundingClientRect().width;

    let finalXcoordinate = pointerEvent.clientX - xCorrection;

    let result = {
      currentStep: 0,
      currentPercent: 0,
    }

    if (finalXcoordinate >= widthSliderProgress) {
      result.currentStep = steps - 1
      result.currentPercent = 100;
      return result;
    };

    if (finalXcoordinate < 1) {
      result.currentStep = 0
      result.currentPercent = 0;
      return result;
    };

    result.currentStep = Math.round(finalXcoordinate / (widthSliderProgress / (steps - 1)));
    result.currentPercent = (finalXcoordinate / widthSliderProgress * 100).toFixed(2);
    return result;
  }

  _calculateStepProcent(value) {
    let steps = this._config.steps;
    return (value / (steps - 1) * 100).toFixed(2);
  }

  _changeSlider(currentStep, isFinal, currentPercent) {
    let steps = this._config.steps;
    this._sliderThumb.querySelector("span.slider__value").textContent = currentStep;
    this._sliderThumb.style.left = `${isFinal ? this._calculateStepProcent(currentStep) : currentPercent}%`;

    if (this._sliderSteps.querySelectorAll("span").length != steps) {
      this._sliderSteps.innerHTML = "";

      for (let i = 0; i < steps; i++) {
        this._sliderSteps.insertAdjacentHTML("beforeend",
          `<span${(i == currentStep) ? " class=slider__step-active" : ""}></span>`);
      };
    } else {
      this._sliderSteps.querySelector("span.slider__step-active").classList.remove("slider__step-active");
      this._sliderSteps.querySelectorAll("span")[currentStep].classList.add("slider__step-active");
    };

    this._sliderProgress.style.width = `${isFinal ? this._calculateStepProcent(currentStep) : currentPercent}%`;
  }
}
