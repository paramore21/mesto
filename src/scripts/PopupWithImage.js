import Popup from "./Popup.js"
export default class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector)
    this._container = document.querySelector(popupSelector)
  }

  handleCardClick(link, name){
    this._image = this._container.querySelector(".image__item")
    this._imageTitle = this._container.querySelector(".image__title") 
    this._image.src = link
    this._image.alt = name
    this._imageTitle.textContent = name
    super.open() 
  }
}
