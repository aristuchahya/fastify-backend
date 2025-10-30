import { prisma } from "../../../utils/prisma.js";
import { CreateSaleInput } from "../../types/sale.js";

class SalesService {
    async createSale(data: CreateSaleInput) {
        const { saleItems, ...salesData } = data

        try {
            return await prisma.$transaction(async (tx) => {
                const saleItemsData = saleItems.map(item=> ({
                ...item,
                subTotal: item.quantity * item.price
            }))

            const totalAmount = saleItemsData.reduce((acc, item) => acc + item.subTotal, 0)

            const sale = await tx.sales.create({
                data: {
                    ...salesData,
                    customerId: salesData.customerId || null,
                    totalAmount,
                    SaleItems: {
                        create: saleItemsData
                    }
                },
                include: {
                    SaleItems: true
                }
            })

            for (const item of saleItemsData) {
                const product = await tx.product.findUnique({
                    where: {
                        id: item.productId
                    }
                })

                if (!product) {
                    throw new Error(`Produk dengan ID ${item.productId} tidak ditemukan`)
                }

                if (product.stock < item.quantity) {
                    throw new Error(`Stok produk dengan ID ${item.productId} tidak mencukupi`)
                }

                await tx.product.update({
                    where: {
                        id: item.productId
                    },
                    data: {
                        stock: product.stock - item.quantity
                    }
                })
            }

            return sale
            })
            
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async getAllSales() {
        try {
            return await prisma.sales.findMany({
                include: {
                    SaleItems: true,
                    customer: {
                        select: {
                            name: true,
                            phone: true
                        }
                    },
                    user: {
                        select: {
                            name: true,
                            email: true,
                            role: true
                        }
                    }
                }
            })
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async getSale(id: string) {
        try {
            const sale = await prisma.sales.findUnique({
                where: {
                    id
                },
                include: {
                    SaleItems: {
                        select: {
                            productId: true,
                            quantity: true,
                            price: true
                        }
                    },
                    customer: {
                        select: {
                            name: true,
                            phone: true
                        }
                    },
                    user: {
                        select: {
                            name: true,
                            email: true,
                            role: true
                        }
                    }
                }
            })

            if (!sale) {
                throw new Error(`Penjualan dengan ID ${id} tidak ditemukan`)
            }

            return sale
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async deleteSale(id: string) {
        try {
            return await prisma.sales.delete({
                where: {
                    id
                }
            })
        } catch (error) {
            throw new Error(error as string)
        }
    }
}

export const salesService = new SalesService()