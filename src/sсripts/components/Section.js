export default class Section {
  constructor({ renderer, place }, {containerSelecor}) {
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

  rendererItems(arrayElements) {
    arrayElements.forEach((element) => {
      this._renderer(element, this._placeItem);
    });
  }
}