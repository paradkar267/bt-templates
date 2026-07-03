import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Mail, Lock, User as UserIcon, Loader2, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../AuthContext';

// Google Icon Component
const GoogleIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
    <path d="M1 1h22v22H1z" fill="none" />
  </svg>
);

// Github Icon Component
const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

// Figma Icon Component
const FigmaIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12C12 15.3137 9.31371 18 6 18C2.68629 18 0 15.3137 0 12C0 8.68629 2.68629 6 6 6C9.31371 6 12 8.68629 12 12Z" fill="#1ABCFE"/>
    <path d="M0 24C0 27.3137 2.68629 30 6 30C9.31371 30 12 27.3137 12 24V18H6C2.68629 18 0 20.6863 0 24Z" fill="#0ACF83"/>
    <path d="M12 0V6H18C21.3137 6 24 3.31371 24 0C24 -3.31371 21.3137 -6 18 -6H12Z" fill="#FF7262" transform="translate(0, 6)"/>
    <path d="M0 6C0 9.31371 2.68629 12 6 12H12V0H6C2.68629 0 0 2.68629 0 6Z" fill="#F24E1E"/>
    <path d="M12 12V24H18C21.3137 24 24 21.3137 24 18C24 14.6863 21.3137 12 18 12H12Z" fill="#A259FF"/>
  </svg>
);

