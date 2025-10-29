import { FastifyInstance } from 'fastify'

export async function errorHandlerPlugin(app: FastifyInstance) {
  app.setErrorHandler((error, request, reply) => {
    
    if ((error as any).validation) {
      const validationErrors = (error as any).validation.map((err: any) => {
        const field =
          err.instancePath?.replace('/', '') || err.params?.missingProperty

        let message = 'Input tidak valid'
        if (err.keyword === 'required') {
          message = `Kolom '${field}' wajib diisi`
        } else if (err.keyword === 'format' && err.params?.format === 'email') {
          message = `Format email pada '${field}' tidak valid`
        } else if (err.keyword === 'minLength') {
          message = `Panjang minimal '${field}' adalah ${err.params.limit} karakter`
        } else if (err.keyword === 'type') {
          message = `Tipe data '${field}' harus ${err.params.type}`
        }

        return { field, message }
      })

      return reply.status(400).send({
        statusCode: 400,
        error: 'Validasi Gagal',
        message: 'Beberapa input tidak valid',
        errors: validationErrors
      })
    }

    
    reply.status(error.statusCode || 500).send({
      statusCode: error.statusCode || 500,
      message: error.message || 'Terjadi kesalahan pada server'
    })
  })
}
