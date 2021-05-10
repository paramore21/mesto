import Popup from "./Popup.js"
export default class PopupWithSubmit extends Popup {
  constructor(popupSelector){
    super(popupSelector)
    this._container = document.querySelector(popupSelector)
    this._button = this._container.querySelector(".delete__submit")
    
  }

  deleteHandler(action){
    this._deleteHandler = action
  }
  
  _submitDelete(){
    this._button.addEventListener("click", ev => {
      ev.preventDefault()
      this._deleteHandler()
    })
  }
  
  open(){
    this._container.classList.add("popup_opened");
    this._submitDelete()
    super.open() 
  }
}