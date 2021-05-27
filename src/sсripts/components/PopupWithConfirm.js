import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, HandleSubmitForm) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitForm = HandleSubmitForm;
  }

  open(element) {
    super.open();
    this._element = element;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._element);
    })
  }
}