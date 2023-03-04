import { createContext, FC, ReactNode, useContext, useState } from "react";

export const AppointmentContext = createContext<
  ReturnType<typeof useAppointmentContextValue>
>(null!);

type AppointmentContextValue = {
  appointmentId: number;
  appointmemtIdUser: number;
  appointmentServices: {
    serviceName: string;
    servicePrice: number;
  }[];
  appointmentDateAndTime: string;
  appointmentCarNumber: string;
  appointmentTotal: number;
  appointmentUserFirstName: string;
  appointmentUserLastName: string;
  appointmentUserPhoneNumber: string;
};

function useAppointmentContextValue() {
  const [appointmentState, setAppointmentState] = useState<AppointmentContextValue>({
    appointmentId: -1,
    appointmemtIdUser: -1,
    appointmentServices: [],
    appointmentDateAndTime: "",
    appointmentCarNumber: "",
    appointmentTotal: 0,
    appointmentUserFirstName: "",
    appointmentUserLastName: "",
    appointmentUserPhoneNumber: "",
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

