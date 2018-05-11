// @flow
import { app } from "webiny-api";

/**
 * Authentication middleware factory.
 * @param options
 * @returns {Function} Request middleware function.
 */
export default (options: { token: Function | string }) => {
    /**
     * Authentication middleware.
     * Attempts to authenticate the client using the token from request (if any).
     * If successful, `identity` instance is set on the `req` object itself.
     * If not successful, we just call the next middleware.
     *
     * @param req
     * @param res
     * @param services
     * @param next
     * @return {Promise<void>}
     */
    return async (params: Object, next: Function) => {
        const { req } = params;

        const security = app.services.get("authentication");

        // Initializes authentication (loads authorization settings).
        await security.init();

        const token =
            typeof options.token === "function" ? options.token(req) : req.get(options.token);
        if (!token) {
            return next();
        }

        // Assigns identity retrieved from received token.
        req.identity = await security.verifyToken(token);

        // Since we need to access groups synchronously at later stages, we must load all assigned groups.
        req.identity && (await req.identity.getAttribute("groups").value.load());

        next();
    };
};
