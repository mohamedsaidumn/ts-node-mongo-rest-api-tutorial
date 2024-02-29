import winston from 'winston'
import { devLogger, prodLogger } from './envLogger'

// const env : string = config.get("server.env")
const env : string = process.env.ENVIROMENT
let logger : winston.Logger = null

if (env == 'prod')
{
    logger = prodLogger()
}
else
{
    logger = devLogger()
}

export default logger;