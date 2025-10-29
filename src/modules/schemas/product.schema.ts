import { FastifySchema } from "fastify";

export const createProductSchema : FastifySchema = {
    tags: ["Product"],
    consumes: ["multipart/form-data"],

    response: {
        201: {
            description: 'Product created',
            type: 'object',
            properties: {
                status: { type: 'string' },
                data: { 
                id: { type: 'string' },
                name: { type: 'string' },
                category: { type: 'string' },
                price: { type: 'number' },
                photo: { type: 'string' },
                stock: { type: 'number' } 
                }
            }
        }
    }
}

export const getProductSchema : FastifySchema = {
    tags: ["Product"],
    response: {
        200: {
            description: 'Successful response',
            type: 'object',
            properties: {
                status: { type: 'string' },
                data: {
                id: { type: 'string' },
                name: { type: 'string' },
                category: { type: 'string' },
                price: { type: 'number' },
                photo: { type: 'string' },
                stock: { type: 'number' }
                }
            }
        }
    }
}

export const getAllProductSchema : FastifySchema = {
    tags: ["Product"],
    response: {
        200: {
        description: 'List of products',
        type: 'object',
        properties: {
            status: { type: 'string' },
            data: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                category: { type: 'string' },
                price: { type: 'number' },
                photo: { type: 'string' },
                stock: { type: 'number' }
                }
            }
            }
        }
        }
    }
}