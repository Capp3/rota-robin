import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getPendingTimeclockEntries, getPendingRequests, mockEmployees } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, Clock, FileText } from 'lucide-react';

const TimeclockApprovals = () => {
  const { toast } = useToast();
  const pendingTimeclock = getPendingTimeclockEntries();
  const pendingRequests = getPendingRequests();

  const handleApprove = (id: string, type: 'timeclock' | 'request') => {
    toast({
      title: 'Approved',
      description: `${type === 'timeclock' ? 'Timeclock entry' : 'Request'} has been approved`,
    });
  };

  const handleReject = (id: string, type: 'timeclock' | 'request') => {
    toast({
      variant: 'destructive',
      title: 'Rejected',
      description: `${type === 'timeclock' ? 'Timeclock entry' : 'Request'} has been rejected`,
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="flex flex-1 w-full">
        <Sidebar />
        <main className="flex-1 bg-gradient-subtle p-6">
          <div className="mx-auto max-w-6xl space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Approvals</h1>
              <p className="text-muted-foreground mt-1">
                Review and approve timeclock entries and time off requests
              </p>
            </div>

            <Tabs defaultValue="timeclock" className="space-y-4">
              <TabsList>
                <TabsTrigger value="timeclock" className="gap-2">
                  <Clock className="h-4 w-4" />
                  Timeclock Entries ({pendingTimeclock.length})
                </TabsTrigger>
                <TabsTrigger value="requests" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Requests ({pendingRequests.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="timeclock">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Pending Timeclock Entries</CardTitle>
                    <CardDescription>Review and approve employee time submissions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {pendingTimeclock.length === 0 ? (
                      <div className="text-center py-12">
                        <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
                        <p className="text-muted-foreground">All caught up! No pending entries.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {pendingTimeclock.map((entry) => {
                          const employee = mockEmployees.find((e) => e.id === entry.employeeId);
                          const daysOld = Math.floor(
                            (new Date().getTime() - new Date(entry.createdAt).getTime()) /
                              (1000 * 60 * 60 * 24)
                          );

                          return (
                            <div
                              key={entry.id}
                              className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-accent/50 transition-colors"
                            >
                              <div className="space-y-1 flex-1">
                                <div className="flex items-center gap-2">
                                  <p className="font-medium">
                                    {employee?.firstName} {employee?.lastName}
                                  </p>
                                  {daysOld > 7 && (
                                    <Badge variant="destructive">Overdue</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(entry.entryDate).toLocaleDateString()} • {entry.startTime} - {entry.endTime}
                                </p>
                                <div className="flex gap-4 text-sm">
                                  <span>
                                    <strong>Hours:</strong> {entry.totalHours}h
                                  </span>
                                  {entry.otHours > 0 && (
                                    <span className="text-success">
                                      <strong>OT:</strong> {entry.otHours}h
                                    </span>
                                  )}
                                  <span className="text-muted-foreground">
                                    Submitted {daysOld}d ago
                                  </span>
                                </div>
                                {entry.notes && (
                                  <p className="text-sm text-muted-foreground mt-2">{entry.notes}</p>
                                )}
                              </div>
                              <div className="flex gap-2 ml-4">
                                <Button
                                  size="sm"
                                  onClick={() => handleApprove(entry.id, 'timeclock')}
                                  className="gap-2"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleReject(entry.id, 'timeclock')}
                                  className="gap-2"
                                >
                                  <XCircle className="h-4 w-4" />
                                  Reject
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="requests">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Pending Requests</CardTitle>
                    <CardDescription>Review holiday, leave, and TOIL requests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {pendingRequests.length === 0 ? (
                      <div className="text-center py-12">
                        <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
                        <p className="text-muted-foreground">All caught up! No pending requests.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {pendingRequests.map((request) => {
                          const employee = mockEmployees.find((e) => e.id === request.employeeId);

                          return (
                            <div
                              key={request.id}
                              className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-accent/50 transition-colors"
                            >
                              <div className="space-y-1 flex-1">
                                <div className="flex items-center gap-2">
                                  <p className="font-medium">
                                    {employee?.firstName} {employee?.lastName}
                                  </p>
                                  <Badge variant="outline">{request.requestType}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                                </p>
                                <p className="text-sm">
                                  <strong>Duration:</strong> {request.durationHours}h ({(request.durationHours / 8).toFixed(1)} days)
                                </p>
                                {request.notes && (
                                  <p className="text-sm text-muted-foreground mt-2">{request.notes}</p>
                                )}
                                <p className="text-xs text-muted-foreground mt-2">
                                  Current balance: {
                                    request.requestType === 'HOLIDAY'
                                      ? employee?.holidayBalanceHours
                                      : request.requestType === 'TOIL'
                                      ? employee?.toilBalanceHours
                                      : 'N/A'
                                  }h
                                </p>
                              </div>
                              <div className="flex gap-2 ml-4">
                                <Button
                                  size="sm"
                                  onClick={() => handleApprove(request.id, 'request')}
                                  className="gap-2"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleReject(request.id, 'request')}
                                  className="gap-2"
                                >
                                  <XCircle className="h-4 w-4" />
                                  Reject
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TimeclockApprovals;
