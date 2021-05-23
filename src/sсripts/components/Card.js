export default class Card {
  constructor({ name, link, likes, owner, _id }, { cardSelector }, handleOpenPopupPreview, handleOpenPopupDeleteCard, handeleCreateLike, handeleDeleteLike, userID) {
    this._name = name;
    this._image = link;
    this._likes = likes;
    this._owner = owner;
    this._cardId = _id;
    this._cardSelector = cardSelector;
    this._handleOpenPopupPreview = handleOpenPopupPreview;
    this._handleOpenPopupDeleteCard = handleOpenPopupDeleteCard;
    this._handeleCreateLike = handeleCreateLike;
    this._handeleDeleteLike = handeleDeleteLike;
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
    this._rendererButtonDelete(this._checkOwner());
    this._rendererLike();
    return this._card;
  }

  _checkOwner() {
    if (this._owner._id == this._userID) {
      return true
    } else {
      return false
    };
  }

  _rendererButtonDelete(isMyCard) {
    isMyCard ? console.log('this is my CARD!') : this._buttonDeleteCard.remove();
  }

  _rendererLike() {
    this._likes.forEach((item) => {
      item._id == this._userID
        ? this._buttonLikeCard.classList.add('cards__button-like_active')
        : this._buttonLikeCard.classList.remove('cards__button-like_active');
    })
  }

  _createLike() {
    this._buttonLikeCard.classList.toggle('cards__button-like_active');
    const likesId = this._likes.reduce((value, item) => {
      const arr = value.push(item._id);
      return value;
    }, []);
    //console.log(likesId.includes(this._userID));
    //console.log(this._likes);
    likesId.includes(this._userID)
      ? this._handeleDeleteLike(this._cardId)
      : this._handeleCreateLike(this._cardId);
  }

  _deleteCard() {
    this._buttonDeleteCard.parentElement.remove();
  }

  _setEventListeners() {
    this._buttonLikeCard.addEventListener('click', () => this._createLike());

    this._buttonDeleteCard.addEventListener('click', /*() => this._deleteCard()*/(evt) => {
      this._handleOpenPopupDeleteCard(evt, this._cardId)
    });

    this._previewImageCard.addEventListener('click', this._handleOpenPopupPreview);
  }
}