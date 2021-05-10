import './index.css';
import Card from '../sсripts/components/Card.js';
import FormValidator from '../sсripts/components/FormValidator.js';
import Section from '../sсripts/components/Section.js';
import PopupWithImage from '../sсripts/components/PopupWithImage.js';
import PopupWithForm from '../sсripts/components/PopupWithForm.js';
import UserInfo from '../sсripts/components/UserInfo.js';
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
  const card = new Card(item, indexPageConfig.cardSelector, openPopupPreview);
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
const cardList = new Section({ items: initialCards, renderer: rendererCardElement, place: true }, indexPageConfig.cardListSelector);
cardList.renderItems();

//Создание экземпляров класса Popup и добавление слушателей:
const popupInfo = new PopupWithForm(indexPageConfig.popupInfoSelector, submitEditInfoForm);
popupInfo.setEventListeners();
const popupCard = new PopupWithForm(indexPageConfig.popupAddCardSelector, submitAddCardForm);
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
  activateButton(buttonSubmitInfo, validationConfig.inactiveButtonClass);
});

// Обработчик события: открыть попап модального окна добавления карточек по клику
buttonOpenAddCard.addEventListener('click', () => {
  popupCard.open();
  formAddCard.reset();
  deleteErrorMessege(formAddCard, validationConfig);
  deactivateButton(buttonSubmitCard, validationConfig.inactiveButtonClass);
});
