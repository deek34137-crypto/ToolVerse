'use client'

import { useState } from 'react'
import NoteInput from '@/components/NoteInput'
import MindMapView from '@/components/MindMapView'
import FlashcardDeck from '@/components/FlashcardDeck'
import QuizSection from '@/components/QuizSection'
import SummaryBox from '@/components/SummaryBox'
import { generateStudyTools } from '@/lib/ai'
import { Brain, BookOpen, CheckCircle, FileText, Sparkles, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

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

export default function Tools() {
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Brain className="h-16 w-16 text-white/90" />
              <div className="absolute -top-2 -right-2">
                <Sparkles className="h-8 w-8 text-yellow-400 animate-pulse" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI Study Tools
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Transform your notes into mind maps, flashcards, quizzes, and summaries with advanced AI.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Input Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Paste Your Study Notes
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Enter your notes below and select a tool to generate study materials
            </p>
          </div>
          <NoteInput notes={notes} setNotes={setNotes} />
        </div>

        {/* Tool Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <Card
                key={tool.id}
                className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => handleGenerate(tool.id)}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 p-4 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-xl">{tool.name}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  {loading && activeTool === tool.id ? (
                    <Button disabled className="w-full">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </Button>
                  ) : (
                    <Button className="w-full group-hover:bg-blue-700 transition-colors">
                      Generate {tool.name}
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Results Section */}
        {studyTools && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Your Study Materials
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                AI-generated content based on your notes
              </p>
            </div>
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