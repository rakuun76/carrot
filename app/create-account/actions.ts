"use server";

import {
  EMAIL_ERROR,
  EMAIL_EXISTS_ERROR,
  PASSWORD_CONFIRM_ERROR,
  PASSWORD_MIN_ERROR,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
  STRING_ERROR,
  USERNAME_EXISTS_ERROR,
} from "@/lib/constants";
import { z } from "zod";
import db from "@/lib/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";

const checkPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

const isUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: { username },
    select: { id: true },
  });

  return user === null;
};

const isUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });

  return user === null;
};

const formSchema = z
  .object({
    username: z
      .string(STRING_ERROR)
      .trim()
      .refine(isUniqueUsername, USERNAME_EXISTS_ERROR),
    email: z
      .string(STRING_ERROR)
      .email(EMAIL_ERROR)
      .refine(isUniqueEmail, EMAIL_EXISTS_ERROR),
    password: z
      .string(STRING_ERROR)
      .min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_ERROR),
    confirmPassword: z
      .string(STRING_ERROR)
      .min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_ERROR),
  })
  .superRefine(({ password }, ctx) => {
    if (!PASSWORD_REGEX.test(password)) {
      ctx.addIssue({
        code: "custom",
        message: PASSWORD_REGEX_ERROR,
        path: ["password"],
        fatal: true,
      });
      return z.NEVER;
    }
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

  const result = await formSchema.spa(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);

    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    const session = await getSession();
    session.id = user.id;
    await session.save();

    redirect("/");
  }
}
