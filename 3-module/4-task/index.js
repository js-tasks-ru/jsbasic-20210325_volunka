function showSalary(users, age) {
  let filteredArray = users.filter(item => item.age <= age);
  return filteredArray.reduce(((previousValue, item, index) => {
    if (index > 0) {
      return previousValue + `\n${item.name}, ${item.balance}`;
    } else {
      return previousValue;
    }
  }

  ), `${filteredArray[0].name}, ${filteredArray[0].balance}`);
}
