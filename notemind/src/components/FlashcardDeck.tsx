'use client'

import { useState } from 'react'

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

  if (flashcards.length === 0) return null

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Flashcards</h4>
      <div className="flex flex-col items-center">
        <div
          className="w-full max-w-md h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer p-4"
          onClick={() => setFlipped(!flipped)}
        >
          <p className="text-center text-gray-900 dark:text-white">
            {flipped ? flashcards[currentIndex].answer : flashcards[currentIndex].question}
          </p>
        </div>
        <div className="mt-4 space-x-4">
          <button onClick={prevCard} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Previous</button>
          <button onClick={nextCard} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Next</button>
        </div>
        <p className="mt-2 text-sm text-gray-500">{currentIndex + 1} / {flashcards.length}</p>
      </div>
    </div>
  )
}