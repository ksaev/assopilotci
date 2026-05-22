'use client';

import { useCallback } from 'react';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  status: number;
  message: string;
  data?: any;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

/**
 * Make authenticated API calls
 */
export async function apiCall<T = any>(
  endpoint: string,
  options: RequestInit & { token?: string } = {}
): Promise<ApiResponse<T>> {
  const { token, headers, ...rest } = options;

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  const authHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  } as Record<string, string>;

  if (token) {
    authHeaders['Authorization'] = `Bearer ${token}`;
  } else if (typeof window !== 'undefined') {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      authHeaders['Authorization'] = `Bearer ${storedToken}`;
    }
  }

  try {
    const response = await fetch(url, {
      ...rest,
      headers: authHeaders,
    });

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.error || 'Une erreur est survenue') as Error & { status: number };
      error.status = response.status;
      throw error;
    }

    return data;
  } catch (error) {
    console.error('[v0] API call failed:', error);
    throw error;
  }
}

/**
 * React hook for API calls
 */
export function useApi<T = any>() {
  const get = useCallback(async (endpoint: string, token?: string) => {
    return apiCall<T>(endpoint, { method: 'GET', token });
  }, []);

  const post = useCallback(async (endpoint: string, body?: any, token?: string) => {
    return apiCall<T>(endpoint, { method: 'POST', body: JSON.stringify(body), token });
  }, []);

  const put = useCallback(async (endpoint: string, body?: any, token?: string) => {
    return apiCall<T>(endpoint, { method: 'PUT', body: JSON.stringify(body), token });
  }, []);

  const delete_ = useCallback(async (endpoint: string, token?: string) => {
    return apiCall<T>(endpoint, { method: 'DELETE', token });
  }, []);

  return { get, post, put, delete: delete_ };
}

/**
 * Store auth token in localStorage
 */
export function setAuthToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token);
  }
}

/**
 * Retrieve auth token from localStorage
 */
export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
}

/**
 * Clear auth token
 */
export function clearAuthToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
  }
}
