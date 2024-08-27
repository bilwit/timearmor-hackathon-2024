export default function initProcess(cameraAddress: string) {
  const spawn = require('child_process').spawn;    

  const process = spawn(
    'ffmpeg', 
    [
      '-f', 'mjpeg',
      '-r', '5',
      '-use_wallclock_as_timestamps', '1',
      '-i', cameraAddress,
      '-vcodec', 'libvpx', //'libvpx-vp9',
      '-an',
      '-cpu-used', '5',
      '-deadline', 'realtime',
      '-y',
      '-f', 'webm',
      'pipe:1',
    ],
  );

  // verbose debugging messages
  process.stderr.setEncoding('utf8');      
  process.stderr.on('data', (data: any) => {
    // console.log(data);
    if (data.includes('Error')) {
      console.log(data);
      process.kill('SIGINT');
    }
  });

  console.log('New ffmpeg process created')

  return process?.stdout;
}
