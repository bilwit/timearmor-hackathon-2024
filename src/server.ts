import express, { Express } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import routeCameras from './routes/cameras';
import routeStreams from './routes/streams';

dotenv.config();

const app: Express = express();        
const prisma = new PrismaClient();

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
app.use((req: any, _res, next) => { // database connection accessible from api router
  req['db'] = prisma;
  return next();
});
app.use('/api/cameras', routeCameras);
app.use('/api/streams', routeStreams);

app.listen(Number(process.env.API_PORT || 999), async () => {
  console.log('⚡️[server]: Server is running at http://localhost:' + (process.env.API_PORT || 999));  
});