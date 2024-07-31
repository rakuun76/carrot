import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface ISession {
  id?: number;
}

export function getSession() {
  return getIronSession<ISession>(cookies(), {
    cookieName: "carrot-user",
    password: process.env.COOKIE_PASSWORD!,
  });
}

export async function sessionLogin(userId: number) {
  const session = await getSession();
  session.id = userId;
  await session.save();
}
