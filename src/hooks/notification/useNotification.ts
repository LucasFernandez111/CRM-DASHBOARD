import { toast } from 'sonner';

export const useNotification = () => {
  const alertError = (message: string) => toast.error(message);
  const alertSuccess = (message: string) => toast.success(message);
  const alertInfo = (message: string) => toast.info(message);
  const alertWarning = (message: string) => toast.warning(message);
  const alertPromise = <T>(
    promise: Promise<T>,
    messageLoading?: string,
    messageError?: string,
    messageSuccess?: string,
  ) =>
    toast.promise(promise, {
      loading: messageLoading || 'Cargando...',
      error: messageError || 'Error',
      success: () => messageSuccess || 'Exito',
    });

  return {
    alertError,
    alertSuccess,
    alertInfo,
    alertWarning,
    alertLoading: alertPromise,
  };
};
