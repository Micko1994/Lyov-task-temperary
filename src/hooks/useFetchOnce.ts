import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

import { Api } from 'utils/Api';
import { createParams } from 'utils/helpers';
import { useStore } from 'store';

export const useFetchOnce = (initialData: any, url: string, disableNotification = true, isGet = false) => {
  const {
    actions: { logout, handleLoading },
  } = useStore();

  const [count, setCount] = useState(null);
  const [data, setData] = useState(initialData);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(
    async (reqData: any) => {
      if (!url) return;
      handleLoading(true);
      setIsLoading(true);
      setHasError(false);

      try {
        const res = await Api.get(url + createParams(reqData));
        let currentData = initialData;

        if (res?.data) {
          setData(res?.data);
          setCount(res.data.total);
        } else {
          currentData = initialData;
          setData(currentData);
          setHasError(true);
          toast.error('Error');
        }
        handleLoading(false);
        setIsLoading(false);
        return currentData;
      } catch (err: any) {
        if (err?.response?.status === 401) {
          logout();
        }
      }
    },
    [url, isGet, disableNotification]
  );

  return [data, fetchData, isLoading, count, hasError];
};
