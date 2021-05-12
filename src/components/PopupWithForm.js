import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback){
    super(popupSelector)
    this._submitCallback = submitCallback
    this._form = this._container.querySelector(".popup__form") // получили форму
    this._inputList = Array.from(this._form.querySelectorAll(".popup__input")) // получили все поля ввода
  }

  setEventListeners(){
    this._container.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
    })
    super.setEventListeners()
  }

  _getInputValues(){
    this._inputValues = {} // здесь будут лежать значения из инпутов
    this._inputList.forEach(input => { 
      this._inputValues[input.name] = input.value
    })
    return this._inputValues
  }

  close(){
    this._form.reset()
    super.close()
  }
}