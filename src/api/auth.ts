import { useState } from 'react';

interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    userId: string;
    phone: string;
    name: string;
  };
}

const mockUsers: Record<string, { phone: string; name: string }> = {
  '13800138000': { phone: '13800138000', name: '健身达人' },
};

let verificationCodes: Record<string, string> = {};

export const sendVerificationCode = async (phone: string): Promise<AuthResponse> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  verificationCodes[phone] = code;
  
  console.log(`验证码发送成功：${code}`);
  
  return {
    success: true,
    message: '验证码已发送',
  };
};

export const verifyCode = async (phone: string, code: string): Promise<AuthResponse> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (verificationCodes[phone] === code) {
    const user = mockUsers[phone] || { phone, name: '用户' };
    return {
      success: true,
      message: '验证成功',
      data: {
        userId: 'user-001',
        phone: user.phone,
        name: user.name,
      },
    };
  }
  
  return {
    success: false,
    message: '验证码错误',
  };
};

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendCode = async (phone: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await sendVerificationCode(phone);
      return result;
    } catch (err) {
      setError('发送失败');
      return { success: false, message: '发送失败' };
    } finally {
      setLoading(false);
    }
  };

  const verify = async (phone: string, code: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await verifyCode(phone, code);
      return result;
    } catch (err) {
      setError('验证失败');
      return { success: false, message: '验证失败' };
    } finally {
      setLoading(false);
    }
  };

  return { sendCode, verify, loading, error };
};
