export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface LoginArgs {
  email: string;
  password: string;
}