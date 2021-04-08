function camelize(str) {
  let tempStringArray = str.split("-");
  tempStringArray.forEach((item, index, array) => {
    if (index > 0) {
      array[index] = item[0].toUpperCase() + item.slice(1);
    }
  } )
  return tempStringArray.join("");
}
