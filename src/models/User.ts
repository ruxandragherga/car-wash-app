export interface User {
    user_id: number;
    user_email: string;
    user_password: string;
    user_role: "admin" | "client" | "";
    user_first_name: string;
    user_second_name: string;
    user_phone_number: string;
  };