export const STRING_ERROR = {
  invalid_type_error: "It should be string.",
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
