import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  UserPlus,
  GraduationCap,
  Calendar,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

export const StudentManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');

  const students = [
    {
      id: 'STU001',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@school.edu',
      className: '12th',
      section: 'A',
      phone: '+1 234-567-8900',
      address: '123 Main St, City',
      status: 'Active',
      lastActive: '2 hours ago',
      wellnessScore: 7.2,
      joinDate: '2024-01-15'
    },
    {
      id: 'STU002',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@school.edu',
      className: '11th',
      section: 'B',
      phone: '+1 234-567-8901',
      address: '456 Oak Ave, City',
      status: 'Active',
      lastActive: '1 day ago',
      wellnessScore: 8.1,
      joinDate: '2024-01-20'
    },
    {
      id: 'STU003',
      name: 'Mike Chen',
      email: 'mike.chen@school.edu',
      className: '10th',
      section: 'C',
      phone: '+1 234-567-8902',
      address: '789 Pine St, City',
      status: 'Inactive',
      lastActive: '1 week ago',
      wellnessScore: 5.8,
      joinDate: '2024-01-10'
    },
    {
      id: 'STU004',
      name: 'Emma Davis',
      email: 'emma.davis@school.edu',
      className: '12th',
      section: 'A',
      phone: '+1 234-567-8903',
      address: '321 Elm St, City',
      status: 'Active',
      lastActive: '3 hours ago',
      wellnessScore: 9.0,
      joinDate: '2024-01-25'
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass === 'all' || student.className === selectedClass;
    return matchesSearch && matchesClass;
  });

  const classOptions = ['all', '10th', '11th', '12th'];

  return (
    <div className="p-6 space-y-6 max-w-[100rem] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Student Management</h1>
          <p className="text-xl text-muted-foreground">Manage and monitor student accounts</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{students.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Students</p>
                <p className="text-2xl font-bold">{students.filter(s => s.status === 'Active').length}</p>
              </div>
              <GraduationCap className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Wellness Score</p>
                <p className="text-2xl font-bold">
                  {(students.reduce((acc, s) => acc + s.wellnessScore, 0) / students.length).toFixed(1)}
                </p>
              </div>
              <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 font-bold">★</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">New This Month</p>
                <p className="text-2xl font-bold">4</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students by name, email, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-3 py-2 border border-input rounded-md text-sm focus:border-primary"
              >
                <option value="all">All Classes</option>
                {classOptions.slice(1).map(className => (
                  <option key={className} value={className}>{className}</option>
                ))}
              </select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Student Directory</CardTitle>
          <CardDescription>
            {filteredStudents.length} students found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-smooth">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold">{student.name}</h3>
                      <Badge variant={student.status === 'Active' ? 'default' : 'secondary'}>
                        {student.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {student.email}
                        </span>
                        <span className="flex items-center">
                          <GraduationCap className="h-3 w-3 mr-1" />
                          {student.className} - {student.section}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {student.phone}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {student.address}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">Wellness Score: {student.wellnessScore}/10</div>
                    <div className="text-xs text-muted-foreground">Last active: {student.lastActive}</div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-3 w-3" />
                    </Button>
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

export default StudentManagement;
