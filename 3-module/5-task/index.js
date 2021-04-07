function getMinMax(str) {
  const piecesOfPhrase = str.split(/[, ]+/);
  const numbersArray = piecesOfPhrase.filter((item) => isFinite(item));
  numbersArray.sort((a, b) => a - b);
  return {
    min: +numbersArray[0],
    max: +numbersArray[numbersArray.length - 1],
  };
}
