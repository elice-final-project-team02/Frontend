import InputStatus from './inputStatus';

const rules = {
  email: /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/,
  password: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
  phone: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
  passwordConfirm: (inputValue, password) => inputValue === password,
  name: (inputValue) => inputValue.length >= 2,
};

const validateInput = (inputValue, inputName, password = null) => {
  const rule = rules[inputName];

  if (!rule) {
    return InputStatus.NORMAL;
  }

  if (typeof rule === 'function') {
    return rule(inputValue, password) ? InputStatus.NORMAL : InputStatus.ERROR;
  }

  return rule.test(inputValue) ? InputStatus.NORMAL : InputStatus.ERROR;
};

export default validateInput;
