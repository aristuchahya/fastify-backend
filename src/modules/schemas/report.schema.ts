import { FastifySchema } from "fastify";
import { minimum } from "zod/mini";

export const createReportSchema : FastifySchema = {
    tags: ["Report"],
    description: "Create a new report",
    body: {
        type: 'object',
        required: ['month', 'year'],
        properties: {
            month: { type: 'integer', minimum: 1, maximum: 12 },
            year: { type: 'integer', minimum: 2000 },
        },
        additionalProperties: false
    },
    response: {
        200: {
            description: "Laporan bulanan berhasil dibuat",
            type: "object",
            properties: {
            id: { type: "string" },
            month: { type: "integer" },
            year: { type: "integer" },
            totalSales: { type: "number" },
            totalTransactions: { type: "integer" },
            totalItemsSold: { type: "integer" },
            generatedAt: { type: "string", format: "date-time" },
            },
        },
        },
}

export const getAllReportSchema : FastifySchema = {
    tags: ["Report"],
    response: {
        200: {
            description: "List of Reports",
            type: "object",
            properties: {
                status: { type: "string" },
                data: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            month: { type: "integer" },
                            year: { type: "integer" },
                            totalSales: { type: "number" },
                            totalTransactions: { type: "integer" },
                            totalItemsSold: { type: "integer" },
                            generatedAt: { type: "string", format: "date-time" },
                        }
                    }
                }
            }
        }
    }
}