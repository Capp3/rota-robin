import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Users, Clock, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { getPendingTimeclockEntries, getPendingRequests, mockEmployees } from '@/lib/mockData';

const ManagementDashboard = () => {
  const navigate = useNavigate();
  const pendingTimeclock = getPendingTimeclockEntries();
  const pendingRequests = getPendingRequests();
  const activeEmployees = mockEmployees.filter(emp => emp.isActive).length;

  const stats = [
    {
      title: 'Active Employees',
      value: activeEmployees,
      icon: Users,
      variant: 'default' as const,
    },
    {
      title: 'Pending Timeclock',
      value: pendingTimeclock.length,
      icon: Clock,
      variant: 'warning' as const,
    },
    {
      title: 'Pending Requests',
      value: pendingRequests.length,
      icon: FileText,
      variant: 'accent' as const,
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="flex flex-1 w-full">
        <Sidebar />
        <main className="flex-1 bg-gradient-subtle p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Management Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Overview of team timekeeping and approvals
              </p>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
              {stats.map((stat) => (
                <Card key={stat.title} className="shadow-card">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pending Approvals */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Pending Timeclock Entries</CardTitle>
                      <CardDescription>Awaiting your approval</CardDescription>
                    </div>
                    <Badge variant="destructive" className="h-6">
                      {pendingTimeclock.length}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {pendingTimeclock.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <CheckCircle className="h-12 w-12 text-success mb-3" />
                      <p className="text-sm text-muted-foreground">
                        All caught up! No pending entries.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {pendingTimeclock.map((entry) => {
                        const employee = mockEmployees.find(e => e.id === entry.employeeId);
                        return (
                          <div
                            key={entry.id}
                            className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-accent/50 transition-colors"
                          >
                            <div>
                              <p className="font-medium text-sm">
                                {employee?.firstName} {employee?.lastName}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(entry.entryDate).toLocaleDateString()} • {entry.totalHours}h
                              </p>
                            </div>
                            <AlertCircle className="h-4 w-4 text-warning" />
                          </div>
                        );
                      })}
                      <Button 
                        onClick={() => navigate('/approvals')} 
                        className="w-full mt-4"
                      >
                        Review All
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Pending Requests</CardTitle>
                      <CardDescription>Holiday, Leave & TOIL</CardDescription>
                    </div>
                    <Badge variant="destructive" className="h-6">
                      {pendingRequests.length}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {pendingRequests.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <CheckCircle className="h-12 w-12 text-success mb-3" />
                      <p className="text-sm text-muted-foreground">
                        All caught up! No pending requests.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {pendingRequests.map((request) => {
                        const employee = mockEmployees.find(e => e.id === request.employeeId);
                        return (
                          <div
                            key={request.id}
                            className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-accent/50 transition-colors"
                          >
                            <div>
                              <p className="font-medium text-sm">
                                {employee?.firstName} {employee?.lastName}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {request.requestType} • {request.durationHours}h
                              </p>
                            </div>
                            <Badge variant="outline">{request.requestType}</Badge>
                          </div>
                        );
                      })}
                      <Button 
                        onClick={() => navigate('/approvals')} 
                        className="w-full mt-4"
                      >
                        Review All
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your team</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button onClick={() => navigate('/employees')} className="gap-2">
                  <Users className="h-4 w-4" />
                  Manage Employees
                </Button>
                <Button onClick={() => navigate('/approvals')} variant="outline" className="gap-2">
                  <CheckCircle className="h-4 w-4" />
                  View Approvals
                </Button>
                <Button onClick={() => navigate('/settings')} variant="outline" className="gap-2">
                  <Clock className="h-4 w-4" />
                  Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManagementDashboard;
