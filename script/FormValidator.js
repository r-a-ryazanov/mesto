export class FormValidator{
  constructor(inputObject, formElement){
    this.formElement = formElement;
    this.inputList = Array.from(formElement.querySelectorAll(inputObject.inputSelector));
    this.buttonElement = formElement.querySelector(inputObject.submitButtonSelector);
    this.inactiveButtonClass = inputObject.inactiveButtonClass;
    this.inputErrorClass = inputObject.inputErrorClass;
    this.errorClass = inputObject.errorClass;
  }
  _showInputError(inputElement, errorMessage) {//функция отображения сообщения об ошибке
    const errorElement = this.formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.errorClass);
  }
   _hideInputError(inputElement) {//функция скрытия сообщения об ошибке
    const errorElement = this.formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this.inputErrorClass);
    errorElement.classList.remove(this.errorClass);
    errorElement.textContent = '';
  }
  _isValid(inputElement) {//функция валидации инпута 
    if (!inputElement.validity.valid) {  
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {  
      this._hideInputError(inputElement);
    }
  }
  _hasInvalidInput() {//функция валидации всех полей в форме
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  
    })
  }
  _toggleButtonState() {//функция управления активностью кнопки
    if (this._hasInvalidInput(this.inputList)) {
      this.buttonElement.classList.add(this.inactiveButtonClass);
      this.buttonElement.disabled = true;
    } else {
      this.buttonElement.classList.remove(this.inactiveButtonClass);
      this.buttonElement.disabled = false;
    }
  }
  enableValidation(){//функция включения валидации
    this._toggleButtonState(this.inputList, this.buttonElement, this.inactiveButtonClass);
    this.inputList.forEach((inputElement) => {
      this._isValid( inputElement);
      inputElement.addEventListener('input', () => {
        this._isValid( inputElement);
        this._toggleButtonState();
      });
    });  
  }
  checkValidation(){//функция проверки валидации при открытии попап
    this._toggleButtonState(this.inputList, this.buttonElement, this.inactiveButtonClass);
    this.inputList.forEach((inputElement) => {
      this._isValid( inputElement);
    });  
  }
}



