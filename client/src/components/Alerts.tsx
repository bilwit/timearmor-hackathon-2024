import { 
  Alert,
} from '@mantine/core';

interface Props {
  error?: string | JSX.Element,
  warning?: string | JSX.Element,
  success?: string | JSX.Element,
  info?: string | JSX.Element,
  title?: string,
}

function Alerts(props: Props) {
  return (
    <>
      {props?.error && (
        <Alert 
          mb="lg"
          variant="light" 
          color="red" 
          title={props?.title || 'Error'} 
        >
          {props.error}
        </Alert>
      )}

      {props?.warning && (
        <Alert 
          mb="lg"
          variant="light" 
          color="yellow" 
          title={props?.title || 'Warning'} 
        >
          {props.warning}
        </Alert>
      )}

      {props?.success && (
        <Alert 
          mb="lg"
          variant="light" 
          color="cyan" 
          title={props?.title || 'Success'} 
        >
          {props.success}
        </Alert>          
      )}

      {props?.info && (
        <Alert 
          mb="lg"
          variant="light" 
          color="indigo" 
          title={props?.title || 'Info'} 
        >
          {props.info}
        </Alert>          
      )}
    </>
  );
}

export default Alerts;