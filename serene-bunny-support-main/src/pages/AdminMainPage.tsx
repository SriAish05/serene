import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useAuth } from '@/contexts/AuthContext';
import { 
  BarChart3, 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  Calendar,
  Clock,
  Heart,
  Brain,
  Moon,
  BookOpen,
  Download,
  Filter,
  Search,
  Eye,
  Shield,
  Settings,
  MessageSquare,
  FileText,
  UserCheck,
  Activity,
  Target,
  Bell,
  Database,
  PieChart,
  LineChart
} from 'lucide-react';

export const AdminMainPage = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const { user } = useAuth();

  const overviewStats = [
    {
      title: 'Total Active Students',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Wellness Score Average',
      value: '7.2/10',
      change: '+0.3',
      trend: 'up',
      icon: Heart,
      color: 'text-green-600'
    },
    {
      title: 'At-Risk Students',
      value: '23',
      change: '-5',
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-red-600'
    },
    {
      title: 'Daily Active Users',
      value: '892',
      change: '+8%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ];

  const riskStudents = [
    {
      id: 'STU001',
      name: 'Sarah Wilson',
      riskLevel: 'High',
      indicators: ['Poor sleep pattern', 'Declined academic performance', 'Low app engagement'],
      lastActive: '3 days ago',
      wellnessScore: 3.2,
      status: 'Pending Intervention'
    },
    {
      id: 'STU045',
      name: 'Sarah Wilson',
      riskLevel: 'Medium',
      indicators: ['Irregular mood patterns', 'Increased stress levels'],
      lastActive: '1 day ago',
      wellnessScore: 5.8,
      status: 'Monitoring'
    },
    {
      id: 'STU128',
      name: 'Mike Chen',
      riskLevel: 'High',
      indicators: ['Extended periods of low mood', 'Social isolation'],
      lastActive: '2 days ago',
      wellnessScore: 4.1,
      status: 'Counselor Assigned'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'alert',
      message: 'Student STU001 wellness score dropped below threshold',
      time: '2 hours ago',
      priority: 'high'
    },
    {
      id: 2,
      type: 'success',
      message: 'New student registration completed',
      time: '4 hours ago',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'info',
      message: 'Weekly wellness report generated',
      time: '1 day ago',
      priority: 'low'
    }
  ];

  const quickActions = [
    { icon: Users, label: 'Manage Students', description: 'View and manage student accounts', color: 'bg-blue-50 text-blue-600' },
    { icon: FileText, label: 'Generate Reports', description: 'Create wellness and usage reports', color: 'bg-green-50 text-green-600' },
    { icon: MessageSquare, label: 'Send Notifications', description: 'Send alerts to students', color: 'bg-purple-50 text-purple-600' },
    { icon: Settings, label: 'System Settings', description: 'Configure platform settings', color: 'bg-gray-50 text-gray-600' },
    { icon: Database, label: 'Data Export', description: 'Export student data', color: 'bg-orange-50 text-orange-600' },
    { icon: Shield, label: 'Security Audit', description: 'Review security settings', color: 'bg-red-50 text-red-600' }
  ];

  return (
    <div className="p-6 space-y-6 max-w-[100rem] mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-primary">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-xl text-muted-foreground">
          Here's your admin dashboard overview
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => (
          <Card key={index} className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <span className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-muted-foreground">vs last period</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.color.replace('text-', 'bg-').replace('-600', '-50')}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-primary" />
                <span>Quick Actions</span>
              </CardTitle>
              <CardDescription>
                Common administrative tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-start space-y-2 hover:shadow-card transition-smooth btn-calm cursor-pointer"
                  >
                    <div className={`p-2 rounded-lg ${action.color}`}>
                      <action.icon className="h-4 w-4" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{action.label}</div>
                      <div className="text-xs text-muted-foreground">{action.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* At-Risk Students */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span>At-Risk Students</span>
              </CardTitle>
              <CardDescription>
                Students requiring immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50/50">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge variant="destructive" className="text-xs">
                          {student.riskLevel} Risk
                        </Badge>
                        <span className="font-medium">{student.name}</span>
                        <span className="text-sm text-muted-foreground">({student.id})</span>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        Wellness Score: {student.wellnessScore}/10
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Last Active: {student.lastActive}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {student.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Activities */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-primary" />
                <span>Recent Activities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-smooth">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.priority === 'high' ? 'bg-red-500' : 
                      activity.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>System Health</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database Status</span>
                  <Badge variant="default" className="bg-green-100 text-green-800">Healthy</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Response Time</span>
                  <span className="text-sm text-green-600">45ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Storage Usage</span>
                  <span className="text-sm text-muted-foreground">67%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Sessions</span>
                  <span className="text-sm text-blue-600">1,247</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="h-5 w-5 text-primary" />
                <span>Quick Stats</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">New Students Today</span>
                  <span className="text-sm font-medium">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Messages Sent</span>
                  <span className="text-sm font-medium">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Reports Generated</span>
                  <span className="text-sm font-medium">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Alerts Triggered</span>
                  <span className="text-sm font-medium text-red-600">3</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminMainPage;
