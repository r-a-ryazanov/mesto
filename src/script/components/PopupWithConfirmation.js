import {Popup} from './Popup.js'
export class PopupWithConfirmation extends Popup{
  constructor(popupSelector, formSubmitHandler){//конструктор popup с формой
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;

  }
  setEventListeners(){////функция установки слушателей для popup с формой
    super.setEventListeners();    
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitHandler(this._cardElement);
      this.close();
    } );
  }
  open(cardElement){
    super.open();
    this._cardElement = cardElement;
  }
  
}