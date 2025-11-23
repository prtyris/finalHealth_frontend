import React, { useState } from 'react';

const SubscriptionView = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('gcash');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    verificationId: '',
    email: '',
    phone: '',
    profession: '',
    gcashNumber: '',
    paymentProof: null
  });

  const plans = [
    {
      id: 'free',
      title: 'Free Trial',
      price: '₱0',
      features: ['3 out of record', 'Unable to Lock 10 patients'],
      featured: false
    },
    {
      id: 'monthly',
      title: 'Monthly Plan',
      price: '₱499',
      features: ['Up to 5 out of record', 'Able to Lock 100 patients', 'Cancel anytime'],
      featured: true
    },
    {
      id: 'annual',
      title: 'Annual Plan',
      price: '₱4,999',
      features: ['Up to 5 out of record', 'Able to Lock 100 patients', 'Cancel anytime'],
      featured: false
    }
  ];

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId);
    if (planId === 'free') {
      setCurrentStep(4); // Free trial form
    } else {
      setCurrentStep(2); // Verification step
    }
  };

  const handleNextStep = (step) => {
    setCurrentStep(step);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleCompletePayment = () => {
    // Simulate payment processing
    setCurrentStep(5);
    showSuccessModal('Payment Completed Successfully!', 'Thank you for subscribing. Your payment has been processed.');
  };

  const handleActivateFreeTrial = () => {
    // Simulate free trial activation
    setCurrentStep(6);
    showSuccessModal('Free Trial Activated!', 'Your free trial has been successfully activated. You can now start using FinalHealth!');
  };

  const showSuccessModal = (title, message) => {
    setModalContent({ title, message });
    setShowModal(true);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    handleInputChange('paymentProof', file);
  };

  const getPlanTitle = () => {
    const plan = plans.find(p => p.id === selectedPlan);
    return plan ? `${plan.title} - ${plan.price} / ${plan.id === 'annual' ? 'year' : 'month'}` : '';
  };

  const resetToStart = () => {
    setCurrentStep(1);
    setSelectedPlan('');
    setShowModal(false);
    setFormData({
      fullName: '',
      verificationId: '',
      email: '',
      phone: '',
      profession: '',
      gcashNumber: '',
      paymentProof: null
    });
  };

  // Modal Component
  const Modal = ({ title, message, onClose }) => (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-auto shadow-xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-6">{message}</p>
          <button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            {title.includes('Free Trial') ? 'Get Started' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
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
                  key={plan.id}
                  className={`relative rounded-2xl p-6 md:p-8 transition-all duration-300 cursor-pointer border-2
                    ${plan.featured 
                      ? 'bg-gradient-to-br from-blue-600 to-teal-500 text-white scale-105 shadow-2xl border-transparent' 
                      : 'bg-white border-gray-200 hover:shadow-xl hover:-translate-y-2'
                    }`}
                  onClick={() => handleSelectPlan(plan.id)}
                >
                  {plan.featured && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-yellow-400 text-blue-900 px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className={`text-xl font-semibold mb-4 ${plan.featured ? 'text-white' : 'text-gray-900'}`}>
                      {plan.title}
                    </h3>
                    <div className={`text-4xl font-bold ${plan.featured ? 'text-white' : 'text-blue-600'}`}>
                      {plan.price}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm md:text-base">
                        <span className={`mr-3 font-bold ${plan.featured ? 'text-white' : 'text-green-500'}`}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button 
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition duration-200 mt-auto
                      ${plan.featured 
                        ? 'bg-white text-blue-600 hover:bg-gray-100' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                  >
                    {plan.id === 'free' ? 'Start Free Trial' : 'Subscribe Now'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Verification */}
        {currentStep === 2 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
              Choose Your Plan
            </h1>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
              <p className="text-blue-800 text-sm">
                To continue your subscription, please verify that you're a licensed doctor or an authorized medical secretary.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-blue-600 mb-4">
              Professional Verification by FinalHealth
            </h3>
            <p className="text-gray-600 mb-6">
              Upload your PRC license (for doctors) or employment ID/certificate (for secretaries)
            </p>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input 
                  type="text" 
                  placeholder="Ex: (Ria Dizon)" 
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verification ID Number
                </label>
                <input 
                  type="text" 
                  placeholder="Enter verification number" 
                  value={formData.verificationId}
                  onChange={(e) => handleInputChange('verificationId', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required 
                />
              </div>

              <p className="text-gray-500 text-sm">
                ℹ️ We will not share, not use nor BLAST all verification purposes and will comply confidentiality
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  type="button" 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                  onClick={() => handleNextStep(3)}
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Payment */}
        {currentStep === 3 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-blue-600 text-center mb-3">
              Complete Your Payment
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Securely pay for your chosen plan below
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 p-4 rounded-lg mb-8">
              <div>
                <div className="text-sm font-medium text-gray-600">Plan Type</div>
                <div className="text-lg font-semibold text-gray-900">{getPlanTitle()}</div>
              </div>
              <button 
                onClick={() => handleNextStep(1)}
                className="text-blue-600 hover:text-blue-700 font-semibold text-sm mt-2 sm:mt-0"
              >
                Change Plan
              </button>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Payment Method
                </label>
                <div className="space-y-2">
                  {['gcash', 'card', 'paypal', 'bank'].map((method) => (
                    <label key={method} className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition">
                      <input 
                        type="radio" 
                        name="payment" 
                        value={method}
                        checked={paymentMethod === method}
                        onChange={() => handlePaymentMethodChange(method)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-700 capitalize">
                        {method === 'gcash' && 'Gcash'}
                        {method === 'card' && 'Credit/Debit Card'}
                        {method === 'paypal' && 'PayPal'}
                        {method === 'bank' && 'Bank Transfer'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Details
                </label>
                <label className="block text-sm text-gray-600 mb-2">Gcash Number</label>
                <input 
                  type="text" 
                  placeholder="Enter Gcash number" 
                  value={formData.gcashNumber}
                  onChange={(e) => handleInputChange('gcashNumber', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input 
                  type="text" 
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload payment proof <span className="text-gray-500">(optional)</span>
                </label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileUpload}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-gray-500 text-sm mt-2">
                  Note: {formData.paymentProof ? formData.paymentProof.name : 'No File Chosen'}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="flex items-start">
                  <input 
                    type="checkbox" 
                    required 
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                  />
                  <span className="ml-3 text-sm text-gray-700">
                    I agree to the <a href="#" className="text-blue-600 hover:text-blue-700">Terms & Conditions</a> and authorize payment for this subscription
                  </span>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => handleNextStep(2)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200 font-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  onClick={handleCompletePayment}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                >
                  Pay Now
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 4: Free Trial Form */}
        {currentStep === 4 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-blue-600 text-center mb-3">
              Start Your Free Trial
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Complete your information to activate your free trial
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
              <p className="text-blue-800 text-sm">
                Get access to 3 out of record and start using FinalHealth for free!
              </p>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input 
                  type="text" 
                  placeholder="Enter your full name" 
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input 
                  type="tel" 
                  placeholder="Enter your phone number" 
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Type
                </label>
                <select 
                  value={formData.profession}
                  onChange={(e) => handleInputChange('profession', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                >
                  <option value="">Select your profession</option>
                  <option value="doctor">Doctor</option>
                  <option value="dentist">Dentist</option>
                  <option value="secretary">Medical Secretary</option>
                  <option value="other">Other Healthcare Professional</option>
                </select>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="flex items-start">
                  <input 
                    type="checkbox" 
                    required 
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                  />
                  <span className="ml-3 text-sm text-gray-700">
                    I agree to the <a href="#" className="text-blue-600 hover:text-blue-700">Terms & Conditions</a>
                  </span>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => handleNextStep(1)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200 font-semibold"
                >
                  Back
                </button>
                <button 
                  type="button" 
                  onClick={handleActivateFreeTrial}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                >
                  Activate Free Trial
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Success Modals */}
        {showModal && modalContent && (
          <Modal 
            title={modalContent.title}
            message={modalContent.message}
            onClose={resetToStart}
          />
        )}
      </div>
    </div>
  );
};

export default SubscriptionView;