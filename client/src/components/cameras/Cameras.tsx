import useGetData from "./useGetData";
import ModifyButton from "./ModifyButton";
import DataContext from "./dataContext";
import CameraCard from "./CameraCard";
import { Affix, Group } from "@mantine/core";

// UI Framework Components: https://mantine.dev/core/modal/
function Cameras() {
  const { data, setData } = useGetData('cameras');
  
  return (
    <>
      <DataContext.Provider value={{ data, setData }}>
        <Group>
          {data && data.length > 0 ? data.map((item, _index) => (
            <CameraCard key={item.id} data={item} />
          )) : 'No Cameras Added'}

          <Affix 
            position={{ 
              bottom: 10, 
              right: 10,
            }} 
          >
            <ModifyButton type="Add"/>
          </Affix>
        </Group>


      </DataContext.Provider>
    </>
  );
}

export default Cameras;
