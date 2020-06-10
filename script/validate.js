function showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {//функция отображения сообщения об ошибке
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}
function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {//функция скрытия сообщения об ошибке
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}
function isValid(formElement, inputElement, inputErrorClass, errorClass) {//функция валидации инпута 
  if (!inputElement.validity.valid) {

    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {

    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}
function hasInvalidInput(inputList) {//функция валидации всех полей в форме
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;

  })
}
function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {//функция управления активностью кнопки
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
}
const enableValidation = (inputObject) => {//функция включения валидации
  const formElement = document.querySelector(inputObject.formSelector);
  const inputList = Array.from(formElement.querySelectorAll(inputObject.inputSelector));
  const buttonElement = formElement.querySelector(inputObject.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inputObject.inactiveButtonClass);
  inputList.forEach((inputElement) => {
    isValid(formElement, inputElement, inputObject.inputErrorClass, inputObject.errorClass);
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, inputObject.inputErrorClass, inputObject.errorClass);
      toggleButtonState(inputList, buttonElement, inputObject.inactiveButtonClass);
    });
  });

}
