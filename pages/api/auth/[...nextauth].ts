import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize(credentials, request) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (
          email !== "fergal.moran+frasiergifs@gmail.com" ||
          password !== "secret"
        ) {
          return null;
        }
        return { id: 1234, name: "Fergal Moran" };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};

export default NextAuth(authOptions);
