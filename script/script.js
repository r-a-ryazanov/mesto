const page = document.querySelector(".page");
const profileEditButton = page.querySelector(".profile__edit-button");
const popupCancelButton = page.querySelector(".popup__cancel-button");
const popup = page.querySelector(".popup");
const profileName = page.querySelector(".profile__name");
const profileVocation = page.querySelector(".profile__vocation");
const popupInputName = popup.querySelector("#name-input");
const popupInputVocation = popup.querySelector("#vocation-input");
const popupContainer = popup.querySelector(".popup__container");
const cardGrid = page.querySelector(".card-grid");
const cardTemplate = document.querySelector("#card").content;
const profileAddButton = page.querySelector(".profile__add-button");
const imagePopup = page.querySelector(".image-popup");
const addPopup = page.querySelector(".add-popup");
const addPopupContainer = addPopup.querySelector(".popup__container");
const addPopupInputName = addPopup.querySelector("#title-input");
const addPopupInputLink = addPopup.querySelector("#link-input");
const addPopupCancelButton = addPopup.querySelector(".popup__cancel-button");
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


function openClosePopup(input) { //функция открытия/закрытия popup

  if (input === popup) {
    if (input.classList.contains('popup_opened')) {
      input.classList.remove('popup_opened');
      removeEventListener('keydown', eventKeyHandler);
    } else {
      popupInputName.value = profileName.textContent;
      popupInputVocation.value = profileVocation.textContent;
      input.classList.add('popup_opened');
      enableValidation({
        formSelector: '.popup',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__apply-button',
        inactiveButtonClass: 'popup__apply-button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
      });
      addEventListener('keydown', eventKeyHandler);
    }
  } else {
    if (input === imagePopup) {
      if (input.classList.contains('popup_opened')) {
        input.classList.remove('popup_opened');
        removeEventListener('keydown', eventKeyHandler);
      } else {
        input.classList.add('popup_opened');

        addEventListener('keydown', eventKeyHandler);
      }
    }  else {
    if (input === addPopup) {
      if (input.classList.contains('popup_opened')) {
        input.classList.remove('popup_opened');
        removeEventListener('keydown', eventKeyHandler);
      } else {
        input.classList.add('popup_opened');
        enableValidation({
          formSelector: '.add-popup',
          inputSelector: '.popup__input',
          submitButtonSelector: '.popup__apply-button',
          inactiveButtonClass: 'popup__apply-button_disabled',
          inputErrorClass: 'popup__input_type_error',
          errorClass: 'popup__error_visible'
        });
        addEventListener('keydown', eventKeyHandler);
      }
    }
  }
}
}

function addCard(name, link) { //Функция добавления карточки
  const cardElement = cardTemplate.cloneNode(true);
  const cardGridPlace = cardElement.querySelector(".card-grid__place");
  cardGridPlace.textContent = name;
  const cardGridImage = cardElement.querySelector(".card-grid__image");
  cardGridImage.src = link;
  cardGridImage.setAttribute('alt', name);
  cardGridImage.addEventListener('click', function () {//Прерывание на нажатие картинки
    imagePopup.querySelector(".image-popup__image").src = cardGridImage.src;
    imagePopup.querySelector(".image-popup__name").textContent = cardGridPlace.textContent;
    openClosePopup(imagePopup);
  });
  const cardGridDeleteButton = cardElement.querySelector(".card-grid__delete-button");
  cardGridDeleteButton.addEventListener('click', function () {//прерывание на нажатие кнопки удаления карточки
    cardGridDeleteButton.closest(".card-grid__item").remove();
  });

  const cardGridLikeButton = cardElement.querySelector(".card-grid__like");
  cardGridLikeButton.addEventListener('click', function () {//прерывание на нажатие кнопки лайк
    cardGridLikeButton.classList.toggle('card-grid__like_active');
  });
  cardGrid.prepend(cardElement);
}

initialCards.forEach(function (item) {//Добавление карточек из массива
  addCard(item.name, item.link);
});

function formAddHandler(evt) { //функция добавления карты и закрытия формы 
  evt.preventDefault();
  addCard(addPopupInputName.value, addPopupInputLink.value);
  openClosePopup(addPopup);
}

function formSubmitHandler(evt) { //функция созхранения данных и закрытия формы изменения данных
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileVocation.textContent = popupInputVocation.value;
  openClosePopup(popup);
}
const eventKeyHandler = (evt) => {
  if (evt.key === 'Escape') {
    if (popup.classList.contains('popup_opened')) {
      openClosePopup(popup);
    } else {
      if (addPopup.classList.contains('popup_opened')) {
        openClosePopup(addPopup);
      } else {
        if (imagePopup.classList.contains('popup_opened')) openClosePopup(imagePopup);
      }
    }
  }
};

imagePopup.querySelector(".popup__cancel-button").addEventListener('click', function () {
  openClosePopup(imagePopup);
}); //прерывание при нажатии кнопки закрытия popup с картинкой
imagePopup.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('image-popup')) openClosePopup(imagePopup);
});//прерывание при клике на оверлей popup с картинкой
profileAddButton.addEventListener('click', function () {
  openClosePopup(addPopup);
}); //Прерывание на нажатие кнопки добавить
addPopupCancelButton.addEventListener('click', function () {
  openClosePopup(addPopup);
});//Прерывание на нажатие кнопки закрыть*/
addPopup.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('add-popup')) openClosePopup(addPopup);
});//прерывание при клике на оверлей popup добавления карточки
addPopupContainer.addEventListener('submit', formAddHandler);//Прерывание на нажатие кнопки сохранить
profileEditButton.addEventListener('click', function () {
  openClosePopup(popup);
});  //прерывание на нажатие кнопки изменения данных
popupCancelButton.addEventListener('click', function () {
  openClosePopup(popup);
}); //прерывание на нажатие кнопки закрытия формы изменения данных
popup.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('popup')) openClosePopup(popup);
});//прерывание при клике на оверлей popup 
popupContainer.addEventListener('submit', formSubmitHandler);//Прерывание на нажатие кнопки сохранит