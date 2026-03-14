'use client'

import { useState } from 'react'

interface QuizQuestion {
  question: string
  options: string[]
  answer: string
}

interface QuizSectionProps {
  quiz: QuizQuestion[]
}

export default function QuizSection({ quiz }: QuizSectionProps) {
  const [answers, setAnswers] = useState<string[]>(new Array(quiz.length).fill(''))
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const handleSubmit = () => {
    let correct = 0
    quiz.forEach((q, index) => {
      if (answers[index].toLowerCase().trim() === q.answer.toLowerCase().trim()) {
        correct++
      }
    })
    setScore(correct)
    setSubmitted(true)
  }

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers]
    newAnswers[index] = value
    setAnswers(newAnswers)
  }

  if (quiz.length === 0) return null

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quiz</h4>
      {quiz.map((q, index) => (
        <div key={index} className="mb-4">
          <p className="font-medium text-gray-900 dark:text-white">{q.question}</p>
          {q.options.length > 0 ? (
            <div className="mt-2 space-y-1">
              {q.options.map((option, optIndex) => (
                <label key={optIndex} className="block">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    disabled={submitted}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          ) : (
            <input
              type="text"
              value={answers[index]}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              disabled={submitted}
              className="mt-2 w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Your answer"
            />
          )}
        </div>
      ))}
      {!submitted && (
        <button onClick={handleSubmit} className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
          Submit Quiz
        </button>
      )}
      {submitted && (
        <p className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
          Your score: {score} / {quiz.length}
        </p>
      )}
    </div>
  )
}