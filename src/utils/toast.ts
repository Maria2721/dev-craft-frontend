import { type Id, toast } from 'react-toastify';

export const toastLoading = (message: string): Id => {
  return toast.loading(message);
};

export const toastSuccess = (toastId: Id, message: string) => {
  toast.update(toastId, {
    render: message,
    type: 'success',
    isLoading: false,
    autoClose: 3000,
  });
};

export const toastError = (toastId: Id, message: string) => {
  toast.update(toastId, {
    render: message,
    type: 'error',
    isLoading: false,
    autoClose: 4000,
  });
};
