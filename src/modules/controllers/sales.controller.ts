import { FastifyReply, FastifyRequest } from 'fastify';
import { salesService } from '../services/sales.service.js';
import { CreateSaleInput } from '../../types/sale.js';

class SalesController {
    async createSale(req: FastifyRequest, reply: FastifyReply) {
        const sale = await salesService.createSale(req.body as CreateSaleInput)

        return reply.code(201).send({
            status: 'success',
            data: sale
        })
    }

    async getAll(req: FastifyRequest, reply: FastifyReply) {
        const sales = await salesService.getAllSales()

        return reply.code(200).send({
            status: 'success',
            data: sales
        })
    }

    async getSale(req: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply) {
        const {id} = req.params

        const sale = await salesService.getSale(id)
        

        return reply.code(200).send({
            status: 'success',
            data: sale
        })
    }

    async deleteSale(req: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply) {
        const {id} = req.params

        await salesService.deleteSale(id)

        return reply.code(200).send({
            status: 'success',
            message: 'Sale deleted'
        })
    }
}

export const salesController = new SalesController()