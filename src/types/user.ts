export interface User {
  id: string;
  name: string;
  email: string;
  mobileNumber: string;
}

export interface UpdateProfileRequest {
  name: string;
  email: string;
  mobileNumber: string;
}
export interface ProfileResponse {
  message: string;
  user: User;
}