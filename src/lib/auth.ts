import { apiPost } from './api';

export interface User {
  id: string;
  email: string;
  role: 'student' | 'faculty' | 'staff' | 'admin' | 'alumni';
  name?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export function setTokens(tokens: AuthTokens) {
  localStorage.setItem('accessToken', tokens.accessToken);
  localStorage.setItem('refreshToken', tokens.refreshToken);
}

export function getAccessToken(): string | null {
  return localStorage.getItem('accessToken');
}

export function getRefreshToken(): string | null {
  return localStorage.getItem('refreshToken');
}

export function clearTokens() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

export async function login(email: string, password: string): Promise<{ user: User; tokens: AuthTokens }> {
  const response = await apiPost<{ user: User; tokens: AuthTokens }>('/auth/login', {
    email,
    password,
  });
  
  if (response.data) {
    setTokens(response.data.tokens);
    return response.data;
  }
  
  throw new Error('Login failed');
}

export async function register(email: string, password: string, name: string): Promise<{ user: User; tokens: AuthTokens }> {
  const response = await apiPost<{ user: User; tokens: AuthTokens }>('/auth/register', {
    email,
    password,
    name,
  });
  
  if (response.data) {
    setTokens(response.data.tokens);
    return response.data;
  }
  
  throw new Error('Registration failed');
}

export async function refreshAuth(): Promise<AuthTokens> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }
  
  const response = await apiPost<AuthTokens>('/auth/refresh', {
    refreshToken,
  });
  
  if (response.data) {
    setTokens(response.data);
    return response.data;
  }
  
  throw new Error('Token refresh failed');
}

export function logout() {
  clearTokens();
  window.location.href = '/';
}
