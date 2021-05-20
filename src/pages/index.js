import './index.css';
import Card from '../sсripts/components/Card.js';
import FormValidator from '../sсripts/components/FormValidator.js';
import Section from '../sсripts/components/Section.js';
import PopupWithImage from '../sсripts/components/PopupWithImage.js';
import PopupWithForm from '../sсripts/components/PopupWithForm.js';
import UserInfo from '../sсripts/components/UserInfo.js';
import Api from '../sсripts/components/Api.js';
import {
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
  buttonSubmitCard
} from '../sсripts/utils/constants.js';
import {
  activateButton,
  deactivateButton,
  deleteErrorMessege
} from '../sсripts/utils/utils.js';

//Функция: Открытие попапа с картинкой по клику на карточку:
const openPopupPreview = (evt) => {
  const previewImageTarget = evt.target;
  popupImage.open({ link: previewImageTarget.src, description: previewImageTarget.alt });
}

// Функция: функция для передачи в renderer для класса Section
const rendererCardElement = (item) => {
  const card = new Card(item, indexPageConfig, openPopupPreview);
  const cardElement = card.getCard();
  return cardElement;
}

//Функция: Колбэк для добавления карточки из формы по событию Submit:
const submitAddCardForm = (inputsData) => {
  const cardElement = rendererCardElement(inputsData);
  cardList.addItem(cardElement, false);
}

//Функция: Редакция информации о профиле по событию Submit формы:
const submitEditInfoForm = ({ name, about }) => {
  userInfoForm.setUserInfo({ name, about });
}

//Создание экземпляров форм и их валидация
const validationAddCard = new FormValidator(validationConfig, formAddCard);
validationAddCard.enableValidation();
const validationProfileInfo = new FormValidator(validationConfig, formProfileInfo);
validationProfileInfo.enableValidation();

//Добавление картоек из массива:
const cardList = new Section({ items: []/*initialCards*/, renderer: rendererCardElement, place: true }, indexPageConfig);
cardList.renderItems();

//Создание экземпляров класса Popup и добавление слушателей:
const popupInfo = new PopupWithForm(indexPageConfig.popupInfoSelector, /*submitEditInfoForm*/({name, about}) => {api.setUserInfo({name, about})});
popupInfo.setEventListeners();
const popupCard = new PopupWithForm(indexPageConfig.popupAddCardSelector, /*submitAddCardForm*/({name, link}) => {api.setNewCard({name, link})});
popupCard.setEventListeners();
const popupImage = new PopupWithImage(indexPageConfig.popupPreviewSelector);
popupImage.setEventListeners();

//Создание экземпляров класса UserInfo
const userInfoForm = new UserInfo(indexPageConfig);

//Обработчик события: открыть модальне окно PopupInfo по клику
buttonOpenInfo.addEventListener('click', () => {
  inputUserName.value = userInfoForm.getUserInfo().name;
  inputUserAbout.value = userInfoForm.getUserInfo().about;
  popupInfo.open();
  deleteErrorMessege(formProfileInfo, validationConfig);
  activateButton(buttonSubmitInfo, validationConfig);
});

// Обработчик события: открыть попап модального окна добавления карточек по клику
buttonOpenAddCard.addEventListener('click', () => {
  popupCard.open();
  formAddCard.reset();
  deleteErrorMessege(formAddCard, validationConfig);
  deactivateButton(buttonSubmitCard, validationConfig);
});

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-24', headers: {
      headers: {
        authorization: 'b63830ed-4797-4bf0-871c-c795e3b54411'
      }
    }
}, submitEditInfoForm, submitAddCardForm);

api.getUserInfo();
api.getInitialCardList();
//api.setUserInfo({name: 'Волосатая змея', about: 'Просто волосатая змея'});
//api.setNewCard({name: 'Сок из свежих апельсинов', link: 'https://downloader.disk.yandex.ru/preview/a19659d10b918e2e9f82bb62c67152665c7a171e2bb72b72d1730a954e2fda66/60a3ec16/_PAiMW27kLGDgx09pIZRQYlyCF2KHFdT5pKehSXMFOHdvnSRgvUKgxU419njGZZpAe27o0AbdDf5sR7Yv9BBiw%3D%3D?uid=0&filename=IMG_7570.JPG&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=2048x2048'});
