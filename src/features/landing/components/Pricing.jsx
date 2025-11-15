import React from 'react';

const Pricing = () => {
  const plans = [
    {
      name: 'Free Trial',
      price: '₱0',
      features: [
        '1 user access',
        'Basic clinic tools',
        'Limited support',
        'No commitment'
      ],
      buttonText: 'Start Free Trial',
      featured: false
    },
    {
      name: 'Monthly Plan',
      price: '₱499',
      features: [
        '5 user access',
        'Full feature access',
        'Priority support',
        'Cancel anytime'
      ],
      buttonText: 'Subscribe Now',
      featured: true
    },
    {
      name: 'Annual Plan',
      price: '₱4,999',
      features: [
        'Up to 10 users',
        'Full feature access + analytics',
        '24/7 priority support',
        '2 months free'
      ],
      buttonText: 'Subscribe Now',
      featured: false
    }
  ];

  return (
    <section id="pricing" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-4">
          Choose Your Plan
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12">
          Select the plan that fits your needs best
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-xl p-8 transition-all duration-300 hover:transform hover:-translate-y-2 ${
                plan.featured
                  ? 'bg-gradient-to-br from-teal-500 to-blue-600 text-white scale-105'
                  : 'bg-white dark:bg-gray-700 shadow-lg'
              }`}
            >
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <div className={`text-4xl font-bold mb-6 ${
                plan.featured ? 'text-white' : 'text-blue-600 dark:text-blue-400'
              }`}>
                {plan.price}
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <span className={`mr-3 ${plan.featured ? 'text-white' : 'text-green-500'}`}>✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-semibold transition-colors duration-300 ${
                  plan.featured
                    ? 'bg-white text-blue-600 hover:bg-gray-100'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;