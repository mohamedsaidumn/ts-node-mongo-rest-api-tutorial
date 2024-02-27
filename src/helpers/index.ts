import crypto from 'crypto';
import config from "config"


const SECRET : string = config.get("authentification.secret");

export const authentication = (salt: string, password: string): string => {
  return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
}

export const random = () => crypto.randomBytes(128).toString('base64');