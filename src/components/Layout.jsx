import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useConfirm } from '../context/ConfirmContext';
import Avatar from './Avatar';

export default function Layout() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const confirm = useConfirm();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    setMenuOpen(false);
    const ok = await confirm({ title: 'Log out?', message: 'You can log back in any time.', confirmText: 'Log out' });
    if (ok) {
      logout();
      navigate('/');
    }
  };

  const link = ({ isActive }) => `top-nav-link${isActive ? ' active' : ''}`;

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/" className="brand">
          <span className="brand-mark">SS</span>
          Syntechtic Scholars
        </Link>

        <nav className="top-nav">
          <NavLink to="/" end className={link}>Home</NavLink>
          <NavLink to="/scholarships" className={link}>Scholarships</NavLink>
          <NavLink to="/pricing" className={link}>Funds</NavLink>

          {isAuthenticated && !isAdmin && (
            <>
              <NavLink to="/applications/mine" className={link}>My Applications</NavLink>
              <NavLink to="/access-requests" className={link}>Access</NavLink>
            </>
          )}
          {isAdmin && (
            <>
              <NavLink to="/admin/applications" className={link}>Review Applications</NavLink>
              <NavLink to="/admin/scholarships" className={link}>Scholarships</NavLink>
              <NavLink to="/admin/funds" className={link}>Funds</NavLink>
              <NavLink to="/admin/access-requests" className={link}>Access Requests</NavLink>
            </>
          )}

          <NavLink to="/about" className={link}>About</NavLink>
        </nav>

        <div className="topbar-spacer" />

        <div className="topbar-actions">
          <button className="icon-btn" onClick={toggleTheme} title="Toggle theme" type="button">
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {isAuthenticated ? (
            <div className="user-menu">
              <button className="avatar-chip" onClick={() => setMenuOpen((o) => !o)} type="button">
                <Avatar name={user.name || user.email} size={28} />
                <span>{user.name || user.email}</span>
              </button>
              {menuOpen && (
                <div className="dropdown" onMouseLeave={() => setMenuOpen(false)}>
                  <div style={{ padding: '6px 12px 10px', fontSize: 12, color: 'var(--ink-500)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {user.role}
                  </div>
                  <button className="dropdown-item danger" onClick={handleLogout} type="button">Sign out</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary btn-sm">Log in</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Sign up</Link>
            </>
          )}
        </div>
      </header>

      <Outlet />
    </div>
  );
}
