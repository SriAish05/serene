import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Play, 
  Pause, 
  BookOpen, 
  Headphones, 
  Timer, 
  Heart,
  Brain,
  Moon,
  Zap,
  Clock,
  Download
} from 'lucide-react';

export const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activePlayer, setActivePlayer] = useState<string | null>(null);

  const meditationSessions = [
    {
      id: '1',
      title: 'Morning Mindfulness',
      duration: '10 min',
      category: 'Mindfulness',
      description: 'Start your day with calm awareness',
      plays: '2.3k',
      difficulty: 'Beginner'
    },
    {
      id: '2',
      title: 'Stress Relief Breathing',
      duration: '5 min',
      category: 'Anxiety',
      description: 'Quick breathing exercise for immediate calm',
      plays: '5.1k',
      difficulty: 'Beginner'
    },
    {
      id: '3',
      title: 'Study Focus Session',
      duration: '25 min',
      category: 'Focus',
      description: 'Pomodoro-style meditation for better concentration',
      plays: '1.8k',
      difficulty: 'Intermediate'
    },
    {
      id: '4',
      title: 'Sleep Preparation',
      duration: '15 min',
      category: 'Sleep',
      description: 'Wind down for restful sleep',
      plays: '4.2k',
      difficulty: 'Beginner'
    }
  ];

  const studyTools = [
    {
      title: 'Pomodoro Timer',
      description: 'Focus sessions with built-in breaks',
      icon: Timer,
      category: 'Productivity',
      status: 'Popular'
    },
    {
      title: 'Study Playlist Generator',
      description: 'Curated focus music for different subjects',
      icon: Headphones,
      category: 'Music',
      status: 'New'
    },
    {
      title: 'Stress-Free Study Plans',
      description: 'Personalized study schedules to reduce anxiety',
      icon: BookOpen,
      category: 'Planning',
      status: 'Trending'
    },
    {
      title: 'Quick Relaxation',
      description: '2-minute exercises between study sessions',
      icon: Zap,
      category: 'Breaks',
      status: 'Essential'
    }
  ];

  const exerciseCategories = [
    { name: 'Anxiety Relief', count: 12, icon: Heart, color: 'bg-red-50 text-red-600' },
    { name: 'Focus & Clarity', count: 8, icon: Brain, color: 'bg-blue-50 text-blue-600' },
    { name: 'Sleep Support', count: 6, icon: Moon, color: 'bg-purple-50 text-purple-600' },
    { name: 'Energy Boost', count: 10, icon: Zap, color: 'bg-yellow-50 text-yellow-600' }
  ];

  const handlePlayPause = (sessionId: string) => {
    if (activePlayer === sessionId) {
      setActivePlayer(null);
    } else {
      setActivePlayer(sessionId);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-[100rem] mx-auto">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-primary">Resource Hub</h1>
          <p className="text-xl text-muted-foreground">
            Guided meditation, relaxation exercises, and study support tools
          </p>
          
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 focus:border-primary transition-smooth"
            />
          </div>
        </div>

        <Tabs defaultValue="meditation" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-md">
            <TabsTrigger value="meditation">Meditation</TabsTrigger>
            <TabsTrigger value="exercises">Exercises</TabsTrigger>
            <TabsTrigger value="study">Study Tools</TabsTrigger>
            <TabsTrigger value="library">Library</TabsTrigger>
          </TabsList>

          <TabsContent value="meditation" className="space-y-6">
            {/* Categories */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {exerciseCategories.map((category) => (
                <Card key={category.name} className="cursor-pointer hover:shadow-card transition-smooth btn-calm">
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 mx-auto rounded-lg ${category.color} flex items-center justify-center mb-3`}>
                      <category.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-medium text-sm">{category.name}</h3>
                    <p className="text-xs text-muted-foreground">{category.count} sessions</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Meditation Sessions */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-primary">Featured Sessions</h2>
              <div className="grid gap-4">
                {meditationSessions.map((session) => (
                  <Card key={session.id} className="shadow-card hover:shadow-soft transition-smooth">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handlePlayPause(session.id)}
                            className="w-12 h-12 rounded-full btn-calm"
                          >
                            {activePlayer === session.id ? 
                              <Pause className="h-5 w-5" /> : 
                              <Play className="h-5 w-5" />
                            }
                          </Button>
                          <div className="space-y-1">
                            <h3 className="font-semibold text-lg">{session.title}</h3>
                            <p className="text-muted-foreground">{session.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{session.duration}</span>
                              </span>
                              <span>{session.plays} plays</span>
                              <Badge variant="secondary">{session.difficulty}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{session.category}</Badge>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {activePlayer === session.id && (
                        <div className="mt-4 p-4 bg-accent/30 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Now Playing</span>
                            <span className="text-sm font-medium">2:45 / {session.duration}</span>
                          </div>
                          <div className="w-full bg-accent rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full transition-all duration-1000" style={{ width: '27%' }}></div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="study" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-primary">Study Support Tools</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {studyTools.map((tool, index) => (
                  <Card key={index} className="shadow-card hover:shadow-soft transition-smooth cursor-pointer btn-calm">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <tool.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{tool.title}</CardTitle>
                            <Badge variant="secondary" className="mt-1">{tool.category}</Badge>
                          </div>
                        </div>
                        <Badge variant="outline">{tool.status}</Badge>
                      </div>
                      <CardDescription className="mt-2">
                        {tool.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            {/* Featured Tool */}
            <Card className="shadow-card bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-primary">Stress-Free Study Session</h3>
                    <p className="text-muted-foreground">
                      Combine focused work time with mindfulness breaks for optimal learning
                    </p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="flex items-center space-x-1">
                        <Timer className="h-4 w-4 text-primary" />
                        <span>25 min focus + 5 min mindfulness</span>
                      </span>
                    </div>
                  </div>
                  <Button variant="calm" size="lg">
                    Start Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exercises" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-primary">Quick Relief Exercises</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { title: '4-7-8 Breathing', time: '2 min', type: 'Anxiety Relief' },
                  { title: 'Progressive Muscle Relaxation', time: '10 min', type: 'Stress Relief' },
                  { title: 'Mindful Body Scan', time: '8 min', type: 'Mindfulness' },
                  { title: 'Grounding Exercise', time: '3 min', type: 'Anxiety Relief' },
                  { title: 'Energy Reset', time: '5 min', type: 'Energy Boost' },
                  { title: 'Study Break Stretch', time: '4 min', type: 'Physical Relief' }
                ].map((exercise, index) => (
                  <Card key={index} className="shadow-card hover:shadow-soft transition-smooth cursor-pointer btn-calm">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">{exercise.type}</Badge>
                          <span className="text-xs text-muted-foreground">{exercise.time}</span>
                        </div>
                        <h3 className="font-medium">{exercise.title}</h3>
                        <Button variant="soft" size="sm" className="w-full">
                          <Play className="h-3 w-3 mr-1" />
                          Start Exercise
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="library" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-primary">Mental Health Library</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: 'Understanding Anxiety', type: 'Article', readTime: '5 min read' },
                  { title: 'Healthy Study Habits', type: 'Guide', readTime: '10 min read' },
                  { title: 'Sleep & Mental Health', type: 'Research', readTime: '8 min read' },
                  { title: 'Managing Academic Stress', type: 'Toolkit', readTime: '15 min read' },
                  { title: 'Building Resilience', type: 'Course', readTime: '30 min' },
                  { title: 'Mindfulness for Students', type: 'Video Series', readTime: '45 min' }
                ].map((item, index) => (
                  <Card key={index} className="shadow-card hover:shadow-soft transition-smooth cursor-pointer btn-calm">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary">{item.type}</Badge>
                          <span className="text-xs text-muted-foreground">{item.readTime}</span>
                        </div>
                        <h3 className="font-medium">{item.title}</h3>
                        <Button variant="outline" size="sm" className="w-full">
                          <BookOpen className="h-3 w-3 mr-1" />
                          Read More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
  );
};

export default Resources;