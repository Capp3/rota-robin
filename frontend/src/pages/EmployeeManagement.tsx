import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { mockEmployees } from '@/lib/mockData';
import { useNavigate } from 'react-router-dom';
import { Users, Search } from 'lucide-react';
import { useState } from 'react';

const EmployeeManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = mockEmployees.filter((emp) =>
    `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="flex flex-1 w-full">
        <Sidebar />
        <main className="flex-1 bg-gradient-subtle p-6">
          <div className="mx-auto max-w-6xl space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Employee Management</h1>
              <p className="text-muted-foreground mt-1">
                View and manage all employees and their balances
              </p>
            </div>

            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    All Employees
                  </CardTitle>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search employees..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Role</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">Holiday</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">TOIL</th>
                        <th className="text-center py-3 px-4 font-medium text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEmployees.map((employee) => (
                        <tr
                          key={employee.id}
                          onClick={() => navigate(`/employees/${employee.id}`)}
                          className="border-b border-border hover:bg-accent/50 transition-colors cursor-pointer"
                        >
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">
                                {employee.firstName} {employee.lastName}
                              </p>
                              <p className="text-sm text-muted-foreground">{employee.email}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={employee.role === 'MANAGER' ? 'default' : 'secondary'}>
                              {employee.role}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-right font-medium">
                            {employee.holidayBalanceHours}h
                          </td>
                          <td className="py-3 px-4 text-right font-medium">
                            {employee.toilBalanceHours}h
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Badge variant={employee.isActive ? 'default' : 'secondary'}>
                              {employee.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeManagement;
