const validationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_type_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_type_active'
}


const inputInvalid = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid)
}

const findEmptyInputs = (inputList) => {
  return !inputList.some(inputElement => inputElement.value.length > 0)
}

const toggleButton = (buttonElement, inactiveButtonClass, inputList) => {
  if(inputInvalid(inputList) || findEmptyInputs(inputList)){
    buttonElement.classList.add(inactiveButtonClass)
    buttonElement.setAttribute("disabled", true)
  } 
  else {  
    buttonElement.classList.remove(inactiveButtonClass)
    buttonElement.removeAttribute("disabled")
  }
}

const showError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.getAttribute("name")}__error`)
  inputElement.classList.add(inputErrorClass)
  errorElement.classList.add(errorClass)
  errorElement.textContent = inputElement.validationMessage
}

const hideError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.getAttribute("name")}__error`)
  inputElement.classList.remove(inputErrorClass)
  errorElement.classList.remove(errorClass)
  errorElement.textContent = ""
}


const hasInvalidInput = (formElement, inputElement, inputErrorClass, errorClass) => {
  if(inputElement.validity.valid){
    hideError(formElement, inputElement, inputErrorClass, errorClass)
  }
  else {
    showError(formElement, inputElement, inputErrorClass, errorClass)
  }
}

const setEventListeners = (formElement, inputErrorClass, errorClass, inputSelector, submitButtonSelector, inactiveButtonClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector))
  const button = formElement.querySelector(submitButtonSelector)

  inputList.forEach(inputElement => {
    inputElement.addEventListener("input", () => {
      hasInvalidInput(formElement, inputElement, inputErrorClass, errorClass)
      toggleButton(button, inactiveButtonClass, inputList)
    })
    toggleButton(button, inactiveButtonClass, inputList)
  })
}

const enableValidation = (object) => {
  const formList = Array.from(document.querySelectorAll(object.formSelector))
  formList.forEach(formElement => {
    formElement.addEventListener("submit", evt => evt.preventDefault())
    setEventListeners(formElement, object.inputErrorClass, object.errorClass, object.inputSelector, object.submitButtonSelector, object.inactiveButtonClass)
  })
}