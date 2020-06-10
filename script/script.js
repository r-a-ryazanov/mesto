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
const cardTemplate = document.querySelector("#card").content;
const profileAddButton = page.querySelector(".profile__add-button");
const imagePopup = page.querySelector(".image-popup");
const imagePopupImage = imagePopup.querySelector(".image-popup__image");
const imagePopupName = imagePopup.querySelector(".image-popup__name");
const addPopup = page.querySelector(".add-popup");
const addPopupContainer = addPopup.querySelector(".popup__container");
const addPopupInputName = addPopup.querySelector("#title-input");
const addPopupInputLink = addPopup.querySelector("#link-input");
const addPopupCancelButton = addPopup.querySelector(".popup__cancel-button");
const formsList = document.querySelectorAll(".popup__container");
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
function openPopup(input) {//функция открытия всплывающего окна
  input.classList.add('popup_opened');
  addEventListener('keydown', eventKeyHandler);
  input.addEventListener('click', overlayClickHandler);

}
function closePopup(input) {//функция закрытия всплывающего окна
  input.classList.remove('popup_opened');
  removeEventListener('keydown', eventKeyHandler);
  input.removeEventListener('click', overlayClickHandler);
}
function imageClickHandler(name, link) {// обработчик клика по картинке
  imagePopupImage.src = link;
  imagePopupName.textContent = name;
  imagePopupImage.setAttribute('alt', `Фото '${name}'`);
  openPopup(imagePopup);
}

function addCard(name, link) { //Функция добавления карточки
  const cardElement = cardTemplate.cloneNode(true);
  const cardGridPlace = cardElement.querySelector(".card-grid__place");
  cardGridPlace.textContent = name;
  const cardGridImage = cardElement.querySelector(".card-grid__image");
  cardGridImage.src = link;
  cardGridImage.setAttribute('alt', `Фото '${name}'`);
  cardGridImage.addEventListener('click', () => imageClickHandler(name, link));// прерывание при нажатии на картинку
  const cardGridDeleteButton = cardElement.querySelector(".card-grid__delete-button");
  cardGridDeleteButton.addEventListener('click', function () {//прерывание на нажатие кнопки удаления карточки
    cardGridDeleteButton.closest(".card-grid__item").remove();
  });

  const cardGridLikeButton = cardElement.querySelector(".card-grid__like");
  cardGridLikeButton.addEventListener('click', function () {//прерывание на нажатие кнопки лайк
    cardGridLikeButton.classList.toggle('card-grid__like_active');
  });
  return cardElement;
}

initialCards.forEach(function (item) {//Добавление карточек из массива

  cardGrid.prepend(addCard(item.name, item.link));
});

function formAddHandler(evt) { //функция добавления карты и закрытия формы 
  evt.preventDefault();

  cardGrid.prepend(addCard(addPopupInputName.value, addPopupInputLink.value));
  closePopup(addPopup);
}

function formSubmitHandler(evt) { //функция сохранения данных и закрытия формы изменения данных
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileVocation.textContent = popupInputVocation.value;
  closePopup(popup);
}
const eventKeyHandler = (evt) => {//обработчик нажатия клавиши
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.key === "Escape") closePopup(openedPopup);
};
const overlayClickHandler = (evt) => {//обработчик клика
  closePopup(evt.target);
};
function openProfileForm() {//функция открытия формы изменения данных
  popupInputName.value = profileName.textContent;
  popupInputVocation.value = profileVocation.textContent;
  openPopup(popup);
}

imagePopup.querySelector(".popup__cancel-button").addEventListener('click', () => closePopup(imagePopup)); //прерывание при нажатии кнопки закрытия popup с картинкой
profileAddButton.addEventListener('click', () => openPopup(addPopup)); //Прерывание на нажатие кнопки добавить
addPopupCancelButton.addEventListener('click', () => closePopup(addPopup));//Прерывание на нажатие кнопки закрыть
addPopupContainer.addEventListener('submit', formAddHandler);//Прерывание на нажатие кнопки сохранить
profileEditButton.addEventListener('click', openProfileForm);  //прерывание на нажатие кнопки изменения данных
popupCancelButton.addEventListener('click',() => closePopup(popup)); //прерывание на нажатие кнопки закрытия формы изменения данных
popupContainer.addEventListener('submit', formSubmitHandler);//Прерывание на нажатие кнопки сохранит

formsList.forEach((inputElement) => {
  enableValidation({
    formSelector: `#${inputElement.id}`,
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__apply-button',
    inactiveButtonClass: 'popup__apply-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
  });