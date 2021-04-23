export default class Popup {
  constructor(popupSelector){
    this._container = document.querySelector(popupSelector);
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
    document.addEventListener("keydown", (evt) => {this._handleEscClose(evt)});
  }
  
  close(){ /* закрываем контейнер */
    document.removeEventListener("keydown", (evt) => {this._handleEscClose(evt)})
    this._container.classList.remove("popup_opened");
  }
}