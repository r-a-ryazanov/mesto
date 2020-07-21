export class Section{
  constructor(renderer, containerSelector){
    
    this._renderItem = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(cardElementDataList){//функция добавления карточек
    cardElementDataList.forEach(item => {
      this._renderItem(item);
    });
  }
  addItem(inputElement){//функция добавления карточки в разметку
    this._container.prepend(inputElement);
  }
}