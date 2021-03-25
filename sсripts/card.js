class Card {
  constructor(cardData, cardSelector) {
      this._name = cardData.name;
      this._image = cardData.link;
      this._cardSelector = cardSelector;
  }

  _getTemplateCard() {
      const cardItem = document.querySelector(this._cardSelector).content.cloneNode(true);
      return cardItem;
  }

  getCard() {
    this._card = this._getTemplateCard();
    this._card.querySelector('.cards__title').textContent = this._name;
    this._card.querySelector('.cards__images').src = this._image;
    this._card.querySelector('.cards__images').alt = this._name;
    this._setEventListeners();
 
    return this._card;
  }

  _createLike() {
    
  }


  _setEventListeners() {
    const buttonLikeCard = this._card.querySelector('.cards__button-like');
    const buttonDeleteCard = this._card.querySelector('.cards__button-delete');
    const previewImageCard = this._card.querySelector('.cards__images');
    
    buttonLikeCard.addEventListener('click', () => {this._createLike()});
    buttonDeleteCard.addEventListener('click', deleteCard);
    previewImageCard.addEventListener('click', openPopupPreview);
  }
}

initialCards.forEach((item) => {
  const card = new Card(item, '#card');
  const cardElement = card.getCard();

  document.querySelector('.cards').append(cardElement);
});