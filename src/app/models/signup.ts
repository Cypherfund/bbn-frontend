export interface Signup {
    name: string | null | undefined;
    username: string | null | undefined;
    email: string | null | undefined;
    phone: string | null | undefined;
    password: string | null | undefined;
    roles?: [string | null | undefined];
}

export interface SignupResponse {
  success: boolean;
  message: string;
  data: string;
}
