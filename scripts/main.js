const form = document.querySelector(".popup");
const submit = form.querySelector(".popup__submit");
const closeForm = form.querySelector(".popup__close-form");
const edit = document.querySelector(".profile__edit-button");
const container = document.querySelector(".profile__info");
const previousName = document.querySelector(".profile__name");
const previousDescription = document.querySelector(".profile__description");
const like = document.querySelector(".element__like-button");
const inputName = form.querySelector(".popup__edit_type_name");
const inputDescription = form.querySelector(".popup__edit_type_description");
const place = document.querySelector(".place");
const addPlace = document.querySelector(".profile__add-card");

const initialCards = [
  {
    name: 'Река',
    link: 'https://unsplash.com/photos/9H6PHAs-cAc'
  },
  {
    name: 'Заснеженный берег',
    link: 'https://unsplash.com/photos/Lap9y7XQcLo'
  },
  {
    name: 'Костер',
    link: 'https://unsplash.com/photos/X8DALn4RJaA'
  },
  {
    name: 'Водопад',
    link: 'https://unsplash.com/photos/5-jtsfuaLBw'
  },
  {
    name: 'Млечный путь',
    link: 'https://unsplash.com/photos/voQDMI8XIJI'
  },
  {
    name: 'Горный хребет вулкана',
    link: 'https://unsplash.com/photos/KZC7BJo0Cl0'
  }
];

function openEdit() {
  form.classList.add("popup_opened");
  inputName.value = previousName.textContent;
  inputDescription.value = previousDescription.textContent;
}   

function openPlace() {
  place.classList.add("place_opened");
}

function closePopup() {
  form.classList.remove("popup_opened");
}

function editInformation(evt) {
  evt.preventDefault();
  previousName.textContent = inputName.value;
  previousDescription.textContent = inputDescription.value;
  closePopup();
}

form.addEventListener("submit", editInformation);
edit.addEventListener("click", openEdit);
closeForm.addEventListener("click", closePopup);
addPlace.addEventListener("click", openPlace);