import { Card, Group, Text } from "@mantine/core";
import { Camera } from "../../../..";
import ModifyButton from "./ModifyButton";

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
            <source src={'api/streams/' + props.data.id} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{props.data.name}</Text>
        </Group>

        <Text size="sm" c="dimmed">
          {'Added ' + (new Date(props.data.created_at)).toLocaleString()}
        </Text>

        <ModifyButton
          type="Edit"
          data={props.data}
        />
      </Card>
    </>
  );
}

export default CameraCard;
