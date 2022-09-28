import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.REACT_APP_GOOGLE_ID,
      clientSecret: process.env.REACT_APP_GOOGLE_SECRET,
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    }),
  ],
  jwt: {
    encryption: true,
  },
  secret: process.env.REACT_APP_SECRET_KEY,
  callbacks: {
    redirect: async (url, _baseUrl) => {
      return Promise.resolve('/login');
    },
  },
});
