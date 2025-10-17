import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Settings as SettingsIcon, Clock, Calendar } from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();

  const [settings, setSettings] = useState({
    otCalculation: 'PER_DAY',
    otThreshold: '8',
    otMultiplier: '1.5',
    otPayout: 'TOIL',
    toilEnabled: true,
    timezone: 'Europe/London',
    payPeriod: 'MONTHLY',
  });

  const handleSave = () => {
    toast({
      title: 'Settings saved',
      description: 'Your system settings have been updated successfully',
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="flex flex-1 w-full">
        <Sidebar />
        <main className="flex-1 bg-gradient-subtle p-6">
          <div className="mx-auto max-w-4xl space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Settings</h1>
              <p className="text-muted-foreground mt-1">
                Configure system-wide timekeeping and overtime settings
              </p>
            </div>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Overtime Settings
                </CardTitle>
                <CardDescription>Configure how overtime is calculated and paid</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Calculation Method</Label>
                  <RadioGroup
                    value={settings.otCalculation}
                    onValueChange={(value) => setSettings({ ...settings, otCalculation: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="PER_DAY" id="per-day" />
                      <Label htmlFor="per-day" className="font-normal cursor-pointer">
                        Per Day (daily OT threshold)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="PER_WEEK" id="per-week" />
                      <Label htmlFor="per-week" className="font-normal cursor-pointer">
                        Per Week (weekly OT threshold)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="threshold">OT Threshold (hours)</Label>
                    <Input
                      id="threshold"
                      type="number"
                      value={settings.otThreshold}
                      onChange={(e) => setSettings({ ...settings, otThreshold: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">
                      Hours before overtime applies
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="multiplier">OT Multiplier</Label>
                    <Select
                      value={settings.otMultiplier}
                      onValueChange={(value) => setSettings({ ...settings, otMultiplier: value })}
                    >
                      <SelectTrigger id="multiplier">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1x (Standard)</SelectItem>
                        <SelectItem value="1.5">1.5x (Time and Half)</SelectItem>
                        <SelectItem value="2">2x (Double Time)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>OT Payout Method</Label>
                  <RadioGroup
                    value={settings.otPayout}
                    onValueChange={(value) => setSettings({ ...settings, otPayout: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="PAYCHECK" id="paycheck" />
                      <Label htmlFor="paycheck" className="font-normal cursor-pointer">
                        Paycheck (paid as wages)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="TOIL" id="toil" />
                      <Label htmlFor="toil" className="font-normal cursor-pointer">
                        TOIL (Time Off In Lieu)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="space-y-0.5">
                    <Label>Enable TOIL</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow employees to request time off in lieu
                    </p>
                  </div>
                  <Switch
                    checked={settings.toilEnabled}
                    onCheckedChange={(checked) => setSettings({ ...settings, toilEnabled: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  General Settings
                </CardTitle>
                <CardDescription>System-wide configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={settings.timezone}
                      onValueChange={(value) => setSettings({ ...settings, timezone: value })}
                    >
                      <SelectTrigger id="timezone">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                        <SelectItem value="Europe/Dublin">Europe/Dublin (GMT)</SelectItem>
                        <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                        <SelectItem value="America/Los_Angeles">America/Los_Angeles (PST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="payPeriod">Pay Period</Label>
                    <Select
                      value={settings.payPeriod}
                      onValueChange={(value) => setSettings({ ...settings, payPeriod: value })}
                    >
                      <SelectTrigger id="payPeriod">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WEEKLY">Weekly</SelectItem>
                        <SelectItem value="BIWEEKLY">Bi-weekly</SelectItem>
                        <SelectItem value="MONTHLY">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3">
              <Button variant="outline">Reset to Defaults</Button>
              <Button onClick={handleSave}>Save Settings</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
