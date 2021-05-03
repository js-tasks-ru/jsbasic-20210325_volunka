import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this._render();

    this._buttonClose.addEventListener("click", () => {
      this.close();
    });

    document.addEventListener("keydown", (event) => {
      if (event.code === "Escape") {
        this.close();
      }
    })
  }

  _render() {
    this._modal = document.createElement('div');
    this._modal.className = "modal";
    this._modal.innerHTML = `<div class="modal__overlay"></div>`;

    this._modalInner = document.createElement('div');
    this._modalInner.className = "modal__inner";

    this._modalHeader = document.createElement('div');
    this._modalHeader.className = "modal__header";

    this._buttonClose = document.createElement('button');
    this._buttonClose.type = "button";
    this._buttonClose.className = "modal__close";
    this._buttonClose.innerHTML = `<img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />`;

    this._modalTitle = document.createElement('h3');
    this._modalTitle.className = "modal__title";

    this._modalHeader.append(this._modalTitle);
    this._modalHeader.append(this._buttonClose);

    this._modalBody = document.createElement('div');
    this._modalBody.className = "modal__body";

    this._modalInner.append(this._modalHeader);
    this._modalInner.append(this._modalBody);

    this._modal.append(this._modalInner);
  }

  open() {
    document.body.append(this._modal);

    if (!document.body.classList.contains("is-modal-open")) {
      document.body.classList.add("is-modal-open");
    }

  }

  close() {
    if (document.body.classList.contains("is-modal-open")) {
      document.body.classList.remove("is-modal-open");
    };

    for (let children of document.body.children) {
      if (children == this._modal) {
        this._modal.remove();
        break;
      };
    } 

  }

  setTitle(title) {
    this._modalTitle.innerText = title;
  }

  setBody(node) {
    this._modalBody.innerHTML = "";
    this._modalBody.append(node);
  }

}
