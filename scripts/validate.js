const validationObject = [
  {
    type: "popup_type_edit",
    formSelector: '.popup__container',
    inputSelector: '.popup__edit',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  },
  {
    type: "popup_type_place",
    formSelector: '.place__container',
    inputSelector: '.place__edit',
    submitButtonSelector: '.place__submit',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  },
]

enableValidation(validationObject)