import useSWR from "swr";
import { getUsers } from "@/api/actions";
import { APIRoute } from "@/app/const";
import { ProfileResponse } from "@/types/api-types";

const useGetUsers = () => {
  return useSWR<ProfileResponse[], Error>(APIRoute.Users, getUsers);
};

export default useGetUsers;
