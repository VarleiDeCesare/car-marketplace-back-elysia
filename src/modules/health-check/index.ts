import Elysia from "elysia";
import { getDb } from "../../db";
import { getEnv } from "../../config/env";
import { logger } from "../../logger";

const shutdownOnHealthCheckFailure = (error: unknown): never => {
    logger.fatal({ err: error }, "Application health check failed. Shutting down process.");
    process.exit(1);
}

export const checkApplicationHealth = async () => {
    try {
        getEnv();
        const db = await getDb();
        await db.execute("SELECT 1");
        logger.info("Health checks passed");
    } catch (error) {
        shutdownOnHealthCheckFailure(error);
    }
    // add more health checks here if needed in the future.
}
export const hcApp = new Elysia({name: "health-check"}).get('/hc', async () => {
    await checkApplicationHealth();
    return 'OK';
});
