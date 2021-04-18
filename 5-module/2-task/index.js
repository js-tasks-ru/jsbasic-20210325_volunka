function toggleText() {
  const hideButton = document.querySelector("button.toggle-text-button");
  const targetElement = document.getElementById('text');
  hideButton.addEventListener("click",  () => targetElement.hidden = !targetElement.hidden);
}
