/**
 * Cliente centralizado para llamadas a API
 * Maneja autenticación, headers comunes y manejo de errores
 */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000/api/v1';

export interface FetchOptions extends RequestInit {
  token?: string;
  isFormData?: boolean;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public details: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Realiza una llamada a la API con autenticación y manejo de errores
 */
export async function apiCall<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { token, isFormData, ...fetchOptions } = options;

  const headers: Record<string, string> = {};

  // Solo setear Content-Type si no es FormData
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  if (typeof fetchOptions.headers === 'object' && fetchOptions.headers) {
    Object.assign(headers, fetchOptions.headers);
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new ApiError(
        `API error: ${response.status}`,
        response.status,
        errorData
      );
    }

    return response.json() as Promise<T>;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new ApiError(error.message, 0, '');
    }
    throw new ApiError('Unknown error', 0, '');
  }
}

/**
 * Helper para logs en desarrollo
 */
export function logApiCall(
  method: string,
  endpoint: string,
  data?: unknown
) {
  if (import.meta.env.DEV) {
    console.log(`[API] ${method} ${endpoint}`, data);
  }
}
