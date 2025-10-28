import Fastify from 'fastify'
import { userRoutes } from './modules/user/user.route.js'
import { errorHandlerPlugin } from './plugins/errorhandler.js'

import { authRoutes } from './modules/oauth2/auth.route.js'
import jwtPlugin from './plugins/jwt.js'
import { swaggerPlugin } from './plugins/swagger.js'

const app = Fastify({
    logger: true
})

await swaggerPlugin(app)

app.register(errorHandlerPlugin)
app.register(jwtPlugin)

app.register(userRoutes, { prefix: '/api/users'})
app.register(authRoutes)

app.ready(() => {
    app.swagger()
})

const start = async () => {
    try {
        const port = Number(process.env.PORT) || 3000;
        await app.listen({ port })
        console.log(`Server running on port ${port}`)
    } catch (error) {
        app.log.error(error)
        process.exit(1)
    }
}

start()