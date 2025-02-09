```javascript
// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
    async session({ session, token }) {
      session.user = token.user
      return session
    }
  },
}
export default NextAuth(authOptions)

// pages/index.js

export default function Home({ user }) {
  return (
    <div>
      <h1>Hello, world!</h1>
      {user ? <p>You are logged in!</p> : <p>You are not logged in.</p>}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: { user: session?.user || null }
  }
}
```