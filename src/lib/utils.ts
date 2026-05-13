
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useNumberAnimation(endValue: number, duration: number = 2000) {
  // Simple functional hook logic could go here or we use motion
}
