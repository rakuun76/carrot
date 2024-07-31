import { redirect } from "next/navigation";

export function GET() {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    scope: "read:user,user:email",
  }).toString();
  const finalUrl = `${baseUrl}?${params}`;

  return redirect(finalUrl);
}
