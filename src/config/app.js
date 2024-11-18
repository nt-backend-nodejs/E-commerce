import { config } from 'dotenv'

config()

export default {
    app: {
        port: process.env.PORT,
        node_env: process.env.NODE_ENV,
    },
}
