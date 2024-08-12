import { create } from "zustand";

// 상태 타입 정의
interface AlertState {
  alerts: Record<string, string>;
}

// 액션 타입 정의
interface AlertActions {
  setAlert: (formId: string, message: string) => void;
  clearAlert: (formId: string) => void;
}

// Zustand store 타입 정의: 상태와 액션 타입 통합
type AlertStore = AlertState & AlertActions;

// Zustand store 생성
const useAlertStore = create<AlertStore>((set) => ({
  alerts: {}, // 초기 상태

  // 액션 정의
  setAlert: (formId: string, message: string) =>
    set((state) => ({
      alerts: {
        ...state.alerts,
        [formId]: message,
      },
    })),

  clearAlert: (formId: string) =>
    set((state) => ({
      alerts: {
        ...state.alerts,
        [formId]: "",
      },
    })),
}));

export default useAlertStore;

// const { alerts, setAlert, clearAlert } = useAlertStore();

// const handleSetAlert = () => {
//   setAlert('form1', 'This is an alert message!');
// };

// const handleClearAlert = () => {
//   clearAlert('form1');
// };
