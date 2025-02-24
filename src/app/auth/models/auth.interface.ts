export interface LoginRequest {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  date_joined: string;
  full_name: string;
  type: 'warehouse' | 'admin' | 'production' | 'accounting'; // Add other possible user types
}

export interface LoginResponse {
  user: User;
  token: string;
}
