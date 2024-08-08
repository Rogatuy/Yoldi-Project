import useSWR from "swr";
import { getUsers } from "@/api/actions";
import { APIRoute } from "@/app/const";
import { ProfileResponse } from "@/types/api-types";

const useGetUser = (slug: string = "") => {
  const url = APIRoute.Users;

  const endUrl = `${url}/${slug}`;

  return useSWR<ProfileResponse, Error>(endUrl, getUsers);
};

export default useGetUser;
