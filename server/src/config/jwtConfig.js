import env from '../env';

export const secret = process.env.NODE_ENV === 'production'
  ? process.env.DATABASE_URL.match(/[^/]:\w+/)[0].slice(2)
  : env.app.secret;

export const expiresIn = '24h';
