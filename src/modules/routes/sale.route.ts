import { FastifyInstance} from 'fastify'
import { createSaleSchema, getAllSaleSchema, getSaleSchema } from '../schemas/sale.schema.js'
import { salesController } from '../controllers/sales.controller.js'

export async function saleRoutes(app: FastifyInstance) {
    app.post('/', {schema: createSaleSchema}, salesController.createSale)
    app.get('/', {schema: getAllSaleSchema},  salesController.getAll)
    app.get('/:id', {schema: getSaleSchema}, salesController.getSale)
    app.delete('/:id', salesController.deleteSale)
}