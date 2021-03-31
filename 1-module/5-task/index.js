function truncate(str, maxlength) {
  if (isFinite(maxlength) && Object.is((maxlength % 1), 0)) {
    if (maxlength == 0) {
      return "";
    } else if (maxlength > str.length) {
      return str;
    } else {
      return str.slice(0, maxlength - 1) + "…";
    }
  } else {
    return undefined;
  }
}