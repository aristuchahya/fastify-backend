import { FastifyInstance} from 'fastify'
import { ProductController } from '../controllers/product.controller.js'
import { createProductSchema, getAllProductSchema, getProductSchema } from '../schemas/product.schema.js'


export async function productRoutes(app: FastifyInstance) {
    app.addHook("preHandler", (app as any).authenticate)

    app.post('/product', {schema: createProductSchema}, new ProductController().createProduct)
    app.get('/', {schema: getAllProductSchema}, new ProductController().getAllProducts)
    app.get('/:id', {schema: getProductSchema}, new ProductController().getProduct)
    app.delete('/:id', new ProductController().deleteProduct)
}