import { useEffect, useState } from "react";
import { ServerResponse } from "../fetch/postSignIn";
import { NotificationContent } from "../pages/Add";

type CRUDNotificationProps = NotificationContent & {
  setNotificationContent: React.Dispatch<
    React.SetStateAction<NotificationContent>
  >;
};

const CRUDNotification = ({
  msg,
  isOk,
  isNotificationShowing,
  setNotificationContent,
}: CRUDNotificationProps) => {
  useEffect(() => {
    if (isNotificationShowing) {
      setTimeout(() => {
        setNotificationContent((prev) => ({
          ...prev,
          isNotificationShowing: false,
        }));
      }, 2000);
    }
  }, [isNotificationShowing]);

  return (
    <div
      className={`absolute top-20 left-0 min-w-[150px] p-6 bg-gray-200 shadow-md font-semibold transition-transform dark:bg-neutral-900 rounded-tr rounded-br ${
        isOk ? "text-green-600" : "text-red-500"
      } ${isNotificationShowing ? "translate-x-0" : "translate-x-[-100%]"}`}
    >
      {msg}
    </div>
  );
};

export default CRUDNotification;
