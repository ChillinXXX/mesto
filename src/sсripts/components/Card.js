export default class Card {
  constructor({name, link, likes, owner, _id}, {cardSelector}, handleOpenPopupPreview, handleOpenPopupDeleteCard, userID) {
    this._name = name;
    this._image = link;
    this._likes = likes;
    this._owner = owner;
    this._cardId = _id;
    this._cardSelector = cardSelector;
    this._handleOpenPopupPreview = handleOpenPopupPreview;
    this._handleOpenPopupDeleteCard = handleOpenPopupDeleteCard;
    this._userID = userID;
  }

  _getTemplateCard() {
    const cardItem = document
      .querySelector(this._cardSelector)
      .content
      .cloneNode(true);
    return cardItem;
  }

  getCard() {
    this._card = this._getTemplateCard();
    this._buttonLikeCard = this._card.querySelector('.cards__button-like');
    this._likeCount = this._card.querySelector('.cards__total-like');
    this._buttonDeleteCard = this._card.querySelector('.cards__button-delete');
    this._previewImageCard = this._card.querySelector('.cards__images');
    this._previewImageCard.src = this._image;
    this._previewImageCard.alt = this._name;
    this._likeCount.textContent = this._likes.length;
    this._card.querySelector('.cards__title').textContent = this._name;
    this._setEventListeners();
    this._checkOwner();
    return this._card;
  }

  _checkOwner() {
    this._owner._id == this._userID ? console.log('ok') : this._buttonDeleteCard.remove();
  }

  _createLike() {
    this._buttonLikeCard.classList.toggle('cards__button-like_active');
  }

  _deleteCard() {
    this._buttonDeleteCard.parentElement.remove();
  }

  _setEventListeners() {
    this._buttonLikeCard.addEventListener('click', () => this._createLike());
    this._buttonDeleteCard.addEventListener('click', /*() => this._deleteCard()*/(evt) => {this._handleOpenPopupDeleteCard(evt, this._cardId)});
    this._previewImageCard.addEventListener('click', this._handleOpenPopupPreview);
  }
}