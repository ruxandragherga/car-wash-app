import { createContext, FC, ReactNode, useContext, useState } from "react";

export const UserContext = createContext<
  ReturnType<typeof useUserContextValue>
>(null!);

type UserContextValue = {
  email: string;
  password: string;
  role: "admin" | "client" | "";
};

function useUserContextValue() {
  const [userState, setUserState] = useState<UserContextValue>({
    email: "",
    password: "",
    role: "",
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
    <UserContext.Provider value={userContext}>
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  return useContext(UserContext);
}
