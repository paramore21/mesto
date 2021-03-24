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

const template = document.querySelector("#template__card").content /* рендер шаблонов */

const profileForm = document.forms.profile  /* форма профиля */
const placeForm = document.forms.add_place  /* форма добавления места */
const imageForm = document.querySelector(".image__container_type_image")  /* попап с картинкой на весь экран */
  
function closeByEsc()

function openPopup(container){ /* открыли */
  container.classList.add("popup_opened");
  closeByEsc(container)
}

const closeByEsc = (container) => document.addEventListener("keydown", function(evt){
  if(evt.key === "Escape"){
    closePopup(container)
  }
})

const removeByEsc = (container) => document.removeEventListener("keydown", )

function closePopup(container){ /* закрыли */
  container.classList.remove("popup_opened");
}


function editInfo(){
  openPopup(editContainer);
  editDescription.value = profileDescription.textContent
  editName.value = profileName.textContent
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
  if(elem){
    const block = elem.closest(".element")
    block.remove()
  }
}


function likeToggle(ev){ /* для лайка */
  const elem = ev.target
  if(elem){
    elem.classList.toggle("element__like-button_active")
  }
}

function openImage(name, link){  /* откроет фотографию */
  const image = imageContainer.querySelector(".image__item")
  const imageTitle = imageContainer.querySelector(".image__title")

  image.src = link
  image.alt = name
  imageTitle.textContent = name
  
  openPopup(imageContainer);
}

function addCard(evt){ /* добавит карточку */
  evt.preventDefault();
  elementsContainer.prepend(createCard(placeLink.value, placeName.value));
  placeForm.reset();
}

renderCards() 


////////////////////**** Работа с формой профиля ****/////////////////////////
editButton.addEventListener("click", editInfo)
closeEditButton.addEventListener("click", () => closePopup(editContainer))
profileForm.addEventListener("submit", saveInformation)

////////////////////**** Работа с формой добавления карточки ****/////////////////////////
addCardButton.addEventListener("click", () =>  openPopup(placeContainer))
closePlaceButton.addEventListener("click", () => closePopup(placeContainer))
placeForm.addEventListener("submit", addCard)

imageClose.addEventListener("click", () => closePopup(imageContainer))

/* Валидация
  Функции
  1) проверка поля checkInput
  2) подсветка поля showError, hideError
  3) дисейбл/енейбл кнопки toggleButton
  4) слушатели на форму setListeners
  5) вызов всех функций enableValidation
*/

const hasInvalidInput = (inputList) => {
  return inputList.some(input => !input.validity.valid)
}

const toggleButton = (buttonElement, inputList) => {
  if(hasInvalidInput(inputList))
    buttonElement.removeAttribute("disabled", true)
  else
    buttonElement.setAttribute("disabled", true)
}

const showError = (form, input) => {
  const errorElem = form.querySelector(".popup__error")
  if
}

const hideError = () => {

}

const checkInput = (form, input) => {
  if(input.validity.valid) {

  }
  else {

  }
}

const setListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"))
  const buttonElement = formElement.querySelector(".popup__submit")

  inputList.forEach(element => {
    element.addEventListener("input", function(){
      checkInput(formElement, element)
      toggleButton(inputList, buttonElement)
    })
  })
}

function enableValidation(obj) {
  const formList = Array.from(document.querySelectorAll(obj.formSelector))

  formList.forEach(element => {
    element.addEventListener("submit", evt => evt.preventDefault())
  })
  setListeners(obj.inputSelector)
}

enableValidation()