import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { login, register } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/Card';
import { toast } from 'sonner';
import { GraduationCap } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = loginSchema.extend({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const handleLogin = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      toast.success('Login successful!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: RegisterForm) => {
    setIsLoading(true);
    try {
      await register(data.email, data.password, data.name);
      toast.success('Registration successful!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4">
      <Card className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <GraduationCap className="h-12 w-12 text-primary mb-4" />
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Medical College
          </h1>
          <p className="text-muted-foreground mt-2">
            {isLogin ? 'Login to your account' : 'Create a new account'}
          </p>
        </div>

        {isLogin ? (
          <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                {...loginForm.register('email')}
              />
              {loginForm.formState.errors.email && (
                <p className="text-sm text-destructive mt-1">
                  {loginForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...loginForm.register('password')}
              />
              {loginForm.formState.errors.password && (
                <p className="text-sm text-destructive mt-1">
                  {loginForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        ) : (
          <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                {...registerForm.register('name')}
              />
              {registerForm.formState.errors.name && (
                <p className="text-sm text-destructive mt-1">
                  {registerForm.formState.errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="reg-email">Email</Label>
              <Input
                id="reg-email"
                type="email"
                placeholder="your.email@example.com"
                {...registerForm.register('email')}
              />
              {registerForm.formState.errors.email && (
                <p className="text-sm text-destructive mt-1">
                  {registerForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="reg-password">Password</Label>
              <Input
                id="reg-password"
                type="password"
                placeholder="••••••••"
                {...registerForm.register('password')}
              />
              {registerForm.formState.errors.password && (
                <p className="text-sm text-destructive mt-1">
                  {registerForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                {...registerForm.register('confirmPassword')}
              />
              {registerForm.formState.errors.confirmPassword && (
                <p className="text-sm text-destructive mt-1">
                  {registerForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Register'}
            </Button>
          </form>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-primary hover:underline"
          >
            {isLogin
              ? "Don't have an account? Register"
              : 'Already have an account? Login'}
          </button>
        </div>
      </Card>
    </div>
  );
}
