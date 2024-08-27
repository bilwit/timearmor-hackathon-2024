// UI Framework Components: https://mantine.dev/core/modal/
function Cameras() {

  return (
    <>
      {/* <img src="api/stream/1"/> */}

      <video id="banner-video" 
        autoPlay 
        muted 
        playsInline 
        controls 
        width={640} 
        height={480}
      >
        <source src="api/stream/2" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </>
  );
}

export default Cameras;
