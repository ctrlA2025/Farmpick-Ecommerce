import React from "react";

const testimonials = [
  {
    name: "Avvaiyar",
    image:"https://chintan.indiafoundation.in/wp-content/uploads/2021/07/Avvaiyar-.png",
    quote:
      '"Food itself gives the body health". Avvaiyar\'s wisdom in her poems often emphasises the importance of food and its role in sustaining life and health, which could easily include vegetables.',
  },
  {
    name: "Kannadasan",
    image:"https://i.pinimg.com/564x/10/27/8c/10278c5907525cffdefe283bb7947f0c.jpg",
    quote:
      '"The right amount of food give us life". This could be interpreted as a message about importance of moderation and the nourishment that comes from wholesome foods, such as vegetables.',
  },
  {
    name: "Bharathiyar",
    image:"https://i.pinimg.com/736x/17/6d/44/176d4458c664ff37c5ae1cdede75b42d.jpg",
    quote:
      '"When food, body, and knowledge are in harmony, life becomes prosperous". While not directly about vegetables, this quote emphasises the importance of balanced food, which is integral to our health and well-being.',
  },
];

const VoicesOfTrust = () => {
  return (
    <section className=" mt-20 py-16 px-4 bg-green-50">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Voices of Trust
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-8 text-center"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full border-4 border-green-600 overflow-hidden">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-4">{testimonial.name}</h3>
            <p className="text-gray-700 leading-relaxed">{testimonial.quote}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VoicesOfTrust;
