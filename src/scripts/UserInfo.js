export default class UserInfo {
  constructor(nameSelector, descriptionSelector){
    this._nameSelector = document.querySelector(nameSelector)
    this._descriptionSelector = document.querySelector(descriptionSelector)
  }

  getUserInfo(){
    this._data = {}
    this._data.name = this._nameSelector.textContent
    this._data.description = this._descriptionSelector.textContent

    return this._data
  }

  setUserInfo(userInfo){
    this._nameSelector.textContent = userInfo.name
    this._descriptionSelector.textContent = userInfo.description
  }
}