import express, { Router, Request, Response } from "express";
import encode from "./utils/cameraStream";

const router: Router = express.Router();

const CAMERA_ADDRESS = 'http://192.168.3.254:8081';

router.get('/streams/:id', (req: Request, res: Response) => {
  try {
    // TODO: Cache the first encoded stream and clone it, piped to each new request
    // rather than consuming camera feed and then spawning new encoded processes each time 
    const camStream = encode(CAMERA_ADDRESS);
    if (camStream) {
      res.writeHead(206, {
        'Date': (new Date()).toUTCString(),
        'Connection': 'Upgrade, Keep-Alive',
        'Cache-Control': 'private',
        'Content-Type': 'video/webm',
        'Server': 'CustomStreamer/0.0.1',
      });

      camStream.pipe(res);
    }

  } catch (err) {
    console.log(err);
    res.status(500).send(true);
  }
});

export default router;
