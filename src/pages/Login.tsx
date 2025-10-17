import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/contexts/UserContext';
import { loginUser } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import { Clock } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = loginUser(username, password);
      
      if (user) {
        setUser(user);
        toast({
          title: 'Login successful',
          description: `Welcome back, ${user.firstName}!`,
        });
        
        // Navigate based on role
        if (user.role === 'MANAGER') {
          navigate('/management');
        } else {
          navigate('/dashboard');
        }
      } else {
        toast({
          variant: 'destructive',
          title: 'Login failed',
          description: 'Invalid username or password',
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-subtle p-4">
      <Card className="w-full max-w-md shadow-elevated">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary">
            <Clock className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">NI Assembly Timekeeping</CardTitle>
          <CardDescription>
            Enter your credentials to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="jsmith"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          
          <div className="mt-6 rounded-lg bg-muted p-4 text-sm">
            <p className="font-semibold mb-2">Demo Credentials:</p>
            <p><strong>Employee:</strong> abrown / password</p>
            <p><strong>Manager:</strong> jsmith / password</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
