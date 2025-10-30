import { useEffect, useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import PrimaryButton from '../../../components/PrimaryButton';
import Input from '../../../components/FormElements/Input';
import Label from '../../../components/FormElements/Label';

export default function LoginForm() {
  const navigate = useNavigate();
  const { login, isLoggingIn } = useLogin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const cookie = new Cookies();
  const jwtCookie = cookie.get('jwt');

  function handleSubmit(e) {
    e.preventDefault();
    console.log(username, password);
    login({ username, password });
  }

  useEffect(() => {
    if (jwtCookie) navigate('/');
  }, [jwtCookie]);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0D0D0D] to-[#1A1A1A]">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl w-[400px] p-10 text-white">
          {/* Logo / Title */}
          <div className="text-center mb-8">
            <div className="w-40 mx-auto mb-1">
              <img src="/logo-dark.png" className="object-contain" />
            </div>
            <p className="text-gray-300 text-sm mt-1 uppercase">Admin</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label className="text-gray-200">Username</Label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoggingIn}
                placeholder="Enter your username"
                className="mt-1 bg-white/10 text-white placeholder-gray-400 border-gray-500 focus:border-[#FF6B00] focus:ring-[#FF6B00]"
              />
            </div>

            <div>
              <Label className="text-gray-200">Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoggingIn}
                placeholder="Enter your password"
                className="mt-1 bg-white/10 text-white placeholder-gray-400 border-gray-500 focus:border-[#FF6B00] focus:ring-[#FF6B00]"
              />
            </div>

            <PrimaryButton
              type="submit"
              disabled={isLoggingIn}
              className="w-full mt-4 py-3 bg-[#FF6B00] hover:bg-[#e66000] text-white font-semibold rounded-lg transition-all duration-200"
            >
              {isLoggingIn ? 'Signing in…' : 'Login'}
            </PrimaryButton>
          </form>

          {/* Footer */}
          <p className="text-xs text-gray-400 text-center mt-8">
            © {new Date().getFullYear()} Emirates Limo. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}
