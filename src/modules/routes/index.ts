import { FastifyInstance } from "fastify";
import { userRoutes } from "./user.route.js"; 
import { authRoutes } from "./auth.route.js"; 
import { productRoutes } from "./product.route.js";
import { saleRoutes } from "./sale.route.js";
import { customerRoutes } from "./customer.route.js";
import { reportRoutes } from "./report.route.js";

export async function allRoutes(app: FastifyInstance) {
    app.register(userRoutes, { prefix: "/users" });
    app.register(authRoutes);
    app.register(productRoutes, { prefix: "/products" });
    app.register(saleRoutes, { prefix: "/sales" });
    app.register(customerRoutes, { prefix: "/customers" });
    app.register(reportRoutes, { prefix: "/reports" });
}