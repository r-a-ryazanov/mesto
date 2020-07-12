import { Card } from '../script/components/Card.js'
import { FormValidator } from '../script/components/FormValidator.js'
import { Section } from '../script/components/Section.js'
import { initialCards } from '../script/utils/initialCardsData.js'
import {  PopupWithForm } from '../script/components/PopupWithForm.js'
import { PopupWithImage} from '../script/components/PopupWithImage.js'
import { UserInfo } from '../script/components/UserInfo.js'
import './index.css';
const page = document.querySelector(".page");
const profileEditButton = page.querySelector(".profile__edit-button");
const popup = page.querySelector(".edit-popup");
const popupInputName = popup.querySelector("#name-input");
const popupInputVocation = popup.querySelector("#vocation-input");
const popupContainer = popup.querySelector(".popup__container");
const profileAddButton = page.querySelector(".profile__add-button");
const addPopup = page.querySelector(".add-popup");
const addPopupContainer = addPopup.querySelector(".popup__container");

const configObj = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__apply-button',
  inactiveButtonClass: 'popup__apply-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const userInfo = new UserInfo(".profile__name", ".profile__vocation");
const editFormValidator = new FormValidator(configObj, popupContainer);
const addFormValidator = new FormValidator(configObj, addPopupContainer);
editFormValidator.enableValidation();
addFormValidator.enableValidation();
const popupWithImage = new PopupWithImage(".image-popup", ".image-popup__image", ".image-popup__name");
popupWithImage.setEventListeners();
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#card', () => {
      popupWithImage.open(card.name, card.link);
    });
    cardList.addItem(card.getCard());
  }
}, ".card-grid");
cardList.renderItems();
const popupWithEditForm = new PopupWithForm(".edit-popup", (inputsData) => {
  userInfo.setUserInfo({name: inputsData.upInput, description: inputsData.downInput});
  popupWithEditForm.close();
});
popupWithEditForm.setEventListeners();
const popupWithAddForm = new PopupWithForm(".add-popup", (inputsData) => {
  const card = new Card({name: inputsData.upInput, link: inputsData.downInput}, '#card', () => {
    popupWithImage.open(card.name, card.link);
  });
  cardList.addItem(card.getCard());
  popupWithAddForm.close();
});
popupWithAddForm.setEventListeners();
profileAddButton.addEventListener('click', () => {
  addFormValidator.checkValidation();
  popupWithAddForm.open();
  
}); //Прерывание на нажатие кнопки добавить
profileEditButton.addEventListener('click', () => {
  const profileData = userInfo.getUserInfo();
  popupInputName.value = profileData.name;
  popupInputVocation.value = profileData.description;
  editFormValidator.checkValidation();
  popupWithEditForm.open();
});  //прерывание на нажатие кнопки изменения данных
