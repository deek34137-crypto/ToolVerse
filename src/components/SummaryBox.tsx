import { FileText } from 'lucide-react'

interface SummaryBoxProps {
  summary: string
}

export default function SummaryBox({ summary }: SummaryBoxProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-lg">
          <FileText className="h-6 w-6 text-orange-600 dark:text-orange-400" />
        </div>
        <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Summary</h4>
      </div>
      <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg">
        <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
          {summary}
        </div>
      </div>
    </div>
  )
}