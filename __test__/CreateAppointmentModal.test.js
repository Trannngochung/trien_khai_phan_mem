import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateAppointmentModal from '../src/components/user/home/CreateAppointmentModal';
import { useCreateAppointment, useUpdateAppointment } from '@/tanstackquery/appointments';
import { useGetDoctors } from '@/tanstackquery/doctor';
import useAuthStore from '@/store/store';
import { toast } from 'react-toastify';

jest.spyOn(console, 'error').mockImplementation(() => {});

jest.mock('antd', () => ({
  Modal: ({ children, onOk, onCancel, title }) => (
    <div>
      <div>{title}</div>
      {children}
      <button onClick={onOk}>Ok</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  ),
}));

jest.mock('@/tanstackquery/appointments', () => ({
  useCreateAppointment: jest.fn(),
  useUpdateAppointment: jest.fn(),
}));

jest.mock('@/tanstackquery/doctor', () => ({
  useGetDoctors: jest.fn(),
}));

jest.mock('@/store/store', () => jest.fn());

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockedUseCreateAppointment = useCreateAppointment;
const mockedUseUpdateAppointment = useUpdateAppointment;
const mockedUseGetDoctors = useGetDoctors;
const mockedUseAuthStore = useAuthStore;

describe('CreateAppointmentModal', () => {
  const mutateCreate = jest.fn();
  const mutateUpdate = jest.fn();
  const handleClose = jest.fn();

  beforeEach(() => {
    mutateCreate.mockImplementation((_, { onSuccess }) => {
      onSuccess();
      return Promise.resolve();
    });
    mutateUpdate.mockImplementation((_, { onSuccess }) => {
      onSuccess();
      return Promise.resolve();
    });
    mockedUseCreateAppointment.mockReturnValue({ mutateAsync: mutateCreate });
    mockedUseUpdateAppointment.mockReturnValue({ mutateAsync: mutateUpdate });
    mockedUseGetDoctors.mockReturnValue({ data: [{ id: 10, fullName: 'Dr A', department: 'Khoa' }] });
    mockedUseAuthStore.mockReturnValue({ profile: { id: 1 } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('submits new appointment', async () => {
    const { container } = render(
      <CreateAppointmentModal
        selectedAppointment={null}
        isModalOpen={true}
        handleCloseModal={handleClose}
      />
    );
    const dateInput = container.querySelector('input[type="datetime-local"]');
    const symptomInput = screen.getByPlaceholderText(
      'Nhập các triệu chứng bạn đang gặp phải'
    );
    fireEvent.change(dateInput, { target: { value: '2025-01-01T10:00' } });
    fireEvent.change(symptomInput, { target: { value: 'Đau họng' } });
    fireEvent.click(screen.getByText('Ok'));
    await waitFor(() => {
      expect(mutateCreate).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('Tạo lịch hẹn thành công!');
      expect(handleClose).toHaveBeenCalled();
    });
  });

  test('updates appointment when selectedAppointment provided', async () => {
    const selected = { id: 2, patientId: 1 };
    const { container } = render(
      <CreateAppointmentModal
        selectedAppointment={selected}
        isModalOpen={true}
        handleCloseModal={handleClose}
      />
    );
    const dateInput = container.querySelector('input[type="datetime-local"]');
    const symptomInput = screen.getByPlaceholderText(
      'Nhập các triệu chứng bạn đang gặp phải'
    );
    fireEvent.change(dateInput, { target: { value: '2025-05-05T15:00' } });
    fireEvent.change(symptomInput, { target: { value: 'Ho' } });
    fireEvent.click(screen.getByText('Ok'));
    await waitFor(() => {
      expect(mutateUpdate).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('Đã sửa lịch hẹn thành công!');
      expect(handleClose).toHaveBeenCalled();
    });
  });

  test('requires doctor when checkbox checked', async () => {
    const { container } = render(
      <CreateAppointmentModal
        selectedAppointment={null}
        isModalOpen={true}
        handleCloseModal={handleClose}
      />
    );
    fireEvent.click(screen.getByRole('checkbox'));
    const dateInput = container.querySelector('input[type="datetime-local"]');
    const symptomInput = screen.getByPlaceholderText(
      'Nhập các triệu chứng bạn đang gặp phải'
    );
    fireEvent.change(dateInput, { target: { value: '2025-06-01T09:00' } });
    fireEvent.change(symptomInput, { target: { value: 'Sốt' } });
    fireEvent.click(screen.getByText('Ok'));
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Vui lòng chọn bác sĩ');
      expect(mutateCreate).not.toHaveBeenCalled();
    });
  });
});