import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  Users, 
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Clock,
  Eye,
  Filter,
  Search,
  Download,
  MessageCircle,
  BookOpen,
  Heart,
  Brain,
  Calendar,
  Target,
  Settings
} from 'lucide-react';

export const ActivityLog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');

  const usageStats = [
    {
      feature: 'AI Chat',
      totalUsers: 1247,
      activeUsers: 892,
      usageRate: 71.5,
      avgSessionTime: '12.5 min',
      trend: 'up',
      change: '+8.2%',
      icon: MessageCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      feature: 'Resources',
      totalUsers: 1247,
      activeUsers: 756,
      usageRate: 60.6,
      avgSessionTime: '8.3 min',
      trend: 'up',
      change: '+5.1%',
      icon: BookOpen,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      feature: 'Mood Tracking',
      totalUsers: 1247,
      activeUsers: 634,
      usageRate: 50.8,
      avgSessionTime: '3.2 min',
      trend: 'up',
      change: '+12.3%',
      icon: Heart,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },
    {
      feature: 'Peer Forum',
      totalUsers: 1247,
      activeUsers: 423,
      usageRate: 33.9,
      avgSessionTime: '15.7 min',
      trend: 'down',
      change: '-2.1%',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      feature: 'Assessment',
      totalUsers: 1247,
      activeUsers: 567,
      usageRate: 45.5,
      avgSessionTime: '6.8 min',
      trend: 'up',
      change: '+3.7%',
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      feature: 'Calendar',
      totalUsers: 1247,
      activeUsers: 298,
      usageRate: 23.9,
      avgSessionTime: '4.1 min',
      trend: 'down',
      change: '-1.2%',
      icon: Calendar,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      user: 'Sarah Wilson',
      action: 'Completed PHQ-9 Assessment',
      feature: 'Assessment',
      timestamp: '2 minutes ago',
      details: 'Score: 8/27 (Moderate Depression)',
      type: 'assessment'
    },
    {
      id: 2,
      user: 'Sarah Wilson',
      action: 'Started AI Chat Session',
      feature: 'AI Chat',
      timestamp: '5 minutes ago',
      details: 'Topic: Study stress management',
      type: 'chat'
    },
    {
      id: 3,
      user: 'Mike Chen',
      action: 'Viewed Resource',
      feature: 'Resources',
      timestamp: '8 minutes ago',
      details: 'Article: "Managing Anxiety During Exams"',
      type: 'resource'
    },
    {
      id: 4,
      user: 'Emma Davis',
      action: 'Posted in Forum',
      feature: 'Peer Forum',
      timestamp: '12 minutes ago',
      details: 'Topic: "Study Groups and Mental Health"',
      type: 'forum'
    },
    {
      id: 5,
      user: 'John Smith',
      action: 'Logged Mood',
      feature: 'Mood Tracking',
      timestamp: '15 minutes ago',
      details: 'Mood: 7/10, Notes: "Feeling better after meditation"',
      type: 'mood'
    }
  ];

  const userEngagement = [
    {
      className: '12th Grade',
      totalStudents: 156,
      activeStudents: 142,
      engagementRate: 91.0,
      avgFeaturesUsed: 4.2,
      topFeature: 'AI Chat',
      avgSessionTime: '18.5 min'
    },
    {
      className: '11th Grade',
      totalStudents: 142,
      activeStudents: 128,
      engagementRate: 90.1,
      avgFeaturesUsed: 3.8,
      topFeature: 'Resources',
      avgSessionTime: '16.2 min'
    },
    {
      className: '10th Grade',
      totalStudents: 138,
      activeStudents: 119,
      engagementRate: 86.2,
      avgFeaturesUsed: 3.5,
      topFeature: 'Mood Tracking',
      avgSessionTime: '14.8 min'
    }
  ];

  const peakUsageTimes = [
    { time: '8:00 AM', users: 45, activity: 'Morning check-ins' },
    { time: '12:00 PM', users: 78, activity: 'Lunch break usage' },
    { time: '3:00 PM', users: 92, activity: 'After school peak' },
    { time: '7:00 PM', users: 156, activity: 'Evening study time' },
    { time: '9:00 PM', users: 134, activity: 'Pre-sleep reflection' }
  ];

  const featurePreferences = [
    { feature: 'AI Chat', percentage: 71.5, users: 892, description: 'Most popular for immediate support' },
    { feature: 'Resources', percentage: 60.6, users: 756, description: 'Self-help and educational content' },
    { feature: 'Mood Tracking', percentage: 50.8, users: 634, description: 'Personal wellness monitoring' },
    { feature: 'Assessment', percentage: 45.5, users: 567, description: 'Mental health screening tools' },
    { feature: 'Peer Forum', percentage: 33.9, users: 423, description: 'Community support and discussion' },
    { feature: 'Calendar', percentage: 23.9, users: 298, description: 'Wellness planning and scheduling' }
  ];

  return (
    <div className="p-6 space-y-6 max-w-[100rem] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Activity Log & Usage Analytics</h1>
          <p className="text-xl text-muted-foreground">Monitor student engagement and feature usage</p>
        </div>
        <div className="flex space-x-2">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 border border-input rounded-md text-sm focus:border-primary"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Usage Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {usageStats.map((stat, index) => (
          <Card key={index} className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="flex items-center space-x-1">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <h3 className="font-semibold mb-2">{stat.feature}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Users:</span>
                  <span className="font-medium">{stat.activeUsers.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Usage Rate:</span>
                  <span className="font-medium">{stat.usageRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg Session:</span>
                  <span className="font-medium">{stat.avgSessionTime}</span>
                </div>
              </div>
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${stat.color.replace('text-', 'bg-')}`}
                    style={{ width: `${stat.usageRate}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-primary" />
              <span>Recent Activities</span>
            </CardTitle>
            <CardDescription>
              Real-time user activity feed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'chat' ? 'bg-blue-500' :
                    activity.type === 'resource' ? 'bg-green-500' :
                    activity.type === 'forum' ? 'bg-purple-500' :
                    activity.type === 'mood' ? 'bg-pink-500' : 'bg-orange-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{activity.user}</span>
                      <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                    </div>
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Peak Usage Times */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Peak Usage Times</span>
            </CardTitle>
            <CardDescription>
              When students are most active
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {peakUsageTimes.map((peak, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{peak.time}</span>
                    <span className="text-sm text-muted-foreground">{peak.users} users</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${(peak.users / 156) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground">{peak.activity}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* User Engagement by Class */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <span>Engagement by Class</span>
            </CardTitle>
            <CardDescription>
              Student engagement across different grades
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userEngagement.map((classData, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{classData.className}</h3>
                    <Badge variant="outline">{classData.engagementRate}% engaged</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Active: </span>
                      <span className="font-medium">{classData.activeStudents}/{classData.totalStudents}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Avg Features: </span>
                      <span className="font-medium">{classData.avgFeaturesUsed}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Top Feature: </span>
                      <span className="font-medium">{classData.topFeature}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Avg Session: </span>
                      <span className="font-medium">{classData.avgSessionTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Feature Preferences */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5 text-primary" />
              <span>Feature Preferences</span>
            </CardTitle>
            <CardDescription>
              Most and least used features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {featurePreferences.map((feature, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{feature.feature}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{feature.percentage}%</span>
                      <span className="text-xs text-muted-foreground">({feature.users} users)</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${feature.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActivityLog;
