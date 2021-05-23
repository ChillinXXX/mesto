export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, this._headers)
      .then((result) => {
        if (result.ok) {
          return result.json();
        } else {
          return Promise.reject(`Ошибка: ${result.status}`)
        }
      })
  }

  setUserAvatar({link}) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: 'b63830ed-4797-4bf0-871c-c795e3b54411',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      })
    })
    .then((result) => result.ok ? result.json() : Promise.reject(`Ошибка: ${result.status}`))
  }

  getInitialCardList() {
     return fetch(`${this._baseUrl}/cards`, this._headers)
      .then((result) => {
        if (result.ok) {
          return result.json();
        } else {
          return Promise.reject(`Ошибка: ${result.status}`)
        }
      })
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
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
  }

  setNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
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
  }

  setLike(cardID) {
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: 'PUT',
      headers: {
        authorization: 'b63830ed-4797-4bf0-871c-c795e3b54411'
      }
    })
    .then((result) => result.ok ? result.json() : Promise.reject(`Ошибка: ${result.status}`))
  }

  deleteLike(cardID) {
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: 'DELETE',
      headers: {
        authorization: 'b63830ed-4797-4bf0-871c-c795e3b54411'
      }
    })
    .then((result) => result.ok ? result.json() : Promise.reject(`Ошибка: ${result.status}`))
  }

  deleteCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: 'DELETE',
      headers: {
        authorization: 'b63830ed-4797-4bf0-871c-c795e3b54411'
      }
    })
    .then((result) => result.ok ? result.json() : Promise.reject(`Ошибка: ${result.status}`))
  }
}