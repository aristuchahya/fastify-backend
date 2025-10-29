import { FastifySchema } from "fastify";

export const createCustomerSchema : FastifySchema = {
    tags: ["Customer"],
    body: {
        type: 'object',
        required: ['name', 'phone'],
        properties: {
            name: { type: 'string', minLength: 3 },
            phone: { type: 'string' }
        },
        additionalProperties: false
    },
    response: {
        201: {
            description: 'Successful response',
            type: 'object',
            properties: {
                status: { type: 'string' },
                data: {
                id: { type: 'string' },
                name: { type: 'string' },
                phone: { type: 'string' }
                }
            }
        }
    }
}