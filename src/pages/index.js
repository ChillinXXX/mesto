import Card from '../sсripts/components/Card.js';
import FormValidator from '../sсripts/components/FormValidator.js';
import Section from '../sсripts/components/Section.js';
import Popup from '../sсripts/components/Popup.js';
import PopupWithImage from '../sсripts/components/PopupWithImage.js';
import PopupWithForm from '../sсripts/components/PopupWithForm.js';
import UserInfo from '../sсripts/components/UserInfo.js';

import {
  initialCards,
  validationConfig,
  popupEditInfo,
  buttonOpenInfo,
  formProfileInfo,
  inputUserName,
  inputUserAbout,
  buttonSubmitInfo,
  userName,
  userDescription,
  buttonOpenAddCard,
  popupAddCard,
  formAddCard,
  buttonSubmitCard,
  inputNameCard,
  inputLinkCard,
  cardItemsList,
  popupPreview,
  popupPreviewImage,
  popupPreviewFigcaption,
  popupArray
} from '../sсripts/utils/constants.js';

//Создание экземпляров форм и их валидация
const validationAddCard = new FormValidator(validationConfig, formAddCard);
validationAddCard.enableValidation();
const validationProfileInfo = new FormValidator(validationConfig, formProfileInfo);
validationProfileInfo.enableValidation();

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

//Функция просмотра изображения по клику
const openPopupPreview = (evt) => {
  const previewImageTarget = evt.target;
  popupPreviewImage.src = previewImageTarget.src;
  popupPreviewImage.alt = previewImageTarget.alt;
  popupPreviewFigcaption.textContent = previewImageTarget.alt;
  openPopup(popupPreview);
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
  const  errorList = Array.from(formItem.querySelectorAll(`.${objectSetup.inputErrorClass}`));
  errorList.forEach((errorItem) => {
    hideInputError(formItem, errorItem, objectSetup);
  });
}

//Обработчик события: открыть модальне окно Popup Info
buttonOpenInfo.addEventListener('click', function () {
  inputUserName.value = userName.textContent;
  inputUserAbout.value = userDescription.textContent;
  openPopup(popupEditInfo);
  deleteErrorMessege(formProfileInfo, validationConfig);
  activateButton(buttonSubmitInfo, validationConfig.inactiveButtonClass);
});

// Обработчик события: открытия попапа модального окна добавления карточек
buttonOpenAddCard.addEventListener('click', function () {
  openPopup(popupAddCard);
  formAddCard.reset();
  deleteErrorMessege(formAddCard, validationConfig);
  deactivateButton(buttonSubmitCard, validationConfig.inactiveButtonClass);
});

///////////////////////////////{ХЕРАЧУ ТУТ:8}///////////////////////
//Добавление картоек из массива:
const cardList = new Section({items: initialCards, renderer: (item) => {
  const card = new Card(item, '#card', openPopupPreview);
  const cardElement = card.getCard();
  cardList.addItem(cardElement, true);
  }
}, ".cards" );
cardList.renderItems();

//Функция добавления карточки из формы:
const submitCardForm  = (inputsData) => {
  const cardList = new Section({items: [inputsData], renderer: (item) => {
    const card = new Card(item, '#card', openPopupPreview);
    const cardElement = card.getCard();
    cardList.addItem(cardElement, false);
    }
  }, ".cards");
  cardList.renderItems();
}

//Функция редактирования информации о профиле:

const submitEditInfo = ({name, about}) => {
  //console.log({name, about});
  userInfoForm.setUserInfo({name, about});
}


//Слушатель события Submit для формы добавления карточки:

const popupInfo = new PopupWithForm ('.popup_el_info', submitEditInfo);
popupInfo.setEventListeners();
const popupCard = new PopupWithForm('.popup_el_addCard', submitCardForm);
popupCard.setEventListeners();
const popupImage = new PopupWithImage('.popup_el_preview');
popupImage.setEventListeners();

//popupImage.open({imageLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg', imageDesc: 'Камчатка'});

const userInfoForm = new UserInfo ({userNameSelector: '.info__user-name', userAboutSelector: '.info__user-description'});