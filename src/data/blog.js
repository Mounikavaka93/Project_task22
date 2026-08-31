import { images } from './site'

export const posts = [
  {
    id: 1,
    slug: 'functional-nutrition-vs-kibble',
    title: 'How functional nutrition differs from regular kibble',
    excerpt:
      'Powder formulas, precise macros, and why boiling water is part of the ritual — not a gimmick.',
    category: 'Nutrition',
    date: '12 Aug 2026',
    read: '6 min',
    image: images.blog1,
    featured: true,
    body: [
      'Regular kibble is built to sit in a bag for months and still look like dinner. Functional nutrition is built for a result: less weight, more muscle, or a calmer stomach — measured in grams and weeks, not slogans.',
      'Cat Energy ships as a powder. You add boiling water, stir, and serve warm. That is not a gimmick. Heat opens aroma, the portion is exact, and there is no dry biscuit left in the bowl for a bored cat to graze all afternoon.',
      'Every Slim and Pro pouch lists protein, fat, and calories that match the lab batch. If a run misses spec, it does not leave Saint Petersburg. That is the gap between “light formula” marketing and a feeding plan you can actually track.',
      'Start by replacing one evening meal. Keep the morning routine familiar. In three weeks most owners can see the difference in the waist and the coat — without adding extra walks they will not keep.',
    ],
  },
  {
    id: 2,
    slug: 'boris-lost-5kg-in-60-days',
    title: 'Boris lost 5 kg in 60 days — what actually changed',
    excerpt:
      'No extra walks, 16 hours of sleep, one swap in the bowl. A close look at the Slim protocol.',
    category: 'Health',
    date: '02 Aug 2026',
    read: '8 min',
    image: images.blog2,
    featured: false,
    body: [
      'Boris slept sixteen hours a day before Cat Energy Slim. He sleeps sixteen hours a day now. The only lasting change was the evening bowl.',
      'His owner swapped the usual mixed feeding for Slim Chicken, mixed with boiling water, once a day. Morning food stayed the same for the first two weeks so the house did not turn into a protest.',
      'At day 30 the scale showed just over two kilos down. At day 60 it was five. No crash hunger, no extra play sessions, no “diet treats” that quietly put the calories back.',
      'The protocol is boring on purpose. Weigh weekly, photograph from above, and do not chase the number every morning. Food cost for those two months: 15 000 ₽. The result was a cat that could climb again.',
    ],
  },
  {
    id: 3,
    slug: 'building-muscle-on-pro',
    title: 'Building muscle on Cat Energy Pro',
    excerpt:
      'Protein timing, play sessions, and how Pro Fish supports lean mass without extra calories.',
    category: 'Training',
    date: '21 Jul 2026',
    read: '5 min',
    image: images.blog3,
    featured: false,
    body: [
      'Pro is not “more food.” It is a higher protein, named-fish or chicken formula for cats that need mass they can actually use — yard presence, not just a rounder silhouette.',
      'Serve Pro after a short play burst, not after a long nap. Ten minutes with a wand toy is enough. The powder mixed with boiling water is easier to finish than a dense dry ration when the cat is still warm from the chase.',
      'Pro Fish sits a little leaner on fat than Pro Chicken. If the cat is skinny but already eating well, start with Fish. If appetite is shy, Chicken is the warmer, more aromatic bowl.',
      'Give it six weeks before you judge the shoulders. Muscle is slower than fat loss. Photograph the same angle in the same light — that is more honest than the bathroom scale.',
    ],
  },
  {
    id: 4,
    slug: 'indoor-cats-hidden-weight-gain',
    title: 'Indoor cats and hidden weight gain',
    excerpt:
      'Apartment cats burn less than we think. Four signs your “healthy appetite” is already a problem.',
    category: 'Health',
    date: '09 Jul 2026',
    read: '4 min',
    image: images.blog4,
    featured: false,
    body: [
      'Indoor cats look busy. They are not. A lap, a windowsill, and two meals a day is a lifestyle with almost no calorie burn — and kibble that never runs out makes it worse.',
      'Watch for four signs: a waist you can no longer feel behind the ribs, hesitation on the scratching post, a greasy patch at the base of the tail, and begging that starts before the kettle boils.',
      'Slim exists for this cat. Replace one or two meals, keep sleep and sofa time, and measure in thirty days. You do not need a treadmill. You need a bowl that tells the truth.',
      'If the cat is over eight years old, ask a vet to look at the thyroid before you cut calories hard. Functional nutrition still works — it just should not be the only conversation.',
    ],
  },
  {
    id: 5,
    slug: 'new-rice-formula',
    title: 'New rice formula for sensitive stomachs',
    excerpt:
      'We spent a year on a gentler Slim variant. Here’s who it is for — and who should skip it.',
    category: 'News',
    date: '28 Jun 2026',
    read: '3 min',
    image: images.blog5,
    featured: false,
    body: [
      'Slim Rice is the quiet pouch. Lower fat, a gentler carbohydrate base, and a milder smell for cats that walk away from fish or buckwheat.',
      'We ran it for a year with clinic partners. The cats that did best already had a sensitive gut, or they were coming off a long stretch of mixed table scraps and cheap dry food.',
      'Skip Rice if the goal is muscle. That is still Pro. Skip it if the cat is a hearty eater with no stomach history — Chicken Slim is the more efficient cut.',
      'The ritual does not change: powder, boiling water, stir. If stool firms in two weeks, stay. If it does not, write to us with the batch number on the pouch.',
    ],
  },
  {
    id: 6,
    slug: '4-week-feeding-calendar',
    title: 'A simple 4-week feeding calendar',
    excerpt:
      'Printable schedule for switching from mixed feeding to a full Cat Energy routine.',
    category: 'Nutrition',
    date: '14 Jun 2026',
    read: '7 min',
    image: images.blog6,
    featured: false,
    body: [
      'Week 1: replace the evening meal only. Same time, same bowl, boiling water, one pouch portion by weight. Morning food stays as it is.',
      'Week 2: keep the evening swap. If the cat finishes cleanly and asks less between meals, trim the morning ration by a quarter — or swap it too if you are already on Slim.',
      'Week 3: both meals on Cat Energy if the stool is normal and energy is steady. Take a photo from above. Do not add treats “because they were good.”',
      'Week 4: lock the schedule. Weigh once. If the line is moving the right way, stay. If it is not, change program (Slim vs Pro) before you change the amount. The calendar is a ramp, not a punishment.',
    ],
  },
]

export const blogCategories = ['All', 'Nutrition', 'Health', 'Training', 'News']

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug)
}

export function getRelatedPosts(post, count = 3) {
  return posts.filter((item) => item.id !== post.id && item.category === post.category).concat(
    posts.filter((item) => item.id !== post.id && item.category !== post.category),
  ).slice(0, count)
}
