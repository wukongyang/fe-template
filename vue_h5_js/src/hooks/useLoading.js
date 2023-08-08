/* eslint-disable @typescript-eslint/no-explicit-any */
import { Toast } from 'vant';

export function useLoading() {
  let toast = null;

  const startLoading = () => {
    toast = Toast.loading({
      duration: 0,
      forbidClick: true,
      message: 'Loading...',
    });
  };
  const stopLoading = () => {
    toast && toast.clear();
  };

  onBeforeUnmount(stopLoading);

  return { startLoading, stopLoading };
}
