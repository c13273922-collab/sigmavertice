import { Suspense } from 'react'
import LoginForm from './LoginForm'

export default function LoginPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gradient-sigma flex items-center justify-center p-4">
        <div className="w-8 h-8 border-2 border-sigma-dourado/30 border-t-sigma-dourado rounded-full animate-spin" />
      </main>
    }>
      <LoginForm />
    </Suspense>
  )
}
