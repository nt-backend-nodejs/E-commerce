import { createLogger, transports, format } from 'winston'

export const logger = createLogger({
    level: 'silly',
    format: format.combine(
        format.timestamp(),
        // format.json(),
        format.prettyPrint(),
        format.colorize({ all: true }),
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'application.log' }),
    ],
})
