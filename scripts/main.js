const editContainer = document.querySelector(".popup_type_edit")    /* контейнер формы*/ 
const placeContainer = document.querySelector(".popup_type_place")  /* контейнер добавления карточки*/ 
const imageContainer = document.querySelector(".popup_type_image")  /* контейнер карточки*/ 
const elementsContainer = document.querySelector(".elements")       /* тут карточки */

const profileName = document.querySelector(".profile__name")                      /* имя на странице */
const profileDescription = document.querySelector(".profile__description")        /* описание на странице */

const editButton = document.querySelector(".profile__edit-button")           /* кнопка изменить, открыте формы */
const addCardButton = document.querySelector(".profile__add-card")           /* кнопка добавить карту */
const closeEditButton = editContainer.querySelector(".popup__close-form")    /* закрыть форму */
const editSubmit = editContainer.querySelector(".popup__submit")             /* сохранить изменения формы */
const closePlaceButton = placeContainer.querySelector(".place__close-form")  /* закрыть добавление карточки*/
const placeSubmit = placeContainer.querySelector(".place__submit")            /* сохранить новую карточку */
const imageClose = document.querySelector(".image__close")

const editName = editContainer.querySelector(".popup__edit_type_name")
const editDescription = editContainer.querySelector(".popup__edit_type_description")

const placeName = placeContainer.querySelector(".place__edit_type_place")  /* название новой карточки*/
const placeLink = placeContainer.querySelector(".place__edit_type_url")    /* ссылка на картинку */

const template = document.querySelector("#template__card").content /* реднер шаблонов */

const form = document.querySelector(".popup__container")  /* все формы */


const initialCards = [
  {
    name: "Река",
    link:
      "https://images.unsplash.com/photo-1611040549039-adc39e805408?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=968&q=80",
  },
  {
    name: "Заснеженный берег",
    link:
      "https://images.unsplash.com/photo-1610564823068-b7cb193950b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=966&q=80",
  },
  {
    name: "Костер",
    link:
      "https://images.unsplash.com/photo-1612676756023-0219168b193f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=346&q=80Ln4RJaA",
  },
  {
    name: "Водопад",
    link:
      "https://images.unsplash.com/photo-1508459855340-fb63ac591728?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80s://unsplash.com/photos/5-jtsfuaLBw",
  },
  {
    name: "Млечный путь",
    link:
      "https://images.unsplash.com/photo-1596348158371-d3a25ec4dcf4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=337&q=80splash.com/photos/voQDMI8XIJI",
  },
  {
    name: "Горный хребет вулкана",
    link:
      "https://images.unsplash.com/photo-1541845157-a6d2d100c931?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80Jo0Cl0",
  },
];

function openEdit(){ /* это для профиля*/
  editContainer.classList.add("popup_opened");
  editName.value = profileName.textContent
  editDescription.value = profileDescription.textContent
}

function editInfo(evt){
  evt.preventDefault();
  profileDescription.textContent = editDescription.value
  profileName.textContent = editName.value
  closePopup(editContainer);
}


function openCard(){ /* это для добавления карточки */
  placeContainer.classList.add("popup_opened")
  
}

function closePopup(container){
  container.classList.remove("popup_opened");
  form.reset()
}


function renderCards(){ /* это покажет карточки */
  initialCards.forEach(item => {
    const div = template.querySelector(".element").cloneNode(true)
    div.querySelector(".element__image").src = item.link
    div.querySelector(".element__image").alt = item.name
    div.querySelector(".element__title").textContent = item.name
    elementsContainer.append(div)
  })
}

/* для удаления */
function removeElement(ev){
  const elem = ev.target
  if(elem){
    const block = elem.parentNode
    block.parentNode.removeChild(block)
  }
}

function deleteCard(){
  const deleteButton = document.querySelectorAll(".element__delete")
  deleteButton.forEach((node) => {  
    node.removeEventListener("click", removeElement) 
    node.addEventListener("click", removeElement)
}
)}

/* для лайка */
function likeToggle(ev){
  const elem = ev.target
  if(elem){
    elem.classList.toggle("element__like-button_active")
  }
}
function like(){
  const likeButton = document.querySelectorAll(".element__like-button")
  likeButton.forEach((item) => {
    item.removeEventListener("click", likeToggle)
    item.addEventListener("click", likeToggle)
    })
}


function openImage(){  /* откроет фотографию */
  const images = document.querySelectorAll(".element__image")
  const image = imageContainer.querySelector(".image__item")
  const imageTitle = imageContainer.querySelector(".image__title")
  //console.log(images)
  images.forEach(item => {
    item.addEventListener("click", () => {
      imageContainer.classList.add("popup_opened")
      image.src = item.currentSrc
      image.alt = item.alt
      imageTitle.textContent = item.alt
    })
  })
}

function addCard(){ /* добавит карточку */
  const div = template.querySelector(".element").cloneNode(true)
  div.querySelector(".element__image").src = placeLink.value
  div.querySelector(".element__image").alt = placeName.value
  div.querySelector(".element__title").textContent = placeName.value
  elementsContainer.prepend(div);
  closePopup(placeContainer)
  openImage()
  deleteCard()
  like()
}

renderCards() 
deleteCard()
like()
openImage()
////////////////////**** Работа с формой профиля ****/////////////////////////
editButton.addEventListener("click", openEdit)
closeEditButton.addEventListener("click", () => closePopup(editContainer))
editSubmit.addEventListener("click", editInfo)

////////////////////**** Работа с формой добавления карточки ****/////////////////////////
addCardButton.addEventListener("click", openCard)
closePlaceButton.addEventListener("click", () => closePopup(placeContainer))
placeSubmit.addEventListener("click", addCard)


imageClose.addEventListener("click", () => closePopup(imageContainer))