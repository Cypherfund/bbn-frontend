export interface Login {
  usernameOrEmailOrPhone?: string | null | undefined;
  password?: string | null | undefined;
}


export interface LoginResponse {
  accessToken: string | null | undefined;
  tokenType: string | null | undefined;
  userId: string | null | undefined;
}
