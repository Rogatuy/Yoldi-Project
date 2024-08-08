import useSWRMutation from "swr/mutation";
import { login } from "@/api/actions";
import { APIRoute } from "@/app/const";
import { LoginResponse, LoginError, LoginData } from "@/types/api-types";

const useLogin = () => {
  return useSWRMutation<LoginResponse | LoginError, Error, string, LoginData>(APIRoute.Auth, (url, data) =>
    login(data.arg)
  );
};

export default useLogin;
