let form = document.querySelector(".popup");
let submit = form.querySelector(".popup__submit");
let closeForm = form.querySelector(".popup__close-form");
let edit = document.querySelector(".profile__edit-button");
let container = document.querySelector(".profile__info");
let previousName = document.querySelector(".profile__name");
let previousDescription = document.querySelector(".profile__description");
let like = document.querySelector(".element__like-button");

function displayPopup() {
  if (
    edit.addEventListener("click", function () {
      form.classList.add("popup_opened");
    })
  );
  else if (
    closeForm.addEventListener("click", function () {
      form.classList.remove("popup_opened");
    })
  );
}

function editInformation(evt) {
  evt.preventDefault();
  let name = form.querySelector(".popup__edit-name").value;
  let description = form.querySelector(".popup__edit-info").value;
  previousName.textContent = name;
  previousDescription.textContent = description;
}

form.addEventListener("submit", editInformation);

displayPopup();

like.addEventListener("click", function() {
  like.classList.toggle("element__like-button_active");
});
