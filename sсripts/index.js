import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

//Объявление массива объектов с атрибутами name и link
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Объект с данными для валидации форм.
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_el_save',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

//Объявление переменных для редактирования профиля
const popupEditInfo = document.querySelector('.popup_el_info');
const buttonOpenInfo = document.querySelector('.info__button-info');
const formProfileInfo = popupEditInfo.querySelector('.popup__form');
const inputUserName = formProfileInfo.querySelector('.popup__input_el_name');
const inputUserAbout = formProfileInfo.querySelector('.popup__input_el_about');
const buttonSubmitInfo = formProfileInfo.querySelector('.popup__button_el_save');
const userName = document.querySelector('.info__user-name');
const userDescription = document.querySelector('.info__user-description');

//Объявление переменных для попапа добавления карточек и обработчиков событий
const buttonOpenAddCard = document.querySelector('.profile__button-add');
const popupAddCard = document.querySelector('.popup_el_addCard');
const formAddCard = popupAddCard.querySelector('.popup__form');
const buttonSubmitCard = formAddCard.querySelector('.popup__button_el_save');
const inputNameCard = formAddCard.querySelector('.popup__input_el_name-card');
const inputLinkCard = formAddCard.querySelector('.popup__input_el_link-card');
const cardItemsList = document.querySelector('.cards');

//Объявление переменных для открытие попапа просмотра изображения
const popupPreview = document.querySelector('.popup_el_preview');
const popupPreviewImage = popupPreview.querySelector('.popup__image');
const popupPreviewFigcaption = popupPreview.querySelector('.popup__figcaption');
//Запишем все попапы в массив
const popupArray = [popupEditInfo, popupAddCard, popupPreview];

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

//Функция добавления карточки в DOM
/*const addCard = (cardItem, placeItem) => {
  if (placeItem) {
    cardItemsList.append(cardItem);
  } else {
    cardItemsList.prepend(cardItem);
  }
}*/

//Добавлене карточек проходом массива, с созданием обработчиков событий
/*initialCards.forEach((item) => {
  const card = new Card(item, '#card', openPopupPreview);
  const cardElement = card.getCard();
  addCard(cardElement, true);
});*/

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

//Функция: Устанавливает слушатели события "клик" на попап, колбэк выполняет закрытие по событию на элементе "button Close" или "Popup"
/*const popupSetEventListeners = (popupItem) => {
  popupItem.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__button_el_close')) {
      //closePopup(popupItem);
    }
  });
}*/

//Усановим слушатели проходом массива попапов
/*popupArray.forEach((popupItem) => {
  popupSetEventListeners(popupItem);
});*/

//Обработчик события: открыть модальне окно Popup Info
buttonOpenInfo.addEventListener('click', function () {
  inputUserName.value = userName.textContent;
  inputUserAbout.value = userDescription.textContent;
  openPopup(popupEditInfo);
  deleteErrorMessege(formProfileInfo, validationConfig);
  activateButton(buttonSubmitInfo, validationConfig.inactiveButtonClass);
});

//Обработчик события: Изменение полей в форме инфо и "Закрыть Popup" по клику "Сохранить"
/*formProfileInfo.addEventListener('submit', function (evt) {
  evt.preventDefault();
  userName.textContent = inputUserName.value;
  userDescription.textContent = inputUserAbout.value;
  closePopup(popupEditInfo);
});*/

// Обработчик события: открытия попапа модального окна добавления карточек
buttonOpenAddCard.addEventListener('click', function () {
  openPopup(popupAddCard);
  formAddCard.reset();
  deleteErrorMessege(formAddCard, validationConfig);
  deactivateButton(buttonSubmitCard, validationConfig.inactiveButtonClass);
});

//Обработчик события:Добавлене карточек из формы по событию Submit
/*formAddCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const card = new Card({ name: inputNameCard.value, link: inputLinkCard.value }, '#card', openPopupPreview);
  const cardElement = card.getCard();
  addCard(cardElement, false);
  closePopup(popupAddCard);
});*/

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
  console.log({name, about});
  userInfoForm.setUserInfo({name, about});
}


//Слушатель события Submit для формы добавления карточки:
//formAddCard.addEventListener('submit', publicCardForm);

const popupInfo = new PopupWithForm ('.popup_el_info', submitEditInfo);
popupInfo.setEventListeners();
const popupCard = new PopupWithForm('.popup_el_addCard', submitCardForm);
popupCard.setEventListeners();
const popupImage = new PopupWithImage('.popup_el_preview');
popupImage.setEventListeners();

//popupImage.open({imageLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg', imageDesc: 'Камчатка'});

const userInfoForm = new UserInfo ({userNameSelector: '.info__user-name', userAboutSelector: '.info__user-description'});
console.log(userInfoForm.getUserInfo());