import Api from "../components/Api.js"
import './index.css';
import PopupWithForm from "../components/PopupWithForm.js"
import Card from "../components/Card.js"
import Section from "../components/Section.js"
import {FormValidator, validationObject} from "../components/FormValidator.js"
import UserInfo from "../components/UserInfo.js"
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithSubmit from "../components/PopupWithSubmit.js";

import {
  elementsSelector, profileName, profileDescription, userAvatar, editButton,
  addCardButton, editName, editDescription, editSubmit, cardSubmitButton, editAvatarSubmitButton, deleteSubmitButton, 
  cardSelector, formEditClassName, cardEditClassName, imageContainer, deleteContainer, avatarContainer, avatarButton
} from "../utils/constants.js";

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
      editPopup.close()
    })
    .catch(err => console.log(err))
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
  .then(() => {editAvatar.close()})
  .catch(err => console.log(err))
});

const imagePopup = new PopupWithImage(imageContainer);

/* создание публикации и работа с сервером */
const placePopup = new PopupWithForm(cardEditClassName, (inputValues) => {
  cardSubmitButton.textContent = "Создание..."
  api.addNewCardToServer(inputValues.name, inputValues.link)
  .then(res => {
    cardSubmitButton.textContent = "Создать"
    const newCard = createCard(res, res.owner._id)
    section.addItem(newCard.createCard())
  })
  .then(() => {
    placePopup.close()
  })
  .catch(err => console.log(err))
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
      card.updateLikes(res.likes.length)
    })
    .catch(err => console.log(err))
  }
  else {
    api.removeLike(data._id)
    .then(res => {
      card.updateLikes(res.likes.length)
    })
    .catch(err => console.log(err))
  }
}

/* создание карточки */
const createCard = (item, userMe) => {
  const card = new Card(item, userMe, cardSelector, 
    () => {imagePopup.open(item.link, item.name)},  /* открытие публикации по клику */
    () => {submitDelete.open(deleteContainer)},     /* подтверждение удаления публикации */
    /* "При открытии попапа подтверждения нужно сразу же обновлять функцию удаления. 
    Все в одном обработчике, а не в 2х разных, которые сейчас передаете на 115 и 116й строчках. Их не нужно разделять."
     -- я не совсем поняла как это реализовать в классе Card, поэтому пока оставила так
    вернусь к этому позже  */

    () => {                                         /* работа с сервером и DOM - удаление публикации */
      submitDelete.setDeleteHandler(
        () => {

          /* на самом деле этого пункта не было в ТЗ :)
            но так даже лучше, поэтому я сделала
          */

          deleteSubmitButton.textContent = "Удаление..."
          deleteCardFromServer(item._id)
          .then(() => {
            deleteSubmitButton.textContent = "Да"
            card.removeCard()
          })
          .then(() => {submitDelete.close()})
          .catch(err => console.log(err))
        })
    },
    likeCount                                       /* проверка количества лайков у публикации */
  )
  return card
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
  cardFormValidation.toggleButton()
  placePopup.open()
});

avatarButton.addEventListener("click", () => {
  validateAvatar.removeSpanError()
  validateAvatar.toggleButton()
  editAvatar.open()
})

///////////////////////**** Работа с формой профиля ****/////////////////////////

editButton.addEventListener("click", () => {
  editFormValidation.removeSpanError()
  const data = userInfo.getUserInfo()
  editDescription.value = data.about
  editName.value = data.name
  editPopup.open()
})

const userInfo = new UserInfo(profileName, profileDescription, userAvatar); /* изменение информации о пользователе */

const section = new Section((items, userMe) => {
  const newCard = createCard(items, userMe)
  const card = newCard.createCard()
  section.addItem(card)
}, elementsSelector); /* рендеринг изображений */


/* включаем работу сервера */
Promise.all([
  api.getInitialCards(),
  api.getUserInformation(),
]).then(res => {
  section.renderItems(res[0], res[1]._id);
  userInfo.setUserInfo(res[1])
})
.catch(err => console.log(err))