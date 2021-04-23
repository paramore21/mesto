import '../pages/index.css';
import PopupWithForm from "./PopupWithForm.js"
import Popup from "./Popup.js"
import Card from "./Card.js"
import Section from "./Section.js"
import {FormValidator, validationObject} from "./FormValidator.js"
import {initialCards} from "./initialCards.js"
import UserInfo from "./UserInfo.js"

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

const imagePopup = new Popup(imageContainer)
imagePopup.setEventListeners()
const inputList = Array.from(placeContainer.querySelectorAll(validationObject.inputSelector));

const userInfo = new UserInfo(profileName, profileDescription)

const editPopup = new PopupWithForm(formEditClassName, 
  () => {
    userInfo.setUserInfo(editPopup._getInputValues())
  })

const placePopup = new PopupWithForm(cardEditClassName, () => {
  const card = new Card(placePopup._getInputValues().url, placePopup._getInputValues().place, className).createCard()
  sectionClass.addItem(card)
})

editPopup.setEventListeners()
placePopup.setEventListeners()

const sectionClass = new Section({
  items: initialCards, 
  renderer: (item) => {
    const card = new Card(item.link, item.name, className).createCard()
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

// function editInfo(){
//   editFormValidation.removeSpanError()
//   editDescription.value = profileDescription.textContent
//   editName.value = profileName.textContent
//   openPopup(editContainer);
// }

// function saveInformation(evt){
//   evt.preventDefault();
//   profileDescription.textContent = editDescription.value
//   profileName.textContent = editName.value
// }

// // /* отрисовка */
// // function renderCards(){ /* это покажет карточки */
// //   initialCards.forEach(item => {
// //     elementsContainer.append(new Card(item.link, item.name, className, openPopup).createCard())
// //   })
// // }

// function addCard(evt){ /* добавит карточку */
//   evt.preventDefault();
//   elementsContainer.prepend(new Card(placeLink.value, placeName.value, className, openPopup).createCard());
//   closePopup(placeContainer); 
// }

// // renderCards() 


// profileForm.addEventListener("submit", saveInformation)

// ////////////////////**** Работа с формой добавления карточки ****/////////////////////////
// addCardButton.addEventListener("click", () =>  {
//   placeForm.reset();
//   cardFormValidation.removeSpanError();
//   cardFormValidation.toggleButton(cardSubmitButton, validationObject.inactiveButtonClass, inputList)
//   openPopup(placeContainer)
// })

// // closeByOverlay(editContainer);
// // closeByOverlay(placeContainer);
// // closeByOverlay(imageContainer);

// placeForm.addEventListener("submit", addCard)
// //imageClose.addEventListener("click", () => closePopup(imageContainer))
 