import dayjs from "dayjs";

export const formatDateTime = (date: Date): string => {
  return dayjs(date).format("DD/MM/YYYY HH:mm");
};
export const formatDob = (date: Date): string => {
  return dayjs(date).format("DD/MM/YYYY");
};
export const formatDateTimeBill = (date: Date): string => {
  return dayjs(date).format("DD/MM/YYYY");
};

export const formatDateInput = (date: Date): string => {
  return dayjs(date).format("YYYY-MM-DD");
};
