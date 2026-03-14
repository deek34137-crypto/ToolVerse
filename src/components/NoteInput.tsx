import { FileText } from 'lucide-react'

interface NoteInputProps {
  notes: string
  setNotes: (notes: string) => void
}

export default function NoteInput({ notes, setNotes }: NoteInputProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        <div className="absolute top-4 left-4">
          <FileText className="h-6 w-6 text-gray-400" />
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Paste your study notes here... (e.g., lecture notes, textbook excerpts, research findings)"
          className="w-full h-48 p-4 pl-12 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white resize-none transition-all duration-200 placeholder:text-gray-400"
        />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
        Supports up to 10,000 characters. The more detailed your notes, the better the results!
      </p>
    </div>
  )
}