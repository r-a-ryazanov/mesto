import {imagePopup, imagePopupImage, imagePopupName } from './index.js'
import {openPopup} from './utils.js'
export class Card {
  constructor(data, templateElementSelector){
    this._templateElement = templateElementSelector;
    this._name = data.name;
    this._link = data.link;
    //this._cardElement = 1;
  }
  _imageClickHandler() {// обработчик клика по картирке
    imagePopupImage.src = this._link;
    imagePopupName.textContent = this._name;
    imagePopupImage.setAttribute('alt', `Фото '${this._name}'`);
    openPopup(imagePopup);
  }
  _deleteClickHandler(){//обработчик нажатия кнопки удаления
    this.closest(".card-grid__item").remove();
  }
  _likeClickHandler(){//обработчик нажатия кнопки лайк
    this.classList.toggle('card-grid__like_active');
  }
  _getCardElement(){//функция получения шаблона карточки
    const cardTemplate = document.querySelector(this._templateElement).content;
    const cardElement = cardTemplate.cloneNode(true);
    return cardElement;
  }
  _enabledListerners(cardGridImage,cardGridDeleteButton,cardGridLikeButton){//функция включения слушателей
    cardGridImage.addEventListener('click', () => this._imageClickHandler());// прерывание на клик по картинке
    cardGridDeleteButton.addEventListener('click', this._deleteClickHandler);//прерывание на клик по кнопке удаления 
    cardGridLikeButton.addEventListener('click', this._likeClickHandler);//прерывание на клик по кнопке лайк
  }
  addCard() { //функция добавления карточки
    this._cardElement = this._getCardElement();
    this._cardElement.querySelector(".card-grid__place").textContent = this._name;
    const cardGridImage = this._cardElement.querySelector(".card-grid__image");
    cardGridImage.src = this._link;
    cardGridImage.setAttribute('alt', `Фото '${this._name}'`);
    this._enabledListerners(cardGridImage, this._cardElement.querySelector(".card-grid__delete-button"), this._cardElement.querySelector(".card-grid__like"));
    return this._cardElement;
  }

}

