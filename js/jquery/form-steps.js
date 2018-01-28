import $ from 'jquery'
import registerPlugin from './register-plugin'

class FormSteps {
  static DEFAULTS = {

  }

  constructor(element, options) {
    const $el = $(element);

    this.options = options;
    this.cache = {
      root: $el,
      backHandle: $('.form-steps__prev', $el),
      nextHandle: $('.form-steps__next', $el),
      steps: $('.form-steps__step', $el),
      activeStep: $('.form-steps__step--active', $el),
    }
    this.elementsCount = this.cache.steps.length;
    this.currentElement = this.cache.steps.index(this.cache.activeStep);

    this.init();
  }

  init() {
    this.setStepsState();
    this.setHandlesState();

    this.cache.backHandle.on('click', (e) => this.handleBackClick(e));
    this.cache.nextHandle.on('click', (e) => this.handleNextClick(e));
  }

  setStepsState() {
    this.cache.steps.each((index, el) => {
      if (index < this.currentElement) {
        $(el).addClass('form-steps__step--hide-left');
      }

      if (index == this.currentElement) {
        $(el).removeClass('form-steps__step--hide-left');
      }

      if (index > this.currentElement) {
        $(el).removeClass('form-steps__step--hide-left');
      }
    });
  }

  setHandlesState() {
    if (this.currentElement == 0) {
      this.cache.nextHandle.addClass('disabled');
    } else {
      this.cache.nextHandle.removeClass('disabled');
    }

    if (this.currentElement >= this.elementsCount - 1) {
      this.cache.backHandle.addClass('disabled');
    } else {
      this.cache.backHandle.removeClass('disabled');
    }
  }

  handleBackClick(e) {
    if (this.currentElement < this.elementsCount - 1) {
      this.currentElement++;
      this.setStepsState();
      this.setHandlesState();
    }
  }

  handleNextClick(e) {
    if (this.currentElement > 0) {
      this.currentElement--;
      this.setStepsState();
      this.setHandlesState();
    }
  }
}

// Plugin definition
registerPlugin('formSteps', FormSteps, (PluginWrapper) => {
  const $formSteps = $('.form-steps');
  PluginWrapper.call($formSteps)
});
