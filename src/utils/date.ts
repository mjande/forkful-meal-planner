import { Dayjs } from 'dayjs';

export function stripTimeFromDate(date: Dayjs): string {
  const iso = date.toISOString();
  const parts = iso.split('T');
  return parts[0];
}
