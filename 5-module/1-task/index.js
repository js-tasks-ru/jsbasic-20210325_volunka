function hideSelf() {
  const element = document.querySelector("button.hide-self-button");
  element.addEventListener("click", () => element.hidden = true);  
}
