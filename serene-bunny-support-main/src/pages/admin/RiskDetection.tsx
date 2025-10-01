import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Users, 
  Heart,
  Brain,
  Moon,
  Activity,
  Eye,
  MessageSquare,
  Calendar,
  BarChart3,
  PieChart
} from 'lucide-react';

export const RiskDetection = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');

  const riskMetrics = [
    {
      category: 'Mental Health Risk',
      value: 23,
      change: -12,
      trend: 'down',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      icon: AlertTriangle
    },
    {
      category: 'Academic Performance',
      value: 15,
      change: -8,
      trend: 'down',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      icon: TrendingDown
    },
    {
      category: 'Social Isolation',
      value: 8,
      change: +3,
      trend: 'up',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      icon: Users
    },
    {
      category: 'Sleep Issues',
      value: 31,
      change: -5,
      trend: 'down',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      icon: Moon
    }
  ];

  const highRiskStudents = [
    {
      id: 'STU001',
      name: 'Sarah Wilson',
      riskScore: 8.5,
      riskLevel: 'High',
      indicators: [
        'Depression symptoms detected',
        'Sleep pattern disruption',
        'Academic performance decline',
        'Social withdrawal'
      ],
      lastAssessment: '2 days ago',
      counselor: 'Dr. Sarah Wilson',
      status: 'Intervention Required'
    },
    {
      id: 'STU045',
      name: 'Mike Chen',
      riskScore: 7.8,
      riskLevel: 'High',
      indicators: [
        'Anxiety levels elevated',
        'Irregular mood patterns',
        'Low engagement with support resources'
      ],
      lastAssessment: '1 day ago',
      counselor: 'Dr. John Smith',
      status: 'Monitoring'
    },
    {
      id: 'STU128',
      name: 'Emma Davis',
      riskScore: 7.2,
      riskLevel: 'High',
      indicators: [
        'Extended periods of low mood',
        'Social isolation',
        'Academic stress indicators'
      ],
      lastAssessment: '3 days ago',
      counselor: 'Dr. Sarah Wilson',
      status: 'Counselor Assigned'
    }
  ];

  const riskTrends = [
    { month: 'Jan', mentalHealth: 25, academic: 18, social: 12, sleep: 35 },
    { month: 'Feb', mentalHealth: 23, academic: 16, social: 10, sleep: 32 },
    { month: 'Mar', mentalHealth: 21, academic: 15, social: 8, sleep: 31 },
    { month: 'Apr', mentalHealth: 20, academic: 14, social: 9, sleep: 30 },
    { month: 'May', mentalHealth: 18, academic: 13, social: 7, sleep: 28 },
    { month: 'Jun', mentalHealth: 16, academic: 12, social: 6, sleep: 26 }
  ];

  const interventionStrategies = [
    {
      strategy: 'Immediate Counseling',
      students: 8,
      effectiveness: 85,
      description: 'One-on-one counseling sessions for high-risk students'
    },
    {
      strategy: 'Peer Support Groups',
      students: 15,
      effectiveness: 72,
      description: 'Group therapy and peer support activities'
    },
    {
      strategy: 'Academic Support',
      students: 12,
      effectiveness: 68,
      description: 'Additional academic resources and tutoring'
    },
    {
      strategy: 'Wellness Workshops',
      students: 25,
      effectiveness: 78,
      description: 'Educational workshops on stress management and wellness'
    }
  ];

  return (
    <div className="p-6 space-y-6 max-w-[100rem] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Risk Detection & Analytics</h1>
          <p className="text-xl text-muted-foreground">Monitor and analyze student risk factors</p>
        </div>
        <div className="flex space-x-2">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 border border-input rounded-md text-sm focus:border-primary"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {riskMetrics.map((metric, index) => (
          <Card key={index} className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.category}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {metric.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3 text-red-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-green-500" />
                    )}
                    <span className={`text-sm font-medium ${
                      metric.trend === 'up' ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {Math.abs(metric.change)}%
                    </span>
                    <span className="text-sm text-muted-foreground">vs last period</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* High Risk Students */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span>High Risk Students</span>
            </CardTitle>
            <CardDescription>
              Students requiring immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {highRiskStudents.map((student) => (
                <div key={student.id} className="p-4 border border-red-200 rounded-lg bg-red-50/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-600 font-bold text-sm">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold">{student.name}</h3>
                        <p className="text-sm text-muted-foreground">Risk Score: {student.riskScore}/10</p>
                      </div>
                    </div>
                    <Badge variant="destructive">{student.riskLevel} Risk</Badge>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <h4 className="text-sm font-medium">Risk Indicators:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {student.indicators.map((indicator, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                          {indicator}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-muted-foreground">Counselor: </span>
                      <span className="font-medium">{student.counselor}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Contact
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Trends Chart */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5 text-primary" />
              <span>Risk Trends Over Time</span>
            </CardTitle>
            <CardDescription>
              Monthly risk factor analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskTrends.slice(-3).map((trend, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{trend.month}</span>
                    <span className="text-muted-foreground">Total: {trend.mentalHealth + trend.academic + trend.social + trend.sleep}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>Mental Health</span>
                      <span>{trend.mentalHealth}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(trend.mentalHealth / 40) * 100}%` }}></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>Academic</span>
                      <span>{trend.academic}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${(trend.academic / 20) * 100}%` }}></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>Social</span>
                      <span>{trend.social}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${(trend.social / 15) * 100}%` }}></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>Sleep</span>
                      <span>{trend.sleep}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${(trend.sleep / 40) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Intervention Strategies */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-primary" />
            <span>Intervention Strategies</span>
          </CardTitle>
          <CardDescription>
            Current intervention approaches and their effectiveness
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {interventionStrategies.map((strategy, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{strategy.strategy}</h3>
                  <Badge variant="outline">{strategy.effectiveness}% effective</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{strategy.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span>Students: {strategy.students}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${strategy.effectiveness}%` }}
                      ></div>
                    </div>
                    <span className="text-muted-foreground">{strategy.effectiveness}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskDetection;
