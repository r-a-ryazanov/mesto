export class FormValidator{
  constructor(configObject, formElement){
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(configObject.inputSelector));
    this._buttonElement = formElement.querySelector(configObject.submitButtonSelector);
    this._inactiveButtonClass = configObject.inactiveButtonClass;
    this._inputErrorClass = configObject.inputErrorClass;
    this._errorClass = configObject.errorClass;
  }
  _showInputError(inputElement, errorMessage) {//функция отображения сообщения о неправильно введенных данных
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }
  _hideInputError(inputElement) {//функция скрытия сообщения о неправильно введенных данных
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }
  _isValid(inputElement) {////функция валидации инпута 
    if (!inputElement.validity.valid) {  
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {  
      this._hideInputError(inputElement);
    }
  }
  _hasInvalidInput() {//функция валидации всех полей в форме
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  _toggleButtonState() {//функция управления активностью кнопки
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }
  enableValidation(){//функция включения валидации
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid( inputElement);
        this._toggleButtonState();
      });
    });  
  }
  checkValidation(){//фунгкция проверки валидности при открытии попап
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._isValid( inputElement);
    });  
  }
}
  