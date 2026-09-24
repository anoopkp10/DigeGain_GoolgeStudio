import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';
import { adminLogin } from '../../lib/api';

interface AdminLoginProps {
  onLoginSuccess: (user: any) => void;
  onBackToSite: () => void;
}

export function AdminLogin({ onLoginSuccess, onBackToSite }: AdminLoginProps) {
  const [email, setEmail] = useState('anoopkp10@gmail.com');
  const [password, setPassword] = useState('DigerGain@2026!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await adminLogin(email, password);
      if (res.success) {
        onLoginSuccess(res.user);
      } else {
        setError(res.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <button
          onClick={onBackToSite}
          className="mx-auto mb-6 flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to DIGEGAIN Public Site</span>
        </button>

        <div className="flex justify-center">
          <img src="/logo-stacked.svg" alt="DIGEGAIN" className="h-24 w-auto drop-shadow-md" />
        </div>
        <h2 className="mt-3 text-center font-display text-2xl font-extrabold text-white">
          Admin Control Panel
        </h2>
        <p className="mt-1 text-center text-xs text-slate-400">
          Secure central management for content, portfolio, inquiries &amp; AI
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-3xl border border-slate-800 bg-slate-800/60 p-8 shadow-2xl backdrop-blur-xl">
          {error && (
            <div className="mb-6 rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-400 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-300">
                Admin Email Address
              </label>
              <div className="mt-1 relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#1E89C1] focus:border-[#1E89C1]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300">
                Password
              </label>
              <div className="mt-1 relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#1E89C1] focus:border-[#1E89C1]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#1E89C1] py-3 text-xs font-bold text-white hover:bg-[#156B97] transition-all disabled:opacity-50 shadow-md shadow-blue-500/20"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In To Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Reminder Box */}
          <div className="mt-6 border-t border-slate-700/80 pt-4 text-center">
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="h-4 w-4 text-[#42A83D]" />
              <span>Verified Session Authentication Active</span>
            </div>
            <p className="mt-1 text-[10px] text-slate-500">
              Default Admin: <span className="font-mono text-slate-300">anoopkp10@gmail.com</span> /{' '}
              <span className="font-mono text-slate-300">DigerGain@2026!</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
