import { FastifyReply, FastifyRequest } from 'fastify';
import { customerService } from '../services/customer.service.js';
import { CreateCustomerInput } from '../../types/customer.js';

export class CustomerController {
    async create(req: FastifyRequest, reply: FastifyReply) {
        try {
            const customer = await customerService.createCustomer(req.body as CreateCustomerInput)

            return reply.code(201).send({
                status: 'success',
                data: customer
            }) 
        } catch (error) {
            return reply.code(500).send({
                status: 'error',
                message: error
            })
        }
    }

    async getCustomers(req: FastifyRequest, reply: FastifyReply) {
        try {
            const customers = await customerService.getAllCustomers()
            
            return reply.code(200).send({
                status: 'success',
                data: customers
            })
        } catch (error) {
            return reply.code(500).send({
                status: 'error',
                message: error
            })
        }
    }

    async getCustomer(req: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply) {
        const {id} = req.params

        try {
            const customer = await customerService.getCustomer(id)

            return reply.code(200).send({
                status: 'success',
                data: customer
            })
        } catch (error) {
            return reply.code(500).send({
                status: 'error',
                message: error
            })
        }
    }

    async deleteCustomer(req: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply) {
        const {id} = req.params
        try {
            await customerService.deleteCustomer(id)

            return reply.code(200).send({
                status: 'success',
                message: 'Customer deleted'
            })
        } catch (error) {
            return reply.code(500).send({
                status: 'error',
                message: error
            })
        }
    }
            
}

export const customerController = new CustomerController()