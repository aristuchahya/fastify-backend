import { prisma } from "../../../utils/prisma.js";
import { CreateCustomerInput } from "../../types/customer.js";

export class CustomerService {
    async createCustomer(data: CreateCustomerInput) {
        const { name, phone } = data

        try {
            const customer = await prisma.customer.create({
                data: {
                    name,
                    phone
                }
            })

            return customer
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async getAllCustomers() {
        try {
            return await prisma.customer.findMany()
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async getCustomer(id: string) {
        try {
            const customer = await prisma.customer.findUnique({
                where: {
                    id
                }
            })

            if (!customer) {
                throw new Error('Customer not found')
            }

            return customer
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async deleteCustomer(id: string) {
        try {
            return await prisma.customer.delete({
                where: {
                    id
                }
            })
        } catch (error) {
            throw new Error(error as string)
        }
    }
}

export const customerService = new CustomerService()