export function AuthModal({ isOpen, onClose }) {
  const { signInWithGoogle, signInWithGithub, signInWithFigma, signIn, signUp, verifyOtp, resetPassword } = useAuth();
  
  const [view, setView] = useState('login'); // 'login' | 'signup' | 'verify'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setView('login');
        setEmail('');
        setPassword('');
        setFullName('');
        setOtp('');
        setShowPassword(false);
      }, 300);
    }
  }, [isOpen]);

  const handleGoogleSignIn = async () => {
    setLoadingGoogle(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      setLoadingGoogle(false);
    }
  };

  const handleGithubSignIn = async () => {
    setLoadingGoogle(true); // Reuse the same loading state for simplicity or create a new one
    try {
      await signInWithGithub();
    } catch (error) {
      setLoadingGoogle(false);
    }
  };

  const handleFigmaSignIn = async () => {
    setLoadingGoogle(true);
    try {
      await signInWithFigma();
    } catch (error) {
      setLoadingGoogle(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoadingEmail(true);
    
    try {
      if (view === 'login') {
        const data = await signIn(email, password);
        if (data.user && !data.session) {
           setView('verify');
           toast.info("Please verify your email address.");
        } else {
           toast.success("Successfully logged in!");
           onClose();
        }
        await signIn(email, password);
        onClose();
      } else if (view === 'signup') {
        await signUp(email, password, fullName);
        setView('verify');
      } else if (view === 'verify') {
        await verifyOtp(email, otp);
        onClose();
      } else if (view === 'forgot-password') {
        await resetPassword(email);
        toast.success("Password reset email sent! Check your inbox.");
        setView('login');
      }
    } catch (error) {
      console.error("Auth Error:", error);
      toast.error(error?.message || "An unexpected error occurred");
    } finally {
      setLoadingEmail(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-md bg-white/95 dark:bg-[#0a0a0a]/90 backdrop-blur-3xl border border-black/10 dark:border-white/10 rounded-[2.5rem] shadow-2xl dark:shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden my-8"
        >
          {/* Background Blobs */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl pointer-events-none mix-blend-screen" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none mix-blend-screen" />

          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors z-20"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>

          <div className="p-8 sm:p-10 relative z-10">
            <div className="mb-8 text-center">
              <div className="mx-auto w-14 h-14 bg-gradient-to-br from-black to-gray-800 dark:from-white dark:to-gray-300 rounded-2xl shadow-xl flex items-center justify-center mb-5 transform rotate-3 hover:rotate-6 transition-transform">
                <span className="text-2xl font-black text-white dark:text-black transform -rotate-3">BT</span>
              </div>
              <h2 className="text-3xl font-black mb-2 text-black dark:text-white tracking-tight">
                {view === 'login' ? 'Welcome back' : view === 'signup' ? 'Create account' : view === 'forgot-password' ? 'Reset password' : 'Verify Email'}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                {view === 'login'
                  ? 'Enter your details to access your dashboard.'
                  : view === 'signup' 
                    ? 'Join the ultimate digital marketplace today.'
                    : view === 'forgot-password'
                      ? 'Enter your email to get a reset link.'
                      : `We sent a 6-digit code to ${email || 'your email'}.`}
              </p>
            </div>

            {/* Social Login Buttons */}
            {view !== 'verify' && view !== 'forgot-password' && (
              <div className="flex gap-4 mb-6">
                <button
                  onClick={handleGoogleSignIn}
                  disabled={loadingGoogle || loadingEmail}
                  className="group relative flex-1 flex items-center justify-center py-3.5 px-4 border border-black/10 dark:border-white/10 rounded-2xl text-sm font-bold text-gray-900 bg-white hover:bg-gray-50 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white transition-all disabled:opacity-70 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                >
                  {loadingGoogle ? (
                    <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
                  ) : (
                    <>
                      <GoogleIcon className="w-5 h-5" />
                      <span className="sr-only">Continue with Google</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleGithubSignIn}
                  disabled={loadingGoogle || loadingEmail}
                  className="group relative flex-1 flex items-center justify-center py-3.5 px-4 border border-black/10 dark:border-white/10 rounded-2xl text-sm font-bold text-gray-900 bg-white hover:bg-gray-50 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white transition-all disabled:opacity-70 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                >
                  {loadingGoogle ? (
                    <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
                  ) : (
                    <>
                      <GithubIcon className="w-5 h-5 text-black dark:text-white" />
                      <span className="sr-only">Continue with GitHub</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleFigmaSignIn}
                  disabled={loadingGoogle || loadingEmail}
                  className="group relative flex-1 flex items-center justify-center py-3.5 px-4 border border-black/10 dark:border-white/10 rounded-2xl text-sm font-bold text-gray-900 bg-white hover:bg-gray-50 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white transition-all disabled:opacity-70 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                >
                  {loadingGoogle ? (
                    <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
                  ) : (
                    <>
                      <FigmaIcon className="w-5 h-5 text-black dark:text-white" />
                      <span className="sr-only">Continue with Figma</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {view !== 'verify' && view !== 'forgot-password' && (
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white/95 dark:bg-[#0a0a0a]/90 text-gray-500 dark:text-gray-400 font-medium">
                    Or continue with email
                  </span>
                </div>
              </div>
            )}

            {/* Email Form */}
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={view}
                  initial={{ opacity: 0, x: view === 'signup' ? 20 : (view === 'verify' ? 20 : -20) }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: view === 'signup' ? -20 : (view === 'verify' ? -20 : 20) }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {view === 'verify' ? (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5 ml-1 text-center">Verification Code</label>
                      <input
                        type="text"
                        required
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="block w-full px-4 py-4 bg-gray-50/50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl leading-5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all text-center text-2xl font-bold tracking-widest"
                        placeholder="123456"
                        maxLength={6}
                      />
                    </div>
                  ) : view === 'forgot-password' ? (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5 ml-1">Email Address</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                          <Mail className="h-5 w-5" />
                        </div>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="block w-full pl-11 pr-4 py-3 bg-gray-50/50 dark:bg-black/50 border border-black/5 dark:border-white/10 rounded-2xl leading-5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 dark:focus:bg-white/5 transition-all sm:text-sm font-medium"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      {view === 'signup' && (
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5 ml-1">Full Name</label>
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                              <UserIcon className="h-5 w-5" />
                            </div>
                            <input
                              type="text"
                              required
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              className="block w-full pl-11 pr-4 py-3 bg-gray-50/50 dark:bg-black/50 border border-black/5 dark:border-white/10 rounded-2xl leading-5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 dark:focus:bg-white/5 transition-all sm:text-sm font-medium"
                              placeholder="John Doe"
                            />
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5 ml-1">Email Address</label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                            <Mail className="h-5 w-5" />
                          </div>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full pl-11 pr-4 py-3 bg-gray-50/50 dark:bg-black/50 border border-black/5 dark:border-white/10 rounded-2xl leading-5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 dark:focus:bg-white/5 transition-all sm:text-sm font-medium"
                            placeholder="you@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5 ml-1 flex justify-between">
                          <span>Password</span>
                          {view === 'login' && (
                            <button type="button" onClick={() => setView('forgot-password')} className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors hover:underline">
                              Forgot password?
                            </button>
                          )}
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                            <Lock className="h-5 w-5" />
                          </div>
                          <input
                            type={showPassword ? "text" : "password"}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full pl-11 pr-12 py-3 bg-gray-50/50 dark:bg-black/50 border border-black/5 dark:border-white/10 rounded-2xl leading-5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 dark:focus:bg-white/5 transition-all sm:text-sm font-medium"
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              <button
                type="submit"
                disabled={loadingGoogle || loadingEmail}
                className="group relative w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-2xl text-sm font-bold text-white bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all disabled:opacity-70 mt-4 overflow-hidden hover:scale-[1.01] active:scale-[0.99] hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                {loadingEmail ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span className="relative z-10">
                      {view === 'login' ? 'Sign in' : view === 'signup' ? 'Create account' : view === 'forgot-password' ? 'Send reset link' : 'Verify code'}
                    </span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
                  </>
                )}
              </button>
            </form>

            {view !== 'verify' && (
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {view === 'login' ? "Don't have an account? " : view === 'signup' ? "Already have an account? " : ""}
                  <button
                    type="button"
                    onClick={() => setView(view === 'login' ? 'signup' : 'login')}
                    className="font-bold text-black dark:text-white hover:underline focus:outline-none"
                  >
                    {view === 'login' ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>
            )}
            
            {view === 'verify' || view === 'forgot-password' ? (
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setView('login')}
                  className="font-bold text-gray-500 hover:text-black dark:hover:text-white text-sm"
                >
                  Back to login
                </button>
              </div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
