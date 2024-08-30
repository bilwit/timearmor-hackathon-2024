import { 
  Button,
  Group,
  Tabs,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Camera, UpdatedCamera } from '../../../..';
import Alerts from '../Alerts';
import { useContext, useState } from 'react';
import DataContext from './dataContext';

interface Props {
  data?: Camera,
  close: () => void,
}

function Properties(props: Props) {
  const { setData } = useContext(DataContext);
  const CreateForm = useForm({
    initialValues: {
      name: props?.data?.name || '',
      model: props?.data?.model || '',
      url_mjpeg: props?.data?.url_mjpeg || '',
    },

    validate: {
      name: (value) => value ? null : 'Required',
      model: (value) => value ? null : 'Required',
      url_mjpeg: (value) => value ? null : 'Required',
    },
  });

  const [warning, setWarning] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState('');
  const [isDeleteWarning, setIsDeleteWarning] = useState(false);

  async function submitEditOrAdd(values: UpdatedCamera) {
    const submitFormData = new FormData();

    for (const property of (Object.keys(values))) {
      submitFormData.set(property, JSON.stringify(values[property as keyof UpdatedCamera]));
    }

    try {
      const result = await fetch(
         '/api/cameras' + (props?.data?.id ? '/' + props.data.id : ''),
        { 
          method: props?.data?.id ? 'PATCH' : 'POST',
          body: submitFormData,
        },
      );

      if (result) {
        const responseJson = await result.json();
        if (responseJson?.data) {
          if (!props?.data?.id) {
            setIsSubmitted('Camera Added');

            // update main page list
            setData((prev) => ([
              ...prev,
              responseJson.data[0],
            ]))

            setTimeout(() => props.close(), 1500);
          } else {
            setIsSubmitted('Camera Updated');

            // update entry displayed on main page list
            setData((prev) => prev.map((item) => item.id === responseJson.data[0].id ? responseJson.data[0] : item).sort((a, b) => a.updated_at < b.updated_at ? -1 : 1))

            setTimeout(() => props.close(), 1500);
          }
          
          setWarning('');
          return setError('');
        } else {
          if (responseJson?.msg) {
            throw responseJson.msg;
          }
          throw '';
        }
      }
    } catch (err) {
      return setError(err && typeof err === 'string' ? err : 'Could not submit settings');
    }
  }

  async function submitDelete() {
    try {
      const result = await fetch(
        '/api/cameras/' + props?.data?.id,
        { 
          method: 'DELETE',
        },
      );

      if (result) {
        const responseJson = await result.json();
        if (responseJson?.data?.[0]?.id) {
          // remove from main page list
          setData((prev) => prev.filter((item) => item.id !== responseJson.data[0].id));

          setWarning('');
          setIsDeleteWarning(false);
          setTimeout(() => props.close(), 1500);
          return setError('');
        } else {
          if (responseJson?.msg) {
            throw responseJson.msg;
          }
          throw '';
        }
      }

    } catch (err) {
      return setError(err && typeof err === 'string' ? err : 'Could not submit settings');
    }
  }

  return (
    <>
      <Tabs defaultValue="properties" keepMounted={false}>

        <Alerts
          error={error}
          warning={warning}
          success={isSubmitted}
        />
        
        <Tabs.List>
          <Tabs.Tab value="properties">
            Properties
          </Tabs.Tab>

        </Tabs.List>

        <Tabs.Panel mt="md" value="properties">
          <form onSubmit={CreateForm.onSubmit( (values: UpdatedCamera) => submitEditOrAdd(values))}>

          <TextInput
            required
            mb={'md'}
            label="Name"
            placeholder=""
            {...CreateForm.getInputProps('name')}
          />

          <TextInput
            required
            mb={'md'}
            label="Model"
            placeholder=""
            {...CreateForm.getInputProps('model')}
          />

          <TextInput
            required
            mb={'md'}
            label="Stream URL"
            description="Must be an MJPEG stream"
            placeholder=""
            {...CreateForm.getInputProps('url_mjpeg')}
          />

          {!props?.data && !isSubmitted && (
            <Group justify="center" mt="xl">
              <Button 
                color={'blue'}
                type="submit"
              >
                Add
              </Button>
            </Group>
          )}

          {props?.data?.id && (
            <Group justify="center" mt="xl">
              <Button 
                color={'green'}
                type="submit"
                disabled={isDeleteWarning}
              >
                Edit
              </Button>

              <Button 
                color={isDeleteWarning ? 'yellow' : 'red'}
                disabled={isDeleteWarning}
                onClick={(e) => {
                  e.preventDefault();
                  setIsDeleteWarning(true);
                }}
              >
                {isDeleteWarning ? 'Are you sure?' : 'Delete'}
              </Button>

              {isDeleteWarning && (
                <Button 
                  color={'red'}
                  onClick={(e) => {
                    e.preventDefault();
                    submitDelete();
                  }}
                >
                  Delete
                </Button>
              )}
            </Group>
          )}

          </form>
        </Tabs.Panel>

      </Tabs>
    </>
  );
}

export default Properties;