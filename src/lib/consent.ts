"use client";

const STORAGE_KEY = "cookie_consent";

export type ConsentValue = "granted" | "denied";

export function getConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEY) as ConsentValue | null;
}

export function setConsent(value: ConsentValue): void {
  localStorage.setItem(STORAGE_KEY, value);
  window.dispatchEvent(new CustomEvent("consent-change", { detail: value }));
}

export function resetConsent(): void {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent("consent-change", { detail: null }));
}
