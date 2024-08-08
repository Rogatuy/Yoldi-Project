import useSWRMutation from "swr/mutation";
import { updateProfile } from "@/api/actions";
import { APIRoute } from "@/app/const";
import { useAuthState } from "@/context/AuthState";
import { ProfileResponse, ProfileError, UpdateProfileData } from "@/types/api-types";

const useUpdate = () => {
  const { authKey } = useAuthState();

  return useSWRMutation<ProfileResponse | ProfileError, Error, string, UpdateProfileData>(
    APIRoute.Profile,
    (url, data) => updateProfile(data.arg, authKey)
  );
};

export default useUpdate;
