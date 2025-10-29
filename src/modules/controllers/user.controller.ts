import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../../utils/prisma.js";
import bcrypt from "bcrypt";



const SALT_ROUNDS = 10;

export async function createUser(req: FastifyRequest<{Body: {name: string, email: string, password: string}}>, reply: FastifyReply) {
    const {name, email, password} = req.body

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (user) {
        return reply.code(401).send({ message: 'User already exists'})
    }

    try {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
        const createdUser = await prisma.user.create({
            data: {
                password: hashedPassword,
                name,
                email
            }
        })
        
        return reply.code(201).send({
            status: 'success',
            data: {
                id: createdUser.id,
                name: createdUser.name,
                role: createdUser.role,
                email: createdUser.email
            }
        })
    } catch (error) {
        return reply.code(500).send({
            status: 'error',
            message: error
        })
    }

}

export async function loginUser(req: FastifyRequest<{Body: {email: string, password: string}}>, reply: FastifyReply) {
    const {email, password} = req.body

    try {
        const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!user) {
        return reply.code(401).send({ message: 'User not found'})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return reply.code(401).send({ message: 'Invalid password'})
    }

    const payload = {
        id: user.id,
        name: user.name,
        email: user.email
    }

    const token = await reply.jwtSign(payload)

    return reply.code(200).send({
        status: 'success', 
        access_token: token })        
    } catch (error) {
        console.log(error)
        return reply.code(500).send({
            status: 'error',
            message: error
        })
    }
}

export async function getUsers(req: FastifyRequest, reply: FastifyReply) {
    try {
        const users = await prisma.user.findMany()

        return reply.code(200).send({
            status: 'success',
            data: users
        })
    } catch (error) {
        return reply.code(500).send({
            status: 'error',
            message: error
        })
    }
}

export async function getUser(req: FastifyRequest<{Params: {email: string}}>, reply: FastifyReply) {
    const {email} = req.params

    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            return reply.code(404).send({
                status: 'error',
                message: 'User not found'
            })
        }

        return reply.code(200).send({
            status: 'success',
            data: user
        })
    } catch (error) {
        return reply.code(500).send({
            status: 'error',
            message: error
        })       
    }
}