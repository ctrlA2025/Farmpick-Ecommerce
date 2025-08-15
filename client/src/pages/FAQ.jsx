import React from 'react';

const FAQ = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-16 bg-gray-50 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-semibold text-green-800 mb-8">
        Frequently Asked Questions (FAQs)
      </h1>

      <div className="space-y-6 text-base md:text-lg leading-relaxed">
        <div>
          <strong>1. Can I cancel my order after placing it?</strong>
          <p>Orders can be cancelled within 1 hour of placement. Cancellations after this window may not be accepted.</p>
        </div>

        <div>
          <strong>2. What payment methods do you accept?</strong>
          <p>We support online payments via UPI, cards, net banking, and COD. All transactions are securely processed.</p>
        </div>

        <div>
          <strong>3. What if I enter incorrect details during checkout?</strong>
          <p>We do not store your card or banking details.</p>
        </div>

        <div>
          <strong>4. Are your product prices fixed?</strong>
          <p>Prices may change daily based on market rates. Final price is shown before you pay.</p>
        </div>

        <div>
          <strong>5. How will I know if my order is confirmed?</strong>
          <p>Once your order is placed and paid, we’ll confirm it via message or email.</p>
        </div>

        <div>
          <strong>6. What should I do if I receive a wrong or spoiled item?</strong>
          <p>If you get spoiled or wrong items, tell us within 90 mins. We’ll replace or refund them.</p>
        </div>

        <div>
          <strong>7. Can I reuse your website content or images?</strong>
          <p>Photos, text, and logos on the site belong to us. Don’t copy or reuse without permission.</p>
        </div>

        <div>
          <strong>8. How is my personal data handled?</strong>
          <p>We keep your data safe and don’t share it without your permission.</p>
        </div>

        <div>
          <strong>9. Are you responsible for external website links?</strong>
          <p>If you click on outside links, we’re not responsible for what happens on those sites.</p>
        </div>

        <div>
          <strong>10. What happens if I’m not available at the time of delivery?</strong>
          <p>If you are unavailable during delivery, re-delivery may be charged or cancelled as per policy.</p>
        </div>

        <div>
          <strong>11. What is your refund policy?</strong>
          <p>Refunds are issued only for wrong, missing, or spoiled items after verification. No refunds for preference-based returns.</p>
        </div>

        <div>
          <strong>12. Can I modify my order after placing it?</strong>
          <p>Modifying an order after payment may not be possible. Please review items before final checkout.</p>
        </div>

        <div>
          <strong>13. What details are required for a successful delivery?</strong>
          <p>Customers must enter correct name, address, and phone number. We are not liable for delivery failures due to incorrect details.</p>
        </div>

        <div>
          <strong>14. Who owns the content on your website?</strong>
          <p>All text, images, logos, and branding on the website are owned by us and may not be used without permission.</p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
