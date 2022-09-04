import { useCallback } from 'react';
import { toast } from 'react-toastify';

import { Api } from 'utils/Api';

const usePostPutData = (url: string, isPut: boolean, disableNotification: boolean, successMessage: string) => {
  return useCallback(
    async (data: any) => {
      if (!url) return {};

      const res = await Api[isPut ? 'put' : 'post'](url, data);

      if (!disableNotification) {
        !res ? toast.success(successMessage || 'Success') : toast.error('Error');
      }

      return {
        hasError: res.status,
        data: res,
        message: res.status,
      };
    },
    [url, disableNotification, successMessage]
  );
};

export default usePostPutData;
