/*Объявление переменных и присвоение им значений*/
let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.info__button-info');
let popupInfo = popup.querySelector('.popup__container');
let nameInput = popupInfo.querySelector('.popup__profile_el_name');
let aboutInput = popupInfo.querySelector('.popup__profile_el_about');
let popupCloseButton = popupInfo.querySelector('.popup__button_el_close');
let userName = document.querySelector('.info__user-name');
let userDescription = document.querySelector('.info__user-description');

/*Функция закрытия Popup*/
function closePopup() {
  popup.classList.remove('popup_opened');
}

/*Функция открытия Popup и передачи в Input текстовых данных из DOM*/
function openPopup() {
  nameInput.value = userName.textContent;
  aboutInput.value = userDescription.textContent;
  popup.classList.add('popup_opened');
}

/*Функция Изменения Полей в форме инфо*/
function formSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = aboutInput.value;
  closePopup()
}

/*Обработчик события: "Открыть Popup" по клику кнопки Info*/
popupOpenButton.addEventListener('click', openPopup);

/*Обработчик события: "Закрыть Popup" по клику кнопки Close*/
popupCloseButton.addEventListener('click', closePopup);

/*Обработчик события: Изменение полей в форме инфо и "Закрыть Popup" по клику ?кнопки? Сохранить*/
popupInfo.addEventListener('submit', formSubmitHandler); 