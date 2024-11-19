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

export interface ResetArgs {
  language: string;
  email: string;
}

export interface ConfirmArgs {
  language: string;
  new_password: string;
  confirm_password: string;
  token: string;
}