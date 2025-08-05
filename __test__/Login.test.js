import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../src/components/login/Login';
import { useLogin } from '@/tanstackquery/account';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

// Mock các thư viện, hook dùng trong component
jest.spyOn(console, 'error').mockImplementation(() => {});
jest.mock('@/tanstackquery/account');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));
jest.mock('@/lib/cookie', () => ({
  setRole: jest.fn(),
  setUsername: jest.fn(),
  setProfile: jest.fn(),
}));
jest.mock('@/store/store', () => () => ({
  setCookieStore: jest.fn(),
}));

describe('Login component', () => {
  const pushMock = jest.fn();
  const mutateAsyncMock = jest.fn();

  beforeEach(() => {
    useRouter.mockReturnValue({ push: pushMock });
    useLogin.mockReturnValue({
      mutateAsync: mutateAsyncMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders inputs and button', () => {
    render(<Login />);
    expect(screen.getByLabelText(/Tên tài khoản/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mật khẩu/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /đăng nhập/i })).toBeInTheDocument();
  });

  test('successful login redirects user based on role', async () => {
    mutateAsyncMock.mockResolvedValue({
      role: 'DOCTOR',
      username: 'doctor01',
      profile: 'profile-data',
    });

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/Tên tài khoản/i), {
      target: { value: 'doctor01' },
    });
    fireEvent.change(screen.getByLabelText(/Mật khẩu/i), {
      target: { value: '123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /đăng nhập/i }));

    await waitFor(() => {
      expect(mutateAsyncMock).toHaveBeenCalledWith({
        username: 'doctor01',
        password: '123',
      });
      expect(toast.success).toHaveBeenCalledWith('Đăng nhập thành công!');
      expect(pushMock).toHaveBeenCalledWith('/doctor');
    });
  });

  test('failed login shows error toast', async () => {
    mutateAsyncMock.mockRejectedValue(new Error('Invalid credentials'));

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/Tên tài khoản/i), {
      target: { value: 'wronguser' },
    });
    fireEvent.change(screen.getByLabelText(/Mật khẩu/i), {
      target: { value: 'wrongpass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /đăng nhập/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Đăng nhập thất bại!');
    });
  });
});
