import { prisma } from "../../../utils/prisma.js";

class ReportService {
    async createReportMonthly(month: number, year: number) {
        try {
            const sales = await prisma.sales.findMany({
                where: {
                    transactionDate: {
                        gte: new Date(year, month - 1, 1),
                        lt: new Date(year, month, 1)
                    }
                },
                include: {
                    SaleItems: true
                }
            })

            if (sales.length === 0) {
                throw new Error(`No sales found for month ${month} and year ${year}`)
            }

            const totalSales = sales.reduce((acc, sale) => acc + sale.totalAmount, 0)

            const totalTransactions = sales.length

            const totalItemsSold = sales.reduce(
            (acc, sale) =>
                acc +
                sale.SaleItems.reduce((sum, item) => sum + item.quantity, 0),
            0
            );

            const report =await prisma.monthlyReport.create({
                data: {
                    month,
                    year,
                    totalSales,
                    totalTransactions,
                    totalItemsSold,
                    generatedAt: new Date()
                }
            })

            return report
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async getAllReport() {
        try {
            return await prisma.monthlyReport.findMany({
                orderBy: {
                    generatedAt: 'desc'
                }
            })
        } catch (error) {
            throw new Error(error as string)
        }
    }
}

export const reportService = new ReportService()