export type ProfileResponse = {
  name: string;
  email: string;
  slug: string;
  image: object | null;
  cover: object | null;
  description: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type LoginResponse = {
  value: string;
};

export type LoginError = {
  error: string;
};

export type SignUpData = {
  name: string;
  email: string;
  password: string;
};

export type SignUpResponse = {
  value: string;
};

export type SignUpError = {
  error: string;
};

export type UpdateProfileData = {
  name: string;
  description: string;
  slug: string;
};

export type ProfileError = {
  error: string;
};
