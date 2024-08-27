// UI Framework Components: https://mantine.dev/core/modal/

import { useContext, useRef, useState } from "react";
import WsContext from "./wsContext";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";

function Cameras() {
  const wsStore = useContext(WsContext);
  const [isPlaying, setIsPlaying] = useState(true);

  const playerRef: React.MutableRefObject<ReactPlayer | null> = useRef(null);

  // force pause to buffer so that the stream doesn't stop and wait for more data without resuming
  function waitForBuffer(data: OnProgressProps) {
    if ((data.loadedSeconds - data.playedSeconds) < 5) {
      console.log('pause')
      setIsPlaying(false);
    } else { 
      if (!isPlaying) {
        console.log('resume')
        setIsPlaying(true);
      }
    }

    console.log(data.loadedSeconds - data.playedSeconds)

    if (
      playerRef?.current && 
      data.loadedSeconds > 5 &&
      (data.loadedSeconds - data.playedSeconds) > 10
    ) {
      console.log('seek');
      playerRef.current.seekTo(data.loadedSeconds - 5, "seconds");
      setIsPlaying(true);
    }
  }

  return (
    <>
      {/* <img src="api/stream/1"/> */}

      {/* <video id="banner-video" autoPlay muted playsInline loop>
        <source src="api/stream/2" type="video/webm" />
        Your browser does not support the video tag.
      </video> */}

      <ReactPlayer
        ref={playerRef}
        url='api/stream/2'
        controls
        width={'640px'}
        height={'480px'}
        playing={isPlaying}
        onProgress={waitForBuffer}
      />
    </>
  );
}

export default Cameras;
