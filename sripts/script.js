///Объявление переменных для попапа редактирования профиля///
let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.info__button-info');
let popupInfo = popup.querySelector('.popup__container');
let nameInput = popupInfo.querySelector('.popup__profile_el_name');
let aboutInput = popupInfo.querySelector('.popup__profile_el_about');
let popupCloseButton = popupInfo.querySelector('.popup__button_el_close');
let userName = document.querySelector('.info__user-name');
let userDescription = document.querySelector('.info__user-description');


///Объявления переменных для попапа добавления карточек///
let buttomAddCard = document.querySelector('.profile__button-add');
let popupAddCard = document.querySelector('.popup_el_addCard');
let closeAddCard = popupAddCard.querySelector('.popup__button_el_close');
let nameCard = popupAddCard.querySelector('.popup__add-card_el_name-card');
let linkCard = popupAddCard.querySelector('.popup__add-card_el_link-card');

//Открытие ПОПАПА с картинкой//
let openPopupPreview = document.querySelector('.popup_el_preview');
let buttomClosePreview = openPopupPreview.querySelector('.popup__button_el_close');

///Объявляем массив объектов с атрибутами name&link///

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

///Заливка/удаление карточек из массива///

initialCards.forEach((item) => {
  const cardItemsList = document.querySelector('.cards');
  const cardTemplate = document.querySelector('#card').content;
  const cardItem = cardTemplate.querySelector('.cards__item').cloneNode(true);
  const likeButtom = cardItem.querySelector('.cards__button-like');
  const deleteButtom = cardItem.querySelector('.cards__button-delete');
  const previewImage = cardItem.querySelector('.cards__images');
  cardItem.querySelector('.cards__images').src = item.link;
  cardItem.querySelector('.cards__images').alt = item.name;
  cardItem.querySelector('.cards__title').textContent = item.name;
  likeButtom.addEventListener('click', function(evt) {
    evt.preventDefault();
    const buttonTarget = evt.target;
    buttonTarget.classList.toggle('cards__button-like_active');
  });
  deleteButtom.addEventListener('click', function(evt) {
    const buttonTarget = evt.target;
    buttonTarget.parentElement.remove();
  });
  previewImage.addEventListener('click', function(evt) {
    const previewImageTarget = evt.target;
    openPopupPreview.querySelector('.popup__image').src = previewImageTarget.src;
    openPopupPreview.querySelector('.popup__figcaption').textContent = previewImageTarget.alt;
    openPopupPreview.classList.add('popup_opened');
  });
  cardItemsList.append(cardItem);
});

////Добавление/удаление карточки по кнопке////

popupAddCard.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const cardItemsList = document.querySelector('.cards');
  const cardTemplate = document.querySelector('#card').content;
  const cardItem = cardTemplate.querySelector('.cards__item').cloneNode(true);
  const likeButtom = cardItem.querySelector('.cards__button-like');
  const deleteButtom = cardItem.querySelector('.cards__button-delete');
  const previewImage = cardItem.querySelector('.cards__images');
  cardItem.querySelector('.cards__images').src = linkCard.value;
  cardItem.querySelector('.cards__images').alt = nameCard.value;
  cardItem.querySelector('.cards__title').textContent = nameCard.value;
  likeButtom.addEventListener('click', function(evt) {
    evt.preventDefault();
    const buttonTarget = evt.target;
    buttonTarget.classList.toggle('cards__button-like_active');
  });
  deleteButtom.addEventListener('click', function(evt) {
    const buttonTarget = evt.target;
    buttonTarget.parentElement.remove();
  });
  previewImage.addEventListener('click', function(evt) {
    const previewImageTarget = evt.target;
    openPopupPreview.querySelector('.popup__image').src = previewImageTarget.src;
    openPopupPreview.querySelector('.popup__figcaption').textContent = previewImageTarget.alt;
    openPopupPreview.classList.add('popup_opened');
  });
  cardItemsList.prepend(cardItem);
  popupAddCard.classList.remove('popup_opened');
});




/*Обработчик события: "Открыть Popup" по клику кнопки Info*/
popupOpenButton.addEventListener('click', function() {
  nameInput.value = userName.textContent;
  aboutInput.value = userDescription.textContent;
  popup.classList.add('popup_opened');
});



/*Обработчик события: "Закрыть Popup INFO" по клику кнопки Close*/
popupCloseButton.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
});

/*Обработчик события: Изменение полей в форме инфо и "Закрыть Popup" по клику ?кнопки? Сохранить*/
popupInfo.addEventListener('submit', function(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = aboutInput.value;
  popup.classList.remove('popup_opened');
});

////// Обработчик события открытия попапа добавления карточек////////
buttomAddCard.addEventListener('click', function() {
  popupAddCard.classList.add('popup_opened');
  nameCard.value = '';
  linkCard.value = '';
  popupCloseButton = popupAddCard.querySelector('.popup__button_el_close');
});

////// Обработчик события закрытия попапа добавления карточек////////
closeAddCard.addEventListener('click', function() {
  popupAddCard.classList.remove('popup_opened');
});

////// Обработчик события закрытия попапа добавления карточек////////
buttomClosePreview.addEventListener('click', function() {
  openPopupPreview.classList.remove('popup_opened');
});