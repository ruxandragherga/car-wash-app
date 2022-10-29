import axios from "axios";
import { useUserContext } from "../contexts/UserContext";

export function useLogin() {
  // const loading = useLoading();
  const [, setUserState] = useUserContext();

  async function doLogin(
    signInData: {
      email: string;
      password: string;
    },

  ) {
    try {
      const res = await axios.get("http://localhost:3002/api/get");
      const { data } = await res;
      const allUsers = data;

      const currentUserInDatabase = allUsers.find(
        (user: any) =>  user.user_email === signInData.email && user.user_password === signInData.password 
      );

      return await currentUserInDatabase;
    } catch (err) {
      console.log(err);
    }
    // const [, userData] = await loading(
    //   Promise.all([delay(delayMs), postApiUserLogin(signIn)]),
    //   msg,
    // );
  }

  return { doLogin };
}