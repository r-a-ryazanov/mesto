function openPopup(inputPopup) {//функция открытия всплывающего окна
  inputPopup.classList.add('popup_opened');  
  inputPopup.addEventListener('mousedown', overlayClickHandler);
  document.addEventListener('keydown', eventKeyHandler);
}
function closePopup(inputPopup) {//функция закрытия всплывающего окна
  inputPopup.classList.remove('popup_opened');
  inputPopup.removeEventListener('mousedown', overlayClickHandler);
  document.removeEventListener('keydown', eventKeyHandler);
  
}
const eventKeyHandler = (evt) => {//обработчик нажатия клавиши
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.key === "Escape") closePopup(openedPopup);
};
const overlayClickHandler = (evt) => {//обработчик клика
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.target.classList.contains('popup')) closePopup(evt.target);
};
export {openPopup, closePopup};