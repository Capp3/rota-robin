import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Clock, 
  FileText, 
  Users, 
  CheckSquare, 
  Settings,
  History
} from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { cn } from '@/lib/utils';

const employeeNav = [
  { title: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { title: 'Clock In/Out', icon: Clock, href: '/timeclock' },
  { title: 'History', icon: History, href: '/history' },
  { title: 'Requests', icon: FileText, href: '/requests' },
];

const managerNav = [
  { title: 'Dashboard', icon: LayoutDashboard, href: '/management' },
  { title: 'Employees', icon: Users, href: '/employees' },
  { title: 'Approvals', icon: CheckSquare, href: '/approvals' },
  { title: 'Settings', icon: Settings, href: '/settings' },
];

export const Sidebar = () => {
  const { isManager } = useUser();
  const navigation = isManager ? managerNav : employeeNav;

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col border-r border-border bg-card">
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn('h-5 w-5', isActive && 'drop-shadow-sm')} />
                <span>{item.title}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
