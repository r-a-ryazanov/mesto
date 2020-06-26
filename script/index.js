import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'  
import {initialCards} from './initialCardsData.js'
import {openPopup, closePopup} from './utils.js'
const page = document.querySelector(".page");
const profileEditButton = page.querySelector(".profile__edit-button");
const popupCancelButton = page.querySelector(".popup__cancel-button");
const popup = page.querySelector(".edit-popup");
const profileName = page.querySelector(".profile__name");
const profileVocation = page.querySelector(".profile__vocation");
const popupInputName = popup.querySelector("#name-input");
const popupInputVocation = popup.querySelector("#vocation-input");
const popupContainer = popup.querySelector(".popup__container");
const cardGrid = page.querySelector(".card-grid");
const profileAddButton = page.querySelector(".profile__add-button");
const imagePopup = page.querySelector(".image-popup");
const imagePopupImage = imagePopup.querySelector(".image-popup__image");
const imagePopupName = imagePopup.querySelector(".image-popup__name");
const addPopup = page.querySelector(".add-popup");
const addPopupContainer = addPopup.querySelector(".popup__container");
const addPopupInputName = addPopup.querySelector("#title-input");
const addPopupInputLink = addPopup.querySelector("#link-input");
const addPopupCancelButton = addPopup.querySelector(".popup__cancel-button");

const configObj = {
  inputSelector: '.popup__input', 
  submitButtonSelector: '.popup__apply-button',
  inactiveButtonClass: 'popup__apply-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
const editFormValidator = new FormValidator(configObj, popupContainer);
const addFormValidator = new FormValidator(configObj, addPopupContainer);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

initialCards.forEach(function (item) {//Добавление карточек из массива
  const card = new Card(item, '#card');
  cardGrid.prepend(card.getCard());
});
function formAddHandler(evt) { //функция добавления карты и закрытия формы 
  evt.preventDefault();
  const data = {};
  data.name = addPopupInputName.value;
  data.link = addPopupInputLink.value;
  const card = new Card(data, '#card');
  cardGrid.prepend(card.getCard());
  closePopup(addPopup);
}
function formSubmitHandler(evt) { //функция сохранения данных и закрытия формы изменения данных
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileVocation.textContent = popupInputVocation.value;
  closePopup(popup);
}

function openEditForm() {//функция открытия формы изменения данных
  popupInputName.value = profileName.textContent;
  popupInputVocation.value = profileVocation.textContent;
  editFormValidator.checkValidation();
  openPopup(popup);
}
function openAddForm() {//функция открытия формы добавления карточки
  addPopupInputName.value = '';
  addPopupInputLink.value = '';
  addFormValidator.checkValidation();
  openPopup(addPopup);
}
imagePopup.querySelector(".popup__cancel-button").addEventListener('click', () => closePopup(imagePopup)); //прерывание при нажатии кнопки закрытия popup с картинкой
profileAddButton.addEventListener('click', openAddForm); //Прерывание на нажатие кнопки добавить
addPopupCancelButton.addEventListener('click', () => closePopup(addPopup));//Прерывание на нажатие кнопки закрыть
addPopupContainer.addEventListener('submit', formAddHandler);//Прерывание на нажатие кнопки сохранить
profileEditButton.addEventListener('click', openEditForm);  //прерывание на нажатие кнопки изменения данных
popupCancelButton.addEventListener('click',() => closePopup(popup)); //прерывание на нажатие кнопки закрытия формы изменения данных
popupContainer.addEventListener('submit', formSubmitHandler);//Прерывание на нажатие кнопки сохранит
export { openPopup, imagePopup, imagePopupImage, imagePopupName };