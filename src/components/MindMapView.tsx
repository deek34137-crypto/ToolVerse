import { Brain } from 'lucide-react'

interface MindMapNode {
  name: string
  children: MindMapNode[]
}

interface MindMapViewProps {
  mindmap: MindMapNode
}

function TreeNode({ node }: { node: MindMapNode }) {
  if (!node) return null;

  return (
    <div className="ml-6 mt-2">
      <div className="flex items-center space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        <p className="text-gray-900 dark:text-white font-medium">{node.name}</p>
      </div>
      <div className="ml-4 border-l-2 border-blue-200 dark:border-blue-800 pl-4">
        {node.children && node.children.map((child, index) => (
          <TreeNode key={index} node={child} />
        ))}
      </div>
    </div>
  );
}

export default function MindMapView({ mindmap }: MindMapViewProps) {
  if (!mindmap) return null;

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
          <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Mind Map</h4>
      </div>
      <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg">
        <TreeNode node={mindmap} />
      </div>
    </div>
  )
}