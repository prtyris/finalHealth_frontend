import { apiRequest } from "../../../api/httpClient/httpClient";

// GET plans
export const getSubscriptionPlansApi = () =>
  apiRequest("/api/subscription-routes/plans");

// GET my subscription (SINGLE SOURCE OF TRUTH)
export const getMySubscriptionApi = () =>
  apiRequest("/api/subscription-routes/me");

// Cancel subscription
export const cancelMySubscriptionApi = () =>
  apiRequest("/api/subscription-routes/cancel", {
    method: "POST",
  });

// Subscribe (used for free trial OR non-stripe fallback)
export const subscribeToPlanApi = (payload) =>
  apiRequest("/api/subscription-routes/subscribe", {
    method: "POST",
    body: JSON.stringify(payload),
  });

// POST create payment intent
export const createPaymentIntentApi = (planId) =>
  apiRequest("/api/subscription-routes-v2/payments/intent", {
    method: "POST",
    body: JSON.stringify({ planId }),
  });
