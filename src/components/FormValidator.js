export {FormValidator, validationObject}
const validationObject = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_type_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_type_active',
}
class FormValidator {
  constructor(validationObject, formSelector){
    this._formSelector = formSelector;
    this._inputSelector = validationObject.inputSelector;
    this._submitButtonSelector = validationObject.submitButtonSelector;
    this._inactiveButtonClass = validationObject.inactiveButtonClass;
    this._inputErrorClass = validationObject.inputErrorClass;
    this._errorClass = validationObject.errorClass;
    this._form = document.querySelector(this._formSelector);
    this._inputs = Array.from(this._form.querySelectorAll(`${this._inputSelector}`));
    this._errors = Array.from(this._form.querySelectorAll(`.popup__error`))
  };

  /* убираем старые ошибки валидации */
  removeSpanError = () => {
    this._inputs.forEach(elem => elem.classList.remove(this._inputErrorClass))
    this._errors.forEach(elem => elem.classList.remove(this._errorClass))
  };

  _inputInvalid = () => {
    return this._inputs.some(inputElement => !inputElement.validity.valid)
  };


  _enableButton = (button, inactiveButtonClass) => {
    button.classList.remove(inactiveButtonClass)
    button.removeAttribute("disabled")
  };

  _disableButton = (button, inactiveButtonClass) => {
    button.classList.add(inactiveButtonClass)
    button.setAttribute("disabled", true)
  };

  toggleButton = (buttonElement) => {
    if(this._inputInvalid(this._inputs)){
      this._disableButton(buttonElement, this._inactiveButtonClass)
    } 
    else {  
      this._enableButton(buttonElement, this._inactiveButtonClass)
    }
  };

  _showError = (inputElement, inputErrorClass, errorClass, errorElement) => {
    inputElement.classList.add(inputErrorClass)
    errorElement.classList.add(errorClass)
    errorElement.textContent = inputElement.validationMessage
  };

  _hideError = (inputElement, inputErrorClass, errorClass, errorElement) => {
    inputElement.classList.remove(inputErrorClass)
    errorElement.classList.remove(errorClass)
    errorElement.textContent = ""
  };


  _hasInvalidInput = (inputElement, inputErrorClass, errorClass) => {
    const errorElement = this._form.querySelector(`#${this._form.classList[0]}__${inputElement.name}__error`)
    if(inputElement.validity.valid){
      this._hideError(inputElement, inputErrorClass, errorClass, errorElement)
    }
    else {
      this._showError(inputElement, inputErrorClass, errorClass, errorElement)
    }
  };

  _setEventListeners = (inputErrorClass, errorClass, submitButtonSelector) => {
    const button = this._form.querySelector(submitButtonSelector)
    this._inputs.forEach(inputElement => {
      inputElement.addEventListener("input", () => {
        this._hasInvalidInput(inputElement, inputErrorClass, errorClass)
        this.toggleButton(button)
      })
      this.toggleButton(button)
    })
  };

  enableValidation = () => {
    this._form.addEventListener("submit", evt => evt.preventDefault())
      this._setEventListeners(this._inputErrorClass, this._errorClass, this._submitButtonSelector, this._inactiveButtonClass) 
  };
}