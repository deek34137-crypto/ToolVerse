'use client'

import { useState } from 'react'
import { BookOpen, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'

interface Flashcard {
  question: string
  answer: string
}

interface FlashcardDeckProps {
  flashcards: Flashcard[]
}

export default function FlashcardDeck({ flashcards }: FlashcardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const nextCard = () => {
    setFlipped(false)
    setCurrentIndex((prev) => (prev + 1) % flashcards.length)
  }

  const prevCard = () => {
    setFlipped(false)
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length)
  }

  const flipCard = () => setFlipped(!flipped)

  if (flashcards.length === 0) return null

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
          <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
        </div>
        <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Flashcards</h4>
      </div>

      <div className="flex flex-col items-center">
        <div
          className="w-full max-w-md h-64 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center cursor-pointer p-6 shadow-inner border border-gray-200 dark:border-gray-600 transition-all duration-300 hover:shadow-lg"
          onClick={flipCard}
        >
          <div className="text-center">
            <p className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {flipped ? 'Answer:' : 'Question:'}
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {flipped ? flashcards[currentIndex].answer : flashcards[currentIndex].question}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 mt-6">
          <button
            onClick={prevCard}
            className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {currentIndex + 1} of {flashcards.length}
            </span>
            <button
              onClick={() => setFlipped(!flipped)}
              className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
              <RotateCcw className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </button>
          </div>

          <button
            onClick={nextCard}
            className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </div>
  )
}