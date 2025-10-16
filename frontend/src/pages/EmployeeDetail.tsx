import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockEmployees } from '@/lib/mockData';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Calendar, Clock, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const EmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const employee = mockEmployees.find((emp) => emp.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [role, setRole] = useState(employee?.role || 'EMPLOYEE');

  if (!employee) {
    return <div>Employee not found</div>;
  }

  const handleRoleChange = () => {
    toast({
      title: 'Role updated',
      description: `${employee.firstName} ${employee.lastName}'s role has been updated to ${role}`,
    });
    setIsEditing(false);
  };

  const handleBalanceAdjustment = () => {
    toast({
      title: 'Balance adjusted',
      description: 'Employee balance has been updated successfully',
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="flex flex-1 w-full">
        <Sidebar />
        <main className="flex-1 bg-gradient-subtle p-6">
          <div className="mx-auto max-w-5xl space-y-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" onClick={() => navigate('/employees')}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  {employee.firstName} {employee.lastName}
                </h1>
                <p className="text-muted-foreground mt-1">Employee details and time balances</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Personal Information */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label className="text-muted-foreground">Email</Label>
                    <p className="font-medium">{employee.email}</p>
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-muted-foreground">Phone</Label>
                    <p className="font-medium">{employee.phone || 'Not provided'}</p>
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-muted-foreground">Start Date</Label>
                    <p className="font-medium">
                      {employee.startDate
                        ? new Date(employee.startDate).toLocaleDateString()
                        : 'Not provided'}
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-muted-foreground">Emergency Contact</Label>
                    <p className="font-medium">{employee.emergencyContactName || 'Not provided'}</p>
                    <p className="text-sm text-muted-foreground">
                      {employee.emergencyContactPhone || ''}
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-muted-foreground">Status</Label>
                    <Badge variant={employee.isActive ? 'default' : 'secondary'} className="w-fit">
                      {employee.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Role Management */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Edit className="h-5 w-5" />
                    Role Management
                  </CardTitle>
                  <CardDescription>Change employee role and permissions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label>Current Role</Label>
                    {isEditing ? (
                      <Select value={role} onValueChange={setRole}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="EMPLOYEE">Employee</SelectItem>
                          <SelectItem value="MANAGER">Manager</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge variant={employee.role === 'MANAGER' ? 'default' : 'secondary'} className="w-fit">
                        {employee.role}
                      </Badge>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="flex gap-2">
                      <Button onClick={handleRoleChange} className="flex-1">
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => setIsEditing(true)} variant="outline" className="w-full">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Role
                    </Button>
                  )}

                  <div className="rounded-lg bg-muted p-3 text-sm space-y-1">
                    <p className="font-medium">Role Permissions:</p>
                    {role === 'MANAGER' ? (
                      <>
                        <p className="text-muted-foreground">• Approve timeclock entries</p>
                        <p className="text-muted-foreground">• Manage employee requests</p>
                        <p className="text-muted-foreground">• View all employee data</p>
                        <p className="text-muted-foreground">• Adjust time balances</p>
                      </>
                    ) : (
                      <>
                        <p className="text-muted-foreground">• Submit timeclock entries</p>
                        <p className="text-muted-foreground">• Create requests</p>
                        <p className="text-muted-foreground">• View personal data</p>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Time Balances */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Time Balances
                </CardTitle>
                <CardDescription>Current balances and adjustment options</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Holiday Balance
                    </Label>
                    <p className="text-3xl font-bold text-primary">{employee.holidayBalanceHours}h</p>
                    <p className="text-sm text-muted-foreground">
                      {(employee.holidayBalanceHours / 8).toFixed(1)} days
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      TOIL Balance
                    </Label>
                    <p className="text-3xl font-bold text-accent">{employee.toilBalanceHours}h</p>
                    <p className="text-sm text-muted-foreground">
                      {(employee.toilBalanceHours / 8).toFixed(1)} days
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Quick Adjust</Label>
                    <div className="flex gap-2">
                      <Input type="number" placeholder="+/-8" className="w-24" />
                      <Button onClick={handleBalanceAdjustment} size="sm">
                        Adjust
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Enter hours to add/subtract</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeDetail;
