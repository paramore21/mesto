export default class UserInfo {
  constructor(nameSelector, descriptionSelector, avatarSelector){
    
    this._name = document.querySelector(nameSelector)
    this._description = document.querySelector(descriptionSelector)
    this._avatar = document.querySelector(avatarSelector)
  }

  getUserInfo(){
    this._data = {}
    this._data.name = this._name.textContent
    this._data.about = this._description.textContent

    return this._data
  }

  setUserAvatar(avatar){
    this._avatar.style.backgroundImage = `url('${avatar}')`
  }

  setUserInfo(userInfo){
    this._name.textContent = userInfo.name,
    this._description.textContent = userInfo.about
    this.setUserAvatar(userInfo.avatar)
  }  
}