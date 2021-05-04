export default class Section {
  constructor({ items, renderer }, containerSelecor) {
    this._rendererItems = items;
    this._renderer = renderer;
    this._conteiner = document.querySelector(containerSelecor);
  }

  /*_clearConteiner() {
    this._conteiner.innerHTML = '';
  }*/

  addItem(cardItem, placeItem) {
    if (placeItem) {
      this._conteiner.append(cardItem);
    } else {
      this._conteiner.prepend(cardItem);
    }
  }

  renderItems() {
    this._rendererItems.forEach((item) => {
      //console.log(this);
      this._renderer(item);
    });
  }
}

