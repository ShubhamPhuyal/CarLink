import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import FrontUser from "@/models/FrontUser";
import { mongooseConnect } from "@/lib/mongoose";

export const authOptions = {
    secret: process.env.SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await mongooseConnect();
                const user = await FrontUser.findOne({ email: credentials.email });

                if (!user) {
                    throw new Error("No user found");
                }

                const isMatch = await bcrypt.compare(credentials.password, user.password);
                if (!isMatch) {
                    throw new Error("Invalid credentials");
                }

                return { id: user._id, name: user.name, email: user.email };
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],
    adapter: MongoDBAdapter(client),
    session: { strategy: "jwt" },
    callbacks: {
        async session({ session, token }) {
            if (token) session.user.id = token.sub;
            return session;
        }
    }
};

export default NextAuth(authOptions);
