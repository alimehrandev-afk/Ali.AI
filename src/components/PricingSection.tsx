'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from './Button';
import Link from 'next/link';

interface PricingTier {
  name: string;
  price: number;
  description: string;
  features: string[];
  highlighted?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    price: 0,
    description: 'Get started with AI',
    features: [
      '5 conversations',
      'Basic AI models',
      '100 messages/month',
      'Community support',
    ],
  },
  {
    name: 'Pro',
    price: 29,
    description: 'For professionals',
    features: [
      'Unlimited conversations',
      'Advanced AI models',
      'Unlimited messages',
      'Priority support',
      'File uploads',
      'API access',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 99,
    description: 'For teams',
    features: [
      'Everything in Pro',
      'Team collaboration',
      'Advanced analytics',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantee',
    ],
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-dark-400 max-w-2xl mx-auto">
            Choose the plan that fits your needs. Always flexible to scale.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative rounded-2xl p-8 transition-all ${
                tier.highlighted
                  ? 'bg-gradient-to-br from-primary-600 to-primary-700 border border-primary-500 shadow-2xl shadow-primary-500/20'
                  : 'bg-dark-800 border border-dark-700 hover:border-primary-500/30'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute top-0 right-0 bg-accent-500 text-white px-4 py-1 rounded-bl-lg rounded-tr-2xl text-sm font-semibold">
                  Popular
                </div>
              )}

              <h3 className={`text-2xl font-bold mb-2 ${tier.highlighted ? 'text-white' : 'text-white'}`}>
                {tier.name}
              </h3>
              <p className={`text-sm mb-6 ${tier.highlighted ? 'text-white/80' : 'text-dark-400'}`}>
                {tier.description}
              </p>

              <div className="mb-6">
                <span className={`text-5xl font-bold ${tier.highlighted ? 'text-white' : 'text-white'}`}>
                  ${tier.price}
                </span>
                <span className={`text-sm ${tier.highlighted ? 'text-white/80' : 'text-dark-400'}`}>
                  /month
                </span>
              </div>

              <Link href="/auth/signup" className="block mb-8">
                <Button
                  className="w-full"
                  variant={tier.highlighted ? 'primary' : 'outline'}
                >
                  Get Started
                </Button>
              </Link>

              <div className="space-y-4">
                {tier.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check
                      size={20}
                      className={tier.highlighted ? 'text-white' : 'text-primary-400'}
                    />
                    <span className={tier.highlighted ? 'text-white/90' : 'text-dark-300'}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
