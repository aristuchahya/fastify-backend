import Fastify from 'fastify'
import { errorHandlerPlugin } from './plugins/errorhandler.js'
import jwtPlugin from './plugins/jwt.js'
import { swaggerPlugin } from './plugins/swagger.js'
import { allRoutes } from './modules/routes/index.js'
import cloudinary from "fastify-cloudinary"
import fastifyMultipart from "@fastify/multipart" 

const app = Fastify({
    logger: true
})

await swaggerPlugin(app)

app.register(errorHandlerPlugin)
app.register(jwtPlugin)
app.register(fastifyMultipart, {
    attachFieldsToBody: false, 
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
})
app.register(cloudinary, {
    url: String(process.env.CLOUDINARY_URL)
})
app.register(allRoutes, { prefix: '/api' })

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