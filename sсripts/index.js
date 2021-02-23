//Объявление переменных для редактирования профиля
const popupEditInfo = document.querySelector('.popup_el_info');
const buttonOpenInfo = document.querySelector('.info__button-info');
const popupFormInfo = popupEditInfo.querySelector('.popup__form');
const nameInput = popupFormInfo.querySelector('.popup__input_el_name');
const aboutInput = popupFormInfo.querySelector('.popup__input_el_about');
const buttonCloseInfo = popupFormInfo.querySelector('.popup__button_el_close');
const userName = document.querySelector('.info__user-name');
const userDescription = document.querySelector('.info__user-description');

//Объявления переменных для попапа добавления карточек и обработчиков событий
const buttonOpenAddCard = document.querySelector('.profile__button-add');
const popupAddCard = document.querySelector('.popup_el_addCard');
const buttonCloseAddCard = popupAddCard.querySelector('.popup__button_el_close');
const nameCard = popupAddCard.querySelector('.popup__input_el_name-card');
const linkCard = popupAddCard.querySelector('.popup__input_el_link-card');
const cardItemsList = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card').content;

//Объявления переменных для открытие попапа просмотра изображения
const popupPreview = document.querySelector('.popup_el_preview');
const buttomClosePreview = popupPreview.querySelector('.popup__button_el_close');
const popupPreviewImage = popupPreview.querySelector('.popup__image');

//Функция создания карточки
function createCard(obj) {
  const cardItem = cardTemplate.cloneNode(true);
  const likeButtom = cardItem.querySelector('.cards__button-like');
  const deleteButtom = cardItem.querySelector('.cards__button-delete');
  const previewImage = cardItem.querySelector('.cards__images');
  const cardImage = cardItem.querySelector('.cards__images');
  likeButtom.addEventListener('click', createLike);
  deleteButtom.addEventListener('click', deleteCard);
  previewImage.addEventListener('click', openPopupPreview);
  cardImage.src = obj.link;
  cardImage.alt = obj.name;
  cardItem.querySelector('.cards__title').textContent = obj.name;

  return cardItem;
}

//Функция добавления карточки в DOM
function addCard(cardItem, placeItem) {
  if (placeItem) {
    cardItemsList.append(cardItem);
  }
  if (!placeItem) {
    cardItemsList.prepend(cardItem);
  }
}

//Функция закрытия попапов по клику оверлея
const closePopupOverlay = (popupItem) => {
  popupItem.addEventListener('click', (evt) => {
    closePopup(evt.target);
  });
}

//Функция закрытия попапов по нажатию клавиши Escape
const closePopupPressKey = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

//Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupPressKey);
  closePopupOverlay(popup);
}

//Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupPressKey);
}

//Функция лайка-дизлайка
function createLike(evt) {
  evt.preventDefault();
  const buttonTarget = evt.target;
  buttonTarget.classList.toggle('cards__button-like_active');
}

//Функция удаления карточки по клику
function deleteCard(evt) {
  const buttonTarget = evt.target;
  buttonTarget.parentElement.remove();
}

//Функция просмотра изображения по клику
function openPopupPreview(evt) {
  const previewImageTarget = evt.target;
  popupPreviewImage.src = previewImageTarget.src;
  popupPreviewImage.alt = previewImageTarget.alt;
  popupPreview.querySelector('.popup__figcaption').textContent = previewImageTarget.alt;
  openPopup(popupPreview);
}

//Добавлене карточек проходом массива, с созданием обработчиков событий
initialCards.forEach((item) => addCard(createCard(item), true));

//Обработчик события:Добавлене карточек из формы по событию Sibmit
popupAddCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  cardItem = createCard(({ name: nameCard.value, link: linkCard.value }));
  addCard(cardItem, false);
  closePopup(popupAddCard);
});

//Обработчик события: открыть модальне окно Popup Info
buttonOpenInfo.addEventListener('click', function () {
  const buttonSubmit = popupFormInfo.querySelector('.popup__button_el_save');
  nameInput.value = userName.textContent;
  aboutInput.value = userDescription.textContent;
  openPopup(popupEditInfo);
  activateButton(buttonSubmit, objectClass.inactiveButtonClass);
});

//Обработчик события: закрыть попап модального окна Инфо
buttonCloseInfo.addEventListener('click', function () {
  closePopup(popupEditInfo);
});

//Обработчик события: Изменение полей в форме инфо и "Закрыть Popup" по клику "Сохранить"
popupFormInfo.addEventListener('submit', function (evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = aboutInput.value;
  closePopup(popupEditInfo);
});

// Обработчик события: открытия попапа модального окна добавления карточек
buttonOpenAddCard.addEventListener('click', function () {
  const buttonSubmit = popupAddCard.querySelector('.popup__button_el_save');
  openPopup(popupAddCard);
  nameCard.value = '';
  linkCard.value = '';
  deactivateButton(buttonSubmit, objectClass.inactiveButtonClass);
});

// Обработчик события: закрытие попапа модального окна добавления карточек 
buttonCloseAddCard.addEventListener('click', function () {
  closePopup(popupAddCard);
});

// Обработчик события: закрытия попапа модально окна просмотра изображения
buttomClosePreview.addEventListener('click', function () {
  closePopup(popupPreview);
});