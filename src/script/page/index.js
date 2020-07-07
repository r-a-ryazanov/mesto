import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import { Section } from '../components/Section.js'
import { initialCards } from '../utils/initialCardsData.js'
import { PopupWithImage, PopupWithForm } from '../components/Popup.js'
import { UserInfo } from '../components/UserInfo.js'
import '../../pages/index.css';
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
const popupWithImage = new PopupWithImage(".image-popup");
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
  userInfo.setUserInfo(inputsData);
  popupWithEditForm.close();
});
popupWithEditForm.setEventListeners();
const popupWithAddForm = new PopupWithForm(".add-popup", (inputsData) => {
  const card = new Card(inputsData, '#card');
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
  popupInputName.value = profileData[0];
  popupInputVocation.value = profileData[1];
  editFormValidator.checkValidation();
  popupWithEditForm.open();
});  //прерывание на нажатие кнопки изменения данных
