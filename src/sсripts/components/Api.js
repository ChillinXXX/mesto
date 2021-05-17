export default class Api {
  constructor({ baseUrl, headers }, handlerApiEditInfo, handlerApiAddCard) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._handlerApiEditInfo = handlerApiEditInfo;
    this._handlerApiAddCard = handlerApiAddCard;
    this._userAvatar = document.querySelector('.profile__avatar');
  }

  getUserInfo() {
    fetch(`${this._baseUrl}/users/me`, this._headers)
      .then((result) => {
        if (result.ok) {
          return result.json();
        } else {
          return Promise.reject(`Ошибка: ${result.status}`)
        }
      })
      .then((userData) => {
        //console.log(userData);
        this._handlerApiEditInfo(userData);
        this._userAvatar.src = userData.avatar;
      })
      .catch((error) => alert(`Что-то пошло не так=( ${error}`));
  }

  getInitialCardList() {
    fetch(`${this._baseUrl}/cards`, this._headers)
      .then((result) => {
        if (result.ok) {
          return result.json();
        } else {
          return Promise.reject(`Ошибка: ${result.status}`)
        }
      })
      .then((cardList) => {
        //console.log(cardList);
        cardList.forEach((card) => {
          this._handlerApiAddCard(card);
        });
      })
      .catch((error) => alert(`Что-то пошло не так=( ${error}`));
  }
}