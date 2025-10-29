import { FastifySchema } from "fastify";


export const createSaleSchema : FastifySchema = {
    tags: ["Sale"],
    body: {
        type: 'object',
        required: ['userId', 'totalAmount', 'paymentMethod', 'transactionDate'],
        properties: {
            userId: { type: 'string' },
            customerId: { type: 'string' },
            totalAmount: { type: 'number' },
            paymentMethod: { type: 'string' },
            transactionDate: { type: 'string' },
            saleItems: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        productId: { type: 'string' },
                        quantity: { type: 'number' },
                        price: { type: 'number' }
                    }
                    
                }
            }
        }
    },
    response: {
        201: {
            description: 'Successful response',
            type: 'object',
            properties: {
                status: { type: 'string' },
                data: {
                id: { type: 'string' },
                userId: { type: 'string' },
                customerId: { type: 'string' },
                totalAmount: { type: 'number' },
                paymentMethod: { type: 'string' },
                transactionDate: { type: 'string' },
                saleItems: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            productId: { type: 'string' },
                            quantity: { type: 'number' },
                            price: { type: 'number' }
                        }
                    }
                }
                }
            }
        }
    }
}