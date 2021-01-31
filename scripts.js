/*Объявление переменных и присвоение им значений*/
let popup = document.querySelector('.popup');
let nameInput = popup.querySelector('.popup__profile_el_name');
let aboutInput = popup.querySelector('.popup__profile_el_about');
let popupOpenButton = document.querySelector('.info__button-info');
let popupCloseButton = popup.querySelector('.popup__button_el_close');
let popupSaveButton = popup.querySelector('.popup__button_el_save');
let userName = document.querySelector('.info__user-name');
let userDescription = document.querySelector('.info__user-description');
nameInput.value = userName.textContent;
aboutInput.value = userDescription.textContent;

/*Функция закрытия Popup*/
function closePopup() {
  popup.classList.remove('popup_opened');
}

/*Функция открытия Popup*/
function openPopup() {
  popup.classList.add('popup_opened');
}

/*Обработчик события: "Открыть Popup" по клику кнопки Info*/
popupOpenButton.addEventListener('click', openPopup);

/*Обработчик события: "Закрыть Popup" по клику кнопки Close*/
popupCloseButton.addEventListener('click', closePopup);

/*Функция Изменения Полей в форме инфо*/
function formSubmitHandler(evt) {
 evt.preventDefault();
 userName.textContent = nameInput.value;
 userDescription.textContent = aboutInput.value;
 closePopup()
}

/*Обработчик события: Изменение полей в форме инфо и "Закрыть Popup" по клику кнопки Сохранить*/
popupSaveButton.addEventListener('click', formSubmitHandler); 