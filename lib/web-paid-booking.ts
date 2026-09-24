export const WEB_AUTH_TOKEN_KEY = "cruuz_web_access_token";
export const WEB_PENDING_PAYMENT_KEY = "cruuz_web_pending_payment";
export const WEB_PENDING_BOOKING_KEY = "cruuz_web_pending_paid_booking";
export const WEB_COMPLETED_PAYMENT_KEY = "cruuz_web_completed_payments";

const MAX_PENDING_AGE_MS = 24 * 60 * 60 * 1000;

export type PendingWebPaidBooking = {
  reference: string;
  createdAt: string;
  tripRequest: {
    pickupAddress: string;
    pickupLat: number;
    pickupLng: number;
    dropoffAddress: string;
    dropoffLat: number;
    dropoffLng: number;
    stops: Array<{
      stopAddress: string;
      stopLat: number;
      stopLng: number;
    }>;
    rideTypeId: string;
    paymentMethod: string;
    distanceKm: number;
    durationMinutes: number;
  };
};

export type CompletedWebPayment = {
  reference: string;
  tripId: string;
  completedAt: string;
};

export function savePendingWebPaidBooking(value: PendingWebPaidBooking) {
  window.localStorage.setItem(WEB_PENDING_BOOKING_KEY, JSON.stringify(value));
  window.localStorage.setItem(WEB_PENDING_PAYMENT_KEY, value.reference);
}

export function getPendingWebPaidBooking(): PendingWebPaidBooking | null {
  const raw = window.localStorage.getItem(WEB_PENDING_BOOKING_KEY);
  if (!raw) return null;

  try {
    const value = JSON.parse(raw) as PendingWebPaidBooking;
    const createdAt = Date.parse(value.createdAt);

    if (
      !value.reference ||
      !value.tripRequest?.pickupAddress ||
      !value.tripRequest?.dropoffAddress ||
      !Number.isFinite(createdAt) ||
      Date.now() - createdAt > MAX_PENDING_AGE_MS
    ) {
      clearPendingWebPaidBooking();
      return null;
    }

    return value;
  } catch {
    clearPendingWebPaidBooking();
    return null;
  }
}

export function clearPendingWebPaidBooking() {
  window.localStorage.removeItem(WEB_PENDING_BOOKING_KEY);
  window.localStorage.removeItem(WEB_PENDING_PAYMENT_KEY);
}

export function getCompletedWebPayment(
  reference: string
): CompletedWebPayment | null {
  try {
    const raw = window.localStorage.getItem(WEB_COMPLETED_PAYMENT_KEY);
    const values = raw ? (JSON.parse(raw) as CompletedWebPayment[]) : [];
    return values.find((value) => value.reference === reference) || null;
  } catch {
    return null;
  }
}

export function recordCompletedWebPayment(value: CompletedWebPayment) {
  let values: CompletedWebPayment[] = [];

  try {
    const raw = window.localStorage.getItem(WEB_COMPLETED_PAYMENT_KEY);
    values = raw ? (JSON.parse(raw) as CompletedWebPayment[]) : [];
  } catch {
    values = [];
  }

  const next = [
    value,
    ...values.filter((item) => item.reference !== value.reference),
  ].slice(0, 10);

  window.localStorage.setItem(WEB_COMPLETED_PAYMENT_KEY, JSON.stringify(next));
}
