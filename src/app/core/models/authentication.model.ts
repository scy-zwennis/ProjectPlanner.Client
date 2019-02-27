export interface LoginAuth {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface JwtResponse {
  token: string;
}

export interface UserToken {
  username: string;
  email: string;
  aud: string;
  exp: any;
  iss: string;
  jti: string;
  sub: string;
}
