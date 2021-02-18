//Объявление переменных для редактирования профиля
const popupEditInfo = document.querySelector('.popup_el_info');
const buttonOpenInfo = document.querySelector('.info__button-info');
const popupFormInfo = popupEditInfo.querySelector('.popup__container');
const nameInput = popupFormInfo.querySelector('.popup__profile_el_name');
const aboutInput = popupFormInfo.querySelector('.popup__profile_el_about');
const buttonCloseInfo = popupFormInfo.querySelector('.popup__button_el_close');
const userName = document.querySelector('.info__user-name');
const userDescription = document.querySelector('.info__user-description');

//Объявления переменных для попапа добавления карточек и обработчиков событий
const buttonOpenAddCard = document.querySelector('.profile__button-add');
const popupAddCard = document.querySelector('.popup_el_addCard');
const buttonCloseAddCard = popupAddCard.querySelector('.popup__button_el_close');
const nameCard = popupAddCard.querySelector('.popup__profile_el_name-card');
const linkCard = popupAddCard.querySelector('.popup__profile_el_link-card');
const cardItemsList = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card').content;

//Объявления переменных для открытие для попапа просмотра изображения
const popupPreview = document.querySelector('.popup_el_preview');
const buttomClosePreview = popupPreview.querySelector('.popup__button_el_close');


//Функция создания объекта из Инпута
function inputCard(){
  const objCardInput = ({name: nameCard.value, link: linkCard.value});
return objCardInput;
}

//Добавлене карточек проходом массива, с созданием обработчиков событий
initialCards.forEach((item) => addCardMass(createCard(item)));

//Функция создания разметки карточки
function createCard(obj) {
  const cardItem = cardTemplate.cloneNode(true);
  const likeButtom = cardItem.querySelector('.cards__button-like');
  const deleteButtom = cardItem.querySelector('.cards__button-delete');
  const previewImage = cardItem.querySelector('.cards__images');
  likeButtom.addEventListener('click', createLike);
  deleteButtom.addEventListener('click', deleteCard);
  previewImage.addEventListener('click', openPopupPreview);
  cardItem.querySelector('.cards__images').src = obj.link;
  cardItem.querySelector('.cards__images').alt = obj.name;
  cardItem.querySelector('.cards__title').textContent = obj.name;

return cardItem;
}

//Функция добавления карточки в DOM из массива
function addCardMass(cardItem) {
  cardItemsList.append(cardItem);
}

//Обработчик события:Добавлене карточек из формы по событию
popupAddCard.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const obj = inputCard();
  addCardForm(createCard(obj));
});

//Функция добавления карточки в DOM из формы
function addCardForm(cardItem) {
  cardItemsList.prepend(cardItem);
  closePopup(popupAddCard, 'popup_opened');
}

//Функция открытия попапа
function openPopup(popup, overflow) {
  popup.classList.add(overflow);
}

//Функция закрытия попапа
function closePopup(popup, overflow) {
  popup.classList.remove(overflow);
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
  popupPreview.querySelector('.popup__image').src = previewImageTarget.src;
  popupPreview.querySelector('.popup__figcaption').textContent = previewImageTarget.alt;
  openPopup(popupPreview, 'popup_opened-bigblack');
}



//Обработчик события: открыть модальне окно Popup Info
buttonOpenInfo.addEventListener('click', function() {
  nameInput.value = userName.textContent;
  aboutInput.value = userDescription.textContent;
  openPopup(popupEditInfo, 'popup_opened');
});

//Обработчик события: закрыть попап модального окна Инфо
buttonCloseInfo.addEventListener('click', function() {
  closePopup(popupEditInfo, 'popup_opened');
});

//Обработчик события: Изменение полей в форме инфо и "Закрыть Popup" по клику "Сохранить"
popupFormInfo.addEventListener('submit', function(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = aboutInput.value;
  closePopup(popupEditInfo, 'popup_opened');
});

// Обработчик события: открытия попапа модального окна добавления карточек
buttonOpenAddCard.addEventListener('click', function() {
  openPopup(popupAddCard, 'popup_opened');
  nameCard.value = '';
  linkCard.value = '';
});

// Обработчик события: закрытие попапа модального окна добавления карточек 
buttonCloseAddCard.addEventListener('click', function() {
  closePopup(popupAddCard, 'popup_opened');
});

// Обработчик события: закрытия попапа модально окна просмотра изображения
buttomClosePreview.addEventListener('click', function() {
  closePopup(popupPreview, 'popup_opened-bigblack');
});