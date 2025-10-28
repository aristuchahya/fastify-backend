import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { githubCallback } from './auth.controller.js'
import fastifyOauth2 from '@fastify/oauth2';
import { loginSchema, registerSchema } from '../user/user.schema.js';
import { createUser, loginUser } from '../user/user.controller.js';

export async function authRoutes(app: FastifyInstance) {
  app.register(fastifyOauth2, {
    name: "githubOAuth2",
    credentials: {
      client: {
        id: process.env.CLIENT_ID_GITHUB!,
        secret: process.env.CLIENT_SECRET_GITHUB!,
      },
      auth: (fastifyOauth2 as any).GITHUB_CONFIGURATION,
    },
    scope: ["user:email"],
    startRedirectPath: "/login/github",
    callbackUri: "http://localhost:3000/login/github/callback",
  });

  app.get("/login/github/callback", githubCallback);
  app.post('/register',{schema: registerSchema}, createUser)
  app.post('/login', {schema: loginSchema}, loginUser)
}
