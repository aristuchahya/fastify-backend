import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../../utils/prisma.js";



export class ProductController {
    public async getAllProducts(req: FastifyRequest, reply: FastifyReply) {
        try {
            const products = await prisma.product.findMany()
            if (!products) {
                return reply.code(404).send({
                    status: 'error',
                    message: 'Product not found'
                })
            }

            return reply.code(200).send({
                status: 'success',
                data: products
            })
        } catch (error) {
            return reply.code(500).send({
                status: 'error',
                message: error
            })}
    }

    public async getProduct(req: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply) {
        const {id} = req.params

        try {
            const product = await prisma.product.findUnique({
                where: {
                    id
                }
            })

            if (!product) {
                return reply.code(404).send({
                    status: 'error',
                    message: 'Product not found'
                })
            }

            return reply.code(200).send({
                status: 'success',
                data: product
            })
        } catch (error) {
            return reply.code(500).send({
                status: 'error',
                message: error
            })
        }
    }

    public async deleteProduct(req: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply) {
        const {id} = req.params

        try {
            await prisma.product.delete({
                where: {
                    id
                }
            })

            return reply.code(200).send({
                status: 'success',
                message: 'Product deleted'
            })
        } catch (error) {
            return reply.code(500).send({
                status: 'error',
                message: error
            })
        }
    }

    public async createProduct(req: FastifyRequest, reply: FastifyReply) {
        let name = "";
        let category = "";
        let price: number | null = null;
        let stock: number | null = null;
        let uploadedUrl = "";

        try {
        
        for await (const part of req.parts()) {
            if (part.type === "file") {
            
            uploadedUrl = await new Promise<string>((resolve, reject) => {
                const uploadStream = req.server.cloudinary.uploader.upload_stream(
                { folder: "products" },
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result?.secure_url ?? "");
                }
                );
                part.file.pipe(uploadStream);
            });
            } else {
            
            switch (part.fieldname) {
                case "name":
                name = part.value as string;
                break;
                case "category":
                category = part.value as string;
                break;
                case "price":
                price = Number(part.value);
                break;
                case "stock":
                stock = Number(part.value);
                break;
            }
            }
        }

        
        if (
            !name.trim() ||
            !category.trim() ||
            price === null ||
            stock === null ||
            !uploadedUrl
        ) {
            return reply.code(400).send({
            status: "error",
            message: "All fields are required and must be valid",
            });
        }

        
        const product = await prisma.product.create({
            data: {
            name,
            category,
            price,
            stock,
            photo: uploadedUrl,
            },
        });

        return reply.code(201).send({
            status: "success",
            data: product,
        });
        } catch (error) {
        console.error("❌ Error creating product:", error);
        return reply.code(500).send({
            status: "error",
            message: (error as Error).message,
        });
        }
  }


    
}