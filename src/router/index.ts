import express from 'express';

import authentication from './services/authentication';
import users from './services/users';


const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
  return router;
};