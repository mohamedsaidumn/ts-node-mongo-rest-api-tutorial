import winston from 'winston'
import config from 'config'
import { devLogger, prodLogger } from './envLogger'

const env : string = config.get("server.env")

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