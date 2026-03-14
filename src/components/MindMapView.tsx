interface MindMapNode {
  name: string
  children: MindMapNode[]
}

interface MindMapViewProps {
  mindmap: MindMapNode
}

function TreeNode({ node, level = 0 }: { node: MindMapNode; level?: number }) {
  return (
    <div className={`ml-${level * 4}`}>
      <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded mb-2">
        {node.name}
      </div>
      {node.children.map((child, index) => (
        <TreeNode key={index} node={child} level={level + 1} />
      ))}
    </div>
  )
}

export default function MindMapView({ mindmap }: MindMapViewProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Mind Map</h4>
      <TreeNode node={mindmap} />
    </div>
  )
}