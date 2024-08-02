
export interface APIResponse<T> {
    success: boolean;
    message: string;
    data: T; // Generic type to represent any data structure
    page: CustomPage;
}

export interface UserResponse {
    userId: string;
    name: string;
    username: string;
    phone: string;
    status: string;
    dtCreated: string;
    dtUpdated: string | null;
    email: string;
    roles: string[];
    strLoginProvider: string;
}

export interface CustomPage {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
