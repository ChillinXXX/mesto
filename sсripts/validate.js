//Функция создания обработчиков валидации полей ввода все форм

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  //console.log(formList);
  formList.forEach((formElement) => {
      setEventListeners(formElement);
    /*formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });*/
    //const fieldsetList = Array.from(formElement.querySelectorAll('.popup__fieldset'));
    //console.log(fieldsetList);
    //fieldsetList.forEach((fieldSet) => {
    //  setEventListeners(fieldSet);
    //});
  });
};



const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button_el_save');
  //console.log(buttonElement);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    //console.log(buttonElement);
    buttonElement.classList.add('popup__button_inactive');
  } else {
    //console.log(buttonElement);
    buttonElement.classList.remove('popup__button_inactive');
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid)
}

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

enableValidation();