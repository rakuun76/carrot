"use server";

import {
  EMAIL_ERROR,
  EMAIL_LOGIN_ERROR,
  PASSWORD_MIN_ERROR,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
  STRING_ERROR,
} from "@/lib/constants";
import { z } from "zod";
import db from "@/lib/db";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const isRegisteredEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });

  return user !== null;
};

const formSchema = z.object({
  email: z
    .string(STRING_ERROR)
    .email(EMAIL_ERROR)
    .refine(isRegisteredEmail, EMAIL_LOGIN_ERROR),
  password: z
    .string(STRING_ERROR)
    .min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_ERROR)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await formSchema.spa(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });

    const passwordPass = await bcrypt.compare(
      result.data.password,
      user!.password ?? ""
    );
    if (passwordPass) {
      const session = await getSession();
      session.id = user!.id;
      session.save();
      redirect("/");
    } else {
      return {
        fieldErrors: {
          email: [],
          password: ["Wrong password."],
        },
      };
    }
  }
}
