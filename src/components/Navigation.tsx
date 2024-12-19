import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Settings, TicketPlus, LogOut } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../contexts/AuthContext';

export function Navigation() {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  
  return (
    <nav className="border-b-[3px] border-[var(--mac-border)] bg-[var(--mac-beige)]">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className={`mac-button flex items-center gap-2 px-4 py-2 ${
              location.pathname === '/'
                ? 'bg-black dark:bg-white text-white dark:text-black'
                : ''
            }`}
          >
            <TicketPlus size={20} />
            <span>Create Ticket</span>
          </Link>
          
          <Link
            to="/admin"
            className={`mac-button flex items-center gap-2 px-4 py-2 ${
              location.pathname === '/admin'
                ? 'bg-black dark:bg-white text-white dark:text-black'
                : ''
            }`}
          >
            <Settings size={20} />
            <span>Admin</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {isAuthenticated && (
            <button
              onClick={logout}
              className="mac-button flex items-center gap-2 px-4 py-2"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}