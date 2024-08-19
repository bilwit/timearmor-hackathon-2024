import express, { Express } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import router from './router';
// import { EventEmitter } from 'stream';
// import websocket from './websocket';

dotenv.config();

const app: Express = express();
const prisma = new PrismaClient();
// const CameraEmitter = new EventEmitter(); // emitter to communicate to/from the cameras

app.set('trust proxy', true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  express.raw({
    inflate: true,
    type: 'application/x-www-form-urlencoded',
  }),
);
app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'client/dist')));
app.use((req: any, _res, next) => { // database connection & emitter accessible from api router
  req['db'] = prisma;
  // req['CameraEmitter'] = CameraEmitter;
  return next();
});
app.use('/api', router);

const server = app.listen(Number(process.env.API_PORT), async () => {
  console.log('⚡️[server]: Server is running at http://localhost:' + process.env.API_PORT);

  // try {
  //   // websocket server for client connections for camera communication
  //   websocket(server)?.(CameraEmitter);
  // } catch (e) {
  //   console.log(e);
  // }
  
});