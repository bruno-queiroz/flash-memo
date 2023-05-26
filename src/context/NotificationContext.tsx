import { ReactNode, createContext, useState } from "react";
import { NotificationContent } from "../pages/Add";

export const NotificationContext = createContext<
  [
    NotificationContent,
    React.Dispatch<React.SetStateAction<NotificationContent>>
  ]
>([{ isNotificationShowing: false, isOk: false, msg: "" }, () => ""]);

export const NotificationContentProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <NotificationContext.Provider
      value={useState<NotificationContent>({} as NotificationContent)}
    >
      {children}
    </NotificationContext.Provider>
  );
};
