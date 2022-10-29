import { createContext, FC, ReactNode, useContext, useState } from "react";
import internal from "stream";

export const ServiceContext = createContext<
  ReturnType<typeof useServiceContextValue>
>(null!);

type ServiceContextValue = {
  id: number;
  serviceCategory: "spalare" | "polish" | "";
  serviceName: string;
  servicePrice1: number;
  servicePrice2: number;
  servicePrice3: number;
};

function useServiceContextValue() {
  const [serviceState, setServiceState] = useState<ServiceContextValue>({
    id: -1,
    serviceCategory: "",
    serviceName: "",
    servicePrice1: -1,
    servicePrice2: -1,
    servicePrice3: -1,
  });

  return [serviceState, setServiceState] as const;
}

export const ServiceContextProvider: any = ({
  children,
}: {
  children: ReactNode;
}) => {
  const serviceContext = useServiceContextValue();
  return (
    <ServiceContext.Provider value={serviceContext}>
      {children}
    </ServiceContext.Provider>
  );
};

export function useServiceContext() {
  return useContext(ServiceContext);
}
