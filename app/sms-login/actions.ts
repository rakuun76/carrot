"use server";

import { PHONE_NUMBER_ERROR, STRING_ERROR } from "@/lib/constants";
import { redirect } from "next/navigation";
import validator from "validator";
import { z } from "zod";

interface IPrevState {
  phoneNumber: boolean;
}

const phoneNumberSchema = z
  .string(STRING_ERROR)
  .refine(
    (phoneNumber) => validator.isMobilePhone(phoneNumber, "ko-KR"),
    PHONE_NUMBER_ERROR
  );
const verificationCodeSchema = z.string(STRING_ERROR);

export async function smsLogin(prevState: IPrevState, formData: FormData) {
  if (!prevState.phoneNumber) {
    const phoneNumber = formData.get("phoneNumber");
    const result = phoneNumberSchema.safeParse(phoneNumber);

    if (!result.success) {
      return {
        phoneNumber: false,
        error: result.error.flatten(),
      };
    } else {
      return { phoneNumber: true };
    }
  } else {
    const verificationCode = formData.get("verificationCode");
    const result = verificationCodeSchema.safeParse(verificationCode);

    if (!result.success) {
      return {
        phoneNumber: true,
        error: result.error.flatten(),
      };
    } else {
      redirect("/");
    }
  }
}
