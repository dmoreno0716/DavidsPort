// Project data, sourced from content/content.md.
//
// Each project:
//   id          stable key (also used to build the detail-window id)
//   title       display name
//   tagline     short one-liner shown under the title in the detail window
//   description full blurb (from content.md)
//   deployed    true → has a live URL + screenshot thumbnail
//   screenshot  path under public/ (deployed projects only; null otherwise)
//   liveUrl     public link (deployed only)
//   githubUrl   repo link
//   tech        tech-stack chips
//   comingSoon  true → project isn't public yet; the detail window shows a
//               "Coming soon" badge instead of link buttons
//
// A null liveUrl/githubUrl renders as an inert "no link yet" chip rather than a
// dead-looking button (see components/apps/ProjectDetail.jsx).
//
// ⚠️ REMAINING GAP: no tech stacks were provided, so every `tech` array below is
// INFERRED from the description and marked TODO — confirm/replace.
export const projects = [
  {
    id: 'designd',
    title: 'DesignD',
    tagline: 'AI interior design studio',
    description:
      'Interior designer with built-in AI to redesign any room you want, ' +
      'with a 3D floor plan editor built in.',
    deployed: true,
    screenshot: '/screenshots/designd-1.jpg',
    liveUrl: 'https://design-d-umber.vercel.app/',
    githubUrl: 'https://github.com/dmoreno0716/DesignD',
    tech: ['React', 'Three.js', 'AI'], // TODO: confirm — inferred
  },
  {
    id: 'day-trader',
    title: 'Day-Trader',
    tagline: 'AI trading simulator',
    description:
      'Prototype AI day trader that uses real crypto/stock information to ' +
      'come to conclusions on how to properly handle money. Uses fake money, ' +
      'so it works more like a simulator.',
    deployed: false,
    screenshot: null,
    liveUrl: null,
    githubUrl: 'https://github.com/dmoreno0716/Day-Trader',
    tech: ['Python', 'AI', 'Market APIs'], // TODO: confirm — inferred
  },
  {
    id: 'ai-quiz-funnel',
    title: 'AI Quiz Funnel Generator',
    tagline: 'Generate & share quiz funnels',
    description:
      'Anyone can generate their own quizzes from whatever context they ' +
      'provide, share the quiz links by text or social media, and edit and ' +
      'tweak them — from changing a few words in-line to reworking the whole ' +
      'feel, like the order of screens or visual changes.',
    deployed: true,
    screenshot: '/screenshots/ai-quiz-1.jpg',
    liveUrl: 'https://olive-intern-assessment-kappa.vercel.app/studio',
    githubUrl: 'https://github.com/dmoreno0716/olive-intern-assessment',
    tech: ['React', 'AI', 'Node'], // TODO: confirm — inferred
  },
  {
    id: 'print305',
    title: 'Print305 Store Page',
    tagline: 'Storefront for a Miami print shop',
    description:
      "Store page for a business named 'Print305' based out of Miami, FL. " +
      'The store page handles quotes, communication with employees for direct ' +
      'assistance, and quantity handling, so information is direct and not ' +
      'staggered between ordering and creating.',
    // Still being built — no public site and no public repo yet, so the detail
    // window shows a "Coming soon" badge instead of link buttons.
    deployed: false,
    comingSoon: true,
    screenshot: null,
    liveUrl: null,
    githubUrl: null,
    tech: ['React', 'E-commerce'], // TODO: confirm — inferred
    note: 'Coming soon',
  },
]
