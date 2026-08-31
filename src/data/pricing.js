export const pricingPlans = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Try the formula',
    monthly: 19,
    yearly: 190,
    features: [
      '1 functional pouch / month',
      'Slim or Pro sample kit',
      'Feeding guide PDF',
      'Email support',
    ],
    cta: 'Start light',
    recommended: false,
  },
  {
    id: 'athlete',
    name: 'Athlete',
    tagline: 'Most cats stay here',
    monthly: 39,
    yearly: 390,
    features: [
      '2 pouches / month',
      'Personal nutrition consult',
      'Flavor rotation',
      'Progress tracker app',
      'Priority chat support',
    ],
    cta: 'Choose Athlete',
    recommended: true,
  },
  {
    id: 'champion',
    name: 'Champion',
    tagline: 'Full performance plan',
    monthly: 69,
    yearly: 690,
    features: [
      '4 pouches / month',
      'Vet + nutritionist review',
      'All flavors unlocked',
      'Quarterly body-score photos',
      'Free replacement if unopened',
      'Same-week delivery',
    ],
    cta: 'Go Champion',
    recommended: false,
  },
]

export const pricingFaqs = [
  {
    q: 'Can I switch Slim and Pro later?',
    a: 'Yes. After the first delivery you can change program, flavor, or pouch size from your account or by writing to us.',
  },
  {
    q: 'When is the first bag shipped?',
    a: 'Orders placed before 14:00 go out the next working day. Athlete and Champion plans include tracked delivery.',
  },
  {
    q: 'Is the yearly plan refundable?',
    a: 'You can pause or cancel after two deliveries. Unused prepaid months are credited to your next order.',
  },
  {
    q: 'Does this replace regular food?',
    a: 'Start by replacing one or two meals. Most cats transition fully within three weeks under the feeding guide.',
  },
]
