import { Affix, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import useGetData from "./useGetData";

// UI Framework Components: https://mantine.dev/core/modal/
function Cameras() {
  const { data } = useGetData('cameras');
  const [isOpened, { open, close }] = useDisclosure(false);
  
  return (
    <>
    {data && data.length > 0 ? (
      <>
        hello
      </>
    ) : 'No Cameras Added'}
      {/* <img src="api/stream/1"/> */}

      {/* <video id="banner-video" 
        autoPlay 
        muted 
        playsInline 
        controls 
        width={640} 
        height={480}
      >
        <source src="api/stream/2" type="video/webm" />
        Your browser does not support the video tag.
      </video> */}

      <Affix 
        position={{ 
          bottom: 10, 
          right: 10 
        }} 
      >
        <Button
          color={'blue'}
          onClick={(e) => {
            e.preventDefault();
            open();
          }}
        >
          Add Camera
        </Button>
      </Affix>
    </>
  );
}

export default Cameras;
