import { FileText } from 'lucide-react'
import { Textarea } from '@/components/ui/Textarea'

interface NoteInputProps {
  notes: string
  setNotes: (notes: string) => void
}

export default function NoteInput({ notes, setNotes }: NoteInputProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        <div className="absolute top-4 left-4 z-10">
          <FileText className="h-6 w-6 text-gray-400" />
        </div>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Paste your study notes here... (e.g., lecture notes, textbook excerpts, research findings)"
          className="min-h-[200px] pl-12 text-base resize-none"
        />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
        Supports up to 10,000 characters. The more detailed your notes, the better the results!
      </p>
    </div>
  )
}