export default class Popup {
  constructor(popupSelector){
    this._container = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  setEventListeners(){
    this._container.querySelector(".popup__close-form").addEventListener("click", () => this.close())
    this._container.addEventListener("click", (evt) => {
      if(evt.target === evt.currentTarget) this.close()
    })
  }

  _handleEscClose = (evt) => {
    if(evt.key === "Escape") this.close()
  }

  open(){ /* открываем контейнер */
    this._container.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  
  close(){ /* закрываем контейнер */
    document.removeEventListener("keydown", this._handleEscClose)
    this._container.classList.remove("popup_opened");
  }
}