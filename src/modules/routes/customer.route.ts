import { FastifyInstance} from 'fastify'
import { createCustomerSchema } from '../schemas/customer.schema.js'
import { customerController } from '../controllers/customer.controller.js'

export async function customerRoutes(app:FastifyInstance) {
    app.post('/', {schema:createCustomerSchema}, customerController.create)
    app.get('/', customerController.getCustomers)
    app.get('/:id', customerController.getCustomer)
    app.delete('/:id', customerController.deleteCustomer)
}