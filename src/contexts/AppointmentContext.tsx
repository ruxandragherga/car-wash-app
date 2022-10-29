import { createContext, FC, ReactNode, useContext, useState } from "react";
import internal from "stream";
import { JsonSourceFile } from "typescript";
import { Service } from "../models/Service";

export const AppointmentContext = createContext<
  ReturnType<typeof useAppointmentContextValue>
>(null!);

type AppointmentContextValue = {
  id: number;
  idUser: number;
  //services: JSON;
  dateAndTime: Date;
  carNumber: string;
};

function useAppointmentContextValue() {
  const [appointmentState, setAppointmentState] = useState<AppointmentContextValue>({
    id: -1,
    idUser: -1,
    //services: ;
    dateAndTime: newDate(''),
    carNumber: "",
  });

  return [appointmentState, setAppointmentState] as const;
}

export const AppointmentContextProvider: any = ({
  children,
}: {
  children: ReactNode;
}) => {
  const appointmentContext = useAppointmentContextValue();
  return (
    <AppointmentContext.Provider value={appointmentContext}>{children}</AppointmentContext.Provider>
  );
};

export function useAppointmentContext() {
  return useContext(AppointmentContext);
}

function newDate(arg0: string): Date {
    throw new Error("Function not implemented.");
}
