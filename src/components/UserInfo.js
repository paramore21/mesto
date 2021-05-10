export default class UserInfo {
  constructor(nameSelector, descriptionSelector, avatarSelector){
    
    this._nameSelector = document.querySelector(nameSelector)
    this._descriptionSelector = document.querySelector(descriptionSelector)
    this._avatarSelector = document.querySelector(avatarSelector)
  }

  getUserInfo(){
    this._data = {}
    this._data.name = this._nameSelector.textContent
    this._data.about = this._descriptionSelector.textContent

    return this._data
  }

  setUserAvatar(avatar){
    this._avatarSelector.style.backgroundImage = `url('${avatar}')`
  }

  setUserInfo(userInfo){
    this._nameSelector.textContent = userInfo.name,
    this._descriptionSelector.textContent = userInfo.about
    this._avatarSelector.style.backgroundImage = `url('${userInfo.avatar}')`
  }  
}