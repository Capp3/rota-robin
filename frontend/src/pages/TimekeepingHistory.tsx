import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { getCurrentUserTimeclockEntries } from '@/lib/mockData';
import { Clock, Plus } from 'lucide-react';

const TimekeepingHistory = () => {
  const navigate = useNavigate();
  const entries = getCurrentUserTimeclockEntries();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="flex flex-1 w-full">
        <Sidebar />
        <main className="flex-1 bg-gradient-subtle p-6">
          <div className="mx-auto max-w-5xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Timekeeping History</h1>
                <p className="text-muted-foreground mt-1">
                  View all your submitted timeclock entries
                </p>
              </div>
              <Button onClick={() => navigate('/timeclock')} className="gap-2">
                <Plus className="h-4 w-4" />
                New Entry
              </Button>
            </div>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Your Entries
                </CardTitle>
              </CardHeader>
              <CardContent>
                {entries.length === 0 ? (
                  <div className="text-center py-12">
                    <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No entries yet</p>
                    <Button 
                      onClick={() => navigate('/timeclock')} 
                      variant="outline" 
                      className="mt-4"
                    >
                      Create Your First Entry
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Time</th>
                          <th className="text-right py-3 px-4 font-medium text-muted-foreground">Hours</th>
                          <th className="text-right py-3 px-4 font-medium text-muted-foreground">OT</th>
                          <th className="text-center py-3 px-4 font-medium text-muted-foreground">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {entries.map((entry) => (
                          <tr 
                            key={entry.id} 
                            className="border-b border-border hover:bg-accent/50 transition-colors"
                          >
                            <td className="py-3 px-4">
                              {new Date(entry.entryDate).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4 text-sm text-muted-foreground">
                              {entry.startTime} - {entry.endTime}
                            </td>
                            <td className="py-3 px-4 text-right font-medium">
                              {entry.totalHours}h
                            </td>
                            <td className="py-3 px-4 text-right">
                              <span className={entry.otHours > 0 ? 'text-success font-medium' : 'text-muted-foreground'}>
                                {entry.otHours}h
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Badge
                                variant={
                                  entry.status === 'APPROVED'
                                    ? 'default'
                                    : entry.status === 'PENDING'
                                    ? 'secondary'
                                    : 'destructive'
                                }
                              >
                                {entry.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-sm text-muted-foreground max-w-xs truncate">
                              {entry.notes || '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default TimekeepingHistory;
