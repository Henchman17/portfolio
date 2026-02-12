import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
          console.error("Admin credentials not configured in environment");
          return null;
        }

        // Check email match
        if (credentials.email !== adminEmail) {
          return null;
        }

        // In production, you should store a hashed password in env
        // For now, we compare directly or check if it's already hashed
        let isValid = false;
        
        if (adminPassword.startsWith('$2')) {
          // Password is hashed
          isValid = await bcrypt.compare(credentials.password, adminPassword);
        } else {
          // Plain text comparison (for initial setup)
          isValid = credentials.password === adminPassword;
        }

        if (!isValid) {
          return null;
        }

        return {
          id: "1",
          email: adminEmail,
          name: "Admin",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
