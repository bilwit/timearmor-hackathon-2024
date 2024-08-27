export default function initStream(id: string, cb: any) {
  const spawn = require('child_process').spawn;    

  const process = spawn(
    'ffmpeg', 
    [
      '-f', 'mjpeg',
      '-r', '5',
      '-use_wallclock_as_timestamps', '1',
      '-i', 'http://192.168.3.254:8081',
      '-vcodec', 'libvpx', //'libvpx-vp9',
      '-an',
      '-cpu-used', '5',
      '-deadline', 'realtime',
      '-y',
      '-f', 'webm',
      'pipe:1',
    ],
  );

  cb(process);

  // verbose debugging messages
  // process.stderr.setEncoding('utf8');      
  // process.stderr.on('data', (data: any) => {
  //   console.log(data);
  //   if (data.includes('Error')) {
  //     process.kill('SIGINT');
  //   }
  // });

  console.log('New ffmpeg process created')

  return true;
}
