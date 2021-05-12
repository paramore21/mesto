import Popup from "./Popup.js"
export default class PopupWithSubmit extends Popup {
  constructor(popupSelector){
    super(popupSelector)
    this._button = this._container.querySelector(".delete__submit")
    
  }

  setDeleteHandler(action){
    this._deleteHandler = action
  }
  
  _submitDelete(){
    this._button.addEventListener("click", ev => {
      ev.preventDefault()
      this._deleteHandler()
    })
  }

  setEventListeners(){
    this._submitDelete()
    super.setEventListeners()
  }
}