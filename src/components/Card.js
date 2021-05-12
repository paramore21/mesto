export default class Card{
  constructor(data, userMe, className, handleCardClick, deleteOpen, deleteHandler, likeCountHandler){
    this._data = data
    this._className = className
    this._link = data.link
    this._name = data.name
    this._likeCounts = data.likes
    this._imageClass = ".popup_type_image"
    this._imageItem = ".image__item"
    this._imageTitle = ".image__title"
    this._handleCardClick = handleCardClick
    this._userId = data.owner._id
    this._userMe = userMe
    this._deleteOpen = deleteOpen
    this._deleteHandler = deleteHandler
    this._likeCountHandler = likeCountHandler  
    this._liked = false
  }

  _generateTemplate(){
    const cardElement = document.querySelector(this._className).content.querySelector(".element").cloneNode(true)
    return cardElement 
  }

  _likeToggle(){ /* для лайка */
    this._like.classList.toggle("element__like-button_active")
  }

  _handleDeleteButton(deleteElem, userId, userMe){ // если айди карточки совпадает с моим - отрисовать корзину
    if(userId === userMe){
      this._setDeleteEventListener(deleteElem)
      return deleteElem
    }
    else{
      deleteElem.classList.add("element__hidden")
    }  
  }

  _checkMyLike(){
    this._data.likes.forEach(owner => {
      if(owner._id === this._userMe){
        this._likeToggle()
        this._liked = true
      }
    })
  }

  _setDeleteEventListener(deleteElem) {
    deleteElem.addEventListener("click", (evt) => {
      this._deleteOpen() 
      evt.preventDefault()
      this._deleteHandler()
    })
  }
  
  removeCard() {
    this._element.remove();
  }
  
  updateLikes(likeCount, ev){
    this._likeToggle(ev)
    this._likeCounts.textContent = likeCount
  }

  createCard(){ /* создаем карточку */
    this._element = this._generateTemplate()
    this._like = this._element.querySelector(".element__like-button")
    this._likeCounts = this._element.querySelector(".element__like-count")
    const imageElem = this._element.querySelector(".element__image")
    const title = this._element.querySelector(".element__title")
    const deleteElem = this._element.querySelector(".element__delete")

    this._likeCounts.textContent = this._data.likes.length
    imageElem.src = this._link
    imageElem.alt = this._name
    title.textContent = this._name

    this._like.addEventListener("click", () => {
      /* если выносить строчку ниже в функцию UpdateLikes то в апи запрос приходит
        не корректный флаг, поэтому toggle я перенесла, с этим я согласна, а вот с флагом так не получится
      */
      this._liked = !this._liked
      this._likeCountHandler(this._liked, this._data, this)
    })

    this._checkMyLike()

    imageElem.addEventListener("click", () => {
      this._handleCardClick()
    })
    this._handleDeleteButton(deleteElem, this._userId, this._userMe);
    
    return this._element
  }
}