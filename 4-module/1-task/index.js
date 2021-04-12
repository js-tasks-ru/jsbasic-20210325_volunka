function makeFriendsList(friends) {
  let newLi = `<li>${friends[0].firstName} ${friends[0].lastName}</li>`;
  console.log(newLi);
  newLi = friends.reduce(((previousValue, item, index) => {
    if (index > 0) {
      return previousValue += `<li>${item.firstName} ${item.lastName}</li>`;
    } else {
      return previousValue;
    };
  }), newLi);
  let newUl = document.createElement('ul');
  newUl.innerHTML = newLi;
  console.log(newLi);
  return newUl;
}