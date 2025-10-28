import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'

import { getUsers, getUser } from './user.controller.js'


export async function userRoutes(app: FastifyInstance) {
    app.addHook("preHandler", (app as any).authenticate)
    app.get('/', (req: FastifyRequest, reply: FastifyReply) => {
        reply.send({ message: '/ route hit'})
    })
    app.get('/all_user', getUsers)
    app.get('/:email', getUser)
    app.delete('/logout', () => {})
    app.log.info('User routes registered')
}