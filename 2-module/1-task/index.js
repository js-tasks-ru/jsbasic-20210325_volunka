function sumSalary(salaries) {
  let sum = 0;
  let isNotEmpty = false;
  for (let key in salaries) {
    if (typeof salaries[key] == 'number' && isFinite(salaries[key]) == true) {
      isNotEmpty = true;
      sum += salaries[key];
    }
  }
  if (isNotEmpty == false) {
    return 0;
  } else {
    return sum;
  }
}
