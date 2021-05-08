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

export {
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
}