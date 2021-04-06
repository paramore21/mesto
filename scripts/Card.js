class Card {
  constructor(link, name, className, openPopup, closePopup){
    this._className = className
    this._link = link
    this._name = name
    this._openPopup = openPopup
    this._closePopup = closePopup 
  }

  _generateTemplate(){
    const cardElement = document.querySelector(this._className).content.querySelector(".element").cloneNode(true)
    return cardElement 
  }

  _likeToggle(ev){ /* для лайка */
    const elem = ev.target
    elem.classList.toggle("element__like-button_active")
  }

  _removeElement(ev){ /* для удаления */
    const elem = ev.target
    const block = elem.closest(".element")
    block.remove()
  }

  _openImage(link, name){  /* откроет фотографию */
    this._link = link
    this._name = name
    const imageContainer = document.querySelector(".popup_type_image")
    const image = imageContainer.querySelector(".image__item")
    const imageTitle = imageContainer.querySelector(".image__title")
    image.src = this._link
    image.alt = this._name
    imageTitle.textContent = this._name
    openPopup(imageContainer);
  }

  createCard(){ /* создаем карточку */
    this._element = this._generateTemplate()
    const like = this._element.querySelector(".element__like-button")
    const deleteElem = this._element.querySelector(".element__delete")
    const imageElem = this._element.querySelector(".element__image")
    const title = this._element.querySelector(".element__title")

    imageElem.src = this._link
    imageElem.alt = this._name
    imageElem.textContent = this._name
    title.textContent = this._name
    like.addEventListener("click", this._likeToggle)
    deleteElem.addEventListener("click", this._removeElement)

    imageElem.addEventListener("click", () => {this._openImage(this._link, this._name)})
    return this._element
  }
}
