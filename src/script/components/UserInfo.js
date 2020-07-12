export class UserInfo{
  constructor(nameElementSelector, vocationElementSelector){
    this._nameElement = document.querySelector(nameElementSelector);
    this._vocationElement = document.querySelector(vocationElementSelector);
  }
  getUserInfo(){//получение данных из области профиля
    return {name: this._nameElement.textContent, description: this._vocationElement.textContent};
  }
  setUserInfo(inputData){//изменение данных в области профиля
    this._nameElement.textContent = inputData.name;
    this._vocationElement.textContent = inputData.description;
  }
}