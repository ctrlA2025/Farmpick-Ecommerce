import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs.send(
      'service_o8ld00t', // ✅ Your Service ID
      'template_e9qbtoh', // ✅ Your Template ID
      templateParams,
      'Khtxd5tsSnx1cKz_-' // ✅ Your Public Key
    )
    .then(() => {
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    })
    .catch((err) => {
      console.error('EmailJS Error:', err);
      toast.error('Failed to send message. Check your template or key.');
    });
  };

  return (
    <div className="contact-page relative min-h-screen bg-[#f6fff5] overflow-hidden font-sans">
      <Toaster position="top-right" />
      <div className="leaves absolute w-full h-full z-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="leaf" style={{ '--i': i }}></div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-6xl mx-auto mt-10 mb-20 backdrop-blur-md bg-green-200/30 dark:bg-green-800/30 text-gray-800 dark:text-white rounded-3xl shadow-2xl overflow-hidden p-8 md:p-12 z-10"
      >
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-5">
            <h2 className="text-4xl font-bold text-green-700 dark:text-green-300">Get in Touch</h2>
            <p>Reach us directly by filling the form or visit us using the map below.</p>
            <div>
              <h4 className="font-semibold">Address:</h4>
              <p>Murugan Nagar, 2/208B, Cross Cut, Guruvayur Nagar, Malumichampatti, Coimbatore, Tamil Nadu 641021</p>
            </div>
            <div className="h-52 rounded-xl overflow-hidden border-2 border-green-600 shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.024990232624!2d76.99703807413212!3d10.90388595896412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8594abebaab39%3A0x147b82ec91960583!2sFARM%20PICK!5e0!3m2!1sen!2sin!4v1717904170159!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {['name', 'email', 'message'].map((field, i) => (
              <motion.div
                key={field}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {field !== 'message' ? (
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/80 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                ) : (
                  <textarea
                    rows="5"
                    name={field}
                    placeholder="Your Message"
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/80 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                )}
              </motion.div>
            ))}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-green-700 transition"
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
