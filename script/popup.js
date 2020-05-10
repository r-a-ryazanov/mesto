const page = document.querySelector(".page");
const profileEditButton = page.querySelector(".profile__edit-button");
const popupCancelButton = page.querySelector(".popup__cancel-button");
const popup = page.querySelector(".popup");
const profileName = page.querySelector(".profile__name");
const profileVocation = page.querySelector(".profile__vocation");
const popupInputName = page.querySelector(".popup__input_type_name");
const popupInputVocation = page.querySelector(".popup__input_type_vocation");
const popupContainer = popup.querySelector(".popup__container");
const cardGridPlace = page.querySelectorAll(".card-grid__place");
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
popupContainer.addEventListener('submit', formSubmitHandler);
