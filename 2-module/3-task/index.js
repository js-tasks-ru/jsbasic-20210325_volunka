let calculator = {
  read(term1, term2) {
    if (
      typeof term1 == 'number' &&
      isFinite(term1) &&
      typeof term2 == 'number' &&
      isFinite(term2)
    ) {
      this.term1 = term1;
      this.term2 = term2;
    } else {
      return;
    }
  },
  sum() {
    if (typeof this.term1 == 'undefined' || typeof this.term2 == 'undefined') {
      return undefined;
    } else {
      return this.term1 + this.term2;
    }
  },
  mul() {
    if (typeof this.term1 == 'undefined' || typeof this.term2 == 'undefined') {
      return undefined;
    } else {
      return this.term1 * this.term2;
    }
  },
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
