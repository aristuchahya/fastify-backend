import { FastifySchema } from "fastify";
import { minLength } from "zod";
import { de } from "zod/locales";


export const registerSchema : FastifySchema = {
    body: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
            name: { type: 'string', minLength: 3 },
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 }
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
                email: { type: 'string' }
                }
                
            }
        },
        default: {
            description : 'Default response',
            type: 'object',
            properties: {
                status: { type: 'string' },
                data: {
                id: { type: 'string' },
                name: { type: 'string' },
                email: { type: 'string' }
                }
            }
        }
        
    }
}


export const loginSchema : FastifySchema = {
    body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 }
        },
        additionalProperties: false
    },
    response: {
        200: {
            description: 'Successful response',
            type: 'object',
            properties: {
                status: { type: 'string' },
                access_token: { type: 'string' }
            }
        },
        default: {
            description : 'Default response',
            type: 'object',
            properties: {
                status: { type: 'string' },
                access_token: { type: 'string' }
            }
        }
    }
}


