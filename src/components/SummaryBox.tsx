interface SummaryBoxProps {
  summary: string
}

export default function SummaryBox({ summary }: SummaryBoxProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Summary</h4>
      <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
        {summary}
      </div>
    </div>
  )
}