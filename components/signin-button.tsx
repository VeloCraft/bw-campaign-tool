"use client"

import { signIn } from "next-auth/react"
 
export default function SignIn() {
  return <button className="inline-block p-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" onClick={() => signIn("discord")}>Sign in</button>
}
