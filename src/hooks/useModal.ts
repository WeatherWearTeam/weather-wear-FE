import { useState, useCallback } from "react";

export default function useModal() {
  const [isVisible, setIsVisible] = useState(false);

  const openModal = useCallback(() => {
    setIsVisible(true);
  }, []);

  const closeModal = useCallback((callback?: () => void) => {
    setIsVisible(false);
    if (typeof callback === "function") { //콜백 함수인 경우만 실행
      callback();
    }
  }, []);

  return {
    isVisible,
    openModal,
    closeModal,
  };
}
