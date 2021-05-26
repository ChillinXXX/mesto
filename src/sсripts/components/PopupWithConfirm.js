import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitForm = submitForm;
  }

  open(targetElement, elementId) {
    super.open();
    this._targetElement = targetElement;
    this._elementId = elementId;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._targetElement, this._elementId);
    })
  }
}