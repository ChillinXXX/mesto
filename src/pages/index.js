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

//Функцияя: Открытие попапа с кнопкой удаления
const openPopupDeleteCard = (evt, cardId) => {
  popupDeleteCard.open(evt.target, cardId);
}

// Функция: Создание экземпляра карточки
const createCardElement = (dataCard) => {
  const userID = userInfoForm.getUserId();
  const card = new Card(dataCard, indexPageConfig, openPopupPreview, openPopupDeleteCard,
    (cardID) => {
      api.setLike(cardID)
        .then((result) => {
          card._likes = result.likes;
          card._likeCount.textContent = result.likes.length;
        })
        .catch((error) => alert(`Что-то пошло не так=( ${error}`));
    },
    (cardID) => {
      api.deleteLike(cardID)
        .then((result) => {
          card._likes = result.likes;
          card._likeCount.textContent = result.likes.length;
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
//cardList.renderItems();

//Создание экземпляров класса Popup и добавление слушателей:
const popupInfo = new PopupWithForm(indexPageConfig.popupInfoSelector, /*submitEditInfoForm*/({ name, about }) => {
  api.setUserInfo({ name, about })
    .then((dataUser) => {
      //console.log(dataUser);
      userInfoForm.setUserInfo(dataUser);;
    })
    .catch((error) => alert(`Что-то пошло не так=( ${error}`));
});
popupInfo.setEventListeners();

const popupAvatar = new PopupWithForm(indexPageConfig.popupAvatarSelector, ({link}) => {
  api.setUserAvatar({link})
  .then((result) => {
    //console.log(result);
    userInfoForm.setUserAvatar(result);
  })
  .catch((error) => alert(`Что-то пошло не так=( ${error}`))
});
popupAvatar.setEventListeners();

const popupCard = new PopupWithForm(indexPageConfig.popupAddCardSelector, /*rendererCardElement*/({ name, link }) => {
  api.setNewCard({ name, link })
    .then((dataCard) => {
      rendererCardElement(dataCard, false);
    })
    .catch((error) => alert(`Что-то пошло не так=( ${error}`))
});
popupCard.setEventListeners();

const popupImage = new PopupWithImage(indexPageConfig.popupPreviewSelector);
popupImage.setEventListeners();

const popupDeleteCard = new PopupWithConfirm(indexPageConfig.popupDeleteCardSelector, (buttonELement, cardId) => {
  buttonELement.parentElement.remove();
  api.deleteCard(cardId)
    .then((result) => console.log(result))
    .catch((error) => alert(`Что-то пошло не так=( ${error}`));
});
popupDeleteCard.setEventListeners();

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
});

Promise.all([
  api.getUserInfo(),
  api.getInitialCardList()
])
  .then((results) => {
    userInfoForm.setUserInfo(results[0]);
    userInfoForm.setUserAvatar(results[0]);
    userInfoForm.setUserId(results[0]);
    return results[1];
  })
  .then((result) => {
    result.forEach((dataCard) => {
      rendererCardElement(dataCard, true);
    })
  })
  .catch((error) => alert(`Что-то пошло не так=( ${error}`));
