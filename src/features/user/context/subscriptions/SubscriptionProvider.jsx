import { useState } from "react";
import { SubscriptionContext } from "./SubscriptionContext";

import {
  getSubscriptionPlansApi,
  getMySubscriptionApi,
  cancelMySubscriptionApi,
  createPaymentIntentApi,
} from "../../api/subscriptionApi.js";

export const SubscriptionProvider = ({ children }) => {
  const [plans, setPlans] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [plan, setPlan] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // -----------------------------
  // Load plans
  // -----------------------------
  const loadPlans = async () => {
    setLoading(true);
    setError(null);

    const res = await getSubscriptionPlansApi();

    if (!res.ok) {
      setError(res.message);
      setLoading(false);
      return;
    }

    setPlans(res.data.plans || []);
    setLoading(false);
  };

  // -----------------------------
  // Load my subscription (/me)
  // -----------------------------
  const loadMySubscription = async () => {
    setLoading(true);
    setError(null);

    const res = await getMySubscriptionApi();

    if (!res.ok) {
      setError(res.message);
      setLoading(false);
      return;
    }

    setSubscription(res.data.subscription || null);
    setPlan(res.data.plan || null);
    setLoading(false);
  };

  // -----------------------------
  // Create Stripe PaymentIntent
  // -----------------------------
  const createPaymentIntent = async (planId) => {
    setLoading(true);
    setError(null);

    const res = await createPaymentIntentApi(planId);

    if (!res.ok) {
      setError(res.message);
      setLoading(false);
      return null;
    }

    setLoading(false);
    return res.data.clientSecret;
  };

  // -----------------------------
  // Cancel subscription
  // -----------------------------
  const cancelSubscription = async () => {
    setLoading(true);
    setError(null);

    const res = await cancelMySubscriptionApi();

    if (!res.ok) {
      setError(res.message);
      setLoading(false);
      return;
    }

    await loadMySubscription();
    setLoading(false);
  };

  // -----------------------------
  // Clear (logout / switch user)
  // -----------------------------
  const clearSubscription = () => {
    setSubscription(null);
    setPlan(null);
    setPlans([]);
  };

  return (
    <SubscriptionContext.Provider
      value={{
        plans,
        subscription,
        plan,
        loading,
        error,
        loadPlans,
        loadMySubscription,
        createPaymentIntent,
        cancelSubscription,
        clearSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
