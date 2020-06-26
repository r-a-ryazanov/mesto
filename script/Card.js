import {imagePopup, imagePopupImage, imagePopupName } from './index.js'
import {openPopup} from './utils.js'
export class Card {
  constructor(data, templateElementSelector){
    this._templateElement = templateElementSelector;
    this._name = data.name;
    this._link = data.link;
  }
  _imageClickHandler() {// обработчик клика по картирке
    imagePopupImage.src = this._link;
    imagePopupName.textContent = this._name;
    imagePopupImage.setAttribute('alt', `Фото '${this._name}'`);
    openPopup(imagePopup);
  }
  _deleteClickHandler(){//обработчик нажатия кнопки удаления
    this._cardElement.remove();
    this._cardElement = null;
  }
  _likeClickHandler(){//обработчик нажатия кнопки лайк
    this._cardElement.querySelector('.card-grid__like').classList.toggle('card-grid__like_active');
  }
  _getCardElement(){//функция получения шаблона карточки
    const cardTemplate = document.querySelector(this._templateElement).content;
    const cardElement = cardTemplate.cloneNode(true).querySelector(".card-grid__item");
    return cardElement;
  }
  _setEventListeners(){//функция включения слушателей
    this._cardElement.querySelector(".card-grid__image").addEventListener('click', () => this._imageClickHandler());// прерывание на клик по картинке
    this._cardElement.querySelector(".card-grid__delete-button").addEventListener('click', () => this._deleteClickHandler());//прерывание на клик по кнопке удаления 
    this._cardElement.querySelector(".card-grid__like").addEventListener('click', () => this._likeClickHandler())//прерывание на клик по кнопке лайк
  }
  getCard() { //функция добавления карточки
    this._cardElement = this._getCardElement();
    this._cardElement.querySelector(".card-grid__place").textContent = this._name;this._cardElement
    const cardGridImage = this._cardElement.querySelector(".card-grid__image");
    cardGridImage.src = this._link;
    cardGridImage.setAttribute('alt', `Фото '${this._name}'`);
    this._setEventListeners();
    return this._cardElement;
  }

}

