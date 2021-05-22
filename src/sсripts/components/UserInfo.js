export default class UserInfo {
  constructor({ userNameSelector, userAboutSelector, userAvatarSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userAboutElement = document.querySelector(userAboutSelector);
    this._userAvatarElement = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    this._userName = this._userNameElement.textContent;
    this._userAbout = this._userAboutElement.textContent;
    return { name: this._userName, about: this._userAbout };
  }

  setUserInfo({ name, about }) {
    this._userNameElement.textContent = name;
    this._userAboutElement.textContent = about;
  }

  setUserAvatar({ avatar }) {
    this._userAvatarElement.src = avatar;
  }

  setUserId({ _id }) {
    this._userId = _id;
  }

  getUserId() {
    return this._userId;
  }
}