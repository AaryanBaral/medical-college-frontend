import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface RequireAuthProps {
  children: React.ReactNode;
  roles?: string[];
}

export function RequireAuth({ children, roles }: RequireAuthProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
