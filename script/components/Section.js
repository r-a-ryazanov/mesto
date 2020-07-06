export class Section{
  constructor({items, renderer}, containerSelector){
    this._cardElementDataList = items;
    this._renderItem = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(){
    this._cardElementDataList.forEach(item => {
      this._renderItem(item);
    });
  }
  addItem(InputEvent){
    this._container.prepend(InputEvent);
  }
}