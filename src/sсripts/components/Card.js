export default class Card {
  constructor(cardData, cardSelector, functionOpenPopup) {
    this._name = cardData.name;
    this._image = cardData.link;
    this._cardSelector = cardSelector;
    this._openPopupPreview = functionOpenPopup;
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
    this._buttonDeleteCard = this._card.querySelector('.cards__button-delete');
    this._previewImageCard = this._card.querySelector('.cards__images');
    this._previewImageCard.src = this._image;
    this._previewImageCard.alt = this._name;
    this._card.querySelector('.cards__title').textContent = this._name;
    this._setEventListeners();

    return this._card;
  }

  _createLike() {
    this._buttonLikeCard.classList.toggle('cards__button-like_active');
  }

  _deleteCard() {
    this._buttonDeleteCard.parentElement.remove();
  }

  _setEventListeners() {
    this._buttonLikeCard.addEventListener('click', () => this._createLike());
    this._buttonDeleteCard.addEventListener('click', () => this._deleteCard());
    this._previewImageCard.addEventListener('click', this._openPopupPreview);
  }
}