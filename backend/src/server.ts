import { app } from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./config/logger.js";
import { prisma } from "./prisma/client.js";

const bootstrap = async (): Promise<void> => {
  try {
    await prisma.$connect();

    app.listen(env.PORT, () => {
      logger.info({ port: env.PORT }, "Backend server started");
    });
  } catch (error) {
    logger.error({ err: error }, "Failed to start server");
    process.exit(1);
  }
};

void bootstrap();
