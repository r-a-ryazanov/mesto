export class Card {
  constructor(data, templateElementSelector, handleCardClick, handleDeliteClick, handleLikeClick) {
    this._templateElement = templateElementSelector;
    this.name = data.name;
    this.link = data.link;
    this._handleCardClick = handleCardClick;
    this._handleDeliteClick = handleDeliteClick;
    this.likeCount = data.likes.length;
    this.id = data._id;
    this._handleLikeClick = handleLikeClick;
    
  }
  _getCardElement() {//функция получения шаблона карточки
    const cardTemplate = document.querySelector(this._templateElement).content;
    const cardElement = cardTemplate.cloneNode(true).querySelector(".card-grid__item");
    return cardElement;
  }
  _setEventListeners() {//функция включения слушателей
    this._cardElement.querySelector(".card-grid__image").addEventListener('click', () => this._handleCardClick());// прерывание на клик по картинке
    this._cardElement.querySelector(".card-grid__delete-button").addEventListener('click', () => this._handleDeliteClick(this));//прерывание на клик по кнопке удаления 
    this._cardElement.querySelector(".card-grid__like").addEventListener('click', () => this._handleLikeClick(this, this._cardElement.querySelector('.card-grid__like').classList.contains('card-grid__like_active')))//прерывание на клик по кнопке лайк
  }
  getCard() { //функция добавления карточки
    this._cardElement = this._getCardElement();
    
    this._cardElement.querySelector(".card-grid__place").textContent = this.name;
    const cardGridImage = this._cardElement.querySelector(".card-grid__image");
    cardGridImage.src = this.link;
    cardGridImage.setAttribute('alt', `Фото '${this.name}'`);
    this._cardElement.querySelector('.card-grid__like-count').textContent = this.likeCount;
    this._setEventListeners();
    return this._cardElement;
  }

}

