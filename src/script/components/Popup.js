class Popup{
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
class PopupWithImage extends Popup{
  open(name, link){ // функция открытия popup с картинкой
    this._popup.querySelector('.image-popup__name').textContent = name; 
    const image = this._popup.querySelector('.image-popup__image');
    image.src = link;
    image.setAttribute('alt', `Фото '${this._name}'`);
    super.open();
  }
}
class PopupWithForm extends Popup{
  constructor(popupSelector, formSubmitHandler){//конструктор popup с формой
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;

  }
  _getInputValues(){//функция получения данный из инпутов
    const inputList = Array.from(this._popup.querySelectorAll('input'));
    const inputsData = [];
    inputList.forEach((item) =>{
      inputsData.push(item.value);
    });
    return inputsData;
  }
  setEventListeners(){////функция установки слушателей для popup с формой
    super.setEventListeners();    
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitHandler(this._getInputValues());
    } );

  }
  close(){//функция закрытия popup с формой
    super.close();
    const inputList = Array.from(this._popup.querySelectorAll('input'));
    inputList.forEach((item) =>{
      item.value = '';
    });
  }
}
export {PopupWithForm, PopupWithImage};