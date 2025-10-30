import { FastifySchema } from "fastify";


export const createSaleSchema : FastifySchema = {
    tags: ["Sale"],
    body: {
        type: 'object',
        required: ['userId', 'paymentMethod', 'transactionDate'],
        properties: {
            userId: { type: 'string' },
            customerId: { type: 'string' },
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

export const getAllSaleSchema : FastifySchema = {
    tags: ["Sale"],
    response: {
        200: {
            description: 'List of sales',
            type: 'object',
            properties: {
            status: { type: 'string' },
            data: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
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
                        },
                        customer: {
                            type: 'object',
                            properties: {
                                name: { type: 'string' },
                                phone: { type: 'string' }
                            }
                        },
                        user: {
                            type: 'object',
                            properties: {
                                name: { type: 'string' },
                                email: { type: 'string' }
                            }
                        }
                    }
                }
            }
            
            }
        
    }
    }
}

export const getSaleSchema : FastifySchema = {
    tags: ["Sale"],
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'string' }
        },
        additionalProperties: false
    },
    response: {
        200: {
            description: 'Successful response',
            type: 'object',
            properties: {
                status: { type: 'string' },
                data: {
                    type: 'object',
                    properties: {
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
                            },
                        customer: {
                                type: 'object',
                                properties: {
                                    name: { type: 'string' },
                                    phone: { type: 'string' }
                                }
                            },
                            user: {
                                type: 'object',
                                properties: {
                                    name: { type: 'string' },
                                    email: { type: 'string' },
                                    role: { type: 'string' }
                                }
                            }
                    }
                    
                }
            }
        }
    }
}