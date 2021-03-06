import Popup from "./Popup.js"
export default class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector)
    this._image = this._container.querySelector(".image__item")
    this._imageTitle = this._container.querySelector(".image__title")
  }

  open(link, name){ 
    this._image.src = link
    this._image.alt = name
    this._imageTitle.textContent = name
    super.open() 
  }
}
