import { useState } from "react";

interface UseError {
  errorMessage: string | null;
  alertErrorMessage: (message: string, callback?: () => void) => void;
  deleteErrorMessage: () => void;
}

export default function useError(): UseError {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const alertErrorMessage = (message: string, callback?: () => void) => {
    setErrorMessage(message);
    if (typeof callback === "function") {
      // 콜백 함수인 경우만 실행
      callback();
    }
  };

  const deleteErrorMessage = () => {
    setErrorMessage(null);
  };

  return {
    errorMessage,
    alertErrorMessage,
    deleteErrorMessage,
  };
}
