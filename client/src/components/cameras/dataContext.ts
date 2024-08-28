import { createContext } from "react";
import { Camera } from "../../../..";

interface DataContext {
  data: Camera[],
  setData: React.Dispatch<React.SetStateAction<Camera[]>>,
}

const DataContext = createContext<DataContext>({
  data: [],
  setData: () => null,
});

export default DataContext;
