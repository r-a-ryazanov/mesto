import {openPopup, imagePopup,imagePopupImage, imagePopupName} from './index.js'


export class Card{
  constructor(data, templateElement){
    this.templateElement = templateElement;
    this.name = data.name;
    this.link = data.link;

  }
   _imageClickHandler() {// обработчик клика по картинке
    imagePopupImage.src = this.link;
    imagePopupName.textContent = this.name;
    imagePopupImage.setAttribute('alt', `Фото '${this.name}'`);
    openPopup(imagePopup);
  }
  
   addCard() { //Функция добавления карточки
    const cardTemplate = document.querySelector(this.templateElement).content;
    const cardElement = cardTemplate.cloneNode(true);
    const cardGridPlace = cardElement.querySelector(".card-grid__place");
    cardGridPlace.textContent = this.name;
    const cardGridImage = cardElement.querySelector(".card-grid__image");
    cardGridImage.src = this.link;
    cardGridImage.setAttribute('alt', `Фото '${this.name}'`);
    cardGridImage.addEventListener('click', () => this._imageClickHandler());// прерывание при нажатии на картинку
    const cardGridDeleteButton = cardElement.querySelector(".card-grid__delete-button");
    cardGridDeleteButton.addEventListener('click', function () {//прерывание на нажатие кнопки удаления карточки
      cardGridDeleteButton.closest(".card-grid__item").remove();
    });
    const cardGridLikeButton = cardElement.querySelector(".card-grid__like");
  cardGridLikeButton.addEventListener('click', function () {//прерывание на нажатие кнопки лайк
    cardGridLikeButton.classList.toggle('card-grid__like_active');
  });
  return cardElement;
}
}
