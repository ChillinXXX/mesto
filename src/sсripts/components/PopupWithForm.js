import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitForm = submitForm;
  }

  _getInputValues() {
    const inputsData = {};
    this._formInputs = Array.from(this._popupForm.querySelectorAll('.popup__input'));
    this._formInputs.forEach((input) => {
      inputsData[input.name] = input.value;
    });
    return inputsData;
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }

  setButtonTextContent(textContent) {
    this._buttonSubmitForm = this._popupForm.querySelector('.popup__button_el_save');
    this._buttonSubmitForm.textContent = textContent;
  }
}