export class UserInfo{
  constructor(nameElementSelector, vocationElementSelector, avatarElementSelector){
    this._nameElement = document.querySelector(nameElementSelector);
    this._vocationElement = document.querySelector(vocationElementSelector);
    this._avatarElement = document.querySelector(avatarElementSelector);
  }
  getUserInfo(){//получение данных из области профиля
    return {name: this._nameElement.textContent, about: this._vocationElement.textContent};
  }
  setUserInfo(inputData){//изменение данных в области профиля
    this._nameElement.textContent = inputData.name;
    this._vocationElement.textContent = inputData.about;
  }
  setAvatarLink(avatarLink){
    this._avatarElement.src = avatarLink;
  }
}