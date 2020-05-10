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
function openPopup() { //функция открытия формы изменения данных
  popupInputName.value = profileName.textContent;
  popupInputVocation.value = profileVocation.textContent;
  popup.classList.add('popup_opened');
}
function closePopup() { //функция закрытия формы изменения данных
  popup.classList.remove('popup_opened');
}
function formSubmitHandler(evt) { //функция созхранения данных и закрытия формы изменения данных
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileVocation.textContent = popupInputVocation.value;
  popup.classList.remove('popup_opened');
}
function resizeFuction() {

  if (page.clientWidth < 500) {
    cardGridPlace[0].textContent = 'Карачаево-Ч...';
  } else {
    cardGridPlace[0].textContent = 'Карачаевск';
  }
}
resizeFuction();
window.onresize = resizeFuction;
profileEditButton.addEventListener('click', openPopup);  //прерывание на нажатие кнопки изменения данных
popupCancelButton.addEventListener('click', closePopup); //прерывание на нажатие кнопки закрытия формы изменения данных
popupContainer.addEventListener('submit', formSubmitHandler);
