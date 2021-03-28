import Card from './Card.js';
import FormValidator from './FormValidator.js';

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
const nameInput = formProfileInfo.querySelector('.popup__input_el_name');
const aboutInput = formProfileInfo.querySelector('.popup__input_el_about');
const buttonSubmitInfo = formProfileInfo.querySelector('.popup__button_el_save');
const buttonCloseInfo = formProfileInfo.querySelector('.popup__button_el_close');
const userName = document.querySelector('.info__user-name');
const userDescription = document.querySelector('.info__user-description');

//Объявления переменных для попапа добавления карточек и обработчиков событий
const buttonOpenAddCard = document.querySelector('.profile__button-add');
const formAddCard = document.querySelector('.popup_el_addCard');
const buttonSubmitCard = formAddCard.querySelector('.popup__button_el_save');
const buttonCloseAddCard = formAddCard.querySelector('.popup__button_el_close');
const nameCard = formAddCard.querySelector('.popup__input_el_name-card');
const linkCard = formAddCard.querySelector('.popup__input_el_link-card');
const cardItemsList = document.querySelector('.cards');

//Объявления переменных для открытие попапа просмотра изображения
const popupPreview = document.querySelector('.popup_el_preview');
const buttonClosePreview = popupPreview.querySelector('.popup__button_el_close');
const popupPreviewImage = popupPreview.querySelector('.popup__image');
const popupPreviewFigcaption = popupPreview.querySelector('.popup__figcaption');


//Создание экземпляров форм и их валидация
const validationAddCard = new FormValidator(validationConfig, formAddCard);
validationAddCard.enableValidation();
const validationProfileInfo = new FormValidator(validationConfig, formProfileInfo);
validationProfileInfo.enableValidation();


//Функция просмотра изображения по клику
function openPopupPreview(evt) {
  const previewImageTarget = evt.target;
  popupPreviewImage.src = previewImageTarget.src;
  popupPreviewImage.alt = previewImageTarget.alt;
  popupPreviewFigcaption.textContent = previewImageTarget.alt;
  openPopup(popupPreview);
}

//Функция добавления карточки в DOM
const addCard = (cardItem, placeItem) => {
  if (placeItem) {
    cardItemsList.append(cardItem);
  }
  if (!placeItem) {
    cardItemsList.prepend(cardItem);
  }
}

//Добавлене карточек проходом массива, с созданием обработчиков событий
initialCards.forEach((item) => {
  const card = new Card(item, '#card', openPopupPreview);
  const cardElement = card.getCard();
  addCard(cardElement, true);
});

//Функция закрытия попапов по нажатию клавиши Escape
const closePopupPressKey = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

//Функция закрытия попапов по клику оверлея
const closePopupOverlay = (evt) => {
  if (evt.target == evt.currentTarget) {
    closePopup(evt.target);
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
const hideInputError = (formElement, inputElement, object) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(object.inputErrorClass);
  errorElement.classList.remove(object.errorClass);
  errorElement.textContent = '';
}

//Функция: Удаление сообщения об ошибке 
const deleteErrorMessege = (popup, object) => {
  const formItem = popup.querySelector(object.formSelector);
  const  errorInputList = Array.from(popup.querySelectorAll(`.${object.inputErrorClass}`));
  errorInputList.forEach((inputItem) => {
    hideInputError(formItem, inputItem, object);
  });
}

//Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupPressKey);
  popup.addEventListener('mousedown', closePopupOverlay);  
}

//Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupPressKey);
  popup.removeEventListener('mousedown', closePopupOverlay);
}

//Обработчик события: открыть модальне окно Popup Info
buttonOpenInfo.addEventListener('click', function () {
  nameInput.value = userName.textContent;
  aboutInput.value = userDescription.textContent;
  openPopup(popupEditInfo);
  deleteErrorMessege(popupEditInfo, validationConfig);
  activateButton(buttonSubmitInfo, validationConfig.inactiveButtonClass);
});

//Обработчик события: закрыть попап модального окна Инфо
buttonCloseInfo.addEventListener('click', function () {
  closePopup(popupEditInfo);
});

//Обработчик события: Изменение полей в форме инфо и "Закрыть Popup" по клику "Сохранить"
formProfileInfo.addEventListener('submit', function (evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = aboutInput.value;
  closePopup(popupEditInfo);
});

// Обработчик события: открытия попапа модального окна добавления карточек
buttonOpenAddCard.addEventListener('click', function () {
  openPopup(formAddCard);
  nameCard.value = '';
  linkCard.value = '';
  deleteErrorMessege(formAddCard, validationConfig);
  deactivateButton(buttonSubmitCard, validationConfig.inactiveButtonClass);
});

// Обработчик события: закрытие попапа модального окна добавления карточек 
buttonCloseAddCard.addEventListener('click', function () {
  closePopup(formAddCard);
});

// Обработчик события: закрытия попапа модально окна просмотра изображения
buttonClosePreview.addEventListener('click', function () {
  closePopup(popupPreview);
});

//Обработчик события:Добавлене карточек из формы по событию Sibmit
formAddCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const card = new Card({ name: nameCard.value, link: linkCard.value }, '#card', openPopupPreview);
  const cardElement = card.getCard();
  addCard(cardElement, false);
  closePopup(formAddCard);
});