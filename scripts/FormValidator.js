export {FormValidator, validationObject}
const validationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_type_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_type_active'
}
class FormValidator {
    constructor(validationObject){
      this._formSelector = validationObject.formSelector;
      this._inputSelector = validationObject.inputSelector;
      this._submitButtonSelector = validationObject.submitButtonSelector;
      this._inactiveButtonClass = validationObject.inactiveButtonClass;
      this._inputErrorClass = validationObject.inputErrorClass;
      this._errorClass = validationObject.errorClass
    };

  _disableButton = (form, inputList, buttonClass, inactiveButtonClass) => {
    if(this._findEmptyInputs(inputList)){
      const button = form.querySelector(buttonClass)
      button.classList.add(inactiveButtonClass)
      button.setAttribute("disabled", true)
    }
  }

  _inputInvalid = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid)
  }

  _findEmptyInputs = (inputList) => {
    return !inputList.some(inputElement => inputElement.value.length > 0)
  }

  _toggleButton = (buttonElement, inactiveButtonClass, inputList) => {
    if(this._inputInvalid(inputList) || this._findEmptyInputs(inputList)){
      buttonElement.classList.add(inactiveButtonClass)
      buttonElement.setAttribute("disabled", true)
    } 
    else {  
      buttonElement.classList.remove(inactiveButtonClass)
      buttonElement.removeAttribute("disabled")
    }
  }

  _showError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.getAttribute("name")}__error`)
    inputElement.classList.add(inputErrorClass)
    errorElement.classList.add(errorClass)
    errorElement.textContent = inputElement.validationMessage
  }

  _hideError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.getAttribute("name")}__error`)
    inputElement.classList.remove(inputErrorClass)
    errorElement.classList.remove(errorClass)
    errorElement.textContent = ""
  }


  _hasInvalidInput = (formElement, inputElement, inputErrorClass, errorClass) => {
    if(inputElement.validity.valid){
      this._hideError(formElement, inputElement, inputErrorClass, errorClass)
    }
    else {
      this._showError(formElement, inputElement, inputErrorClass, errorClass)
    }
  }

  _setEventListeners = (formElement, inputErrorClass, errorClass, inputSelector, submitButtonSelector, inactiveButtonClass) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector))
    const button = formElement.querySelector(submitButtonSelector)
    inputList.forEach(inputElement => {
      inputElement.addEventListener("input", () => {
        this._hasInvalidInput(formElement, inputElement, inputErrorClass, errorClass)
        this._toggleButton(button, inactiveButtonClass, inputList)
      })
      this._toggleButton(button, inactiveButtonClass, inputList)
    })
  }

  enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(this._formSelector))
    formList.forEach(formElement => {
      formElement.addEventListener("submit", evt => evt.preventDefault())
      this._setEventListeners(formElement, this._inputErrorClass, this._errorClass, this._inputSelector, this._submitButtonSelector, this._inactiveButtonClass)
    })
  }
}