import { useEffect } from "react";
import { useFlashMemoStore } from "../context/zustandStore";

const CRUDNotification = () => {
  const { isNotificationShowing, isOk, msg } = useFlashMemoStore(
    (state) => state.notificationContent
  );
  const setNotificationContent = useFlashMemoStore(
    (state) => state.setNotificationContent
  );

  useEffect(() => {
    if (isNotificationShowing) {
      setTimeout(() => {
        setNotificationContent({
          ...{ isNotificationShowing, isOk, msg },
          isNotificationShowing: false,
        });
      }, 2000);
    }
  }, [isNotificationShowing]);

  return (
    <div
      className={`fixed top-20 z-20 left-0 min-w-[150px] p-6 bg-gray-200 shadow-md font-semibold transition-transform dark:bg-neutral-900 rounded-tr rounded-br ${
        isOk ? "text-green-600" : "text-red-500"
      } ${isNotificationShowing ? "translate-x-0" : "translate-x-[-100%]"}`}
    >
      {msg}
    </div>
  );
};

export default CRUDNotification;
