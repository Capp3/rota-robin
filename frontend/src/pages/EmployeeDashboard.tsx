import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { BalanceCard } from '@/components/dashboard/BalanceCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { Clock, Calendar, FileText, Briefcase, TrendingUp, Timer } from 'lucide-react';
import { getCurrentUserTimeclockEntries, getCurrentUserRequests } from '@/lib/mockData';

const EmployeeDashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const recentEntries = getCurrentUserTimeclockEntries().slice(0, 3);
  const pendingRequests = getCurrentUserRequests().filter(req => req.status === 'PENDING');

  // Calculate OT balance from timeclock entries
  const otHours = getCurrentUserTimeclockEntries()
    .filter(entry => entry.status === 'APPROVED')
    .reduce((sum, entry) => sum + entry.otHours, 0);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="flex flex-1 w-full">
        <Sidebar />
        <main className="flex-1 bg-gradient-subtle p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Welcome Section */}
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back, {user?.firstName}!
              </h1>
              <p className="text-muted-foreground mt-1">
                Here's your timekeeping overview for today
              </p>
            </div>

            {/* Balance Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <BalanceCard
                title="Holiday Balance"
                hours={user?.holidayBalanceHours || 0}
                icon={Calendar}
                variant="default"
              />
              <BalanceCard
                title="TOIL Balance"
                hours={user?.toilBalanceHours || 0}
                icon={Timer}
                variant="accent"
              />
              <BalanceCard
                title="OT Balance"
                hours={otHours}
                icon={TrendingUp}
                variant="success"
              />
              <BalanceCard
                title="Pending Requests"
                hours={pendingRequests.length}
                icon={FileText}
                variant="warning"
              />
            </div>

            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks to get you started</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button onClick={() => navigate('/timeclock')} className="gap-2">
                  <Clock className="h-4 w-4" />
                  Clock In/Out
                </Button>
                <Button onClick={() => navigate('/requests')} variant="outline" className="gap-2">
                  <FileText className="h-4 w-4" />
                  New Request
                </Button>
                <Button onClick={() => navigate('/history')} variant="outline" className="gap-2">
                  <Briefcase className="h-4 w-4" />
                  View History
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Recent Timeclock Entries</CardTitle>
                <CardDescription>Your latest time submissions</CardDescription>
              </CardHeader>
              <CardContent>
                {recentEntries.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No recent entries. Click "Clock In/Out" to get started.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {recentEntries.map((entry) => (
                      <div
                        key={entry.id}
                        className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-accent/50 transition-colors"
                      >
                        <div>
                          <p className="font-medium text-sm">
                            {new Date(entry.entryDate).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {entry.startTime} - {entry.endTime} ({entry.totalHours}h)
                          </p>
                        </div>
                        <div className="text-right">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              entry.status === 'APPROVED'
                                ? 'bg-success/10 text-success'
                                : entry.status === 'PENDING'
                                ? 'bg-warning/10 text-warning'
                                : 'bg-destructive/10 text-destructive'
                            }`}
                          >
                            {entry.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
