let form = document.querySelector(".popup");
let submit = form.querySelector(".popup__submit");
let closeForm = form.querySelector(".popup__close-form");
let edit = document.querySelector(".profile__edit-button");
let container = document.querySelector(".profile__info");
let previousName = document.querySelector(".profile__name");
let previousDescription = document.querySelector(".profile__description");
let like = document.querySelector(".element__like-button");
let inputName = document.querySelector(".popup__edit-name");
let inputDescription = document.querySelector(".popup__edit-description");


function openPopup() {
  form.classList.add("popup_opened");
  inputName.value = previousName.textContent;
  inputDescription.value = previousDescription.textContent;
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

edit.addEventListener("click", openPopup);
closeForm.addEventListener("click", closePopup);
