import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"; // Corrected import
import client from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import FrontUser from "@/models/FrontUser";
import User from "@/models/User";
import { mongooseConnect } from "@/lib/mongoose";

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await mongooseConnect();

        // Check FrontUser schema (Regular User)
        let user = await FrontUser.findOne({ email: credentials.email });

        if (user) {
          const isMatch = await bcrypt.compare(credentials.password, user.password);
          if (isMatch) {
            // Update online status to true on login
            await FrontUser.findByIdAndUpdate(user._id, { online: true });
            return {
              id: user._id,
              name: user.name,
              email: user.email,
              role: "user",
              image: user.image || null,
            };
          }
        }

        // Check User schema (Admin)
        user = await User.findOne({ email: credentials.email });

        if (user) {
          const isMatch = await bcrypt.compare(credentials.password, user.password);
          if (isMatch) {
            // Update online status to true on login
            await User.findByIdAndUpdate(user._id, { online: true });
            return {
              id: user._id,
              name: user.name,
              email: user.email,
              role: "admin",
              image: user.image || null,
            };
          }
        }

        throw new Error("Invalid credentials");
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(client),
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name: "next-auth.user.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      },
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.image = user.image || null;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.image = token.image || null;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3001";
      
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  },
  events: {
    async signOut({ session }) {
      await mongooseConnect();

      if (session?.user?.id) {
        if (session.user.role === "user") {
          await FrontUser.findByIdAndUpdate(session.user.id, { online: false });
        } else if (session.user.role === "admin") {
          await User.findByIdAndUpdate(session.user.id, { online: false });
        }
      }
    },
  },
  baseUrl: process.env.NEXTAUTH_URL || "http://localhost:3001",
};

export default NextAuth(authOptions);
