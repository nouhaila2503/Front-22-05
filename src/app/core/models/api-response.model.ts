export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  errors?: string[];
  pagination?: PaginationInfo;
  timestamp: Date;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ApiError {
  code: string;
  message: string;
  field?: string;
  details?: any;
}
