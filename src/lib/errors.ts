import { ApiResponse } from '@/types';

export function successResponse<T>(
  data: T,
  message: string = 'Success'
): ApiResponse<T> {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
}

export function errorResponse(
  message: string,
  errors?: Record<string, string[]>
): ApiResponse {
  return {
    success: false,
    message,
    errors,
    timestamp: new Date().toISOString(),
  };
}

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function handleError(error: any) {
  if (error instanceof ApiError) {
    return {
      statusCode: error.statusCode,
      body: errorResponse(error.message, error.errors),
    };
  }

  console.error('Unexpected error:', error);
  return {
    statusCode: 500,
    body: errorResponse('Internal server error'),
  };
}
