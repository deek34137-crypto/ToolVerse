import { Brain, BookOpen, CheckCircle, FileText, Clock, TrendingUp, User } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const recentActivity = [
  { tool: 'Mind Map', date: '2 hours ago', status: 'completed' },
  { tool: 'Flashcards', date: '1 day ago', status: 'completed' },
  { tool: 'Quiz', date: '3 days ago', status: 'completed' },
  { tool: 'Summary', date: '1 week ago', status: 'completed' },
]

const stats = [
  { label: 'Tools Used', value: '24', icon: Brain, color: 'text-blue-600' },
  { label: 'Study Sessions', value: '18', icon: Clock, color: 'text-green-600' },
  { label: 'Notes Processed', value: '156', icon: FileText, color: 'text-purple-600' },
  { label: 'Avg. Score', value: '87%', icon: TrendingUp, color: 'text-orange-600' },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Welcome back! Here's your study activity overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Jump back into your studies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/tools">
                    <Button className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                      <Brain className="h-6 w-6" />
                      <span>New Study Session</span>
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                    <BookOpen className="h-6 w-6" />
                    <span>Review Flashcards</span>
                  </Button>
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                    <CheckCircle className="h-6 w-6" />
                    <span>Take Quiz</span>
                  </Button>
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                    <FileText className="h-6 w-6" />
                    <span>View Summaries</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest study sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Generated {activity.tool}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {activity.date}
                        </p>
                      </div>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Profile Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Profile Settings</span>
            </CardTitle>
            <CardDescription>Manage your account and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Free Plan</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">5 generations per day</p>
              </div>
              <Button variant="outline">Upgrade to Pro</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}