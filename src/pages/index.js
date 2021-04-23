import './index.css';
import PopupWithForm from "../components/PopupWithForm.js"
import Card from "../components/Card.js"
import Section from "../components/Section.js"
import {FormValidator, validationObject} from "../components/FormValidator.js"
import {initialCards} from "../utils/initialCards.js"
import UserInfo from "../components/UserInfo.js"
import PopupWithImage from '../components/PopupWithImage';

const editContainer = document.querySelector(".popup_type_edit")    /* контейнер формы*/ 
const placeContainer = document.querySelector(".popup_type_place")  /* контейнер добавления карточки*/ 

const elementsSelector = ".elements"       /* тут карточки */

const profileName = ".profile__name"                   /* имя на странице */
const profileDescription = ".profile__description"        /* описание на странице */

const editButton = document.querySelector(".profile__edit-button")           /* кнопка изменить, открытие формы */
const addCardButton = document.querySelector(".profile__add-card")           /* кнопка добавить карту */
const closePlaceButton = placeContainer.querySelector(".popup__close-form")  /* закрыть добавление карточки*/

const editName = editContainer.querySelector(".popup__edit_type_name")
const editDescription = editContainer.querySelector(".popup__edit_type_description")
const cardSubmitButton = placeContainer.querySelector(".place__submit")
const className = "#template__card"

const formEditClassName = ".popup_type_edit" /* селектор попапа изменения информации*/ 
const cardEditClassName = ".popup_type_place" /* селектор попапа карточки*/ 
const imageContainer = ".popup_type_image"  /* селектор попапа картинки*/ 

const editFormValidation = new FormValidator(validationObject, formEditClassName)
const cardFormValidation = new FormValidator(validationObject, cardEditClassName)


const createCard = (item) => { 
  const card = new Card(item.link, item.name, className).createCard()
  return card
}
const imagePopup = new PopupWithImage(imageContainer)
imagePopup.setEventListeners()

const inputList = Array.from(placeContainer.querySelectorAll(validationObject.inputSelector));

const userInfo = new UserInfo(profileName, profileDescription)

const editPopup = new PopupWithForm(formEditClassName, 
  (inputValues) => {
    userInfo.setUserInfo(inputValues)
  }
)

editPopup.setEventListeners()

const placePopup = new PopupWithForm(cardEditClassName, (inputValues) => {
  const card = createCard(inputValues)
  sectionClass.addItem(card)
})

placePopup.setEventListeners()
  
const sectionClass = new Section({
  items: initialCards, 
  renderer: (item) => {
    const card = createCard(item)
    sectionClass.addItem(card)
  } 
}, elementsSelector)

sectionClass.renderItems();


editFormValidation.enableValidation()
cardFormValidation.enableValidation()

addCardButton.addEventListener("click", () => {
  cardFormValidation.removeSpanError();
  cardFormValidation.toggleButton(cardSubmitButton, validationObject.inactiveButtonClass, inputList)
  placePopup.open()
})

closePlaceButton.addEventListener("click", () => placePopup.close())

///////////////////////**** Работа с формой профиля ****/////////////////////////

editButton.addEventListener("click", () => {
  editFormValidation.removeSpanError()
  const data = userInfo.getUserInfo()
  editDescription.value = data.description
  editName.value = data.name
  editPopup.open()
})
