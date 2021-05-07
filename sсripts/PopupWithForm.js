import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitFunction = submitFunction;
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
      this._submitFunction(this._getInputValues());
      this.close();
    });
  }
} 