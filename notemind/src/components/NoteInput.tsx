interface NoteInputProps {
  notes: string
  setNotes: (notes: string) => void
}

export default function NoteInput({ notes, setNotes }: NoteInputProps) {
  return (
    <textarea
      value={notes}
      onChange={(e) => setNotes(e.target.value)}
      placeholder="Paste your study notes here..."
      className="w-full max-w-2xl h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
    />
  )
}