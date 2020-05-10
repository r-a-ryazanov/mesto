let page = document.querySelector(".page");
const profileEditButton = page.querySelector(".profile__edit-button");
const popupCancelButton = page.querySelector(".popup__cancel-button");
let popup = page.querySelector(".popup");
let profileName = page.querySelector(".profile__name");
let profileVocation = page.querySelector(".profile__vocation");
let popupInputName = page.querySelector(".popup__input_type_name");
let popupInputVocation = page.querySelector(".popup__input_type_vocation");
let popupContainer = popup.querySelector(".popup__container");
let cardGridPlace = page.querySelectorAll(".card-grid__place");
function openPopup() {
  popupInputName.value = profileName.textContent;
  popupInputVocation.value = profileVocation.textContent;
  popup.classList.add('popup_opened');
}
function closePopup() {
  popup.classList.remove('popup_opened');
}
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileVocation.textContent = popupInputVocation.value;
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
profileEditButton.addEventListener('click', openPopup);
popupCancelButton.addEventListener('click', closePopup);
popupContainer.addEventListener('submit', formSubmitHandler);
