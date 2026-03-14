'use client'

import { useState } from 'react'
import NoteInput from '@/components/NoteInput'
import MindMapView from '@/components/MindMapView'
import FlashcardDeck from '@/components/FlashcardDeck'
import QuizSection from '@/components/QuizSection'
import SummaryBox from '@/components/SummaryBox'
import { generateStudyTools } from '@/lib/ai'

interface StudyTools {
  summary: string
  mindmap: any // JSON tree
  flashcards: { question: string; answer: string }[]
  quiz: { question: string; options: string[]; answer: string }[]
}

export default function Home() {
  const [notes, setNotes] = useState('')
  const [studyTools, setStudyTools] = useState<StudyTools | null>(null)
  const [loading, setLoading] = useState(false)

  const handleGenerate = async (type: string) => {
    if (!notes.trim()) return
    setLoading(true)
    try {
      const data = await generateStudyTools(notes)
      setStudyTools(data)
    } catch (error) {
      console.error('Error generating study tools:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">NoteMind</h1>
            <nav className="space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Home</a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">About</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Landing Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Transform Your Notes with AI</h2>
          <p className="text-xl mb-8">Convert long study notes into mind maps, flashcards, quizzes, and summaries instantly.</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Get Started
          </button>
        </div>
      </section>

      {/* Main App */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Paste Your Notes</h3>
          <NoteInput notes={notes} setNotes={setNotes} />
          <div className="mt-8 space-x-4">
            <button onClick={() => handleGenerate('mindmap')} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700" disabled={loading}>
              Generate Mind Map
            </button>
            <button onClick={() => handleGenerate('flashcards')} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700" disabled={loading}>
              Generate Flashcards
            </button>
            <button onClick={() => handleGenerate('quiz')} className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700" disabled={loading}>
              Generate Quiz
            </button>
            <button onClick={() => handleGenerate('summary')} className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700" disabled={loading}>
              Generate Summary
            </button>
          </div>
          {loading && <p className="mt-4 text-gray-500">Generating study tools...</p>}
        </div>

        {studyTools && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <MindMapView mindmap={studyTools.mindmap} />
            <FlashcardDeck flashcards={studyTools.flashcards} />
            <QuizSection quiz={studyTools.quiz} />
            <SummaryBox summary={studyTools.summary} />
          </div>
        )}
      </main>
    </div>
  )
}