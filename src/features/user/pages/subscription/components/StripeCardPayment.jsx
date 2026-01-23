import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useSubscription } from "../../../context/subscriptions/useSubscription";

export default function StripeCardPayment({ planId, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const { createPaymentIntent, loadMySubscription } = useSubscription();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePay = async () => {
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      // 1️⃣ Ask backend for PaymentIntent

      const clientSecret = await createPaymentIntent(planId);
      if (!clientSecret) return;

      // 2️⃣ Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
        return;
      }

      await loadMySubscription();

      // 4️⃣ UI callback ONLY
      onSuccess();
    } catch (err) {
      setError("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <CardElement className="p-3 border rounded" />
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handlePay}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
