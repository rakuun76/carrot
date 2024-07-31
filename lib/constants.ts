export const STRING_ERROR = {
  invalid_type_error: "It should be string.",
  required_error: "You must enter it.",
};

export const NUMBER_ERROR = {
  invalid_type_error: "It should be number.",
  required_error: "You must enter it.",
};

export const EMAIL_ERROR = "Invalid email format. Please check your input.";

export const PASSWORD_MIN_LENGTH = 8;

export const PASSWORD_MIN_ERROR = `It should be at least ${PASSWORD_MIN_LENGTH} characters.`;

export const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*\d).+$/;

export const PASSWORD_REGEX_ERROR =
  "Password must contain at least one letter, one special character(!@#$%^*+=-), and one digit.";

export const PASSWORD_CONFIRM_ERROR =
  "The password confirmation does not match.";

export const PHONE_NUMBER_ERROR =
  "Wrong phone number format. It should be ko-KR format.";

export const USERNAME_EXISTS_ERROR = "This username is already taken";

export const EMAIL_EXISTS_ERROR =
  "There is an account already registered with that email.";

export const EMAIL_LOGIN_ERROR = "An account with this email does not exist.";

export const TOKEN_MIN = 100000;

export const TOKEN_MAX = 999999;

export const TOKEN_RANGE_ERROR = `Must be between ${TOKEN_MIN} and ${TOKEN_MAX}.`;

export const TOKEN_EXISTS_ERROR = "This token does not exist.";
