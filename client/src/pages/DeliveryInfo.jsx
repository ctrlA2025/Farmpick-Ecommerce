import React from 'react';

const DeliveryInfo = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-16 bg-gray-50 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-semibold text-green-800 mb-8">Delivery Information</h1>

      <div className="space-y-6 text-base md:text-lg leading-relaxed">
        <p>
          At <strong>FarmPick</strong>, we are committed to delivering your groceries and essentials as quickly and safely as possible. We understand the importance of fresh produce and timely service.
        </p>

        <h2 className="text-xl font-semibold text-green-700 mt-6">📦 Delivery Timeline</h2>
        <p>
          All orders placed on FarmPick are processed and shipped within <strong>1 to 2 business days</strong>. We aim to deliver fresh products straight to your doorstep with minimal delay.
        </p>

        <h2 className="text-xl font-semibold text-green-700 mt-6">🚚 Delivery Partners</h2>
        <p>
          We partner with reliable local delivery services to ensure your order reaches you in the best condition. Our logistics network covers both urban and semi-urban areas.
        </p>

        <h2 className="text-xl font-semibold text-green-700 mt-6">📍 Delivery Areas</h2>
        <p>
          We currently deliver to select PIN codes across India. You can check service availability during checkout by entering your delivery address.
        </p>

        <h2 className="text-xl font-semibold text-green-700 mt-6">⏰ Delivery Hours</h2>
        <p>
          Deliveries are made between <strong>8:00 AM – 8:00 PM</strong>. You will receive a confirmation and tracking link once your order is dispatched.
        </p>

        <h2 className="text-xl font-semibold text-green-700 mt-6">📞 Need Help?</h2>
        <p>
          If you have any questions about your order or delivery status, feel free to <a href="/contact" className="text-green-600 underline hover:text-green-800">contact us</a>.
        </p>
      </div>
    </div>
  );
};

export default DeliveryInfo;
