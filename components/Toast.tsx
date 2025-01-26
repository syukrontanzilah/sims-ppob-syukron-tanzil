/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast, ToastPosition } from "react-hot-toast";

interface ShowToastProps {
  title?: string;
  duration?: number;
  position?: ToastPosition;
}

export const ToastSuccess = ({ 
  title = "Submit successfully!", 
  duration,
  position = "top-right" 
}: ShowToastProps) => {
  toast.success(`${title}`, {
    duration,
    position,
    style: {
      fontSize: "13px",
      backgroundColor: "#f0f4f8",
      color: "#333",
      marginTop: '5px'
    },
  });
};

export const ToastError = ({ 
  title = "Ops, Something wrong!", 
  duration,
  position = "top-right" 
}: ShowToastProps) => {
  toast.error(`${title}`, {
    duration,
    position,
    style: {
      fontSize: "13px",
      backgroundColor: "#f0f4f8",
      color: "#333",
      marginTop: '5px'
    },
  });
};

export const ToastLoading = () => {
  return toast.loading("Processing...", {
    position: "top-right",
    style: {
      fontSize: "13px",
      backgroundColor: "#f0f4f8",
      color: "#333",
      marginTop: '5px', 
    },
  });
};

export const ToastClose = (toastId: string) => {
  toast.dismiss(toastId);
};

interface ToastPromiseProps {
  action: () => Promise<any>;
  loadingMessage?: string;
  successMessage?: string;
  errorMessage?: string;
  loadingStyle?: React.CSSProperties;
  successStyle?: React.CSSProperties;
  errorStyle?: React.CSSProperties;
}

export const ToastPromiseDelete = ({
  action,
  loadingMessage = "Deleting Data..." ,
  successMessage = "Data deleted successfully!",
  errorMessage = "Failed to deleted Data!",
  loadingStyle = { fontSize: "13px", color: "#333", background: "#f0f4f8", marginTop: '5px' },
  successStyle = { fontSize: "13px", color: "#333", background: "#f0f4f8", marginTop: '5px' },
  errorStyle = { fontSize: "13px", color: "#333", background: "#f0f4f8", marginTop: '5px' },
}: ToastPromiseProps) => {
  return toast.promise(
    action(),
    {
      loading: loadingMessage,
      success: successMessage,
      error: errorMessage,
    },
    { 
      position: "top-right",
      style: loadingStyle, 
      success: { style: successStyle },
      error: { style: errorStyle },
    }
  );
};
