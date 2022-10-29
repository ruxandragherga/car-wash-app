import { createContext, FC, ReactNode, useContext, useState } from "react";
import internal from "stream";

export const UserContext = createContext<
  ReturnType<typeof useUserContextValue>
>(null!);

type UserContextValue = {
  id: number;
  email: string;
  password: string;
  role: "admin" | "client" | "";
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

function useUserContextValue() {
  const [userState, setUserState] = useState<UserContextValue>({
    id: -1,
    email: "",
    password: "",
    role: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  return [userState, setUserState] as const;
}

export const UserContextProvider: any = ({
  children,
}: {
  children: ReactNode;
}) => {
  const userContext = useUserContextValue();
  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
};

export function useUserContext() {
  return useContext(UserContext);
}
