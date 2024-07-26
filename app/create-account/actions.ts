"use server";

import {
  EMAIL_ERROR,
  PASSWORD_CONFIRM_ERROR,
  PASSWORD_MIN_ERROR,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
  STRING_ERROR,
} from "@/lib/constants";
import { z } from "zod";

const checkPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

const formSchema = z
  .object({
    username: z.string(STRING_ERROR).trim(),
    email: z.string(STRING_ERROR).email(EMAIL_ERROR),
    password: z
      .string(STRING_ERROR)
      .min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_ERROR)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirmPassword: z
      .string(STRING_ERROR)
      .min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_ERROR),
  })
  .refine(checkPassword, {
    message: PASSWORD_CONFIRM_ERROR,
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
