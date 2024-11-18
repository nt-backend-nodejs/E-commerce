import app from './src/app.js'
import { config } from './src/config/index.js'
import { logger } from './src/utils/logger.js'

const bootstrap = async () => {
    try {
        app.listen(config.app.port, () => {
            logger.info(`server running on port: ${config.app.port}`)
        })
    } catch (error) {
        logger.error(error)
    }
}
bootstrap()
