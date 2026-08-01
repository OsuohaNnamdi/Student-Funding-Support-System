import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { authApi } from '../api/authApi';
import { accessApi } from '../api/accessApi';

const AuthContext = createContext(null);

function readStoredUser() {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function persistSession(data) {
  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  localStorage.setItem('user', JSON.stringify(data.user));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);
  const [grants, setGrants] = useState(new Set());

  const refreshGrants = useCallback(async () => {
    if (!user) {
      setGrants(new Set());
      return;
    }
    try {
      const list = await accessApi.listMyGrants();
      setGrants(new Set(list.map((g) => `${g.service}_${g.level}`)));
    } catch {
      // Leave grants as-is; screens that need a grant fall back to handling a 403 directly.
    }
  }, [user]);

  useEffect(() => {
    refreshGrants();
  }, [refreshGrants]);

  const login = useCallback(async (email, password) => {
    const data = await authApi.login(email, password);
    persistSession(data);
    setUser(data.user);
    return data.user;
  }, []);

  const register = useCallback(async (payload) => {
    await authApi.register(payload);
    // Registration doesn't return a session — the new account logs in separately afterward.
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
    setGrants(new Set());
  }, []);

  const hasGrant = useCallback((service, level) => grants.has(`${service}_${level}`), [grants]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'ADMIN',
      grants,
      hasGrant,
      refreshGrants,
      login,
      register,
      logout,
    }),
    [user, grants, hasGrant, refreshGrants, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
