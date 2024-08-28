import useGetData from "./useGetData";
import AddButton from "./AddButton";
import DataContext from "./dataContext";
import CameraCard from "./CameraCard";

// UI Framework Components: https://mantine.dev/core/modal/
function Cameras() {
  const { data, setData } = useGetData('cameras');
  
  return (
    <>
      <DataContext.Provider value={{ data, setData }}>
        {data && data.length > 0 ? data.map((item, _index) => (
          <CameraCard key={item.id} data={item} />
        )) : 'No Cameras Added'}

        <AddButton />
      </DataContext.Provider>
    </>
  );
}

export default Cameras;
