// Mock data for development (until backend is ready)

export interface Employee {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'EMPLOYEE' | 'MANAGER';
  phone?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  startDate?: string;
  holidayBalanceHours: number;
  toilBalanceHours: number;
  isActive: boolean;
}

export interface TimeclockEntry {
  id: string;
  employeeId: string;
  entryDate: string;
  startTime: string;
  endTime: string;
  breakMinutes: number;
  eventId?: string;
  notes?: string;
  totalHours: number;
  otHours: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  approvedBy?: string;
  approvedAt?: string;
  createdAt: string;
}

export interface Request {
  id: string;
  employeeId: string;
  requestType: 'HOLIDAY' | 'LEAVE' | 'TOIL';
  startDate: string;
  endDate: string;
  durationHours: number;
  notes?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  approvedBy?: string;
  approvedAt?: string;
  createdAt: string;
}

export const mockEmployees: Employee[] = [
  {
    id: 'emp1',
    username: 'jsmith',
    email: 'john.smith@niassembly.com',
    firstName: 'John',
    lastName: 'Smith',
    role: 'MANAGER',
    phone: '+44 20 1234 5678',
    emergencyContactName: 'Jane Smith',
    emergencyContactPhone: '+44 20 8765 4321',
    startDate: '2020-01-15',
    holidayBalanceHours: 120,
    toilBalanceHours: 16,
    isActive: true,
  },
  {
    id: 'emp2',
    username: 'abrown',
    email: 'alice.brown@niassembly.com',
    firstName: 'Alice',
    lastName: 'Brown',
    role: 'EMPLOYEE',
    phone: '+44 20 2345 6789',
    emergencyContactName: 'Bob Brown',
    emergencyContactPhone: '+44 20 7654 3210',
    startDate: '2021-03-10',
    holidayBalanceHours: 96,
    toilBalanceHours: 8,
    isActive: true,
  },
  {
    id: 'emp3',
    username: 'mjones',
    email: 'michael.jones@niassembly.com',
    firstName: 'Michael',
    lastName: 'Jones',
    role: 'EMPLOYEE',
    phone: '+44 20 3456 7890',
    startDate: '2019-06-20',
    holidayBalanceHours: 80,
    toilBalanceHours: 0,
    isActive: true,
  },
  {
    id: 'emp4',
    username: 'swilson',
    email: 'sarah.wilson@niassembly.com',
    firstName: 'Sarah',
    lastName: 'Wilson',
    role: 'EMPLOYEE',
    phone: '+44 20 4567 8901',
    startDate: '2022-01-05',
    holidayBalanceHours: 112,
    toilBalanceHours: 12,
    isActive: true,
  },
];

export const mockTimeclockEntries: TimeclockEntry[] = [
  {
    id: 'tc1',
    employeeId: 'emp2',
    entryDate: '2025-10-10',
    startTime: '09:00',
    endTime: '17:30',
    breakMinutes: 30,
    notes: 'Regular shift',
    totalHours: 8,
    otHours: 0,
    status: 'APPROVED',
    approvedBy: 'emp1',
    approvedAt: '2025-10-11T10:00:00Z',
    createdAt: '2025-10-10T18:00:00Z',
  },
  {
    id: 'tc2',
    employeeId: 'emp2',
    entryDate: '2025-10-14',
    startTime: '09:00',
    endTime: '19:00',
    breakMinutes: 60,
    notes: 'Extra hours for project deadline',
    totalHours: 9,
    otHours: 1,
    status: 'PENDING',
    createdAt: '2025-10-14T19:30:00Z',
  },
  {
    id: 'tc3',
    employeeId: 'emp3',
    entryDate: '2025-10-13',
    startTime: '08:00',
    endTime: '16:00',
    breakMinutes: 30,
    totalHours: 7.5,
    otHours: 0,
    status: 'PENDING',
    createdAt: '2025-10-13T16:30:00Z',
  },
];

export const mockRequests: Request[] = [
  {
    id: 'req1',
    employeeId: 'emp2',
    requestType: 'HOLIDAY',
    startDate: '2025-11-15',
    endDate: '2025-11-19',
    durationHours: 40,
    notes: 'Family vacation',
    status: 'PENDING',
    createdAt: '2025-10-10T14:00:00Z',
  },
  {
    id: 'req2',
    employeeId: 'emp3',
    requestType: 'TOIL',
    startDate: '2025-10-25',
    endDate: '2025-10-25',
    durationHours: 8,
    notes: 'Using overtime hours',
    status: 'APPROVED',
    approvedBy: 'emp1',
    approvedAt: '2025-10-12T09:00:00Z',
    createdAt: '2025-10-11T16:00:00Z',
  },
];

// Current user (simulating logged-in user)
export let currentUser: Employee = mockEmployees[1]; // Alice Brown (Employee)

export const setCurrentUser = (user: Employee) => {
  currentUser = user;
};

export const loginUser = (username: string, password: string): Employee | null => {
  const user = mockEmployees.find(emp => emp.username === username);
  if (user && password === 'password') { // Simple mock authentication
    setCurrentUser(user);
    return user;
  }
  return null;
};

export const getCurrentUserTimeclockEntries = (): TimeclockEntry[] => {
  return mockTimeclockEntries.filter(entry => entry.employeeId === currentUser.id);
};

export const getCurrentUserRequests = (): Request[] => {
  return mockRequests.filter(req => req.employeeId === currentUser.id);
};

export const getPendingTimeclockEntries = (): TimeclockEntry[] => {
  return mockTimeclockEntries.filter(entry => entry.status === 'PENDING');
};

export const getPendingRequests = (): Request[] => {
  return mockRequests.filter(req => req.status === 'PENDING');
};
