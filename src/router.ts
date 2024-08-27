import express, { Router, Request, Response } from "express";
import stream from 'stream';
// import MjpegProxy from 'node-mjpeg-proxy';
import ReadableStreamClone from 'readable-stream-clone';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    res.send('OK');
  } catch (e: any) {
    res.status(500).send(e.toString());
  }
});

const streamProxies = new Map();

function newStream(id: string, process: any) {
  const pt = new stream.PassThrough();
  process.stdout.pipe(pt);

  process.stderr.setEncoding('utf8');      
  process.stderr.on('data', (data: any) => {
    console.log(data);
  });

  streamProxies.set(id, pt);
  console.log('new')
}

function initStream(id: string) {
  if (!streamProxies.has(id)) {
    const spawn = require('child_process').spawn;    

    // const process = spawn(
    //   'ffmpeg', 
    //   [
    //     '-f', 'mjpeg',
    //     '-i', 'http://192.168.3.254:8081',
    //     '-c:v', 'libvpx-vp9',
    //     '-an',
    //     '-crf ', '63',
    //     '-row-mt', '1',
    //     '-deadline', 'good',
    //     '-f', 'webm',
    //     '-y',
    //     'pipe:1',
    //   ],
    // );

    const process = spawn(
      'ffmpeg', 
      [
        '-f', 'mjpeg',
        '-i', 'http://192.168.3.254:8081',
        '-vcodec', 'libvpx',
        // '-bitrate', '256k',
        '-g', '30',
        '-cpu-used', '5',
        '-deadline', 'best',
        '-an',
        '-filter:v', 'fps=1',
        '-filter:v', 'setpts=0.20*PTS',
        '-preset', 'ultrafast',
        // 'storage/' + req.params.id + '.webm',
        '-y',
        '-f', 'webm',
        'pipe:1',
      ],
    );

    streamProxies.set(id, {
      process: process,
      observers: [],
    });
    // newStream(req.params.id, pass2);

    console.log('new process')
  }

  const camStream = streamProxies.get(id);
  const readStream = new ReadableStreamClone(camStream.process.stdout);
  
  camStream.observers.push(readStream);
  console.log('new stream')

  camStream.process.stderr.setEncoding('utf8');      
  camStream.process.stderr.on('data', (data: any) => {
      console.log(data);
  });

  return true;
}

router.get('/stream/:id', (req: Request, res: Response) => {
  // if (req.params.id === '1') {
  //   if (!streamProxies.has(req.params.id)) {
  //     streamProxies.set(req.params.id, new MjpegProxy('http://192.168.3.254:8081'));
  //   }
  //   try {
  //     const proxy = streamProxies.get(req.params.id);
  //     proxy.proxyRequest(req, res);
  
  //     proxy.on('streamstart', function(data: any) {
  //       console.log("streamstart - " + data);	
  //     });
      
  //     proxy.on('streamstop', function(data: any) {
  //       console.log("streamstop - " + data);
  //     });
      
  //     proxy.on('error', function(data: any) {
  //       console.log("msg: " + data.msg);
  //       console.log("url: " + data.url);
  //     });
  //   } catch (e: any) {
  //     console.log(e)
  //     res.status(500).send(e.toString());
  //   }
  // }

  if (req.params.id === '2') {
    try {

      const camStream = initStream(req.params.id);

      if (camStream) {
        res.writeHead(202, {
          'Date': (new Date()).toUTCString(),
          'Connection': 'close',
          'Cache-Control': 'private',
          'Content-Type': 'video/webm',
          'Server': 'CustomStreamer/0.0.1',
        });

        const stream = streamProxies.get(req.params.id);
        stream.observers[stream.observers.length -1].pipe(res);
      }





      // camStream.pipe(res);
      // camStream.stdout.pipe(res);
      // error logging
      // camStream.stderr.setEncoding('utf8');      
      // camStream.stderr.on('data', (data: any) => {
      //     console.log(data);
      // });

      // fs.access('storage/' + req.params.id + '.webm', (err) => {
      //   if (err) {
      //     throw true;
      //   } else {
      //     res.writeHead(202, {
      //       'Date': (new Date()).toUTCString(),
      //       'Connection': 'close',
      //       'Cache-Control': 'private',
      //       'Content-Type': 'video/webm',
      //       'Server': 'CustomStreamer/0.0.1',
      //     });
      //     const stream = fs.createReadStream('storage/' + req.params.id + '.webm');
      //     stream.pipe(res);
      //   }
      // })

    } catch (err) {
      console.log(err);
      res.status(500).send(true);
    }
  }

});

export default router;
