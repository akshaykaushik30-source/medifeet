import React, { useState } from 'react';
import { Eye, EyeOff, Stethoscope } from 'lucide-react';
import { useAccount } from '../context/AccountContext';

const GoogleMark = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
  </svg>
);

const FacebookMark = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#1877F2" d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v2.9h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12z" />
  </svg>
);

// Sign-in / create-account page (Figma frame "medifeet-login", node 1:2981).
export const LoginPage = ({ onNavigate }) => {
  const { signIn } = useAccount();
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState('');

  const isSignUp = mode === 'signup';

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn({ email, name: isSignUp ? name : undefined });
    onNavigate('account');
  };

  const socialNotice = (provider) =>
    setNotice(`${provider} sign-in will be available once customer accounts are connected to Shopify. Use your email for now.`);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] font-['Geist']">
      {/* Brand panel */}
      <section className="relative bg-[radial-gradient(ellipse_at_30%_40%,#2E5A2A_0%,#1E3F20_45%,#142A15_100%)] text-white px-8 sm:px-20 py-16 lg:py-24 flex flex-col justify-between gap-16 min-h-[420px] lg:min-h-[700px]">
        <div className="space-y-6 max-w-md">
          <p className="font-['Outfit'] font-semibold text-sm uppercase tracking-wide text-[#84BD3A]">Orthotic Innovation</p>
          <h1 className="font-['Outfit'] font-bold text-5xl sm:text-[52px] leading-[1.1] tracking-tight">
            Every Step,
            <br />
            Restored.
          </h1>
          <p className="text-base leading-relaxed text-white/85">
            Experience biomechanically engineered shoes designed to support natural stride, joint alignment, and ultimate comfort.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0">
            <Stethoscope size={19} className="text-[#84BD3A]" />
          </span>
          <div>
            <p className="font-['Outfit'] font-bold text-sm uppercase">Recommended by Podiatrists</p>
            <p className="text-xs text-white/75">Tested and certified for foot recovery wellness.</p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-white px-6 sm:px-20 py-16 lg:py-24 flex items-center">
        <div className="w-full max-w-[440px] mx-auto space-y-8">
          <div className="space-y-3">
            <h2 className="font-['Outfit'] font-bold text-3xl sm:text-[32px] tracking-tight">
              {isSignUp ? 'Create Your Account' : 'Welcome Back'}
            </h2>
            <p className="text-sm text-[#6B7280]">
              {isSignUp
                ? 'Join MediFeet to track orders, save addresses and keep your wishlist.'
                : 'Sign in to your account to track orders and save your details.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button type="button" onClick={() => socialNotice('Google')} className="flex items-center justify-center gap-2.5 border border-gray-200 rounded-md py-3 font-['Outfit'] font-semibold text-sm hover:bg-gray-50 transition-[color,background-color,border-color,opacity,transform] duration-150 cursor-pointer active:scale-[0.97]">
              <GoogleMark /> Google
            </button>
            <button type="button" onClick={() => socialNotice('Facebook')} className="flex items-center justify-center gap-2.5 border border-gray-200 rounded-md py-3 font-['Outfit'] font-semibold text-sm hover:bg-gray-50 transition-[color,background-color,border-color,opacity,transform] duration-150 cursor-pointer active:scale-[0.97]">
              <FacebookMark /> Facebook
            </button>
          </div>
          {notice && <p className="text-xs text-[#6B7280] -mt-4">{notice}</p>}

          <div className="flex items-center gap-4 text-xs text-[#6B7280] uppercase">
            <span className="flex-1 h-px bg-gray-200" />
            Or {isSignUp ? 'sign up' : 'sign in'} with email
            <span className="flex-1 h-px bg-gray-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <div className="space-y-2">
                <label htmlFor="login-name" className="block font-['Outfit'] font-bold text-xs uppercase">Full Name</label>
                <input
                  id="login-name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rahul Sharma"
                  autoComplete="name"
                  className="w-full border border-gray-200 rounded-md px-4 py-3.5 text-sm focus:outline-none focus:border-[#1E3F20]"
                />
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="login-email" className="block font-['Outfit'] font-bold text-xs uppercase">Email Address</label>
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rahul.sharma@example.com"
                autoComplete="email"
                className="w-full border border-gray-200 rounded-md px-4 py-3.5 text-sm focus:outline-none focus:border-[#1E3F20]"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <label htmlFor="login-password" className="font-['Outfit'] font-bold text-xs uppercase">Password</label>
                {!isSignUp && (
                  <button type="button" onClick={() => onNavigate('contact')} className="font-['Outfit'] font-semibold text-sm text-[#1E3F20] hover:underline cursor-pointer">
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={isSignUp ? 8 : undefined}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                  className="w-full border border-gray-200 rounded-md pl-4 pr-12 py-3.5 text-sm focus:outline-none focus:border-[#1E3F20]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full bg-[#1E3F20] hover:bg-[#285424] text-white font-['Outfit'] font-bold text-sm uppercase py-4 rounded-full transition-[color,background-color,border-color,opacity,transform] duration-150 cursor-pointer active:scale-[0.97]">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-[#6B7280]">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => {
                setMode(isSignUp ? 'signin' : 'signup');
                setNotice('');
              }}
              className="font-['Outfit'] font-bold text-[#1E3F20] hover:underline cursor-pointer"
            >
              {isSignUp ? 'Sign In' : 'Create Account'}
            </button>
          </p>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
