import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import config from "config"
import mongoose from 'mongoose';
import router from './router';
import logger from './logger';
import { log } from 'winston';

const app = express();

app.use(cors({credentials: true}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

const port = config.get("server.port")

server.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

const username = config.get("database.mongodb_username");
const password = config.get("database.mongodb_password");
const cluster = config.get("database.mongodb_cluster");

const url = `mongodb+srv://${username}:${password}@${cluster}.3e1hgkn.mongodb.net/`;

mongoose.Promise = global.Promise;
mongoose.connect(url);
// Get the default connection
const db = mongoose.connection;
db.on('error', (error: Error) => {
  logger.error("MongoDB connection Failed: ", error);
  process.exit();
});
// Get the default connection
db.once('open', () => {
  logger.info("MongoDB connection Successful");
});

app.use("/", router())


// logger.warn("warning info")
// logger.info("infor info")
// logger.debug("debug info")
// logger.error("error info")