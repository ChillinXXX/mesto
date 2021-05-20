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
        console.log(cardList);
        cardList.forEach((card) => {
          this._handlerApiAddCard(card);
        });
      })
      .catch((error) => alert(`Что-то пошло не так=( ${error}`));
  }

  setUserInfo({ name, about }) {
    fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: 'b63830ed-4797-4bf0-871c-c795e3b54411',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`
      })
    })
      .then((result) => {
        if (result.ok) {
          return result.json();
        } else {
          return Promise.reject(`Ошибка: ${result.status}`)
        }
      })
      .then((newUserData) => {
        //console.log(newUserData);
        this._handlerApiEditInfo(newUserData);
        this._userAvatar.src = newUserData.avatar;
      })
      .catch((error) => alert(`Что-то пошло не так=( ${error}`));
  }

  setNewCard({ name, link }) {
    fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: 'b63830ed-4797-4bf0-871c-c795e3b54411',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then((result) => {
        if (result.ok) {
          return result.json();
        } else {
          return Promise.reject(`Ошибка: ${result.status}`)
        }
      })
      .then((newCardData) => {
        //console.log(newCardData);
        this._handlerApiAddCard(newCardData);
      })
      .catch((error) => alert(`Что-то пошло не так=( ${error}`))
  }
}