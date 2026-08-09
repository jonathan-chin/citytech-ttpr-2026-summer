import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuthStore from '../store/useAuthStore';

// Base URL of the auth-demo server (see .env.example). Falls back to localhost.
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

interface Credentials {
  email: string;
  password: string;
}

interface Me {
  id: number;
  email: string;
}

async function parseJsonOrThrow(res: Response) {
  const body = await res.json();
  if (!res.ok) throw new Error(body.error ?? body.message ?? 'Request failed');
  return body;
}

// POST /register - create the user, does not log them in
export function useRegister() {
  return useMutation({
    mutationFn: (credentials: Credentials) =>
      fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      }).then(parseJsonOrThrow),
  });
}

// POST /login - passport-local verifies credentials, server returns a signed JWT
export function useLogin() {
  const setToken = useAuthStore((state) => state.setToken);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (credentials: Credentials) =>
      fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      }).then(parseJsonOrThrow) as Promise<{ token: string }>,
    onSuccess: ({ token }) => {
      setToken(token);
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });
}

// GET /me - protected route, only reachable with a valid Bearer token
export function useMe() {
  const token = useAuthStore((state) => state.token);
  return useQuery<Me>({
    queryKey: ['me', token],
    queryFn: () =>
      fetch(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(parseJsonOrThrow),
    enabled: !!token,
    retry: false,
  });
}
