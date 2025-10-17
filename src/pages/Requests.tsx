import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getCurrentUserRequests } from '@/lib/mockData';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';
import { FileText, Plus, Calendar } from 'lucide-react';

const Requests = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const requests = getCurrentUserRequests();
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    type: 'HOLIDAY',
    startDate: '',
    endDate: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: 'Request submitted',
      description: `Your ${formData.type.toLowerCase()} request has been submitted for approval.`,
    });

    setOpen(false);
    setFormData({
      type: 'HOLIDAY',
      startDate: '',
      endDate: '',
      notes: '',
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="flex flex-1 w-full">
        <Sidebar />
        <main className="flex-1 bg-gradient-subtle p-6">
          <div className="mx-auto max-w-5xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Time Off Requests</h1>
                <p className="text-muted-foreground mt-1">
                  Manage your holiday, leave, and TOIL requests
                </p>
              </div>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    New Request
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>New Time Off Request</DialogTitle>
                    <DialogDescription>
                      Submit a request for holiday, leave, or TOIL
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Request Type</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) => setFormData({ ...formData, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="HOLIDAY">Holiday</SelectItem>
                          <SelectItem value="LEAVE">Leave</SelectItem>
                          <SelectItem value="TOIL">TOIL</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={formData.endDate}
                          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Add any additional information..."
                        rows={3}
                      />
                    </div>

                    <div className="rounded-lg bg-muted p-3 text-sm">
                      <p className="font-medium mb-1">Current Balances:</p>
                      <p>Holiday: {user?.holidayBalanceHours}h</p>
                      <p>TOIL: {user?.toilBalanceHours}h</p>
                    </div>

                    <Button type="submit" className="w-full">
                      Submit Request
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Your Requests
                </CardTitle>
                <CardDescription>View and manage your time off requests</CardDescription>
              </CardHeader>
              <CardContent>
                {requests.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No requests yet</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Click "New Request" to submit your first time off request
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {requests.map((request) => (
                      <div
                        key={request.id}
                        className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-accent/50 transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{request.requestType}</Badge>
                            <span className="text-sm font-medium">
                              {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {request.durationHours} hours • Submitted {new Date(request.createdAt).toLocaleDateString()}
                          </p>
                          {request.notes && (
                            <p className="text-sm text-muted-foreground mt-1">{request.notes}</p>
                          )}
                        </div>
                        <Badge
                          variant={
                            request.status === 'APPROVED'
                              ? 'default'
                              : request.status === 'PENDING'
                              ? 'secondary'
                              : 'destructive'
                          }
                        >
                          {request.status}
                        </Badge>
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

export default Requests;
