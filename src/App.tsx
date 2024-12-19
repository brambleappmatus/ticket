import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TicketCreator } from './pages/TicketCreator';
import { AdminPanel } from './pages/AdminPanel';
import { LoginPage } from './pages/LoginPage';
import { Navigation } from './components/Navigation';
import { SystemInfo } from './components/SystemInfo';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[var(--mac-beige)] text-[var(--mac-black)]">
          <Navigation />
          <main className="container mx-auto px-4">
            <Routes>
              <Route path="/" element={<TicketCreator />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <SystemInfo />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}