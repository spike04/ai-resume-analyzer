import Navbar from '@/components/Navbar'
import ResumeCard from '@/components/ResumeCard'
import { resumes } from '@/constants'
import { usePuterStore } from '@/lib/puter'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import type { Route } from './+types/home'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Resumind' },
    { name: 'description', content: 'Smart Feedback for your dream job' },
  ]
}

export default function Home() {
  const { isLoading, auth } = usePuterStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/auth?next=/')
    }
  }, [auth.isAuthenticated])

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section pb-40">
        <div className="page-heading py-16">
          <h1>Track your Applications & Resume Ratings</h1>
          <h2>Review your submission and check AI-powered feedback.</h2>
        </div>
        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
