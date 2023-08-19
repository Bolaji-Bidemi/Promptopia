

import { withIronSession } from 'next-iron-session';

export default function withSession(handler) {
  return withIronSession(handler, {
    password: process.env.TOKEN_SECRET, // Change this to your own secret
    cookieName: 'my-session',
    cookieOptions: {
      secure: process.env.TOKEN_SECRET === 'production', // Use secure cookies in production
    },
  });
}


