import { useState, useEffect } from 'react';
import { User, getAccessToken, clearTokens } from '@/lib/auth';
import { apiGet } from '@/lib/api';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const token = getAccessToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await apiGet<User>('/auth/me');
        if (response.data) {
          setUser(response.data);
        }
      } catch (error) {
        clearTokens();
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  return { user, loading, isAuthenticated: !!user };
}
