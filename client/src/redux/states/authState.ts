export interface AuthState {
  expiresIn: number;
  loading: boolean;
  error: string;
  disconnect: boolean;
}

export const initialState: AuthState = {
  expiresIn: 0,
  loading: false,
  error: "",
  disconnect: false,
};

export interface RegisterUserData {
  email: string;
  password: string;
  phoneNumber: string;
}

export interface RegisterUserResponse {
  token: string;
  message: string;

}

export interface LoginUserData {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  // Define the expected response structure here
  user: { id: string; email: string };
  token: string;
}
