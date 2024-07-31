"use server";

import {
  NUMBER_ERROR,
  PHONE_NUMBER_ERROR,
  STRING_ERROR,
  TOKEN_EXISTS_ERROR,
  TOKEN_MAX,
  TOKEN_MIN,
  TOKEN_RANGE_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import validator from "validator";
import { z } from "zod";
import crypto from "crypto";
import twilio from "twilio";
import { sessionLogin } from "@/lib/session";

//token refine 함수
const tokenExists = async (token: number) => {
  const exists = await db.sMSToken.findUnique({
    where: {
      token,
    },
    select: {
      id: true,
    },
  });

  return Boolean(exists);
};

//새로운 token 생성
async function getToken() {
  const token = crypto.randomInt(TOKEN_MIN, TOKEN_MAX);
  const exists = await db.sMSToken.findUnique({
    where: {
      token,
    },
    select: {
      id: true,
    },
  });
  if (exists) {
    return getToken();
  } else {
    return token;
  }
}

//shcema
const phoneNumberSchema = z
  .string(STRING_ERROR)
  .refine(
    (phoneNumber) => validator.isMobilePhone(phoneNumber, "ko-KR"),
    PHONE_NUMBER_ERROR
  );
const tokenSchema = z
  .number(NUMBER_ERROR)
  .min(TOKEN_MIN, TOKEN_RANGE_ERROR)
  .max(TOKEN_MAX, TOKEN_RANGE_ERROR)
  .refine(tokenExists, TOKEN_EXISTS_ERROR);

interface IPrevState {
  token: boolean;
}

export async function smsLogin(prevState: IPrevState, formData: FormData) {
  if (!prevState.token) {
    const phoneNumber = formData.get("phoneNumber");
    const result = phoneNumberSchema.safeParse(phoneNumber);

    if (!result.success) {
      return {
        token: false,
        error: result.error.flatten(),
      };
    } else {
      await db.sMSToken.deleteMany({
        where: {
          user: {
            phone_number: result.data,
          },
        },
      });

      const token = await getToken();
      await db.sMSToken.create({
        data: {
          token,
          user: {
            connectOrCreate: {
              where: {
                phone_number: result.data,
              },
              create: {
                username: crypto.randomBytes(10).toString("hex"),
                phone_number: result.data,
              },
            },
          },
        },
      });

      // twilio 유료 이슈로...
      // const client = twilio(
      //   process.env.TWILIO_ACCOUNT_SID,
      //   process.env.TWILIO_AUTH_TOKEN
      // );
      // await client.messages.create({
      //   body: `Your Carrot verification code is: ${token}`,
      //   from: process.env.TWILIO_PHONE_NUMBER!,
      //   to: result.data,
      // });

      return { token: true };
    }
  } else {
    const token = formData.get("token");
    const result = await tokenSchema.spa(token);

    if (!result.success) {
      return {
        token: true,
        error: result.error.flatten(),
      };
    } else {
      const token = await db.sMSToken.findUnique({
        where: {
          token: result.data,
        },
        select: {
          id: true,
          userId: true,
        },
      });
      sessionLogin(token!.userId);

      await db.sMSToken.delete({
        where: {
          id: token!.id,
        },
      });

      redirect("/profile");
    }
  }
}
