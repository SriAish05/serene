import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';
import { 
  Heart,
  Brain,
  Target,
  Clock,
  TrendingUp,
  Calendar,
  BookOpen,
  Users,
  MessageCircle,
  Coffee,
  Square,
  CheckCircle,
  Activity,
  Zap,
  Moon,
  Dumbbell,
  BrainCircuit
} from 'lucide-react';

export const StudentDashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('This Week');
  const [activeTrendTab, setActiveTrendTab] = useState('Wellness');
  const { user } = useAuth();

  // Wellness Analytics Data
  const wellnessMetrics = [
    {
      title: 'Average Wellness Score',
      value: '8.1/10',
      change: '+5.2% improvement this week',
      icon: Heart,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Stress Management',
      value: 'Good',
      change: '-15% stress reduction',
      icon: Brain,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Goals Achievement',
      value: '85%',
      change: '+12% completion rate',
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Daily Active Hours',
      value: '6.2hrs',
      change: '+8% productive time',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  // Wellness Trends Data
  const wellnessTrends = {
    Wellness: [7.2, 8.1, 8.5, 7.8, 8.3, 8.7, 8.9],
    Stress: [6.5, 5.2, 4.8, 5.1, 4.9, 4.5, 4.2],
    Focus: [6.8, 7.2, 7.8, 7.1, 7.5, 8.0, 8.3],
    Sleep: [7.5, 7.8, 8.0, 7.6, 7.9, 8.2, 8.5]
  };

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Today's Activities Data
  const todaysActivities = [
    { name: 'Mood Check-in', status: 'Completed', color: 'text-green-600', icon: CheckCircle },
    { name: 'Sleep Logged', status: '7.5 hours', color: 'text-blue-600', icon: Moon },
    { name: 'Energy Level', status: 'High', color: 'text-orange-600', icon: Coffee },
    { name: 'Study Session', status: '2.5 hours', color: 'text-purple-600', icon: BookOpen }
  ];

  // Weekly Insights Data
  const weeklyInsights = [
    {
      type: 'Improvement',
      message: 'Your wellness score improved by 5.2% this week',
      color: 'bg-green-100 text-green-800 border-green-200',
      icon: TrendingUp
    },
    {
      type: 'Pattern',
      message: 'You tend to be most productive on Wednesdays',
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: Activity
    },
    {
      type: 'Social',
      message: 'Peer interactions boost your mood by 12%',
      color: 'bg-purple-100 text-purple-800 border-purple-200',
      icon: Users
    }
  ];

  // Resource Usage Data
  const resourceUsage = [
    { name: 'AI Chat Sessions', count: 12, total: 15, percentage: 80 },
    { name: 'Peer Forum Posts', count: 3, total: 10, percentage: 30 },
    { name: 'Wellness Sessions', count: 4, total: 6, percentage: 67 },
    { name: 'Resources Accessed', count: 8, total: 12, percentage: 67 }
  ];

  // Goals Progress Data
  const goalsProgress = [
    { name: 'Daily Meditation', current: 8, target: 10, unit: 'min', percentage: 80 },
    { name: 'Weekly Exercise', current: 120, target: 150, unit: 'min', percentage: 80 },
    { name: 'Sleep Schedule', current: 7.2, target: 8, unit: 'hours', percentage: 90 },
    { name: 'Stress Management', current: 3.1, target: 2, unit: 'level', percentage: 65, reverse: true }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-6 space-y-6 max-w-[100rem] mx-auto flex-1">
          {/* Header */}
          <div className="flex items-start">
            <h1 className="text-3xl font-bold text-primary">
              Good morning, {user?.name || 'there'}! Here's your wellness overview for today
            </h1>
          </div>

        {/* Wellness Analytics Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Wellness Analytics</h2>
              <p className="text-sm text-muted-foreground">
                Track your progress and identify patterns in your wellness journey
              </p>
            </div>
            <select 
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-3 py-2 border border-input rounded-md text-sm focus:border-primary transition-smooth"
            >
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
              <option value="Last 3 Months">Last 3 Months</option>
            </select>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wellnessMetrics.map((metric, index) => (
              <Card key={index} className="shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                      <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                      <p className={`text-sm ${metric.color}`}>{metric.change}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                      <metric.icon className={`h-6 w-6 ${metric.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Wellness Trends */}
          <div className="lg:col-span-2 space-y-6">
            {/* Wellness Trends Chart */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Wellness Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTrendTab} onValueChange={setActiveTrendTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="Wellness">Wellness</TabsTrigger>
                    <TabsTrigger value="Stress">Stress</TabsTrigger>
                    <TabsTrigger value="Focus">Focus</TabsTrigger>
                    <TabsTrigger value="Sleep">Sleep</TabsTrigger>
                  </TabsList>
                  <TabsContent value={activeTrendTab} className="mt-6">
                    <div className="h-64 flex items-end justify-between space-x-2">
                      {wellnessTrends[activeTrendTab as keyof typeof wellnessTrends].map((value, index) => (
                        <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                          <div 
                            className="bg-primary rounded-t-lg w-full transition-all duration-500"
                            style={{ height: `${(value / 10) * 200}px` }}
                          />
                          <span className="text-xs text-muted-foreground">{days[index]}</span>
                          <span className="text-xs font-medium text-foreground">{value}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Resource Usage and Goals Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Resource Usage */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Resource Usage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {resourceUsage.map((resource, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{resource.name}</span>
                        <span className="text-muted-foreground">{resource.count} this week</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${resource.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Goals Progress */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Goals Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {goalsProgress.map((goal, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{goal.name}</span>
                        <span className="text-muted-foreground">
                          {goal.current} / {goal.target} {goal.unit}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            goal.reverse && goal.percentage < 70 ? 'bg-destructive' : 'bg-primary'
                          }`}
                          style={{ width: `${goal.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 gap-4">
              <Card className="shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Coffee className="h-8 w-8 text-orange-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Energy Level</p>
                      <p className="text-lg font-semibold text-orange-600">High</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Square className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Study Session</p>
                      <p className="text-lg font-semibold text-purple-600">2.5 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Today's Activities */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Today's Activities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {todaysActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/50 transition-colors">
                    <activity.icon className={`h-5 w-5 ${activity.color}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.name}</p>
                    </div>
                    <span className={`text-sm font-medium ${activity.color}`}>
                      {activity.status}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Weekly Insights */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Weekly Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {weeklyInsights.map((insight, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${insight.color}`}>
                    <div className="flex items-start space-x-2">
                      <insight.icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide mb-1">
                          {insight.type}
                        </p>
                        <p className="text-sm">{insight.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Footer - Pushes content to bottom when minimal */}
        <div className="mt-auto p-6 border-t border-border bg-card/50">
          <div className="max-w-[100rem] mx-auto">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-4">
                <span>© 2024 SERENE Wellness Platform</span>
                <span>•</span>
                <span>Your mental health companion</span>
              </div>
              <div className="flex items-center space-x-4">
               
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
  );
};

export default StudentDashboard;
