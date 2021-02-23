const enableValidation = (object) => {
  const formList = Array.from(document.querySelectorAll(object.formSelector));
  formList.forEach((formElement) => {
      setEventListeners(formElement, object);
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

const setEventListeners = (formElement, object) => {
  const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
  const buttonElement = formElement.querySelector(object.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, object);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, object);
      toggleButtonState(inputList, buttonElement, object);
    });
  });
};

const toggleButtonState = (inputList, buttonElement, object) => {
  if (hasInvalidInput(inputList)) {
    /*buttonElement.classList.add(object.inactiveButtonClass);
    buttonElement.disabled = true;*/
    deactivateButton(buttonElement, object.inactiveButtonClass);
  } else {
    /*buttonElement.classList.remove(object.inactiveButtonClass);
    buttonElement.disabled = false;*/
    activateButton(buttonElement, object.inactiveButtonClass);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid)
}

const activateButton = (buttonElement, inactiveClass) => {
  buttonElement.classList.remove(inactiveClass);
  buttonElement.disabled = false;
}

const deactivateButton = (buttonElement, inactiveClass) => {
  buttonElement.classList.add(inactiveClass);
  buttonElement.disabled = true;
}

const checkInputValidity = (formElement, inputElement, object) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, object );
  } else {
    hideInputError(formElement, inputElement, object);
  }
};

const showInputError = (formElement, inputElement, errorMessage, object) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(object.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(object.errorClass);
};

const hideInputError = (formElement, inputElement, object) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(object.inputErrorClass);
  errorElement.classList.remove(object.errorClass);
  errorElement.textContent = '';
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_el_save',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});