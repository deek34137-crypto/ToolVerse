'use client'

import { useState } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'

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
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
          <CheckCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
        </div>
        <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Quiz</h4>
      </div>

      <div className="space-y-6">
        {quiz.map((q, index) => (
          <div key={index} className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg">
            <h5 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {index + 1}. {q.question}
            </h5>
            {q.options.length > 0 ? (
              <div className="space-y-2">
                {q.options.map((option, optIndex) => (
                  <label key={optIndex} className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                      disabled={submitted}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-gray-700 dark:text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            ) : (
              <textarea
                value={answers[index]}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                disabled={submitted}
                placeholder="Type your answer here..."
                className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows={3}
              />
            )}
          </div>
        ))}
      </div>

      {!submitted && (
        <div className="mt-8 text-center">
          <button
            onClick={handleSubmit}
            className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-semibold"
          >
            Submit Quiz
          </button>
        </div>
      )}

      {submitted && (
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900/20 px-6 py-3 rounded-lg">
            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            <span className="text-lg font-semibold text-green-800 dark:text-green-200">
              Your score: {score} / {quiz.length}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}