import { Affix, Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Properties from "./Properties";

// UI Framework Components: https://mantine.dev/core/modal/
function AddButton() {
  const [isOpened, { open, close }] = useDisclosure(false);
  
  return (
    <>
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

      <Modal 
        opened={isOpened} 
        onClose={() => {
          close();
        }} 
        title={'Add Camera'}
        size="xl"
      >
        <Properties close={close}/>
      </Modal>

    </>
  );
}

export default AddButton;
