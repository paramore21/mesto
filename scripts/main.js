const editContainer = document.querySelector(".popup_type_edit")    /* контейнер формы*/ 
const placeContainer = document.querySelector(".popup_type_place")  /* контейнер добавления карточки*/ 
const imageContainer = document.querySelector(".popup_type_image")  /* контейнер карточки*/ 
const elementsContainer = document.querySelector(".elements")       /* тут карточки */

const profileName = document.querySelector(".profile__name")                      /* имя на странице */
const profileDescription = document.querySelector(".profile__description")        /* описание на странице */

const editButton = document.querySelector(".profile__edit-button")           /* кнопка изменить, открыте формы */
const addCardButton = document.querySelector(".profile__add-card")           /* кнопка добавить карту */
const closeEditButton = editContainer.querySelector(".popup__close-form")    /* закрыть форму */
const closePlaceButton = placeContainer.querySelector(".place__close-form")  /* закрыть добавление карточки*/
const placeSubmit = placeContainer.querySelector(".place__submit")            /* сохранить новую карточку */
const imageClose = document.querySelector(".image__close")

const editName = editContainer.querySelector(".popup__edit_type_name")
const editDescription = editContainer.querySelector(".popup__edit_type_description")

const placeName = placeContainer.querySelector(".place__edit_type_place")  /* название новой карточки*/
const placeLink = placeContainer.querySelector(".place__edit_type_url")    /* ссылка на картинку */

const template = document.querySelector("#template__card").content /* рендер шаблонов */

const profileForm = document.forms.profile  /* форма профиля */
const placeForm = document.forms.add_place  /* форма добавления места */
  
const image = imageContainer.querySelector(".image__item")
const imageTitle = imageContainer.querySelector(".image__title")

/* Здравствуйте
  очень попрошу Вас проверить код на наличие костылей и вернуть работу если такие найдутся.
*/
 

/* убираем старые ошибки валидации */
const removeSpanError = () => {
  const input = Array.from(document.querySelectorAll(".popup__input_type_error"))
  const error = Array.from(document.querySelectorAll(".popup__error_type_active"))

  input.forEach(elem => elem.classList.remove("popup__input_type_error"))
  error.forEach(elem => elem.classList.remove("popup__error_type_active"))
}

function openPopup(container){ /* открываем контейнер */
  removeSpanError()
  container.classList.add("popup_opened");
}

const myEscape = (container, evt) => {
  if(evt.key === "Escape")
    closePopup(container)
}

/* закрытие по ESC */
const setEscListener = (container) => {
  document.addEventListener("keydown", (evt) => myEscape(container, evt))
}

const removeEscListener = (container) => {
  document.removeEventListener("keydown", (evt) => myEscape(container, evt))
}

   /* закрытие попап */
function closePopup(container){
  removeEscListener(container)
  container.classList.remove("popup_opened");
}

const closeByOverlay = (container) => {
  container.addEventListener("click", function(evt){
    if(evt.target === evt.currentTarget) {
      closePopup(container)
    }
  })
}

function editInfo(){
  setEscListener(editContainer);
  closeByOverlay(editContainer);
  editDescription.value = profileDescription.textContent
  editName.value = profileName.textContent
  enableValidation(validationObject)
  openPopup(editContainer);
}

function saveInformation(evt){
  evt.preventDefault();
  profileDescription.textContent = editDescription.value
  profileName.textContent = editName.value
  closePopup(editContainer);
}

function createCard(link, name){ /* создаем карточку */
  const div = template.querySelector(".element").cloneNode(true)
  const imageElem = div.querySelector(".element__image")
  const textElem = div.querySelector(".element__title")
  const like = div.querySelector(".element__like-button")
  const deleteElem = div.querySelector(".element__delete")
  
  imageElem.src = link
  imageElem.alt = name
  textElem.textContent = name
  
  like.addEventListener("click", likeToggle)
  deleteElem.addEventListener("click", removeElement)
  imageElem.addEventListener("click", () => openImage(name, link))
  return div
}

function renderCards(){ /* это покажет карточки */
  initialCards.forEach(item => {
    elementsContainer.append(createCard(item.link, item.name))
  })
}

function removeElement(ev){ /* для удаления */
  const elem = ev.target
  const block = elem.closest(".element")
  block.remove()
}

function likeToggle(ev){ /* для лайка */
  const elem = ev.target
  elem.classList.toggle("element__like-button_active")
}

function openImage(name, link){  /* откроет фотографию */
  image.src = link
  image.alt = name
  imageTitle.textContent = name
  setEscListener(imageContainer)
  closeByOverlay(imageContainer)
  openPopup(imageContainer);
}

function addCard(evt){ /* добавит карточку */
  evt.preventDefault();
  elementsContainer.prepend(createCard(placeLink.value, placeName.value));
  closePopup(placeContainer); 
}

renderCards() 


////////////////////**** Работа с формой профиля ****/////////////////////////
editButton.addEventListener("click", editInfo)
closeEditButton.addEventListener("click", () => closePopup(editContainer))
profileForm.addEventListener("submit", saveInformation)

////////////////////**** Работа с формой добавления карточки ****/////////////////////////
addCardButton.addEventListener("click", () =>  {
  placeForm.reset();
  enableValidation(validationObject)
  openPopup(placeContainer)
  setEscListener(placeContainer)
  closeByOverlay(placeContainer)
})

closePlaceButton.addEventListener("click", () => closePopup(placeContainer))
placeForm.addEventListener("submit", addCard)
imageClose.addEventListener("click", () => closePopup(imageContainer))
