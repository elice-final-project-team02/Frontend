import InputStatus from './inputStatus';

const validateInput = (inputValue, inputName, password = null) => {
  const emailRegExp = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
  const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
  const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

  if (inputName === 'email') {
    return !emailRegExp.test(inputValue) ? InputStatus.ERROR : InputStatus.NORMAL;
  }

  if (inputName === 'password') {
    return !passwordRegExp.test(inputValue) ? InputStatus.ERROR : InputStatus.NORMAL;
  }

  if (inputName === 'passwordConfirm') {
    return inputValue !== password ? InputStatus.ERROR : InputStatus.NORMAL;
  }

  if (inputName === 'name') {
    return inputValue.length < 2 ? InputStatus.ERROR : InputStatus.NORMAL;
  }

  if (inputName === 'phone') {
    return !phoneRegExp.test(inputValue) ? InputStatus.ERROR : InputStatus.NORMAL;
  }
  return InputStatus.NORMAL;
};

export default validateInput;
