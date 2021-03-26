class Card {
  constructor(cardData, cardSelector, functionOpenPopup) {
      this._name = cardData.name;
      this._image = cardData.link;
      this._cardSelector = cardSelector;
      this._openPopupPreview = functionOpenPopup;
  }

  _getTemplateCard() {
      const cardItem = document.querySelector(this._cardSelector).content.cloneNode(true);
      return cardItem;
  }

  getCard() {
    this._card = this._getTemplateCard();
    this._buttonLikeCard = this._card.querySelector('.cards__button-like');
    this._buttonDeleteCard = this._card.querySelector('.cards__button-delete');
    this._previewImageCard = this._card.querySelector('.cards__images');
    this._card.querySelector('.cards__title').textContent = this._name;
    this._card.querySelector('.cards__images').src = this._image;
    this._card.querySelector('.cards__images').alt = this._name;
    this._setEventListeners();
    
    return this._card;
  }

  _createLike() {
    this._buttonLikeCard.classList.toggle('cards__button-like_active');
  }

  _deleteCard() {
    this._buttonDeleteCard.parentElement.remove();
  }

  _openPopupPreview() {
    popupPreviewImage.src = this._previewImageCard.src;
    popupPreviewImage.alt = this._previewImageCard.alt;
    popupPreviewFigcaption.textContent = this._previewImageCard.alt;
    openPopup(popupPreview);
  }


  _setEventListeners() {
    this._buttonLikeCard.addEventListener('click', () => {this._createLike()});
    this._buttonDeleteCard.addEventListener('click', () => {this._deleteCard()});
    this._previewImageCard.addEventListener('click', this._openPopupPreview);
  }
}

//Добавлене карточек проходом массива, с созданием обработчиков событий
initialCards.forEach((item) => {
  const card = new Card(item, '#card', openPopupPreview);
  const cardElement = card.getCard();

  document.querySelector('.cards').append(cardElement);
});

//Обработчик события:Добавлене карточек из формы по событию Sibmit
popupAddCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const card = new Card({ name: nameCard.value, link: linkCard.value }, '#card', openPopupPreview);
  const cardElement = card.getCard();
  document.querySelector('.cards').prepend(cardElement);
  closePopup(popupAddCard);
});