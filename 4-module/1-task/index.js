function makeFriendsList(friends) {
  let newLi = `<li>${friends[0].firstName} ${friends[0].lastName}</li>`;
  newLi = friends.reduce(((previousValue, item, index) => {
    if (index > 0) {
      return previousValue += `<li>${item.firstName} ${item.lastName}</li>`;
    } else {
      return previousValue;
    };
  }), newLi);
  let newUl = document.createElement('ul');
  newUl.innerHTML = newLi;
  return newUl;
}