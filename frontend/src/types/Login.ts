export interface LoginResponse {
  language: string;
  access: string;
  refresh: string;
}

export interface LoginArgs {
  language: string;
  email: string;
  password: string;
}