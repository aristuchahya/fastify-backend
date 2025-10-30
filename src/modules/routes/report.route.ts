import { FastifyInstance} from 'fastify'
import { createReportSchema, getAllReportSchema } from '../schemas/report.schema.js'
import { reportController } from '../controllers/report.controller.js'

export async function reportRoutes(app:FastifyInstance) {
    app.post('/', {schema: createReportSchema}, reportController.createReport)
    app.get('/', {schema: getAllReportSchema}, reportController.getAllReport)
}