import useSWRMutation from "swr/mutation";
import { signUp } from "@/api/actions";
import { APIRoute } from "@/app/const";
import { SignUpResponse, SignUpError, SignUpData } from "@/types/api-types";

const useSignUp = () => {
  return useSWRMutation<SignUpResponse | SignUpError, Error, string, SignUpData>(APIRoute.SignUp, (url, data) =>
    signUp(data.arg)
  );
};

export default useSignUp;
