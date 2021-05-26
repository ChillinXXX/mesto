export default class Section {
  constructor({ items, renderer, place }, {containerSelecor}) {
    this._rendererItems = items;
    this._renderer = renderer;
    this._placeItem = place;
    this._conteiner = document.querySelector(containerSelecor);
  }

  addItem(cardItem, placeItem) {
    if (placeItem) {
      this._conteiner.append(cardItem);
    } else {
      this._conteiner.prepend(cardItem);
    }
  }

  renderItems() {
    this._rendererItems.forEach((item) => {
      this._renderer(item, this._placeItem);
    });
  }

  removeItem(element) {
    element.remove();
  }
}

