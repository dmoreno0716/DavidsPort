// Personal / bio data, sourced from content/content.md.
// Kept out of components so copy can be edited in one place.
export const profile = {
  name: 'David Moreno',
  // content.md gives the role inside the bio ("Software Engineer based out of
  // Phoenix, AZ"); surfaced here as the title line under the name.
  title: 'Software Engineer',
  location: 'Phoenix, AZ',
  bio:
    'Software Engineer based out of Phoenix, AZ looking for work. I love ' +
    'working on websites and recently have been picking up App development ' +
    'like Swift and React Native!',
  email: 'dmore107@fiu.edu',
  // No avatar image was provided in content/, so the UI falls back to an
  // initials monogram (see components/Avatar.jsx). Drop a file in public/ and
  // set its path here (e.g. '/avatar.jpg') to use a real photo.
  avatar: null,
  // Path served from public/. links/pdfs/ holds the original.
  resume: '/resume.pdf',
}
