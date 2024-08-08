import useSWR from "swr";
import { getProfile } from "@/api/actions";
import { useAuthState } from "@/context/AuthState";

const useGetProfile = () => {
  const { authKey } = useAuthState();

  return useSWR(authKey, getProfile);
};

export default useGetProfile;
