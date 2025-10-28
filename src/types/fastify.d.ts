import '@fastify/oauth2'

declare module 'fastify' {
  interface FastifyInstance {
    githubOAuth2: fastifyOauth2.FastifyOAuth2
  }
}
