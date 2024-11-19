import { config } from "dotenv";

config()

export default {
    application: {
        port: process.env.PORT,
        node_env: process.env.NODE_ENV
    }   
}