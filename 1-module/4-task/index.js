function checkSpam(str) {
  if (str.toUpperCase().includes("XXX") || str.toLowerCase().includes("1xbet")) {
    return true;
  } else {
    return false;
  }
}
