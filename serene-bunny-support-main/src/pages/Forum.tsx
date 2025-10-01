import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  MessageCircle, 
  Heart, 
  ThumbsUp, 
  Users, 
  Plus,
  Filter,
  TrendingUp,
  Clock,
  Shield,
  Flag,
  Video,
  Phone,
  UserCheck,
  Eye,
  EyeOff,
  Mic,
  MicOff,
  Send,
  X
} from 'lucide-react';

export const Forum = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);
  const [activePeerMode, setActivePeerMode] = useState<'anonymous' | 'live' | null>(null);
  const [isWaitingForMatch, setIsWaitingForMatch] = useState(false);
  const [isInSession, setIsInSession] = useState(false);
  const [currentPeer, setCurrentPeer] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);

  const forumPosts = [
    {
      id: '1',
      title: 'How do you handle exam anxiety?',
      content: 'Finals are coming up and I\'m feeling really overwhelmed. Any tips for managing the stress?',
      author: 'StudyBuddy_23',
      category: 'Academic Stress',
      replies: 12,
      likes: 24,
      timeAgo: '2 hours ago',
      trending: true,
      tags: ['anxiety', 'exams', 'coping-strategies']
    },
    {
      id: '2',
      title: 'Celebrating small wins today! 🎉',
      content: 'Finally got out of bed early and had a productive morning. Sometimes the smallest steps matter most.',
      author: 'MorningLight',
      category: 'Positive Sharing',
      replies: 8,
      likes: 45,
      timeAgo: '4 hours ago',
      trending: false,
      tags: ['motivation', 'self-care', 'progress']
    },
    {
      id: '3',
      title: 'Study group for mindful studying?',
      content: 'Looking for people interested in forming a study group focused on mindful learning techniques.',
      author: 'ZenLearner',
      category: 'Study Groups',
      replies: 15,
      likes: 18,
      timeAgo: '6 hours ago',
      trending: false,
      tags: ['study-groups', 'mindfulness', 'collaboration']
    },
    {
      id: '4',
      title: 'Sleep schedule completely messed up',
      content: 'Can\'t seem to get back to a normal sleep routine. How do you reset your sleep cycle?',
      author: 'NightOwl_22',
      category: 'Sleep & Wellness',
      replies: 22,
      likes: 31,
      timeAgo: '8 hours ago',
      trending: true,
      tags: ['sleep', 'routine', 'wellness']
    }
  ];

  const categories = [
    { name: 'Academic Stress', posts: 124, color: 'bg-blue-50 text-blue-600' },
    { name: 'Anxiety Support', posts: 89, color: 'bg-red-50 text-red-600' },
    { name: 'Study Groups', posts: 67, color: 'bg-green-50 text-green-600' },
    { name: 'Self Care', posts: 156, color: 'bg-purple-50 text-purple-600' },
    { name: 'Sleep & Wellness', posts: 78, color: 'bg-indigo-50 text-indigo-600' },
    { name: 'Positive Sharing', posts: 203, color: 'bg-yellow-50 text-yellow-600' }
  ];

  const trendingTopics = [
    { tag: 'exam-season', posts: 45 },
    { tag: 'mindfulness', posts: 32 },
    { tag: 'study-tips', posts: 28 },
    { tag: 'self-care', posts: 56 },
    { tag: 'motivation', posts: 41 }
  ];

  const guidelines = [
    'Be kind and respectful to all community members',
    'Keep discussions constructive and supportive',
    'Respect privacy - no personal identifying information',
    'Report harmful content using the flag button',
    'Professional crisis support: Contact campus counseling'
  ];

  // Peer counseling functions
  const startAnonymousPeer = () => {
    setActivePeerMode('anonymous');
    setIsWaitingForMatch(true);
    // Simulate finding a match after 3 seconds
    setTimeout(() => {
      setIsWaitingForMatch(false);
      setIsInSession(true);
      setCurrentPeer({
        id: 'peer_1',
        name: 'Anonymous Peer',
        avatar: 'A',
        isOnline: true
      });
    }, 3000);
  };

  const startLivePeer = () => {
    setActivePeerMode('live');
    setIsWaitingForMatch(true);
    // Simulate finding a match after 2 seconds
    setTimeout(() => {
      setIsWaitingForMatch(false);
      setIsInSession(true);
      setCurrentPeer({
        id: 'peer_2',
        name: 'Live Peer',
        avatar: 'L',
        isOnline: true
      });
    }, 2000);
  };

  const endSession = () => {
    setActivePeerMode(null);
    setIsInSession(false);
    setIsWaitingForMatch(false);
    setCurrentPeer(null);
    setChatMessages([]);
    setNewMessage('');
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        text: newMessage,
        sender: 'me',
        timestamp: new Date().toLocaleTimeString()
      };
      setChatMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // Simulate peer response
      setTimeout(() => {
        const peerMessage = {
          id: Date.now() + 1,
          text: "I understand how you're feeling. Can you tell me more about what's on your mind?",
          sender: 'peer',
          timestamp: new Date().toLocaleTimeString()
        };
        setChatMessages(prev => [...prev, peerMessage]);
      }, 1000);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-[100rem] mx-auto max-h-[80vh] overflow-y-auto dashboard-scroll">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary">Peer Forum</h1>
              <p className="text-xl text-muted-foreground">
                Anonymous peer-to-peer support community
              </p>
            </div>
            <Button 
              onClick={() => setShowNewPost(true)}
              variant="calm"
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>New Post</span>
            </Button>
          </div>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 focus:border-primary transition-smooth"
              />
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="recent" className="space-y-4">
              <TabsList className="w-full sm:w-auto grid grid-cols-5">
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="answered">Most Helpful</TabsTrigger>
                <TabsTrigger value="anonymous-peer">Anonymous Peer</TabsTrigger>
                <TabsTrigger value="live-peer">Live Peer</TabsTrigger>
              </TabsList>

              <TabsContent value="recent" className="space-y-4">
                {forumPosts.map((post) => (
                  <Card key={post.id} className="shadow-card hover:shadow-soft transition-smooth cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary">{post.category}</Badge>
                            {post.trending && (
                              <Badge variant="outline" className="text-orange-600 border-orange-200">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                Trending
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="text-lg hover:text-primary transition-smooth">
                            {post.title}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {post.content}
                          </CardDescription>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-muted-foreground">
                          <Flag className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-xs font-medium text-primary">
                                {post.author.charAt(0)}
                              </span>
                            </div>
                            <span>{post.author}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{post.timeAgo}</span>
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {post.replies}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="trending" className="space-y-4">
                {forumPosts.filter(post => post.trending).map((post) => (
                  <Card key={post.id} className="shadow-card hover:shadow-soft transition-smooth cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary">{post.category}</Badge>
                            <Badge variant="outline" className="text-orange-600 border-orange-200">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Trending
                            </Badge>
                          </div>
                          <CardTitle className="text-lg hover:text-primary transition-smooth">
                            {post.title}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {post.content}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="answered" className="space-y-4">
                {forumPosts.map((post) => (
                  <Card key={post.id} className="shadow-card hover:shadow-soft transition-smooth cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary">{post.category}</Badge>
                            <Badge variant="outline" className="text-green-600 border-green-200">
                              <UserCheck className="h-3 w-3 mr-1" />
                              Helpful
                            </Badge>
                          </div>
                          <CardTitle className="text-lg hover:text-primary transition-smooth">
                            {post.title}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {post.content}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </TabsContent>

              {/* Anonymous Peer Counseling */}
              <TabsContent value="anonymous-peer" className="space-y-4">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Eye className="h-5 w-5 text-primary" />
                      <span>Anonymous Peer Counseling</span>
                    </CardTitle>
                    <CardDescription>
                      Connect with a peer counselor anonymously. Your identity remains completely private.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!isInSession && !isWaitingForMatch && (
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium">Features:</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Complete anonymity</li>
                              <li>• Text-based chat only</li>
                              <li>• Trained peer counselors</li>
                              <li>• 24/7 availability</li>
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-medium">What to expect:</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Safe, supportive environment</li>
                              <li>• Active listening</li>
                              <li>• Non-judgmental support</li>
                              <li>• Crisis resources if needed</li>
                            </ul>
                          </div>
                        </div>
                        <Button 
                          onClick={startAnonymousPeer}
                          className="w-full"
                          variant="calm"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Start Anonymous Chat
                        </Button>
                      </div>
                    )}

                    {isWaitingForMatch && (
                      <div className="text-center space-y-4 py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <div>
                          <h3 className="text-lg font-medium">Finding a peer counselor...</h3>
                          <p className="text-muted-foreground">Please wait while we match you with an available counselor</p>
                        </div>
                      </div>
                    )}

                    {isInSession && currentPeer && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-accent/50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-sm font-medium text-primary">{currentPeer.avatar}</span>
                            </div>
                            <div>
                              <h4 className="font-medium">{currentPeer.name}</h4>
                              <p className="text-sm text-muted-foreground">Online now</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" onClick={endSession}>
                            <X className="h-4 w-4 mr-2" />
                            End Session
                          </Button>
                        </div>

                        <div className="h-64 border rounded-lg p-4 overflow-y-auto space-y-3">
                          {chatMessages.length === 0 && (
                            <div className="text-center text-muted-foreground py-8">
                              <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                              <p>Start the conversation by typing a message below</p>
                            </div>
                          )}
                          {chatMessages.map((message) => (
                            <div key={message.id} className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-xs px-3 py-2 rounded-lg ${
                                message.sender === 'me' 
                                  ? 'bg-primary text-primary-foreground' 
                                  : 'bg-muted'
                              }`}>
                                <p className="text-sm">{message.text}</p>
                                <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex space-x-2">
                          <Input
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            className="flex-1"
                          />
                          <Button onClick={sendMessage} size="icon">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Live Peer Counseling */}
              <TabsContent value="live-peer" className="space-y-4">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Video className="h-5 w-5 text-primary" />
                      <span>Live Peer Counseling</span>
                    </CardTitle>
                    <CardDescription>
                      Connect with a peer counselor via video call for real-time support and guidance.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!isInSession && !isWaitingForMatch && (
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium">Features:</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Video and audio calls</li>
                              <li>• Real-time interaction</li>
                              <li>• Screen sharing available</li>
                              <li>• Professional peer counselors</li>
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-medium">Requirements:</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Stable internet connection</li>
                              <li>• Webcam and microphone</li>
                              <li>• Private, quiet space</li>
                              <li>• 18+ or parental consent</li>
                            </ul>
                          </div>
                        </div>
                        <Button 
                          onClick={startLivePeer}
                          className="w-full"
                          variant="calm"
                        >
                          <Video className="h-4 w-4 mr-2" />
                          Start Live Call
                        </Button>
                      </div>
                    )}

                    {isWaitingForMatch && (
                      <div className="text-center space-y-4 py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <div>
                          <h3 className="text-lg font-medium">Connecting to peer counselor...</h3>
                          <p className="text-muted-foreground">Please ensure your camera and microphone are ready</p>
                        </div>
                      </div>
                    )}

                    {isInSession && currentPeer && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-accent/50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-sm font-medium text-primary">{currentPeer.avatar}</span>
                            </div>
                            <div>
                              <h4 className="font-medium">{currentPeer.name}</h4>
                              <p className="text-sm text-muted-foreground">Live session active</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              variant={isMuted ? "destructive" : "outline"} 
                              size="sm"
                              onClick={() => setIsMuted(!isMuted)}
                            >
                              {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                            </Button>
                            <Button 
                              variant={isVideoOn ? "default" : "outline"} 
                              size="sm"
                              onClick={() => setIsVideoOn(!isVideoOn)}
                            >
                              {isVideoOn ? <Video className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                            </Button>
                            <Button variant="outline" size="sm" onClick={endSession}>
                              <X className="h-4 w-4 mr-2" />
                              End Call
                            </Button>
                          </div>
                        </div>

                        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                          <div className="text-center space-y-2">
                            <Video className="h-12 w-12 mx-auto text-muted-foreground" />
                            <p className="text-muted-foreground">Video call interface would be here</p>
                            <p className="text-sm text-muted-foreground">In a real implementation, this would show the video feed</p>
                          </div>
                        </div>

                        <div className="h-32 border rounded-lg p-4 overflow-y-auto space-y-3">
                          {chatMessages.length === 0 && (
                            <div className="text-center text-muted-foreground py-4">
                              <MessageCircle className="h-6 w-6 mx-auto mb-2 opacity-50" />
                              <p className="text-sm">Chat messages will appear here during the call</p>
                            </div>
                          )}
                          {chatMessages.map((message) => (
                            <div key={message.id} className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-xs px-3 py-2 rounded-lg ${
                                message.sender === 'me' 
                                  ? 'bg-primary text-primary-foreground' 
                                  : 'bg-muted'
                              }`}>
                                <p className="text-sm">{message.text}</p>
                                <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex space-x-2">
                          <Input
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            className="flex-1"
                          />
                          <Button onClick={sendMessage} size="icon">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Guidelines */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Community Guidelines</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {guidelines.map((guideline, index) => (
                    <div key={index} className="flex items-start space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2"></div>
                      <span className="text-muted-foreground">{guideline}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Categories</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 cursor-pointer transition-smooth">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${category.color.split(' ')[0]}`}></div>
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{category.posts}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span>Trending Topics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {trendingTopics.map((topic) => (
                    <Badge
                      key={topic.tag}
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-smooth"
                    >
                      #{topic.tag} ({topic.posts})
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* New Post Modal */}
        {showNewPost && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl shadow-bunny">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Share with the Community</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setShowNewPost(false)}>
                    <Plus className="h-4 w-4 rotate-45" />
                  </Button>
                </div>
                <CardDescription>
                  Your post will be anonymous. Share your thoughts, questions, or experiences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input placeholder="What's on your mind?" className="focus:border-primary transition-smooth" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select className="w-full p-2 border border-input rounded-md focus:border-primary transition-smooth">
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.name} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your thoughts</label>
                  <Textarea 
                    placeholder="Share what's on your mind. Remember, this is a supportive space..."
                    className="min-h-[120px] focus:border-primary transition-smooth"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tags (optional)</label>
                  <Input placeholder="e.g., anxiety, study-tips, motivation" className="focus:border-primary transition-smooth" />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowNewPost(false)}>
                    Cancel
                  </Button>
                  <Button variant="calm">
                    Share Anonymously
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
  );
};

export default Forum;