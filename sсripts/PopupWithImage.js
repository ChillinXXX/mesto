import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImages = this._popup.querySelector('.popup__image');
    this._popupFigcaption = this._popup.querySelector('.popup__figcaption');
  }

  open({imageLink, imageDescription}) {
    this._popupImages.src = imageLink;
    this._popupImages.alt = imageDescription;
    this._popupFigcaption.textContent = imageDescription;
    super.open();
  }
}