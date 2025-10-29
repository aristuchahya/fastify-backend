import { FastifyInstance } from "fastify";
import { userRoutes } from "../modules/user/user.route.js";
import { authRoutes } from "../modules/oauth2/auth.route.js";

export async function allRoutes(app: FastifyInstance) {
    app.register(userRoutes, { prefix: "/api/users" });
    app.register(authRoutes);
}