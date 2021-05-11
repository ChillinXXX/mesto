import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImages = this._popup.querySelector('.popup__image');
    this._popupFigcaption = this._popup.querySelector('.popup__figcaption');
  }

  open({ link, description }) {
    this._popupImages.src = link;
    this._popupImages.alt = description;
    this._popupFigcaption.textContent = description;
    super.open();
  }
}