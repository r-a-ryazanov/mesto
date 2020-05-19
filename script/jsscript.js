const page = document.querySelector(".page");
const profileEditButton = page.querySelector(".profile__edit-button");
const popupCancelButton = page.querySelector(".popup__cancel-button");
const popup = page.querySelector(".popup");
const profileName = page.querySelector(".profile__name");
const profileVocation = page.querySelector(".profile__vocation");
const popupInputName = page.querySelector(".popup__input_type_name");
const popupInputVocation = page.querySelector(".popup__input_type_vocation");
const popupContainer = popup.querySelector(".popup__container");
const cardGrid = page.querySelector(".card-grid");
const cardTemplate = document.querySelector("#card").content;
const profileAddButton = page.querySelector(".profile__add-button");
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
function addCard(name, link){ //Функция добавления карточки
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".card-grid__place").textContent = name;
  cardElement.querySelector(".card-grid__image").src = link; 
  const cardGridDeleteButton = cardElement.querySelector(".card-grid__delete-button");
  cardGridDeleteButton.addEventListener('click', function () {
    cardGridDeleteButton.closest(".card-grid__item").remove();
  });//прерывание на нажатие кнопки удаления карточки
  
  const cardGridLikeButton = cardElement.querySelector(".card-grid__like");
  cardGridLikeButton.addEventListener('click',function(){
    cardGridLikeButton.classList.toggle('card-grid__like_active');
  });
  cardGrid.append(cardElement);
}
initialCards.forEach(function (item) {//Добавление карточек из массива
  addCard(item.name, item.link);
});
function openClosePopup() { //функция открытия/закрытия формы изменения данных
  if(popup.classList.contains('popup_opened')){
    popup.classList.remove('popup_opened');
  }else{
    popupInputName.value = profileName.textContent;
    popupInputVocation.value = profileVocation.textContent;
    popup.classList.add('popup_opened');
  }   
}
function formSubmitHandler(evt) { //функция созхранения данных и закрытия формы изменения данных
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileVocation.textContent = popupInputVocation.value;
  openClosePopup();
}
profileEditButton.addEventListener('click', openClosePopup);  //прерывание на нажатие кнопки изменения данных
popupCancelButton.addEventListener('click', openClosePopup); //прерывание на нажатие кнопки закрытия формы изменения данных
popupContainer.addEventListener('submit', formSubmitHandler);//Прерывание на нажатие кнопки сохранить

