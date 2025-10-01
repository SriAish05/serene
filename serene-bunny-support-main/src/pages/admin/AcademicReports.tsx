import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Download, 
  Calendar,
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  Award,
  Target,
  BarChart3,
  PieChart,
  LineChart,
  Filter,
  Search
} from 'lucide-react';

export const AcademicReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [selectedClass, setSelectedClass] = useState('all');

  const academicMetrics = [
    {
      title: 'Overall GPA',
      value: '3.42',
      change: '+0.15',
      trend: 'up',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      icon: Award
    },
    {
      title: 'Pass Rate',
      value: '87.5%',
      change: '+3.2%',
      trend: 'up',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      icon: Target
    },
    {
      title: 'Attendance Rate',
      value: '92.3%',
      change: '+1.8%',
      trend: 'up',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      icon: Calendar
    },
    {
      title: 'At-Risk Students',
      value: '23',
      change: '-5',
      trend: 'down',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      icon: Users
    }
  ];

  const classPerformance = [
    {
      className: '12th Grade',
      totalStudents: 156,
      averageGPA: 3.58,
      passRate: 91.2,
      attendanceRate: 94.5,
      topPerformer: 'Emma Davis',
      improvement: '+0.12'
    },
    {
      className: '11th Grade',
      totalStudents: 142,
      averageGPA: 3.35,
      passRate: 85.7,
      attendanceRate: 91.8,
      topPerformer: 'Sarah Wilson',
      improvement: '+0.08'
    },
    {
      className: '10th Grade',
      totalStudents: 138,
      averageGPA: 3.28,
      passRate: 82.1,
      attendanceRate: 89.3,
      topPerformer: 'Sarah Wilson',
      improvement: '+0.15'
    }
  ];

  const subjectPerformance = [
    {
      subject: 'Mathematics',
      averageScore: 78.5,
      passRate: 82.3,
      improvement: '+5.2%',
      trend: 'up',
      students: 436
    },
    {
      subject: 'English',
      averageScore: 85.2,
      passRate: 91.7,
      improvement: '+2.1%',
      trend: 'up',
      students: 436
    },
    {
      subject: 'Science',
      averageScore: 81.8,
      passRate: 88.9,
      improvement: '+3.8%',
      trend: 'up',
      students: 436
    },
    {
      subject: 'Social Studies',
      averageScore: 83.1,
      passRate: 89.5,
      improvement: '+1.9%',
      trend: 'up',
      students: 436
    },
    {
      subject: 'Physical Education',
      averageScore: 92.4,
      passRate: 96.8,
      improvement: '+0.8%',
      trend: 'up',
      students: 436
    }
  ];

  const topPerformers = [
    {
      name: 'Emma Davis',
      className: '12th A',
      gpa: 3.95,
      rank: 1,
      subjects: ['Mathematics', 'Science', 'English'],
      improvement: '+0.12'
    },
    {
      name: 'Sarah Wilson',
      className: '11th B',
      gpa: 3.87,
      rank: 2,
      subjects: ['English', 'Social Studies'],
      improvement: '+0.08'
    },
    {
      name: 'Sarah Wilson',
      className: '10th C',
      gpa: 3.82,
      rank: 3,
      subjects: ['Mathematics', 'Science'],
      improvement: '+0.15'
    },
    {
      name: 'Mike Chen',
      className: '12th A',
      gpa: 3.78,
      rank: 4,
      subjects: ['Science', 'Physical Education'],
      improvement: '+0.05'
    }
  ];

  const strugglingStudents = [
    {
      name: 'John Smith',
      className: '11th A',
      gpa: 2.45,
      subjects: ['Mathematics', 'Science'],
      riskLevel: 'High',
      lastSupport: '2 days ago',
      counselor: 'Dr. Sarah Wilson'
    },
    {
      name: 'Lisa Brown',
      className: '10th B',
      gpa: 2.67,
      subjects: ['English', 'Social Studies'],
      riskLevel: 'Medium',
      lastSupport: '1 week ago',
      counselor: 'Dr. John Smith'
    },
    {
      name: 'David Lee',
      className: '12th C',
      gpa: 2.89,
      subjects: ['Mathematics'],
      riskLevel: 'Medium',
      lastSupport: '3 days ago',
      counselor: 'Dr. Sarah Wilson'
    }
  ];

  return (
    <div className="p-6 space-y-6 max-w-[100rem] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Academic Reports</h1>
          <p className="text-xl text-muted-foreground">Comprehensive academic performance analysis</p>
        </div>
        <div className="flex space-x-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-input rounded-md text-sm focus:border-primary"
          >
            <option value="current">Current Semester</option>
            <option value="previous">Previous Semester</option>
            <option value="year">Academic Year</option>
          </select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Academic Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {academicMetrics.map((metric, index) => (
          <Card key={index} className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {metric.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${
                      metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.change}
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
        {/* Class Performance */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span>Class Performance Overview</span>
            </CardTitle>
            <CardDescription>
              Performance metrics by grade level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {classPerformance.map((classData, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{classData.className}</h3>
                    <Badge variant="outline" className="text-green-600">
                      {classData.improvement} improvement
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Students: </span>
                      <span className="font-medium">{classData.totalStudents}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Average GPA: </span>
                      <span className="font-medium">{classData.averageGPA}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Pass Rate: </span>
                      <span className="font-medium">{classData.passRate}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Attendance: </span>
                      <span className="font-medium">{classData.attendanceRate}%</span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="text-muted-foreground">Top Performer: </span>
                    <span className="font-medium">{classData.topPerformer}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subject Performance */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5 text-primary" />
              <span>Subject Performance</span>
            </CardTitle>
            <CardDescription>
              Performance across different subjects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subjectPerformance.map((subject, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{subject.subject}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{subject.averageScore}%</span>
                      <Badge variant="outline" className="text-green-600">
                        {subject.improvement}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Pass Rate: {subject.passRate}%</span>
                      <span>Students: {subject.students}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${subject.averageScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-primary" />
              <span>Top Performers</span>
            </CardTitle>
            <CardDescription>
              Highest achieving students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">#{student.rank}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{student.name}</h3>
                      <p className="text-sm text-muted-foreground">{student.className}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">GPA: {student.gpa}</div>
                    <div className="text-xs text-green-600">{student.improvement} improvement</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Struggling Students */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-red-600" />
              <span>Students Needing Support</span>
            </CardTitle>
            <CardDescription>
              Students requiring academic intervention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {strugglingStudents.map((student, index) => (
                <div key={index} className="p-3 border border-red-200 rounded-lg bg-red-50/50">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{student.name}</h3>
                      <p className="text-sm text-muted-foreground">{student.className}</p>
                    </div>
                    <Badge variant="destructive">{student.riskLevel} Risk</Badge>
                  </div>
                  <div className="text-sm space-y-1">
                    <div>
                      <span className="text-muted-foreground">GPA: </span>
                      <span className="font-medium">{student.gpa}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Struggling in: </span>
                      <span className="font-medium">{student.subjects.join(', ')}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Counselor: </span>
                      <span className="font-medium">{student.counselor}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last Support: </span>
                      <span className="font-medium">{student.lastSupport}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AcademicReports;
