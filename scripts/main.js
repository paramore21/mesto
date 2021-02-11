const form = document.querySelector(".popup");
const submit = form.querySelector(".popup__submit");
const closeForm = form.querySelector(".popup__close-form");
const edit = document.querySelector(".profile__edit-button");
const container = document.querySelector(".profile__info");
const previousName = document.querySelector(".profile__name");
const previousDescription = document.querySelector(".profile__description");
const inputName = form.querySelector(".popup__edit_type_name");
const inputDescription = form.querySelector(".popup__edit_type_description");
const place = document.querySelector(".place");
const newPlaceName = place.querySelector(".place__edit_type_place");
const newPlaceUrl = place.querySelector(".place__efit_type_url");
const placeSubmit = place.querySelector(".place__submit");
const addPlace = document.querySelector(".profile__add-card");
const closePlace = document.querySelector(".place__close-form");
const elementContainer = document.querySelector(".elements");
const imageClose = document.querySelector(".image__close");
const imageContainer = document.querySelector(".image");

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

function openEdit() {
  form.classList.add("popup_opened");
  inputName.value = previousName.textContent;
  inputDescription.value = previousDescription.textContent;
}

function openPlace() {
  place.classList.add("place_opened");
}

function closeAddPlace() {
  place.classList.remove("place_opened");
}

function closePopup() {
  form.classList.remove("popup_opened");
}

function closeImage(){
  imageContainer.classList.remove("image_opened");
}

function editInformation(evt) {
  evt.preventDefault();
  previousName.textContent = inputName.value;
  previousDescription.textContent = inputDescription.value;
  closePopup();
}

function likeToggle(ev) {
  const elem = ev.target;
  if (elem) {
    elem.classList.toggle("element__like-button_active");
  }
}

function likeEventRegister() {
  const likeButton = document.querySelectorAll(".element__like-button");
  likeButton.forEach((elem) => {
    elem.removeEventListener("click", likeToggle);
    elem.addEventListener("click", likeToggle);
  });
}

function removeEvent(ev) {
  const button = ev.target;
  if (button) {
    const block = button.parentNode;
    block.parentNode.removeChild(block);
  }
}

function deleteImageEvent() {
  const elementDelete = document.querySelectorAll(".element__delete");
  elementDelete.forEach((node) => {
    node.removeEventListener("click", removeEvent);
    node.addEventListener("click", removeEvent);
  });
}

function addCardToContainer(name, link) {
  const div = document.createElement("div");
  div.classList.add("element");

  const img = document.createElement("img");
  img.classList.add("element__image");
  img.setAttribute("src", link);
  img.setAttribute("alt", name);

  const buttonDelete = document.createElement("button");
  buttonDelete.classList.add("element__delete");

  const title = document.createElement("h2");
  title.classList.add("element__title");
  title.textContent = name;

  const likeBtn = document.createElement("button");
  likeBtn.classList.add("element__like-button");

  div.appendChild(img);
  div.appendChild(buttonDelete);
  div.appendChild(title);
  div.appendChild(likeBtn);

  elementContainer.prepend(div);
}

function render() {
  initialCards.forEach((el) => {
    addCardToContainer(el.name, el.link);
  });
}

function renderAdded(index) {
  addCardToContainer(initialCards[index].name, initialCards[index].link);
}

function addItem() {
  initialCards.push({ name: newPlaceName.value, link: newPlaceUrl.value });
  renderAdded(initialCards.length - 1);
  closeAddPlace();
  deleteImageEvent();
  likeEventRegister();
  openCardEvent();
}

function displayCard(name, link){
  const div = document.createElement("div")

  const img = document.createElement("img")
  img.classList.add("image__item");
  img.setAttribute("src") = link
  img.setAttribute("alt") = name
  
  
  const title = document.createElement("h3")
  title.classList.add("image__title")
  title.textContent = name


}

function openCardEvent(){
  const cards = document.querySelectorAll(".element__image")
  const img = document.createElement("img")

}

render();
deleteImageEvent();
likeEventRegister();
form.addEventListener("submit", editInformation);
edit.addEventListener("click", openEdit);
closeForm.addEventListener("click", closePopup);
addPlace.addEventListener("click", openPlace);
placeSubmit.addEventListener("click", addItem);
closePlace.addEventListener("click", closeAddPlace);
imageClose.addEventListener("click", closeImage);

// const elementTemplate = document.querySelector("#element").content;
// const image = document.querySelector(".element__image").cloneNode(true);
// const deleteItem = document.querySelector(".element__delete").cloneNode(true);
// const header = document.querySelector(".element__title").cloneNode(true);
// const likeButton = document.querySelector(".element__like-button").cloneNode(true);
