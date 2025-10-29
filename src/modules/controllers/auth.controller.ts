import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../../utils/prisma.js";


export const githubCallback = async (req: FastifyRequest, reply: FastifyReply) => {
  const token = await req.server.githubOAuth2.getAccessTokenFromAuthorizationCodeFlow(req)

  const accessToken = token.token.access_token

  const userResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github+json"
    }
  })

  const user = await userResponse.json()

  const emailResponse = await fetch("https://api.github.com/user/emails", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github+json"
    }
  })

  const emails = await emailResponse.json()

  const primaryEmail = emails.find((e: any) => e.primary)?.email || user.email;



  const userInfo = {
    id: user.id,
    name: user.name || user.login,
    email: primaryEmail,
    avatar_url: user.avatar_url,
  }

  await prisma.user.create({
    data: {
      name: user.name,
      email: primaryEmail,
      password: "",
    }
  })

  return reply.send({
    status: "success",
    message: "Github login successful",
    data: userInfo
  })
}