import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Clock, Calendar } from 'lucide-react';

const TimeclockEntry = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    date: today,
    startTime: '',
    endTime: '',
    breakMinutes: '30',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate hours
    const start = new Date(`2000-01-01T${formData.startTime}`);
    const end = new Date(`2000-01-01T${formData.endTime}`);
    const totalMinutes = (end.getTime() - start.getTime()) / 60000 - parseInt(formData.breakMinutes);
    const hours = (totalMinutes / 60).toFixed(2);

    toast({
      title: 'Timeclock entry submitted',
      description: `${hours} hours logged for ${formData.date}`,
    });

    // Reset form
    setFormData({
      date: today,
      startTime: '',
      endTime: '',
      breakMinutes: '30',
      notes: '',
    });

    // Navigate to history
    setTimeout(() => navigate('/history'), 1500);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="flex flex-1 w-full">
        <Sidebar />
        <main className="flex-1 bg-gradient-subtle p-6">
          <div className="mx-auto max-w-3xl space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Clock In/Out</h1>
              <p className="text-muted-foreground mt-1">
                Log your working hours for today or previous dates
              </p>
            </div>

            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>New Timeclock Entry</CardTitle>
                    <CardDescription>Submit your working hours</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      max={today}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="startTime">Start Time</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={formData.startTime}
                        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endTime">End Time</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="breakMinutes">Break Time (minutes)</Label>
                    <Input
                      id="breakMinutes"
                      type="number"
                      min="0"
                      value={formData.breakMinutes}
                      onChange={(e) => setFormData({ ...formData, breakMinutes: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Add any relevant notes about your shift..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button type="submit" className="flex-1">
                      Submit Entry
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => navigate('/history')}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TimeclockEntry;
