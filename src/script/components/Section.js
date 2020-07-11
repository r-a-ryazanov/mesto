export class Section{
  constructor({items, renderer}, containerSelector){
    this._cardElementDataList = items;
    this._renderItem = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(){//функция добавления карточек
    this._cardElementDataList.forEach(item => {
      this._renderItem(item);
    });
  }
  addItem(inputElement){//функция добавления карточки в разметку
    this._container.prepend(inputElement);
  }
}