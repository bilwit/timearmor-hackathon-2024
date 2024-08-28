import { Button, Card, Group, Text } from "@mantine/core";
import { Camera } from "../../../..";

interface Props {
  data: Camera,
}

// UI Framework Components: https://mantine.dev/core/modal/
function CameraCard(props: Props) {
  
  return (
    <>
      {/* <img src={'PATH_TO_RAW_MJPEG_STREAM'} /> */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <video id="banner-video" 
            autoPlay 
            muted 
            playsInline 
            controls 
            width={640} 
            height={480}
          >
            <source src={'api/stream/' + props.data.id} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{props.data.name}</Text>
        </Group>

        <Text size="sm" c="dimmed">
          {'Added ' + (new Date(props.data.created_at)).getDate()}
        </Text>

        <Button color="blue" fullWidth mt="md" radius="md">
          Edit
        </Button>
      </Card>
    </>
  );
}

export default CameraCard;
