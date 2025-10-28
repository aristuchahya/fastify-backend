import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export default fp(async(app: FastifyInstance) => {
    app.register(fastifyJwt, {
        secret: String(process.env.SECRET_KEY)
    })

    app.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            await request.jwtVerify()
        } catch (error) {
            reply.send(error)
        }
    })
})