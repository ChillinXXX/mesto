//Функция: Открытие попапа
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupPressKey);
}

//Функция: Закрытие попапа
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupPressKey);
}

//Функция закрытия попапов по нажатию клавиши Escape
const closePopupPressKey = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

//Функция: Активация кнопки Submit
const activateButton = (buttonElement, inactiveClass) => {
  buttonElement.classList.remove(inactiveClass);
  buttonElement.disabled = false;
}

//Функция: Деактивация кнопки Submit
const deactivateButton = (buttonElement, inactiveClass) => {
  buttonElement.classList.add(inactiveClass);
  buttonElement.disabled = true;
}

//Функция: Сообщение об ошибке валидации  не активно
const hideInputError = (formElement, inputElement, objectSetup) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(objectSetup.inputErrorClass);
  errorElement.classList.remove(objectSetup.errorClass);
  errorElement.textContent = '';
}

//Функция: Удаление сообщения об ошибке инпутов
const deleteErrorMessege = (formItem, objectSetup) => {
  const errorList = Array.from(formItem.querySelectorAll(`.${objectSetup.inputErrorClass}`));
  errorList.forEach((errorItem) => {
    hideInputError(formItem, errorItem, objectSetup);
  });
}

export {
  openPopup,
  closePopup,
  closePopupPressKey,
  activateButton,
  deactivateButton,
  hideInputError,
  deleteErrorMessege
}