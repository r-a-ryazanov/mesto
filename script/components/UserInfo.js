export class UserInfo{
  constructor(nameElementSelector, vocationElementSelector){
    this._nameElement = document.querySelector(nameElementSelector);
    this._vocationElement = document.querySelector(vocationElementSelector);
  }
  getUserInfo(){
    return [this._nameElement.textContent, this._vocationElement.textContent]
  }
  setUserInfo(inputData){
    this._nameElement.textContent = inputData[0];
    this._vocationElement.textContent = inputData[1];
  }
}