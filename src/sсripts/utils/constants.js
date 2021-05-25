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

//Объект с селекторами для index.js
const indexPageConfig = {
  cardSelector: '#card',
  containerSelecor: '.cards',
  popupInfoSelector: '.popup_el_info',
  popupAvatarSelector: '.popup_el_avatar',
  popupAddCardSelector: '.popup_el_addCard',
  popupPreviewSelector: '.popup_el_preview',
  popupDeleteCardSelector: '.popup_el_delete-card',
  userNameSelector: '.info__user-name',
  userAboutSelector: '.info__user-description',
  userAvatarSelector: '.profile__avatar'
}

//Текст для состояния кнопки Submit
const buttonTextContent = {
  loading: 'Сохранение...',
  save: 'Сохранить',
  create: 'Создать'
}

//Элементы DOM
const popupEditAvatar = document.querySelector('.popup_el_avatar');
const popupAddCard = document.querySelector('.popup_el_addCard');
const popupEditInfo = document.querySelector('.popup_el_info');

const buttonOpenAvatar = document.querySelector('.profile__edit-avatar');
const buttonOpenInfo = document.querySelector('.info__button-info');
const buttonOpenAddCard = document.querySelector('.profile__button-add');

const formProfileInfo = popupEditInfo.querySelector('.popup__form');
const formAddCard = popupAddCard.querySelector('.popup__form');
const formEditAvatar = popupEditAvatar.querySelector('.popup__form');

const buttonSubmitInfo = formProfileInfo.querySelector('.popup__button_el_save');
const buttonSubmitAvatar = formEditAvatar.querySelector('.popup__button_el_save');
const buttonSubmitCard = formAddCard.querySelector('.popup__button_el_save');

const inputUserName = formProfileInfo.querySelector('.popup__input_el_name');
const inputUserAbout = formProfileInfo.querySelector('.popup__input_el_about');

export {
  initialCards,
  validationConfig,
  indexPageConfig,
  buttonOpenInfo,
  formProfileInfo,
  inputUserName,
  inputUserAbout,
  buttonSubmitInfo,
  buttonOpenAddCard,
  formAddCard,
  buttonSubmitCard,
  buttonOpenAvatar,
  buttonSubmitAvatar,
  formEditAvatar,
  buttonTextContent
}