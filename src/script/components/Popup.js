export class Popup{
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
    this._cancelButton = this._popup.querySelector('.popup__cancel-button');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClickClose = this._handleOverlayClickClose.bind(this);
  }
  _handleEscClose(evt){//обработчик нажатия на Esc
    if (evt.key === "Escape") this.close();
  }
  _handleOverlayClickClose(evt){ //обработчик клика по оверлэю
    if (evt.target.classList.contains('popup')) this.close();
  }
  setEventListeners(){//функция установки слушателей
    this._cancelButton.addEventListener('click', () => this.close());
  }
  open(){//функция открытия popup
    this._popup.classList.add('popup_opened');  
    this._popup.addEventListener('mousedown',this._handleOverlayClickClose);
    document.addEventListener('keydown', this._handleEscClose);
  }
  close(){//функция закрытия popup
    this._popup.classList.remove('popup_opened');  
    this._popup.removeEventListener('mousedown', this._handleOverlayClickClose);
    document.removeEventListener('keydown', this._handleEscClose);
  }
}
