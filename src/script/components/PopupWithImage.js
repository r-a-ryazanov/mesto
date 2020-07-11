import {Popup} from './Popup.js'
export class PopupWithImage extends Popup{
  constructor(popupSelector, imageSelector, imageNameSelector){
    super(popupSelector);
    this._image = this._popup.querySelector(imageSelector);
    this._imageName = this._popup.querySelector(imageNameSelector);
  }
  open(name, link){ // функция открытия popup с картинкой
    this._imageName.textContent = name;    
    this._image.src = link;
    this._image.setAttribute('alt', `Фото '${this._imageName.textContent}'`);
    super.open();
  }
}