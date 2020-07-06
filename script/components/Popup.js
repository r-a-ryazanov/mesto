class Popup{
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
    this._cancelButton = this._popup.querySelector('.popup__cancel-button');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClickClose = this._handleOverlayClickClose.bind(this);
  }
  _handleEscClose(evt){
    if (evt.key === "Escape") this.close();
  }
  _handleOverlayClickClose(evt)
  {
    if (evt.target.classList.contains('popup')) this.close();
  }
  setEventListeners(){
    this._cancelButton.addEventListener('click', () => this.close());
  }
  open(){
    this._popup.classList.add('popup_opened');  
    this._popup.addEventListener('mousedown',this._handleOverlayClickClose);
    document.addEventListener('keydown', this._handleEscClose);
  }
  close(){
    this._popup.classList.remove('popup_opened');  
    this._popup.removeEventListener('mousedown', this._handleOverlayClickClose);
    document.removeEventListener('keydown', this._handleEscClose);
  }
}
class PopupWithImage extends Popup{
  open(name, link){   
    this._popup.querySelector('.image-popup__name').textContent = name; 
    const image = this._popup.querySelector('.image-popup__image');
    image.src = link;
    image.setAttribute('alt', `Фото '${this._name}'`);
    super.open();
  }
}
class PopupWithForm extends Popup{
  constructor(popupSelector, formSubmitHandler){
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;

  }
  _getInputValues(){
    const inputList = Array.from(this._popup.querySelectorAll('input'));
    const inputsData = [];
    inputList.forEach((item) =>{
      inputsData.push(item.value);
    });
    return inputsData;
  }
  setEventListeners(){
    super.setEventListeners();    
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitHandler(this._getInputValues());
    } );

  }
  close(){
    super.close();
    const inputList = Array.from(this._popup.querySelectorAll('input'));
    inputList.forEach((item) =>{
      item.value = '';
    });
  }
}
export {PopupWithForm, PopupWithImage};