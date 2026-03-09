const ROUTES = {
  HOME: '/',
  MAP: '/map',
  LOGIN: '/login',
  PROGRESS: '/progress',
  INTERVIEW: '/interview',
  PROFILE: '/profile',
};

const NAV_LINKS = [
  { label: 'Knowledge Map', to: ROUTES.MAP },
  { label: 'Progress', to: ROUTES.PROGRESS },
  { label: 'Interview', to: ROUTES.INTERVIEW },
];

export { NAV_LINKS, ROUTES };
