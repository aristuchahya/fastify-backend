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
}

export const salesController = new SalesController()