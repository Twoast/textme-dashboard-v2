import axios from 'axios';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

var LOGIN_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth/login/`;
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    }),
  ],
  jwt: {
    encryption: true,
  },
  secret: process.env.NEXT_PUBLIC_SECRET_KEY,
  callbacks: {
    redirect: async (url, _baseUrl) => {
      return Promise.resolve('/login');
    },
    signIn: async ({ user, account, profile }) => {
      return profile.email.endsWith('@go-text.me');
    },
    jwt: async ({ token, user, account, profile, isNewUser }) => {
      if (!user) return token;
      await axios
        .post(LOGIN_URL, { token: account.access_token })
        .then((res) => {
          token.accessToken = res.data.token;
        })
        .catch((err) => {
          console.log(err);
        });
      return token;
    },
    session: async ({ session, token, user }) => {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
