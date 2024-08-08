import { APIRoute } from "@/app/const";

import {
  ProfileResponse,
  LoginResponse,
  LoginError,
  LoginData,
  SignUpData,
  SignUpError,
  SignUpResponse,
  UpdateProfileData,
  ProfileError,
} from "@/types/api-types";

export const getUsers = async (url: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || "Getting profile failed";
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    throw error;
  }
};

export const getProfile = async (key: string): Promise<ProfileResponse> => {
  try {
    const response = await fetch(APIRoute.Profile, {
      headers: {
        "X-API-KEY": key,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || "Getting profile failed";
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    throw error;
  }
};

export const login = async (data: LoginData): Promise<LoginResponse | LoginError> => {
  try {
    const response = await fetch(APIRoute.Auth, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return errorData;
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return { error: "An unexpected error occurred" };
  }
};

export const signUp = async (data: SignUpData): Promise<SignUpResponse | SignUpError> => {
  try {
    const response = await fetch(APIRoute.SignUp, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return errorData;
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return { error: "An unexpected error occurred" };
  }
};

export const updateProfile = async (data: UpdateProfileData, key: string): Promise<ProfileResponse | ProfileError> => {
  try {
    const response = await fetch(APIRoute.Profile, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": key,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error || "Update failed" };
    }

    return await response.json();
  } catch (error) {
    return { error: "An unexpected error occurred" };
  }
};
