import { FastifyReply, FastifyRequest } from 'fastify';
import { reportService } from '../services/report.service.js';

class ReportController {
    async createReport(req: FastifyRequest<{Body: {month: number, year: number}}>, reply: FastifyReply) {
        const {month, year} = req.body

        const report = await reportService.createReportMonthly(month, year)

        return reply.code(201).send({
            status: 'success',
            data: report
        })

    }

    async getAllReport(req: FastifyRequest, reply: FastifyReply) {
        const reports = await reportService.getAllReport()

        return reply.code(200).send({
            status: 'success',
            data: reports
        })
    }
}

export const reportController = new ReportController()