import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface ISession {
  id?: number;
}

export default function getSession() {
  return getIronSession<ISession>(cookies(), {
    cookieName: "user",
    password: process.env.COOKIE_PASSWORD!,
  });
}
