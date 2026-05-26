import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Dumbbell, CheckCircle2, Loader2 } from 'lucide-react';
import { useAuth } from '@/api/auth';
import { useAppStore } from '@/store/appStore';

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { sendCode, verify, loading } = useAuth();
  const setUser = useAppStore(state => state.setUser);
  const setIsLoggedIn = useAppStore(state => state.setIsLoggedIn);

  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [codeInput, setCodeInput] = useState(['', '', '', '', '', '']);
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleBack = () => {
    if (step === 1) {
      navigate('/');
    } else {
      setStep(1);
      setCode('');
      setCodeInput(['', '', '', '', '', '']);
      setCodeSent(false);
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleSendCode = async () => {
    if (!phone || phone.length !== 11) {
      setError('请输入正确的手机号码');
      return;
    }
    setError('');
    const result = await sendCode(phone);
    if (result.success) {
      setCodeSent(true);
      setCountdown(60);
      setStep(2);
    } else {
      setError(result.message);
    }
  };

  const handleCodeInput = (index: number, value: string) => {
    if (value.length > 1) return;
    const newInput = [...codeInput];
    newInput[index] = value;
    setCodeInput(newInput);
    const newCode = newInput.join('');
    setCode(newCode);
    
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  const handleSubmit = async () => {
    if (!agreed) {
      setError('请同意服务条款和隐私政策');
      return;
    }
    if (code.length !== 6) {
      setError('请输入完整的验证码');
      return;
    }
    setError('');
    
    const result = await verify(phone, code);
    if (result.success) {
      setUser({
        id: result.data!.userId,
        phone: result.data!.phone,
        name: result.data!.name,
      });
      setIsLoggedIn(true);
      navigate('/dashboard');
    } else {
      setError(result.message);
      setCode('');
      setCodeInput(['', '', '', '', '', '']);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>返回首页</span>
        </button>

        <div className="bg-dark-800/80 backdrop-blur-md rounded-2xl p-8 border border-dark-600">
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center">
              <Dumbbell className="w-7 h-7 text-white" />
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mb-8">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    s <= step
                      ? 'bg-primary-500 text-white'
                      : 'bg-dark-600 text-gray-500'
                  }`}
                >
                  {s === 1 ? '1' : s === 2 ? (codeSent ? <CheckCircle2 className="w-5 h-5" /> : '2') : ''}
                </div>
                {s < 2 && (
                  <div
                    className={`w-16 h-1 mx-2 rounded-full transition-all ${
                      step > 1 ? 'bg-primary-500' : 'bg-dark-600'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-center text-white mb-2">
            {step === 1 ? '手机号登录/注册' : '验证验证码'}
          </h2>
          <p className="text-gray-400 text-center mb-8 text-sm">
            {step === 1 ? '开启您的个性化健康之旅' : '验证码已发送至您的手机'}
          </p>

          {error && (
            <div className="bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          {step === 1 ? (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-400 text-sm mb-2">手机号码</label>
                <div className="flex items-center">
                  <span className="bg-dark-700 border border-dark-600 rounded-l-lg px-4 py-3 text-gray-400">
                    +86
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 11);
                      setPhone(val);
                    }}
                    placeholder="请输入手机号"
                    className="input-field rounded-l-none flex-1"
                    maxLength={11}
                  />
                </div>
              </div>

              <button
                onClick={handleSendCode}
                disabled={loading || phone.length !== 11}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  '获取验证码'
                )}
              </button>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="agreement"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-dark-500 bg-dark-700 text-primary-500 focus:ring-primary-500"
                />
                <label htmlFor="agreement" className="text-gray-400 text-xs">
                  我已阅读并同意
                  <a href="#" className="text-primary-500 hover:underline">服务条款</a>
                  和
                  <a href="#" className="text-primary-500 hover:underline">隐私政策</a>
                </label>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  验证码已发送至 {phone.slice(0, 3)}****{phone.slice(7)}
                </label>
                <div className="flex justify-center gap-2">
                  {codeInput.map((digit, index) => (
                    <input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      value={digit}
                      onChange={(e) => handleCodeInput(index, e.target.value)}
                      className="w-12 h-12 text-center text-xl font-semibold bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                      maxLength={1}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading || code.length !== 6}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  '完成并开始训练'
                )}
              </button>

              <button
                onClick={() => {
                  if (countdown === 0) {
                    handleSendCode();
                  }
                }}
                disabled={countdown > 0}
                className="w-full text-gray-400 hover:text-primary-500 text-sm transition-colors disabled:opacity-50"
              >
                {countdown > 0 ? `重新发送 (${countdown}s)` : '重新发送验证码'}
              </button>
            </div>
          )}

          <p className="text-center text-gray-500 text-xs mt-8">
            登录即表示同意 · 账号安全由代起保障
          </p>
        </div>
      </div>
    </div>
  );
}
