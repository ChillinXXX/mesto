export default class Card {
  constructor({ name, link, likes, owner, _id }, { cardSelector }, handleOpenPreview, handleOpenDeleteCard, handeleSetLike, handeleDeleteLike, userID) {
    this._name = name;
    this._image = link;
    this._likes = likes;
    this._owner = owner;
    this._cardId = _id;
    this._cardSelector = cardSelector;
    this._openPreview = handleOpenPreview;
    this._openDeleteCard = handleOpenDeleteCard;
    this._setLike = handeleSetLike;
    this._deleteLike = handeleDeleteLike;
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
    this._removeButtonDelete(this._checkOwner());
    this._setUserLike();
    return this._card;
  }

  _checkOwner() {
    if (this._owner._id == this._userID) {
      return true
    } else {
      return false
    };
  }

  _removeButtonDelete(isMyCard) {
    isMyCard
      ? 'this is my CARD!'
      : this._buttonDeleteCard.remove();
  }

  _setUserLike() {
    this._likes.forEach((item) => {
      item._id == this._userID
        ? this._buttonLikeCard.classList.add('cards__button-like_active')
        : this._buttonLikeCard.classList.remove('cards__button-like_active');
    })
  }

  _createLike() {
    //Собераем ID пользователей лакнувших карточку в массив
    const likesId = this._likes.reduce((value, item) => {
      const arrayLength = value.push(item._id);
      return value;
    }, []);
    //Проверяем существует ли ID текущего пользователя в массиве
    likesId.includes(this._userID)
      ? this._deleteLike(this._cardId)  //Если ID найден, ставим дизлайк
      : this._setLike(this._cardId);    //Если ID в массиве нет, ставим лайк
    this._buttonLikeCard.classList.toggle('cards__button-like_active');
  }

  _deleteCard() {
    this._buttonDeleteCard.parentElement.remove();
  }

  _setEventListeners() {
    this._buttonLikeCard.addEventListener('click', () => this._createLike());

    this._buttonDeleteCard.addEventListener('click', (evt) => {
      this._openDeleteCard(evt, this._cardId)
    });

    this._previewImageCard.addEventListener('click', this._openPreview);
  }
}