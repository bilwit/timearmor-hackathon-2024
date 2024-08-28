import { useState, useEffect } from "react";
import { ResponseDataCamera, Camera } from '../..';

function useGetData(endpoint: string, id?: string | null): { 
  isLoading: boolean,
  data: Camera[],
  setData: React.Dispatch<React.SetStateAction<any[]>>,
  error: string, 
  setError?: React.Dispatch<React.SetStateAction<string>>,
} {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Camera[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const wrapDispatch = async () => {
      try {
        const res: any = await fetch('/api/' + endpoint + (id ? '/' + id : ''), {
          method: 'GET',
        });
        if (res) {
          const responseJson: ResponseDataCamera = await res.json();
          if (responseJson?.data) {
            setIsLoading(false);
            return setData(responseJson.data.sort((a: Camera, b: Camera) => ('created_at' in a && 'created_at' in b) ? a.created_at < b.created_at ? -1 : 1 : 1));
          } else {
            throw true;
          }
        } else {
          throw true;
        }
      } catch (e) {
        setIsLoading(false);
        setError('Could not load data');
      }
    }

    wrapDispatch();
  }, []);

  return {
    isLoading,
    data,
    setData,
    error,
    setError,
  };
}

export default useGetData;