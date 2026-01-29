import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import PrintButtonPdf from "../../../../components/PrintButtonPdf.jsx";
import StripeCardPayment from "./components/StripeCardPayment.jsx";
import { useSubscription } from "../../context/subscriptions/useSubscription.js";

const SubscriptionView = () => {
  const {
    plans,
    subscription,
    plan,
    loadPlans,
    loadMySubscription,
    cancelSubscription,
  } = useSubscription();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // -------------------------------------
  // INITIAL LOAD (UNCHANGED LOGIC)
  // -------------------------------------
  useEffect(() => {
    loadPlans();
    loadMySubscription();
  }, []);

  // -------------------------------------
  // PLAN SELECTION (UNCHANGED LOGIC)
  // -------------------------------------
  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setCurrentStep(plan.planType === "free" ? 4 : 3);
  };

  const resetToStart = () => {
    setCurrentStep(1);
    setSelectedPlan(null);
    setShowModal(false);
  };

  // -------------------------------------
  // CANCEL SUBSCRIPTION (UNCHANGED LOGIC)
  // -------------------------------------
  const handleCancelSubscription = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel your subscription?",
    );
    if (!confirmed) return;

    await cancelSubscription();

    setModalContent({
      title: "Subscription Cancelled",
      message: "Your subscription has been cancelled.",
    });
    setShowModal(true);
  };

  // -------------------------------------
  // ACTIVE SUBSCRIPTION VIEW (DESIGN COPIED)
  // -------------------------------------
  if (subscription) {
    const today = new Date().toISOString().slice(0, 10);
    const isExpired = subscription.endDate < today;

    const planType = plan?.planType;
    const planBadgeClass =
      planType === "free"
        ? "bg-green-100 text-green-700"
        : planType === "monthly"
          ? "bg-blue-100 text-blue-700"
          : planType === "yearly"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-gray-100 text-gray-700";

    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-xl w-full text-center">
            <h1 className="text-3xl font-bold text-blue-600 mb-2">
              Your Subscription
            </h1>

            <span
              className={`inline-block px-4 py-1 rounded-full text-sm font-semibold mb-3 ${
                isExpired
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {isExpired ? "Expired" : "Active"}
            </span>

            <div className="mb-4">
              <span
                className={`inline-block px-4 py-1 rounded-full text-xs font-semibold ${planBadgeClass}`}
              >
                {plan?.planName}
              </span>
            </div>

            <p className="text-xl font-semibold text-gray-900 mb-1">
              {plan?.planName}
            </p>

            <p className="text-gray-700 mb-4">
              ₱{plan?.price} · {plan?.maxNumberUsers} user(s) ·{" "}
              {plan?.maxNumberPatient} patients
            </p>

            <p className="text-gray-600 mb-6">{plan?.description}</p>

            <div className="text-left space-y-3 mb-6">
              <p>
                <strong>Status:</strong> {subscription.status}
              </p>
              <p>
                <strong>Auto-renew:</strong>{" "}
                {subscription.autoRenew ? "Enabled" : "Disabled"}
              </p>
              <p>
                <strong>Start Date:</strong> {subscription.startDate}
              </p>
              <p>
                <strong>End Date:</strong> {subscription.endDate}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <PrintButtonPdf subscription={subscription} plan={plan} />
              <button
                onClick={handleCancelSubscription}
                className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold"
              >
                Cancel Subscription
              </button>
            </div>
          </div>

          {showModal && <Modal {...modalContent} onClose={resetToStart} />}
        </div>
      </Layout>
    );
  }

  // -------------------------------------
  // PLAN SELECTION (DESIGN COPIED)
  // -------------------------------------
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          {currentStep === 1 && (
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-blue-600 text-center mb-3">
                Choose Your Plan
              </h1>

              <p className="text-gray-600 text-center mb-8">
                Select the plan that fits your needs best
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {plans.map((p) => (
                  <div
                    key={p.planId}
                    onClick={() => handleSelectPlan(p)}
                    className={`relative rounded-2xl p-6 cursor-pointer border-2 transition-all
                    ${
                      p.planType === "monthly"
                        ? "bg-gradient-to-br from-blue-600 to-teal-500 text-white scale-105 shadow-2xl border-transparent"
                        : "bg-white border-gray-200 hover:shadow-xl hover:-translate-y-2"
                    }`}
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold mb-4">
                        {p.planName}
                      </h3>
                      <div className="text-4xl font-bold">₱{p.price}</div>
                    </div>

                    <ul className="space-y-2 mb-6 text-sm">
                      <li>Max Users: {p.maxNumberUsers}</li>
                      <li>Max Patients: {p.maxNumberPatient}</li>
                      <li>{p.description}</li>
                    </ul>

                    <button
                      disabled={p.planType === "free"}
                      className={`w-full py-3 rounded-lg font-semibold
    ${
      p.planType === "free"
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : "bg-white text-blue-600 hover:bg-blue-50"
    }
  `}
                    >
                      {p.planType === "free"
                        ? "Current Subscription"
                        : "Subscribe Now"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && selectedPlan && (
            <div className="bg-white rounded-2xl shadow-xl p-6 max-w-2xl mx-auto">
              <h1 className="text-3xl font-bold text-center mb-4">
                Pay with Card
              </h1>

              <StripeCardPayment
                planId={selectedPlan.planId}
                onSuccess={async () => {
                  setModalContent({
                    title: "Payment Successful",
                    message: "Your subscription is now active.",
                  });
                  setShowModal(true);
                  // 🔥 HARD REFRESH AFTER MODAL CLOSE
                  setTimeout(() => {
                    window.location.reload();
                  }, 500);
                  await loadMySubscription();
                }}
              />
            </div>
          )}
        </div>
      </div>

      {showModal && <Modal {...modalContent} onClose={resetToStart} />}
    </Layout>
  );
};

// -------------------------------------
// MODAL (UNCHANGED)
// -------------------------------------
const Modal = ({ title, message, onClose }) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl text-center">
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{message}</p>
      <button
        onClick={onClose}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
      >
        Done
      </button>
    </div>
  </div>
);

export default SubscriptionView;
