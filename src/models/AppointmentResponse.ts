import dayjs from "dayjs";

export interface AppointmentResponse {
    appointment_id: number;
    appointment_user_id: number;
    appointment_services: {
        serviceName: string;
        servicePrice: number;
      }[];
    appointment_date_time: dayjs.Dayjs;
    appointment_car_number: string;
    appointment_user_first_name: string;
    appointment_user_last_name: string;
    appointment_user_phone_number: string;
  };