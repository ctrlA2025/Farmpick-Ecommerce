import React from 'react';

const ReturnRefundPolicy = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-16 bg-gray-50 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-semibold text-green-800 mb-8">Return & Refund Policy</h1>

      <div className="space-y-6 text-base md:text-lg leading-relaxed">
        <p>
          At <strong>FarmPick</strong>, your satisfaction is our top priority. If you're not fully happy with a product you've received, we're here to help with a smooth return or refund process.
        </p>

        <h2 className="text-xl font-semibold text-green-700 mt-6">🔄 Returns Eligibility</h2>
        <p>
          You may request a return for products that are damaged, expired, or incorrect at the time of delivery. Please raise your return request within <strong>24 hours of delivery</strong> to be eligible.
        </p>

        <h2 className="text-xl font-semibold text-green-700 mt-6">❌ Cancellations</h2>
        <p>
          Orders can be cancelled before they are packed or dispatched. Once the order is in transit, cancellation will no longer be possible. Contact our support team promptly if you wish to cancel.
        </p>

        <h2 className="text-xl font-semibold text-green-700 mt-6">💸 Refund Timeline</h2>
        <p>
          Upon approval of a return or cancellation, refunds will be processed within <strong>3 to 5 business days</strong> to the original payment method. You'll receive a confirmation once the refund is initiated.
        </p>

        <h2 className="text-xl font-semibold text-green-700 mt-6">📎 What You’ll Need</h2>
        <p>
          To process a return or refund, please provide your order ID, photos (if applicable), and a short description of the issue. This helps us resolve your request faster.
        </p>

        <h2 className="text-xl font-semibold text-green-700 mt-6">📞 Questions or Issues?</h2>
        <p>
          Our support team is here to help. You can <a href="/contact" className="text-green-600 underline hover:text-green-800">contact us</a> with any questions or concerns regarding your return or refund.
        </p>
      </div>
    </div>
  );
};

export default ReturnRefundPolicy;
