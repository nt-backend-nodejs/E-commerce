import app from "./src/app.js";
import { config } from "./src/config/index.js";
import { logger } from "./src/utils/logger.js";
import pool from "./src/database/index.js";


const bootstrap = async () => {
  try {
    app.listen(config.application.port, () => {
      logger.info(`server running on port: ${config.application.port}`);
    });

    logger.info((await pool.query("SELECT now()")).rows);
  } catch (error) {
    console.log(error);
    logger.error(error);
  }
};

bootstrap();