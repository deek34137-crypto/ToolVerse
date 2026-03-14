'use client'

import { useState } from 'react'
import NoteInput from '@/components/NoteInput'
import MindMapView from '@/components/MindMapView'
import FlashcardDeck from '@/components/FlashcardDeck'
import QuizSection from '@/components/QuizSection'
import SummaryBox from '@/components/SummaryBox'
import { generateStudyTools } from '@/lib/ai'
import { Brain, BookOpen, CheckCircle, FileText, Sparkles } from 'lucide-react'

interface StudyTools {
  summary: string
  mindmap: any // JSON tree
  flashcards: { question: string; answer: string }[]
  quiz: { question: string; options: string[]; answer: string }[]
}

const tools = [
  { id: 'mindmap', name: 'Mind Map', icon: Brain, description: 'Visual tree structure' },
  { id: 'flashcards', name: 'Flashcards', icon: BookOpen, description: 'Interactive study cards' },
  { id: 'quiz', name: 'Quiz', icon: CheckCircle, description: 'Test your knowledge' },
  { id: 'summary', name: 'Summary', icon: FileText, description: 'Concise overview' },
]

export default function Home() {
  const [notes, setNotes] = useState('')
  const [studyTools, setStudyTools] = useState<StudyTools | null>(null)
  const [loading, setLoading] = useState(false)
  const [activeTool, setActiveTool] = useState<string | null>(null)

  const handleGenerate = async (toolId: string) => {
    if (!notes.trim()) return
    setLoading(true)
    setActiveTool(toolId)
    try {
      const data = await generateStudyTools(notes)
      setStudyTools(data)
    } catch (error) {
      console.error('Error generating study tools:', error)
    } finally {
      setLoading(false)
      setActiveTool(null)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Brain className="h-16 w-16 text-white/90" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Transform Your Notes with AI
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Convert long study notes into mind maps, flashcards, quizzes, and summaries instantly.
            Boost your learning with AI-powered study tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 shadow-lg">
              Get Started Free
            </button>
            <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-200">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Main App */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Paste Your Study Notes
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Enter your notes below and let AI create personalized study materials
          </p>
          <NoteInput notes={notes} setNotes={setNotes} />
        </div>

        {/* Tool Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-fade-in">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <button
                key={tool.id}
                onClick={() => handleGenerate(tool.id)}
                disabled={loading}
                className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed animate-slide-up"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                    <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {tool.description}
                  </p>
                  {loading && activeTool === tool.id && (
                    <div className="mt-4 flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <span className="text-sm text-blue-600">Generating...</span>
                    </div>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Results Section */}
        {studyTools && (
          <div className="space-y-8 animate-fade-in">
            <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Your Study Materials
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <MindMapView mindmap={studyTools.mindmap} />
              <FlashcardDeck flashcards={studyTools.flashcards} />
              <QuizSection quiz={studyTools.quiz} />
              <SummaryBox summary={studyTools.summary} />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}