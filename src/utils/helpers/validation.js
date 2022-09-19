import * as R from 'ramda';
import * as EmailValidator from 'email-validator';

const MIN_EMAIL_LENGTH = 3;

export const validateEmail = (email) => {
  const emailFieldStatus = {
    isValid: true,
    errors: {},
  };

  if (R.isEmpty(email)) {
    emailFieldStatus.isValid = false;
    emailFieldStatus.errors = 'Please enter your Email.';
  } else if (email.length < MIN_EMAIL_LENGTH) {
    emailFieldStatus.isValid = false;
    emailFieldStatus.errors = `Email must have at least ${MIN_EMAIL_LENGTH} characters.`;
  } else if (!EmailValidator.validate(email)) {
    emailFieldStatus.isValid = false;
    emailFieldStatus.errors = "The email address you've provided isn't formatted correctly.";
  }
  return emailFieldStatus;
};

export const validateRole = (role) => {
  const roleFieldStatus = {
    isValid: true,
    errors: {},
  };

  if (R.isEmpty(role)) {
    roleFieldStatus.isValid = false;
    roleFieldStatus.errors = 'Please select a role';
  }
  return roleFieldStatus;
};
