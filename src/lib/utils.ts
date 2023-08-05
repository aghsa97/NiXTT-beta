import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function playSound() {
  const audio = new Audio("/sounds/pencil_check.mp3");
  audio.play();
}
