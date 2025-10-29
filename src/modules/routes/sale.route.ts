import { FastifyInstance} from 'fastify'
import { createSaleSchema } from '../schemas/sale.schema.js'
import { salesController } from '../controllers/sales.controller.js'

export async function saleRoutes(app: FastifyInstance) {
    app.post('/sale', {schema: createSaleSchema}, salesController.createSale)
}