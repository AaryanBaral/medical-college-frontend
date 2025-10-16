const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

interface ApiResponse<T = any> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
  meta?: {
    page: number;
    pages: number;
    count: number;
  };
}

class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

let csrfToken: string | null = null;

export async function getCsrf(): Promise<string> {
  if (csrfToken) return csrfToken;
  
  const response = await fetch(`${API_BASE}/health`);
  const token = response.headers.get('X-CSRF-Token');
  if (token) {
    csrfToken = token;
  }
  return csrfToken || '';
}

function getAuthToken(): string | null {
  return localStorage.getItem('accessToken');
}

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  // Check for rotated CSRF token
  const newCsrf = response.headers.get('X-CSRF-Token');
  if (newCsrf) {
    csrfToken = newCsrf;
  }

  const data: ApiResponse<T> = await response.json();

  if (!response.ok || data.status === 'error') {
    throw new ApiError(
      response.status,
      data.message || 'An error occurred',
      data.errors
    );
  }

  return data;
}

export async function apiGet<T = any>(
  path: string,
  params?: Record<string, any>
): Promise<ApiResponse<T>> {
  const url = new URL(`${API_BASE}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url.toString(), { headers });
  return handleResponse<T>(response);
}

export async function apiPost<T = any>(
  path: string,
  body?: any
): Promise<ApiResponse<T>> {
  await getCsrf();
  
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  if (csrfToken) {
    headers['X-CSRF-Token'] = csrfToken;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  
  return handleResponse<T>(response);
}

export async function apiPut<T = any>(
  path: string,
  body?: any
): Promise<ApiResponse<T>> {
  await getCsrf();
  
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  if (csrfToken) {
    headers['X-CSRF-Token'] = csrfToken;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  });
  
  return handleResponse<T>(response);
}

export async function apiDelete<T = any>(
  path: string
): Promise<ApiResponse<T>> {
  await getCsrf();
  
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  if (csrfToken) {
    headers['X-CSRF-Token'] = csrfToken;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    method: 'DELETE',
    headers,
  });
  
  return handleResponse<T>(response);
}

export { ApiError };
