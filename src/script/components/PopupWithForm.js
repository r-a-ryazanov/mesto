import {Popup} from './Popup.js'
export class PopupWithForm extends Popup{
  constructor(popupSelector, formSubmitHandler){//конструктор popup с формой
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._popup.querySelector('form');

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
    this._form.reset();
  }
}