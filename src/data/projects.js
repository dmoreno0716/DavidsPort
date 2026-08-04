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
//
// ⚠️ GAPS from content.md — placeholders below, need David's real values:
//   • No GitHub URLs were provided for any project  → githubUrl: '#'
//   • No live URLs were provided for deployed ones   → liveUrl: '#'
//   • No tech stacks were provided                   → `tech` is INFERRED from
//     each description and marked TODO; confirm/replace.
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
    liveUrl: '#', // TODO: real deployed URL
    githubUrl: '#', // TODO: real repo URL
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
    githubUrl: '#', // TODO: real repo URL
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
    liveUrl: '#', // TODO: real deployed URL
    githubUrl: '#', // TODO: real repo URL
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
    // Not deployed yet ("will be deployed soon"), so treated as repo-only.
    deployed: false,
    screenshot: null,
    liveUrl: null,
    githubUrl: '#', // TODO: real repo URL
    tech: ['React', 'E-commerce'], // TODO: confirm — inferred
    note: 'Deploying soon',
  },
]
