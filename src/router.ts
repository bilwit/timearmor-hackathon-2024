import express, { Router, Request, Response } from "express";
import ReadableStreamClone from 'readable-stream-clone';
import initStream from "./utils/initStream";

const router: Router = express.Router();
const streamProxies = new Map();

router.get('/stream/:id', (req: Request, res: Response) => {
  try {
    if (!streamProxies.has(req.params.id)) {
      initStream(
        req.params.id, 
        (process: any) => {
          streamProxies.set(req.params.id, {
            process: process,
            observers: [],
          })
        }
      );
    }

    const camStream = streamProxies.get(req.params.id);
    if (camStream) {
      res.writeHead(206, {
        'Date': (new Date()).toUTCString(),
        'Connection': 'Upgrade, Keep-Alive',
        'Cache-Control': 'private',
        'Content-Type': 'video/webm',
        'Server': 'CustomStreamer/0.0.1',
      });

      // BUG: once the original process is consumed, the readablestreamclone still tries 
      // to consume the used process
      const readStream = new ReadableStreamClone(camStream.process.stdout);
      
      camStream.observers.push(readStream);
      console.log('New stream');
    
      // TODO: delete the readstreamclone observer based on connected ws clients & make them 
      // identifiably stored
      camStream.observers.at(-1).pipe(res);
    }

  } catch (err) {
    console.log(err);
    res.status(500).send(true);
  }
});

export default router;
