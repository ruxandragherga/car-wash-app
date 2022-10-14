import { createContext, FC, ReactNode, useContext, useState } from "react";

export const UserContext = createContext<
  ReturnType<typeof useUserContextValue>
>(null!);

type UserContextValue = {
  email: string;
  password: string;
};

function useUserContextValue() {
  const [userState, setUserState] =
    useState<UserContextValue>({
      email: "",
      password: "",
    });

  return [userState, setUserState] as const;
}

export const UserContextProvider: any = ({
  children,
}: {
  children: ReactNode;
}) => {
  const userGlobalContext = useUserContextValue();
  return (
      <UserContext.Provider value={userGlobalContext}>
        {children}
      </UserContext.Provider>
  );
};

export function useUserContext() {
  return useContext(UserContext);
}