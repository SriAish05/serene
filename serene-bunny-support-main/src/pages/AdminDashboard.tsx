import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Shield
} from 'lucide-react';

export const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');

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
      riskLevel: 'High',
      indicators: ['Poor sleep pattern', 'Declined academic performance', 'Low app engagement'],
      lastActive: '3 days ago',
      wellnessScore: 3.2,
      status: 'Pending Intervention'
    },
    {
      id: 'STU045',
      riskLevel: 'Medium',
      indicators: ['Irregular mood patterns', 'Increased stress levels'],
      lastActive: '1 day ago',
      wellnessScore: 5.8,
      status: 'Monitoring'
    },
    {
      id: 'STU128',
      riskLevel: 'High',
      indicators: ['Extended periods of low mood', 'Social isolation'],
      lastActive: '2 days ago',
      wellnessScore: 4.1,
      status: 'Counselor Assigned'
    }
  ];

  const campusMetrics = [
    {
      metric: 'Average Sleep Duration',
      value: '6.8 hours',
      target: '8 hours',
      percentage: 85,
      trend: 'down'
    },
    {
      metric: 'Stress Level',
      value: '6.2/10',
      target: '< 5/10',
      percentage: 62,
      trend: 'up'
    },
    {
      metric: 'Academic Satisfaction',
      value: '7.4/10',
      target: '> 7/10',
      percentage: 74,
      trend: 'stable'
    },
    {
      metric: 'Social Connection',
      value: '6.9/10',
      target: '> 7/10',
      percentage: 69,
      trend: 'up'
    }
  ];

  const academicCorrelations = [
    {
      subject: 'Mathematics',
      avgGrade: '7.2',
      stressLevel: '8.1',
      correlation: 'High stress correlation',
      students: 156
    },
    {
      subject: 'Computer Science',
      avgGrade: '8.1',
      stressLevel: '6.8',
      correlation: 'Moderate stress',
      students: 134
    },
    {
      subject: 'Literature',
      avgGrade: '7.8',
      stressLevel: '5.2',
      correlation: 'Low stress',
      students: 98
    },
    {
      subject: 'Chemistry',
      avgGrade: '6.9',
      stressLevel: '7.9',
      correlation: 'High stress correlation',
      students: 112
    }
  ];

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-[100rem] mx-auto">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
              <p className="text-xl text-muted-foreground">
                Student wellness analytics and early intervention system
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export Report</span>
              </Button>
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-input rounded-md focus:border-primary transition-smooth"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 3 months</option>
              </select>
            </div>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {overviewStats.map((stat, index) => (
              <Card key={index} className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold text-primary">{stat.value}</p>
                      <p className={`text-sm flex items-center space-x-1 ${
                        stat.trend === 'up' ? 'text-green-600' : 
                        stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        <TrendingUp className={`h-3 w-3 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                        <span>{stat.change} from last week</span>
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg bg-primary/10`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 max-w-2xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="risks">Risk Detection</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="wellness">Wellness</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Engagement Metrics */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <span>Platform Engagement</span>
                  </CardTitle>
                  <CardDescription>
                    Student interaction with mental health resources
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { feature: 'AI Chat Sessions', usage: '78%', count: '1,890' },
                      { feature: 'Mood Tracking', usage: '65%', count: '1,456' },
                      { feature: 'Meditation Resources', usage: '52%', count: '987' },
                      { feature: 'Peer Forum', usage: '43%', count: '812' },
                      { feature: 'Study Tools', usage: '71%', count: '1,623' }
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{item.feature}</span>
                          <span className="text-sm text-muted-foreground">{item.count} uses</span>
                        </div>
                        <div className="w-full bg-accent rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-500"
                            style={{ width: item.usage }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Campus Wellness Metrics */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-5 w-5 text-primary" />
                    <span>Campus Wellness Overview</span>
                  </CardTitle>
                  <CardDescription>
                    Key mental health indicators across campus
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {campusMetrics.map((metric, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{metric.metric}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-semibold">{metric.value}</span>
                            <span className="text-xs text-muted-foreground">target: {metric.target}</span>
                          </div>
                        </div>
                        <div className="w-full bg-accent rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              metric.percentage >= 70 ? 'bg-green-500' :
                              metric.percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${metric.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="risks" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <span>Early Risk Detection</span>
                    </CardTitle>
                    <CardDescription>
                      Students identified as requiring intervention or monitoring
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-1" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Search className="h-4 w-4 mr-1" />
                      Search
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {riskStudents.map((student, index) => (
                    <Card key={index} className="border-l-4 border-l-red-400">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center space-x-3">
                              <span className="font-medium">Student {student.id}</span>
                              <Badge className={getRiskLevelColor(student.riskLevel)}>
                                {student.riskLevel} Risk
                              </Badge>
                              <Badge variant="outline">{student.status}</Badge>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Risk Indicators:</p>
                              <div className="flex flex-wrap gap-1">
                                {student.indicators.map((indicator, idx) => (
                                  <span key={idx} className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded">
                                    {indicator}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>Wellness Score: {student.wellnessScore}/10</span>
                              <span>Last Active: {student.lastActive}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View Profile
                            </Button>
                            <Button variant="calm" size="sm">
                              <Shield className="h-4 w-4 mr-1" />
                              Assign Counselor
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="academic" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>Academic Performance & Mental Health Correlation</span>
                </CardTitle>
                <CardDescription>
                  Relationship between academic performance and student wellness
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {academicCorrelations.map((subject, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg hover:shadow-soft transition-smooth">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <h3 className="font-semibold">{subject.subject}</h3>
                          <div className="flex items-center space-x-4 text-sm">
                            <span>Avg Grade: <span className="font-medium text-primary">{subject.avgGrade}/10</span></span>
                            <span>Stress Level: <span className="font-medium text-red-600">{subject.stressLevel}/10</span></span>
                            <span className="text-muted-foreground">{subject.students} students</span>
                          </div>
                          <Badge variant={subject.correlation.includes('High') ? 'destructive' : 'secondary'}>
                            {subject.correlation}
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wellness" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Moon className="h-5 w-5 text-primary" />
                    <span>Sleep Patterns</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">6.8 hrs</div>
                      <div className="text-sm text-muted-foreground">Average sleep duration</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Sleep Quality Distribution</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 bg-green-50 rounded">
                          <div className="font-semibold text-green-700">42%</div>
                          <div className="text-xs text-green-600">Good</div>
                        </div>
                        <div className="p-2 bg-yellow-50 rounded">
                          <div className="font-semibold text-yellow-700">35%</div>
                          <div className="text-xs text-yellow-600">Fair</div>
                        </div>
                        <div className="p-2 bg-red-50 rounded">
                          <div className="font-semibold text-red-700">23%</div>
                          <div className="text-xs text-red-600">Poor</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-5 w-5 text-primary" />
                    <span>Mental Health Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Anxiety Levels</span>
                        <span className="text-orange-600">Moderate</span>
                      </div>
                      <div className="w-full bg-accent rounded-full h-2">
                        <div className="bg-orange-400 h-2 rounded-full" style={{ width: '62%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Depression Indicators</span>
                        <span className="text-yellow-600">Low-Moderate</span>
                      </div>
                      <div className="w-full bg-accent rounded-full h-2">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '35%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Overall Satisfaction</span>
                        <span className="text-green-600">Good</span>
                      </div>
                      <div className="w-full bg-accent rounded-full h-2">
                        <div className="bg-green-400 h-2 rounded-full" style={{ width: '74%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
  );
};

export default AdminDashboard;