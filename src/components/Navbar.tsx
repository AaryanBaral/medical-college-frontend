import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { logout } from '@/lib/auth';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/admissions', label: 'Admissions' },
    { path: '/faculty', label: 'Faculty' },
    { path: '/research', label: 'Research' },
    { path: '/library', label: 'Library' },
    { path: '/notices', label: 'Notices' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-primary shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary-foreground" />
            <span className="text-xl font-heading font-bold text-primary-foreground">
              Medical College
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'border-b-2 border-secondary text-primary-foreground'
                    : 'text-primary-foreground/90 hover:text-primary-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {user ? (
              <>
                {user.role === 'student' && (
                  <Link
                    to="/portal"
                    className="text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground"
                  >
                    Portal
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth/login"
                className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-primary-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-primary border-t border-primary-foreground/20">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block rounded-lg px-3 py-2 text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-primary-foreground hover:bg-primary-foreground/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {user ? (
              <>
                {user.role === 'student' && (
                  <Link
                    to="/portal"
                    onClick={() => setIsOpen(false)}
                    className="block rounded-lg px-3 py-2 text-base font-medium text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    Portal
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left rounded-lg px-3 py-2 text-base font-medium bg-accent text-accent-foreground"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth/login"
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium bg-accent text-accent-foreground"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
