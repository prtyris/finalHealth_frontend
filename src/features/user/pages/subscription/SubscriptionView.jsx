import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import {
  subscribeToPlan,
  getMySubscription,
  cancelMySubscription,
  getSubscriptionPlans,
} from "../../../../api/subscriptionApi.js";
import PrintButtonPdf from "../../../../components/PrintButtonPdf.jsx";

const SubscriptionView = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(null); // now stores backend plan object
  const [plans, setPlans] = useState([]); // dynamic plans from backend
  const [paymentMethod, setPaymentMethod] = useState("gcash");

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    gcashNumber: "",
    paymentProof: null,
  });

  const [activeSubscription, setActiveSubscription] = useState(null);
  const [activePlan, setActivePlan] = useState(null);

  // -------------------------------------
  // Load Plans (Dynamic)
  // -------------------------------------
  useEffect(() => {
    async function loadPlans() {
      // HARDCODED PLANS (same as your Postman output)
      const hardcodedPlans = [
        {
          planId: 1,
          planName: "Free Trial",
          planType: "free",
          price: 0,
          maxNumberUsers: 1,
          maxNumberPatient: 10,
          description: "Free 7-day trial, 1 user, 10 patients",
          isActive: true,
          createdAt: "2025-11-28T01:24:03.437Z",
        },
        {
          planId: 2,
          planName: "Monthly Plan",
          planType: "monthly",
          price: 499,
          maxNumberUsers: 2,
          maxNumberPatient: 50,
          description: "Monthly plan, up to 2 users and 50 patients",
          isActive: true,
          createdAt: "2025-11-28T01:24:03.437Z",
        },
        {
          planId: 3,
          planName: "Annual Plan",
          planType: "yearly",
          price: 4999,
          maxNumberUsers: 5,
          maxNumberPatient: 100,
          description: "Annual plan, up to 5 users and 100 patients",
          isActive: true,
          createdAt: "2025-11-28T01:24:03.437Z",
        },
      ];

      setPlans(hardcodedPlans);
    }

    loadPlans();
  }, []);

  // -------------------------------------
  // Load Current Subscription
  // -------------------------------------
  useEffect(() => {
    async function loadSubscription() {
      try {
        const { subscription, plan } = await getMySubscription();
        setActiveSubscription(subscription || null);
        setActivePlan(plan || null);
      } catch (err) {
        setActiveSubscription(null);
        setActivePlan(null);
      }
    }
    loadSubscription();
  }, []);

  // -------------------------------------
  // Handle UI Plan Selection
  // -------------------------------------
  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);

    if (plan.planType === "free") {
      setCurrentStep(4);
    } else {
      setCurrentStep(3);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getPlanTitle = () => {
    if (!selectedPlan) return "";
    return `${selectedPlan.planName} - ₱${selectedPlan.price} / ${
      selectedPlan.planType === "yearly" ? "year" : "month"
    }`;
  };

  const showSuccessModal = (title, message) => {
    setModalContent({ title, message });
    setShowModal(true);
  };

  const resetToStart = () => {
    setCurrentStep(1);
    setSelectedPlan(null);
    setShowModal(false);
    setFormData({
      fullName: "",
      gcashNumber: "",
      paymentProof: null,
    });
  };

  // -------------------------------------
  // BACKEND INTEGRATION
  // -------------------------------------
  const handleCompletePayment = async () => {
    try {
      const result = await subscribeToPlan(selectedPlan.planId, paymentMethod);

      setActiveSubscription(result.subscription);
      setActivePlan(result.plan);

      showSuccessModal(
        "Payment Completed!",
        `Subscription activated. Plan: ${result.plan.planName}`
      );
    } catch (error) {
      showSuccessModal("Payment Failed", error.message);
    }
  };

  const handleActivateFreeTrial = async () => {
    try {
      const freePlan = plans.find((p) => p.planType === "free");

      const result = await subscribeToPlan(freePlan.planId, "gcash");

      setActiveSubscription(result.subscription);
      setActivePlan(result.plan);

      showSuccessModal(
        "Free Trial Activated!",
        "Your free trial is now active."
      );
    } catch (error) {
      showSuccessModal("Failed to activate free trial", error.message);
    }
  };

  const handleCancelSubscription = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel your subscription? This will immediately disable your access."
    );
    if (!confirmed) return;

    try {
      await cancelMySubscription();
      showSuccessModal(
        "Subscription Cancelled",
        "Your subscription has been cancelled."
      );

      setActiveSubscription(null);
      setActivePlan(null);
    } catch (error) {
      showSuccessModal("Cancellation Failed", error.message);
    }
  };

  // -------------------------------------
  // MODAL COMPONENT
  // -------------------------------------
  const Modal = ({ title, message, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-auto shadow-xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-6">{message}</p>
          <button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );

  // -------------------------------------
  // ACTIVE SUBSCRIPTION VIEW
  // -------------------------------------
  if (activeSubscription) {
    const today = new Date().toISOString().slice(0, 10);
    const isExpired = activeSubscription.endDate < today;

    const planType = activePlan?.planType;
    let planBadgeClass =
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
          <div
            id="subscription-print-area"
            className="bg-white p-8 rounded-2xl shadow-xl max-w-xl w-full text-center"
          >
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
                {activePlan?.planName}
              </span>
            </div>

            <p className="text-xl font-semibold text-gray-900 mb-1">
              {activePlan?.planName}
            </p>

            <p className="text-gray-700 mb-4">
              ₱{activePlan?.price} · {activePlan?.maxNumberUsers} user(s) ·{" "}
              {activePlan?.maxNumberPatient} patients
            </p>

            <p className="text-gray-600 mb-6">{activePlan?.description}</p>

            <div className="text-left space-y-3 mb-6">
              <p>
                <strong>Subscription ID:</strong>{" "}
                {activeSubscription.subscriptionId}
              </p>
              <p>
                <strong>Status:</strong> {activeSubscription.status}
              </p>
              <p>
                <strong>Auto-renew:</strong>{" "}
                {activeSubscription.autoRenew ? "Enabled" : "Disabled"}
              </p>
              <p>
                <strong>Start Date:</strong> {activeSubscription.startDate}
              </p>
              <p>
                <strong>End Date:</strong> {activeSubscription.endDate}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(activeSubscription.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <PrintButtonPdf
                subscription={activeSubscription}
                plan={activePlan}
              />
              <button
                type="button"
                onClick={handleCancelSubscription}
                className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-200"
              >
                Cancel Subscription
              </button>
            </div>
          </div>

          {showModal && modalContent && (
            <Modal
              title={modalContent.title}
              message={modalContent.message}
              onClose={resetToStart}
            />
          )}
        </div>
      </Layout>
    );
  }

  // -------------------------------------
  // PLAN SELECTION (NO ACTIVE SUBSCRIPTION)
  // -------------------------------------
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          {/* Step 1: Choose Plan */}
          {currentStep === 1 && (
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-blue-600 text-center mb-3 tracking-wider">
                Choose Your Plan
              </h1>

              <p className="text-gray-600 text-center mb-8 md:mb-10 text-lg">
                Select the plan that fits your needs best
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                {plans.map((plan) => (
                  <div
                    key={plan.planId}
                    onClick={() => handleSelectPlan(plan)}
                    className={`relative rounded-2xl p-6 md:p-8 transition-all duration-300 cursor-pointer border-2
                    ${
                      plan.planType === "monthly"
                        ? "bg-gradient-to-br from-blue-600 to-teal-500 text-white scale-105 shadow-2xl border-transparent"
                        : "bg-white border-gray-200 hover:shadow-xl hover:-translate-y-2"
                    }`}
                  >
                    {plan.planType === "monthly" && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-yellow-400 text-blue-900 px-4 py-1 rounded-full text-sm font-semibold">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <h3
                        className={`text-xl font-semibold mb-4 ${
                          plan.planType === "monthly"
                            ? "text-white"
                            : "text-gray-900"
                        }`}
                      >
                        {plan.planName}
                      </h3>

                      <div
                        className={`text-4xl font-bold ${
                          plan.planType === "monthly"
                            ? "text-white"
                            : "text-blue-600"
                        }`}
                      >
                        ₱{plan.price}
                      </div>
                    </div>

                    <ul className="space-y-3 mb-8">
                      <li className="text-sm">
                        Max Users: {plan.maxNumberUsers}
                      </li>
                      <li className="text-sm">
                        Max Patients: {plan.maxNumberPatient}
                      </li>
                      <li className="text-sm">{plan.description}</li>
                    </ul>

                    <button
                      className={`w-full py-3 px-6 rounded-lg font-semibold transition duration-200 mt-auto
                      ${
                        plan.planType === "monthly"
                          ? "bg-white text-blue-600 hover:bg-gray-100"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      {plan.planType === "free"
                        ? "Start Free Trial"
                        : "Subscribe Now"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && selectedPlan && (
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-2xl mx-auto">
              <h1 className="text-3xl font-bold text-blue-600 text-center mb-3">
                Complete Your Payment
              </h1>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 p-4 rounded-lg mb-8">
                <div>
                  <div className="text-sm font-medium text-gray-600">
                    Plan Type
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {getPlanTitle()}
                  </div>
                </div>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-blue-600 hover:text-blue-700 font-semibold text-sm mt-2 sm:mt-0"
                >
                  Change Plan
                </button>
              </div>

              <form className="space-y-6">
                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Payment Method
                  </label>

                  <div className="space-y-2">
                    {["gcash", "card", "paypal", "bank"].map((method) => (
                      <label
                        key={method}
                        className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition"
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method}
                          checked={paymentMethod === method}
                          onChange={() => setPaymentMethod(method)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-gray-700 capitalize">
                          {method === "gcash" && "Gcash"}
                          {method === "card" && "Credit/Debit Card"}
                          {method === "paypal" && "PayPal"}
                          {method === "bank" && "Bank Transfer"}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Gcash Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gcash Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Gcash number"
                    value={formData.gcashNumber}
                    onChange={(e) =>
                      handleInputChange("gcashNumber", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleCompletePayment}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg"
                  >
                    Pay Now
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 4: Free Trial */}
          {currentStep === 4 && (
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-2xl mx-auto">
              <h1 className="text-3xl font-bold text-blue-600 text-center mb-3">
                Start Your Free Trial
              </h1>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleActivateFreeTrial}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg"
                >
                  Activate Free Trial
                </button>
              </div>
            </div>
          )}

          {showModal && modalContent && (
            <Modal
              title={modalContent.title}
              message={modalContent.message}
              onClose={resetToStart}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SubscriptionView;
