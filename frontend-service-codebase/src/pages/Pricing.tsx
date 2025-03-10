import React from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free Events',
    price: '$0',
    description: 'Perfect for small, free events',
    features: [
      'Up to 50 attendees',
      'Basic event page',
      'Email notifications',
      'Attendee management',
      'Mobile tickets'
    ],
    highlighted: false
  },
  {
    name: 'Standard Plan',
    price: '2%',
    description: 'Great for professional events',
    features: [
      'Unlimited attendees',
      'Custom event page',
      'Priority support',
      'Analytics dashboard',
      'Multiple ticket types',
      'Promotional tools'
    ],
    highlighted: true
  },
  {
    name: 'Premium Plan',
    price: 'Custom',
    description: 'For large-scale events',
    features: [
      'All Standard features',
      'Lower processing fees',
      'Advanced marketing tools',
      'Dedicated account manager',
      'API access',
      'Custom branding'
    ],
    highlighted: false
  }
];

const faqs = [
  {
    question: 'How are fees calculated?',
    answer: 'Fees are calculated as a percentage of the ticket price. For standard plans, it\'s 2% per ticket plus payment processing fees.'
  },
  {
    question: 'Can I upgrade my plan later?',
    answer: 'Yes, you can upgrade your plan at any time. The new pricing will apply to future events only.'
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers for ticket purchases.'
  },
  {
    question: 'Is there a limit on the number of events?',
    answer: 'No, you can create unlimited events on any paid plan. Free plans are limited to 3 active events.'
  }
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600">Choose the perfect plan for your events</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                plan.highlighted ? 'ring-2 ring-purple-600' : ''
              }`}
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-gray-600 ml-2">per ticket</span>}
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <button
                  className={`w-full py-3 px-6 rounded-lg font-medium ${
                    plan.highlighted
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                  }`}
                >
                  Choose {plan.name}
                </button>
              </div>
              <div className="bg-gray-50 px-8 py-6">
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;