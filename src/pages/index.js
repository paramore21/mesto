import Api from "../components/Api.js"
import './index.css';
import PopupWithForm from "../components/PopupWithForm.js"
import Card from "../components/Card.js"
import Section from "../components/Section.js"
import {FormValidator, validationObject} from "../components/FormValidator.js"
import UserInfo from "../components/UserInfo.js"
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithSubmit from "../components/PopupWithSubmit.js";

const editContainer = document.querySelector(".popup_type_edit")    /* контейнер формы*/ 
const placeContainer = document.querySelector(".popup_type_place")  /* контейнер добавления карточки*/ 
const userAvatarContainer = document.querySelector(".popup_type_avatar")

const elementsSelector = ".elements"       /* тут карточки */

const profileName = ".profile__name"       /* селектор -- имя на странице */
const profileDescription = ".profile__description"     /* селектор -- описание на странице */
const userAvatar = ".profile__avatar" /* селектор аватара */

const editButton = document.querySelector(".profile__edit-button")           /* кнопка изменить, открытие формы */
const addCardButton = document.querySelector(".profile__add-card")           /* кнопка добавить карту */
const closePlaceButton = placeContainer.querySelector(".popup__close-form")  /* закрыть добавление карточки*/

const editName = editContainer.querySelector(".popup__edit_type_name")
const editDescription = editContainer.querySelector(".popup__edit_type_description")
const editSubmit = editContainer.querySelector(".popup__submit")
const cardSubmitButton = placeContainer.querySelector(".place__submit")
const editAvatarSubmitButton = userAvatarContainer.querySelector(".avatar__submit")
const className = "#template__card"

const formEditClassName = ".popup_type_edit" /* селектор попапа изменения информации*/ 
const cardEditClassName = ".popup_type_place" /* селектор попапа карточки*/ 
const imageContainer = ".popup_type_image"  /* селектор попапа картинки*/ 
const deleteContainer = ".popup_type_delete"
const avatarContainer = ".popup_type_avatar"
const avatarButton = document.querySelector(userAvatar)

const inputList = Array.from(placeContainer.querySelectorAll(validationObject.inputSelector));

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-23',
  headers: {
    authorization: '5cec2cfc-4275-45ab-817c-d3d0a479cabd',
    'Content-Type': 'application/json'
  }
});

/* валидация форм: -- изменение имени и описания, -- создание новой публикации, -- изменение аватара*/
const editFormValidation = new FormValidator(validationObject, formEditClassName);
const cardFormValidation = new FormValidator(validationObject, cardEditClassName);
const validateAvatar = new FormValidator(validationObject, avatarContainer);

const submitDelete = new PopupWithSubmit(deleteContainer); /* попап подтверждения удаления */

/* попап изменения информации и работа с сервером */
const editPopup = new PopupWithForm(formEditClassName, 
  (inputValues) => {
    editSubmit.textContent = "Сохранение..."
    api.updateUserInformation(inputValues.name, inputValues.about)
    .then(res => {
      editSubmit.textContent = "Сохранить"
      userInfo.setUserInfo(res)
    })
  }
)

/* попап измнения аватара и работа с сервером */
const editAvatar = new PopupWithForm(avatarContainer, (inputValue) => {
  editAvatarSubmitButton.textContent = "Сохранение..."
  api.updateUserAvatar(inputValue.avatar)
  .then(res => {
    editAvatarSubmitButton.textContent = "Сохранить"
    userInfo.setUserAvatar(res.avatar)
  })
});

const imagePopup = new PopupWithImage(imageContainer);

/* создание публикации и работа с сервером */
const placePopup = new PopupWithForm(cardEditClassName, (inputValues) => {
  cardSubmitButton.textContent = "Создание..."
  api.addNewCardToServer(inputValues.name, inputValues.link)
  .then(res => {
    cardSubmitButton.textContent = "Создать"
    createCard(res, res.owner._id)
  })
})

/* запрос на удаление публикации */
const deleteCardFromServer = (id) => {
  return api.deleteCard(id)
}

/* проверка сколько лайков у публикации */
const likeCount = (liked, data, card) =>{
  if(liked){
    api.setLike(data._id)
    .then(res => {
      card.checkLikeCount(res.likes.length)
    })
  }
  else {
    api.removeLike(data._id)
    .then(res => {
      card.checkLikeCount(res.likes.length)
    })
  }
}

/* создание карточки */
const createCard = (item, userMe) => {
  const card = new Card(item, userMe, className, 
    () => {imagePopup.open(item.link, item.name)},  /* открытие публикации по клику */
    () => {submitDelete.open(deleteContainer)},     /* подтверждение удаления публикации */
    () => {                                         /* работа с сервером и DOM - удаление публикации */
      submitDelete.deleteHandler(
        () => {
          deleteCardFromServer(item._id)
          .then(() => {submitDelete.close()})
          .then(() => {card.removeCard()})
        })
    },
    likeCount                                       /* проверка количества лайков у публикации */
  )
  const newCard = card.createCard()
  sectionClass.addItem(newCard)
}
    


/* навесили всех слушаетелей */

imagePopup.setEventListeners();
submitDelete.setEventListeners();
editPopup.setEventListeners();
placePopup.setEventListeners();
editAvatar.setEventListeners()

/* включили валидацию для форм */

editFormValidation.enableValidation();
cardFormValidation.enableValidation();
validateAvatar.enableValidation();


addCardButton.addEventListener("click", () => {
  cardFormValidation.removeSpanError();
  cardFormValidation.toggleButton(cardSubmitButton, validationObject.inactiveButtonClass, inputList)
  placePopup.open()
});

avatarButton.addEventListener("click", () => {
  validateAvatar.removeSpanError()
  validateAvatar.toggleButton(editAvatarSubmitButton, validationObject.inactiveButtonClass, inputList)
  editAvatar.open()
})

closePlaceButton.addEventListener("click", () => placePopup.close());

///////////////////////**** Работа с формой профиля ****/////////////////////////

editButton.addEventListener("click", () => {
  editFormValidation.removeSpanError()
  const data = userInfo.getUserInfo()
  editDescription.value = data.about
  editName.value = data.name
  editPopup.open()
})

const userInfo = new UserInfo(profileName, profileDescription, userAvatar); /* изменение информации о пользователе */

const sectionClass = new Section(createCard, elementsSelector); /* рендеринг изображений */


/* включаем работу сервера */
Promise.all([
  api.getInitialCards(),
  api.getUserInformation(),
]).then(res => {
  sectionClass.renderItems(res[0], res[1]._id);
  userInfo.setUserInfo(res[1])
})