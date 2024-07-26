"use server";

import { z } from "zod";

const stringErrorMessage = {
  invalid_type_error: "It should be string.",
  required_error: "You must enter it.",
};
const minErrorMessage = (length: number) =>
  `It should be at least ${length} characters.`;
const maxErrorMessage = (length: number) =>
  `It should be no more than ${length} characters.`;
const emailErrorMessage = "Invalid email format. Please check your input.";
const checkPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;
const checkPasswordErrorMessage = "The password confirmation does not match.";
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*\d).+$/;
const passwordRegexErrorMessage =
  "Password must contain at least one letter, one special character(!@#$%^*+=-), and one digit.";

const formSchema = z
  .object({
    username: z
      .string(stringErrorMessage)
      .min(3, minErrorMessage(3))
      .max(10, maxErrorMessage(10))
      .trim(),
    email: z.string(stringErrorMessage).email(emailErrorMessage),
    password: z
      .string(stringErrorMessage)
      .min(8, minErrorMessage(8))
      .regex(passwordRegex, passwordRegexErrorMessage),
    confirmPassword: z.string(stringErrorMessage).min(8, minErrorMessage(8)),
  })
  .refine(checkPassword, {
    message: checkPasswordErrorMessage,
    path: ["confirmPassword"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const result = formSchema.safeParse(data);
  if (!result.success) return result.error.flatten();
}
