import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  Brain, 
  Target, 
  Clock, 
  Coffee, 
  Square, 
  CheckCircle, 
  Moon, 
  TrendingUp, 
  Users, 
  BarChart3,
  Activity,
  Zap,
  Calendar,
  BookOpen,
  MessageCircle
} from 'lucide-react';

export const WellnessDashboard = () => {
  const [activeTab, setActiveTab] = useState('wellness');

  // Sample data - in a real app this would come from an API
  const wellnessData = {
    averageScore: 8.1,
    stressManagement: 'Good',
    goalsAchievement: 85,
    dailyActiveHours: 6.2,
    stressReduction: -15,
    completionRate: 12,
    productiveTime: 8
  };

  const weeklyData = [
    { day: 'Mon', score: 7.2 },
    { day: 'Tue', score: 8.1 },
    { day: 'Wed', score: 8.5 },
    { day: 'Thu', score: 7.8 },
    { day: 'Fri', score: 8.3 },
    { day: 'Sat', score: 8.7 },
    { day: 'Sun', score: 8.9 }
  ];

  const todaysActivities = [
    { name: 'Mood Check-in', status: 'Completed', icon: CheckCircle, color: 'text-green-500' },
    { name: 'Sleep Logged', status: '7.5 hours', icon: Moon, color: 'text-blue-500' },
    { name: 'Energy Level', status: 'High', icon: Coffee, color: 'text-orange-500' },
    { name: 'Study Session', status: '2.5 hours', icon: Square, color: 'text-purple-500' }
  ];

  const resourceUsage = [
    { name: 'AI Chat Sessions', count: '12 this week', icon: MessageCircle },
    { name: 'Peer Forum Posts', count: '3 this week', icon: Users },
    { name: 'Wellness Sessions', count: '4 this week', icon: Heart },
    { name: 'Resources Accessed', count: '8 this week', icon: BookOpen }
  ];

  const goalsProgress = [
    { name: 'Daily Meditation', current: 8, target: 10, unit: 'min', color: 'bg-green-500' },
    { name: 'Weekly Exercise', current: 120, target: 150, unit: 'min', color: 'bg-green-500' },
    { name: 'Sleep Schedule', current: 7.2, target: 8, unit: 'hours', color: 'bg-green-500' },
    { name: 'Stress Management', current: 3.1, target: 2, unit: 'level', color: 'bg-red-500', exceeded: true }
  ];

  const weeklyInsights = [
    { 
      type: 'IMPROVEMENT', 
      title: 'Your wellness score improved by 5.2% this week', 
      icon: TrendingUp,
      color: 'text-green-500'
    },
    { 
      type: 'PATTERN', 
      title: 'You tend to be most productive on Wednesdays', 
      icon: BarChart3,
      color: 'text-blue-500'
    },
    { 
      type: 'SOCIAL', 
      title: 'Peer interactions boost your mood by 12%', 
      icon: Users,
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Good morning, there! Here's your wellness overview for today
        </h1>
      </div>

      {/* Wellness Analytics */}
      <div className="mb-8">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-foreground mb-2">Wellness Analytics</h2>
          <p className="text-muted-foreground">Track your progress and identify patterns in your wellness journey</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Average Wellness Score */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Wellness Score</p>
                  <p className="text-2xl font-bold text-foreground">{wellnessData.averageScore}/10</p>
                  <p className="text-sm text-green-500">+5.2% improvement this week</p>
                </div>
                <Heart className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          {/* Stress Management */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Stress Management</p>
                  <p className="text-2xl font-bold text-foreground">{wellnessData.stressManagement}</p>
                  <p className="text-sm text-green-500">{wellnessData.stressReduction}% stress reduction</p>
                </div>
                <Brain className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          {/* Goals Achievement */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Goals Achievement</p>
                  <p className="text-2xl font-bold text-foreground">{wellnessData.goalsAchievement}%</p>
                  <p className="text-sm text-green-500">+{wellnessData.completionRate}% completion rate</p>
                </div>
                <Target className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          {/* Daily Active Hours */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Daily Active Hours</p>
                  <p className="text-2xl font-bold text-foreground">{wellnessData.dailyActiveHours}hrs</p>
                  <p className="text-sm text-green-500">+{wellnessData.productiveTime}% productive time</p>
                </div>
                <Clock className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Wellness Trends */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">Wellness Trends</h2>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="wellness">Wellness</TabsTrigger>
            <TabsTrigger value="stress">Stress</TabsTrigger>
            <TabsTrigger value="focus">Focus</TabsTrigger>
            <TabsTrigger value="sleep">Sleep</TabsTrigger>
          </TabsList>
          <TabsContent value="wellness" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Daily Wellness Scores</h3>
                </div>
                <div className="flex items-end justify-between h-32">
                  {weeklyData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="bg-green-500 w-8 rounded-t"
                        style={{ height: `${(item.score / 10) * 100}%` }}
                      ></div>
                      <span className="text-xs text-muted-foreground mt-2">{item.day}</span>
                      <span className="text-xs font-medium">{item.score}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Activities */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Activity className="h-5 w-5 text-foreground" />
            <h3 className="text-lg font-semibold text-foreground">Today's Activities</h3>
          </div>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <Card className="p-3">
              <div className="flex items-center space-x-2">
                <Coffee className="h-4 w-4 text-orange-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Energy Level</p>
                  <p className="text-sm font-medium text-orange-500">High</p>
                </div>
              </div>
            </Card>
            <Card className="p-3">
              <div className="flex items-center space-x-2">
                <Square className="h-4 w-4 text-purple-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Study Session</p>
                  <p className="text-sm font-medium text-purple-500">2.5 hours</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Activities List */}
          <div className="space-y-2">
            {todaysActivities.map((activity, index) => (
              <Card key={index} className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <activity.icon className={`h-4 w-4 ${activity.color}`} />
                    <span className="text-sm font-medium">{activity.name}</span>
                  </div>
                  <span className={`text-sm font-medium ${activity.color}`}>{activity.status}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Resource Usage */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Resource Usage</h3>
          <div className="space-y-3">
            {resourceUsage.map((resource, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <resource.icon className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">{resource.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{resource.count}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Goals Progress */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Goals Progress</h3>
          <div className="space-y-3">
            {goalsProgress.map((goal, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{goal.name}</span>
                    <span className={`text-sm font-medium ${goal.exceeded ? 'text-red-500' : 'text-green-500'}`}>
                      {goal.current} / {goal.target} {goal.unit}
                    </span>
                  </div>
                  <Progress 
                    value={goal.exceeded ? 100 : (goal.current / goal.target) * 100} 
                    className="h-2"
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Insights */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {weeklyInsights.map((insight, index) => (
            <Card key={index} className="p-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <insight.icon className={`h-4 w-4 ${insight.color}`} />
                  <span className="text-xs font-semibold text-muted-foreground">{insight.type}</span>
                </div>
                <p className="text-sm text-foreground">{insight.title}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          © 2024 SERENE Wellness Platform • Your mental health companion
        </p>
      </div>
    </div>
  );
};

export default WellnessDashboard;
