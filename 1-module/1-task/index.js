function factorial(n) {
  let factrl = 1;
  if (isFinite(n) && Object.is((n % 1), 0)) {
    while (n > 1) {
      factrl *= n--;
    }
    return factrl;
  } else {
    return NaN;
  }
}