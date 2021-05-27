import './index.css';
import Card from '../sсripts/components/Card.js';
import FormValidator from '../sсripts/components/FormValidator.js';
import Section from '../sсripts/components/Section.js';
import PopupWithImage from '../sсripts/components/PopupWithImage.js';
import PopupWithForm from '../sсripts/components/PopupWithForm.js';
import PopupWithConfirm from '../sсripts/components/PopupWithConfirm.js';
import UserInfo from '../sсripts/components/UserInfo.js';
import Api from '../sсripts/components/Api.js';
import {
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
} from '../sсripts/utils/constants.js';
import {
  activateButton,
  deactivateButton,
  deleteErrorMessege
} from '../sсripts/utils/utils.js';

//Создание экземпляра класса с запросами к серверу
const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-24',
  token: 'b63830ed-4797-4bf0-871c-c795e3b54411'
});

//Исполнение стэка промисов  и их обработка
Promise.all([
  api.getUserInfo(),
  api.getInitialCardList()
])
  .then((results) => {
    //Запишем результат промиса getUserInfo в экз.класса userInfo
    userInfo.setUserInfo(results[0]);
    userInfo.setUserAvatar(results[0]);
    userInfo.setUserId(results[0]);
    //Создаем экз-ры класса Card и отрисовываем элементы
    results[1].forEach((dataCard) => rendererCardElement(dataCard, true))
  })
  .catch((error) => alert(`Что-то пошло не так=( ${error}`));

// Функция: Создание экземпляра карточки
const createCardElement = (dataCard) => {
  const userID = userInfo.getUserId();
  const card = new Card(dataCard, indexPageConfig,
    //Handle: Открыть попапа с картинкой по клику на карточку:
    (evt) => {
      const previewImageTarget = evt.target;
      popupImage.open({ link: previewImageTarget.src, description: previewImageTarget.alt });
    },
    //Handle: Открыть попапа удаления карточки по клику кнопки
    () => {
      popupDeleteCard.open(card);
    },
    //Handle: Поставить лайк
    (cardID) => {
      api.setLike(cardID)
        .then((result) => {
          card.editLike(result);
        })
        .catch((error) => alert(`Что-то пошло не так=( ${error}`));
    },
    //Handle: Удалить лайк
    (cardID) => {
      api.deleteLike(cardID)
        .then((result) => {
          card.editLike(result);
        })
        .catch((error) => alert(`Что-то пошло не так=( ${error}`));
    },
    userID);
  const cardElement = card.getCard();
  return cardElement;
}

//Функция: Колбэк для добавления карточки: 
const rendererCardElement = (dataCard, place) => {
  const cardElement = createCardElement(dataCard);
  cardList.addItem(cardElement, place);
}

//Создание экземпляров форм и их валидация
const validationAddCard = new FormValidator(validationConfig, formAddCard);
validationAddCard.enableValidation();

const validationProfileInfo = new FormValidator(validationConfig, formProfileInfo);
validationProfileInfo.enableValidation();

const validationEditAvatar = new FormValidator(validationConfig, formEditAvatar);
validationEditAvatar.enableValidation();

//Создание экземпляра класса секции:
const cardList = new Section({renderer: rendererCardElement, place: true }, indexPageConfig);

//Создание экземпляров класса Popup и добавление слушателей:
const popupInfo = new PopupWithForm(indexPageConfig.popupInfoSelector,
  //Handle: Запрос на изменеие данных пользователя
  ({ name, about }) => {
    popupInfo.setButtonTextContent(buttonTextContent.loading);
    api.setUserInfo({ name, about })
      .then((dataUser) => {
        userInfo.setUserInfo(dataUser);
        popupInfo.close();
      })
      .catch((error) => alert(`Что-то пошло не так=( ${error}`))
      .finally(() => popupInfo.setButtonTextContent(buttonTextContent.save));
  });
popupInfo.setEventListeners();

const popupAvatar = new PopupWithForm(indexPageConfig.popupAvatarSelector,
  //Handle: Запрос на изменение аватара пользователя
  ({ link }) => {
    popupAvatar.setButtonTextContent(buttonTextContent.loading);
    api.setUserAvatar({ link })
      .then((result) => {
        userInfo.setUserAvatar(result);
        popupAvatar.close();
      })
      .catch((error) => alert(`Что-то пошло не так=( ${error}`))
      .finally(() => popupAvatar.setButtonTextContent(buttonTextContent.save));
  });
popupAvatar.setEventListeners();

const popupCard = new PopupWithForm(indexPageConfig.popupAddCardSelector,
  //Handle: Запрос на добавление новой карточки и ее отрисовка
  ({ name, link }) => {
    popupCard.setButtonTextContent(buttonTextContent.loading);
    api.setNewCard({ name, link })
      .then((dataCard) => {
        rendererCardElement(dataCard, false);
        popupCard.close();
      })
      .catch((error) => alert(`Что-то пошло не так=( ${error}`))
      .finally(() => popupCard.setButtonTextContent(buttonTextContent.create));
  });
popupCard.setEventListeners();

const popupImage = new PopupWithImage(indexPageConfig.popupPreviewSelector);
popupImage.setEventListeners();

const popupDeleteCard = new PopupWithConfirm(indexPageConfig.popupDeleteCardSelector,
  //Handle: Запрос на удаление карточки
  (cardItem) => {
    api.deleteCard(cardItem._cardId)
      .then(() => {
        cardItem.deleteCard();
        popupDeleteCard.close();
      })
      .catch((error) => alert(`Что-то пошло не так=( ${error}`));
  });
popupDeleteCard.setEventListeners();

//Создание экземпляров класса UserInfo
const userInfo = new UserInfo(indexPageConfig);

//Обработчик события: открыть модальне окно PopupInfo по клику
buttonOpenInfo.addEventListener('click', () => {
  inputUserName.value = userInfo.getUserInfo().name;
  inputUserAbout.value = userInfo.getUserInfo().about;
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

//Обработчик события: открыть попап изменить аватар по клику
buttonOpenAvatar.addEventListener('click', () => {
  popupAvatar.open();
  formEditAvatar.reset();
  deleteErrorMessege(formEditAvatar, validationConfig);
  deactivateButton(buttonSubmitAvatar, validationConfig);
});