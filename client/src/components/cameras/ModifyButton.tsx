import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Properties from "./Properties";
import { Camera } from "../../../..";

interface Props {
  type: string,
  data?: Camera,
}

// UI Framework Components: https://mantine.dev/core/modal/
function ModifyButton(props: Props) {
  const [isOpened, { open, close }] = useDisclosure(false);
  
  return (
    <>
      <Button
        color={props.type === 'Add' ? 'blue' : 'green'}
        onClick={(e) => {
          e.preventDefault();
          open();
        }}
      >
        {props.type + ' Camera'}
      </Button>
      
      <Modal 
        opened={isOpened} 
        onClose={() => {
          close();
        }} 
        title={props.type + ' Camera'}
        size="xl"
      >
        <Properties close={close} data={props?.data || undefined}/>
      </Modal>
    </>
  );
}

export default ModifyButton;
