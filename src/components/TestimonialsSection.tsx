'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Johnson',
    role: 'Product Manager',
    company: 'TechCorp Inc',
    text: 'Ali.AI transformed how our team approaches AI integration. The interface is intuitive and the models are incredibly powerful.',
    rating: 5,
  },
  {
    name: 'Alex Chen',
    role: 'CEO',
    company: 'StartupX',
    text: 'The best AI platform we have ever used. Customer support is exceptional and the pricing is fair.',
    rating: 5,
  },
  {
    name: 'Maria Rodriguez',
    role: 'Data Scientist',
    company: 'DataFlow',
    text: 'Finally, a platform that combines ease of use with professional-grade AI capabilities. Highly recommended!',
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Loved by Professionals</h2>
          <p className="text-xl text-dark-400 max-w-2xl mx-auto">
            See what our users have to say about Ali.AI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-dark-800 border border-dark-700 rounded-xl p-8 hover:border-primary-500/30 transition-colors"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-accent-500 text-accent-500" />
                ))}
              </div>

              <p className="text-dark-300 mb-6 italic">"{testimonial.text}"</p>

              <div className="flex items-center gap-4 pt-4 border-t border-dark-700">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500" />
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-dark-400">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
