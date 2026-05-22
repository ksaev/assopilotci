'use client';

import { useCallback, useState, useEffect } from 'react';
import { apiCall } from './api-client';
import { useAuth } from './auth-context';

/**
 * Hook for fetching data with loading and error states
 */
export function useFetch<T = any>(url: string, options: RequestInit = {}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall<T>(url, {
        ...options,
        token: token || undefined,
      });
      if (response.success && response.data) {
        setData(response.data);
      } else {
        setError(response.error || 'Erreur de chargement');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [url, options, token]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}

/**
 * Hook for mutations (POST, PUT, DELETE)
 */
export function useMutation<T = any, P = any>(url: string, options: RequestInit = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);
  const { token } = useAuth();

  const mutate = useCallback(
    async (payload?: P, method: 'POST' | 'PUT' | 'DELETE' = 'POST') => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiCall<T>(url, {
          ...options,
          method,
          body: payload ? JSON.stringify(payload) : undefined,
          token: token || undefined,
        });

        if (response.success && response.data) {
          setData(response.data);
          return response.data;
        } else {
          throw new Error(response.error || 'Erreur de mutation');
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erreur inconnue';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [url, options, token]
  );

  return { mutate, loading, error, data };
}
