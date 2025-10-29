import { prisma } from "../../../utils/prisma.js";
import { CreateSaleInput } from "../../types/sale.js";

class SalesService {
    async createSale(data: CreateSaleInput) {
        const { saleItems, ...salesData } = data

        try {
            return await prisma.sales.create({
                data: {
                    ...salesData,
                    customerId: salesData.customerId || null,
                    SaleItems: {
                        create: saleItems.map(item => ({
                            ...item,
                            subTotal: item.quantity * item.price
                        }))
                    }
                },
                include: {
                    SaleItems: true
                }
            })
        } catch (error) {
            throw new Error(error as string)
        }
    }
}

export const salesService = new SalesService()