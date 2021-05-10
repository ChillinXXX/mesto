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

//Функция: закрыть попап по нажатию клавиши Escape
const closePopupPressKey = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

//Функция: Активация кнопки Submit
const activateButton = (buttonElement, {inactiveButtonClass}) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
}

//Функция: Деактивация кнопки Submit
const deactivateButton = (buttonElement, {inactiveButtonClass}) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
}

//Функция: Сообщение об ошибке валидации  не активно
const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

//Функция: Удаление сообщения об ошибке инпутов
const deleteErrorMessege = (formItem, {inputErrorClass, errorClass}) => {
  const errorList = Array.from(formItem.querySelectorAll(`.${inputErrorClass}`));
  errorList.forEach((errorItem) => {
    hideInputError(formItem, errorItem, {inputErrorClass, errorClass});
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