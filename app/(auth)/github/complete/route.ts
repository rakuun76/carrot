import db from "@/lib/db";
import { sessionLogin } from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) return notFound();

  //get access_token
  const accessTokenBase = "https://github.com/login/oauth/access_token";
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();
  const accessTokenUrl = `${accessTokenBase}?${accessTokenParams}`;

  const accessTokenResponse = await fetch(accessTokenUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });
  const { error, access_token } = await accessTokenResponse.json();

  if (error) {
    return new Response(null, {
      status: 400,
    });
  }

  //get user data
  const githubProfileResponse = await fetch("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: "no-cache",
  });
  const { id, login, avatar_url } = await githubProfileResponse.json();

  const githubEmailResponse = await fetch(
    "https://api.github.com/user/emails",
    {
      headers: { Authorization: `Bearer ${access_token}` },
      cache: "no-cache",
    }
  );
  const emailData = await githubEmailResponse.json();
  const validEmail = emailData.find(
    (email: { primary: boolean; verified: boolean }) =>
      email.primary && email.verified
  ) ?? { email: "" };

  //handle login
  const user = await db.user.findUnique({
    where: {
      github_id: id,
    },
    select: {
      id: true,
    },
  });
  if (user) {
    await sessionLogin(user!.id);
    return redirect("/profile");
  }

  const emailExists = await db.user.findUnique({
    where: {
      email: validEmail.email,
    },
    select: {
      id: true,
      avatar: true,
    },
  });
  if (emailExists) {
    const updateUser = await db.user.update({
      where: {
        email: validEmail.email,
      },
      data: {
        github_id: id,
        avatar: emailExists.avatar || avatar_url,
      },
      select: {
        id: true,
      },
    });
    await sessionLogin(updateUser!.id);
  } else {
    const usernameExists = await db.user.findUnique({
      where: {
        username: login,
      },
      select: {
        id: true,
      },
    });

    const newUser = await db.user.create({
      data: {
        username: usernameExists ? `${login}-gh` : login,
        email: validEmail.email,
        github_id: id,
        avatar: avatar_url,
      },
      select: {
        id: true,
      },
    });
    await sessionLogin(newUser!.id);
  }

  return redirect("/profile");
}
