import { Card } from '../script/components/Card.js'
import { FormValidator } from '../script/components/FormValidator.js'
import { Section } from '../script/components/Section.js'
import { PopupWithForm } from '../script/components/PopupWithForm.js'
import { PopupWithImage } from '../script/components/PopupWithImage.js'
import { UserInfo } from '../script/components/UserInfo.js'
import { PopupWithConfirmation } from '../script/components/PopupWithConfirmation.js'
import { Api } from '../script/components/Api.js'
import './index.css';
const page = document.querySelector(".page");
const profileEditButton = page.querySelector(".profile__edit-button");
const profileAvatar = page.querySelector(".profile__avatar");
const popup = page.querySelector(".edit-popup");
const popupApplyButton = popup.querySelector(".popup__apply-button");
const popupInputName = popup.querySelector("#name-input");
const popupInputVocation = popup.querySelector("#vocation-input");
const popupContainer = popup.querySelector(".popup__container");
const profileAddButton = page.querySelector(".profile__add-button");
const addPopup = page.querySelector(".add-popup");
const addPopupApplyButton = addPopup.querySelector(".popup__apply-button");
const addPopupContainer = addPopup.querySelector(".popup__container");
const updatePopupApplyButton = page.querySelector(".update-popup").querySelector(".popup__apply-button");
//--------Создание экземпляра класса Api
const api = new Api({

  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
  headers: {
    authorization: '0dcb61a0-e155-4c98-8825-cdfb2e75e352',
    'Content-Type': 'application/json'
  }
});
 function rendererCard (item) {
  const card = new Card(item, '#card', () => {
    popupWithImage.open(card.name, card.link);
  }, (cardElement) => {
    popupWithConfirmation.open(cardElement);
  }, (cardElement, isLiked) => {
    if (isLiked) {
      api.disLikeCard(cardElement.id, (data) => {
        cardElement._cardElement.querySelector('.card-grid__like-count').textContent = data.likes.length;
        cardElement._cardElement.querySelector('.card-grid__like').classList.toggle('card-grid__like_active');
      });
    } else {
      api.likeCard(cardElement.id, (data) => {
        cardElement._cardElement.querySelector('.card-grid__like-count').textContent = data.likes.length;
        cardElement._cardElement.querySelector('.card-grid__like').classList.toggle('card-grid__like_active');
      });
    }
  });
  return card;
  
  
}

let cardList = {};

//-------Получение карточек с сервера
api.getInitialCards((cardArray) => {
  //-------Создание экземпляра класса секция
  cardList = new Section({
    items: cardArray,
    renderer: (item) => {
      const card = rendererCard(item);
      cardList.addItem(card.getCard());
      card._cardElement.querySelector('.card-grid__delete-button').classList.add('card-grid__delete-button_disable');
    }
  }, ".card-grid");
  cardList.renderItems();

});
//----------Конфигурационный объект для валидации
const configObj = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__apply-button',
  inactiveButtonClass: 'popup__apply-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
//--------Создание экземпляра класса всплывающего окна подтверждения
const popupWithConfirmation = new PopupWithConfirmation(".confirm-popup", (cardElement) => {
  api.deleteCard(cardElement.id, () => {
    cardElement._cardElement.remove();
    cardElement._cardElement = null;
  })

});
popupWithConfirmation.setEventListeners();
//--------Создание экземпляра класса информации о пользователе
const userInfo = new UserInfo(".profile__name", ".profile__vocation", ".profile__avatar");
//-------Получение данных о пользователе с сервера 
api.getUserInfo((data) => {
  userInfo.setUserInfo(data);
  userInfo.setAvatarLink(data.avatar);

});
//--------Создание экземпляра класса валидации формы изменения данных
const editFormValidator = new FormValidator(configObj, popupContainer);
editFormValidator.enableValidation();
//--------Создание экземпляра класса валидации формы добавления карточки
const addFormValidator = new FormValidator(configObj, addPopupContainer);
addFormValidator.enableValidation();
//--------Создание экземпляра класса валидации формы обновления фото пользователя
const updateFormValidator = new FormValidator(configObj, page.querySelector('.update-popup').querySelector(".popup__container"));
updateFormValidator.enableValidation();
//--------Создание экземпляра класса всплывающего окна с картинкой
const popupWithImage = new PopupWithImage(".image-popup", ".image-popup__image", ".image-popup__name");
popupWithImage.setEventListeners();
//--------Создание экземпляра класса всплывающего окна изменения данных пользователя
const popupWithEditForm = new PopupWithForm(".edit-popup", (inputsData) => {
  api.updateUserInfo(inputsData, (data) => {
    userInfo.setUserInfo(data);
  }, (isLoading) => {
    if (isLoading) {
      popupApplyButton.innerHTML = 'Сохранение...';
    } else {
      popupApplyButton.innerHTML = 'Сохранить';
      popupWithEditForm.close();
    }
  });
});
popupWithEditForm.setEventListeners();
//--------Создание экземпляра класса всплывающего окна добавления карточки
const popupWithAddForm = new PopupWithForm(".add-popup", (inputsData) => {
  api.addCard(inputsData, (item) => {
    const card = rendererCard(item);
    cardList.addItem(card.getCard());
  }, (isLoading) => {
    if (isLoading) {
      addPopupApplyButton.innerHTML = "Создание...";
    } else {
      addPopupApplyButton.innerHTML = "Создать";
      popupWithAddForm.close();
    }
  })
});
popupWithAddForm.setEventListeners();
//--------Создание экземпляра класса всплывающего окна обновления фото пользователя
const popupWithUpdateForm = new PopupWithForm(".update-popup", (inputsData) => {

  api.updateUserAvatar(inputsData.link, (data) => {
    userInfo.setAvatarLink(data.avatar);

  }, (isLoading) => {
    if (isLoading) {
      updatePopupApplyButton.innerHTML = 'Сохранение...';
    } else {
      updatePopupApplyButton.innerHTML = 'Сохранить';
      popupWithUpdateForm.close();
    }
  });

});
popupWithUpdateForm.setEventListeners();
//-------Добавление слушателя на нажатие по фото пользователя
page.querySelector('.profile__avatar-place').addEventListener('click', () => {
  updateFormValidator.checkValidation();
  popupWithUpdateForm.open()
});
//-------Добавление слушателя на нажатие по кнопке добавления карточки
profileAddButton.addEventListener('click', () => {
  addFormValidator.checkValidation();
  popupWithAddForm.open();

});
//-------Добавление слушателя на нажатие по кнопке изменения данных пользователя
profileEditButton.addEventListener('click', () => {
  const profileData = userInfo.getUserInfo();
  popupInputName.value = profileData.name;
  popupInputVocation.value = profileData.about;
  editFormValidator.checkValidation();
  popupWithEditForm.open();
});
