import express, { Router, Request, Response } from "express";
import encode from "./utils/cameraStream";

const router: Router = express.Router();

router.get('/:id', async (req: Request, res: Response) => {
  console.log('here')
  try {
    const camera = await req.db.camera.findFirst({
      where: {
        id: Number(req.params.id),
      },
      select: {
        url_mjpeg: true,
      }
    });

    if (camera?.url_mjpeg) {
      // TODO: Cache the first encoded stream and clone it, piped to each new request
      // rather than consuming camera feed and then spawning new encoded processes each time 
      const camStream = encode(camera?.url_mjpeg);
      if (camStream) {
        res.writeHead(206, {
          'Date': (new Date()).toUTCString(),
          'Connection': 'Upgrade, Keep-Alive',
          'Cache-Control': 'private',
          'Content-Type': 'video/webm',
          'Server': 'CustomStreamer/0.0.1',
        });

        camStream.pipe(res);
      } else {
        throw true;
      }
    } else {
      throw true;
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: 'Could not get camera feed' });
  }
});

export default router;
