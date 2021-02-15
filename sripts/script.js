/*Объявление переменных и присвоение им значений*/
let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.info__button-info');
let popupInfo = popup.querySelector('.popup__container');
let nameInput = popupInfo.querySelector('.popup__profile_el_name');
let aboutInput = popupInfo.querySelector('.popup__profile_el_about');
let popupCloseButton = popupInfo.querySelector('.popup__button_el_close');
let userName = document.querySelector('.info__user-name');
let userDescription = document.querySelector('.info__user-description');
////////
let buttomAddCard = document.querySelector('.profile__button-add'); // Записали объект в "кнопка добавить карточку" в переменную
let popupAddCard = document.querySelector('.popup_el_addCard');
let closeAddCard = popupAddCard.querySelector('.popup__button_el_close');
////////
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

////Заливка карточек из массива////

initialCards.forEach((item) => {
  const cardItemsList = document.querySelector('.cards');
  const cardTemplate = document.querySelector('#card').content;
  const cardItem = cardTemplate.querySelector('.cards__item').cloneNode(true);
  cardItem.querySelector('.cards__images').src = item.link;
  cardItem.querySelector('.cards__images').alt = item.name;
  cardItem.querySelector('.cards__title').textContent = item.name;
  cardItemsList.append(cardItem);
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

//////////////
buttomAddCard.addEventListener('click', function() {
  popupAddCard.classList.add('popup_opened');
  popupCloseButton = popupAddCard.querySelector('.popup__button_el_close');
});

closeAddCard.addEventListener('click', function() {
  popupAddCard.classList.remove('popup_opened');
});


/////////////