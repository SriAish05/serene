import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  CheckCircle, 
  Circle, 
  Heart, 
  Brain, 
  Activity,
  TrendingUp,
  Calendar,
  Target,
  Smile,
  Moon,
  BookOpen,
  Users,
  MessageCircle,
  Play
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import BunnyCheerleader from '@/components/BunnyCheerleader';
import { BunnyEncouragement, CelebrationModal, simulateAdminAlert } from '@/components/BunnyEncouragement';
import { MoodChart } from '@/components/MoodChart';

interface QuestionnaireResult {
  score: number;
  level: string;
  color: string;
  description: string;
}

interface QuestionnaireData {
  id: string;
  name: string;
  completed: boolean;
  score?: number;
  level?: string;
  color?: string;
}

export const DashboardQuestionnaires = () => {
  const [questionnaires, setQuestionnaires] = useState<QuestionnaireData[]>([
    { id: 'phq9', name: 'PHQ-9 (Depression)', completed: false },
    { id: 'gad7', name: 'GAD-7 (Anxiety)', completed: false },
    { id: 'scl90', name: 'SCL-90-R (Symptoms)', completed: false },
    { id: 'dass21', name: 'DASS-21 (Stress)', completed: false },
    { id: 'sas', name: 'SAS (Anxiety Scale)', completed: false }
  ]);
  
  const [currentQuestionnaire, setCurrentQuestionnaire] = useState<string>('');
  const [currentAnswers, setCurrentAnswers] = useState<number[]>([]);
  const [showBunnyEncouragement, setShowBunnyEncouragement] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [bunnyMessage, setBunnyMessage] = useState('');
  const [bunnyType, setBunnyType] = useState<'encouragement' | 'celebration' | 'support'>('encouragement');
  const [completedCount, setCompletedCount] = useState(0);
  const { user } = useAuth();

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('questionnaire-progress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setQuestionnaires(progress);
      setCompletedCount(progress.filter((q: QuestionnaireData) => q.completed).length);
    }
  }, []);

  // Show initial bunny encouragement on dashboard load
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('bunny-welcome-seen');
    if (!hasSeenWelcome && completedCount === 0) {
      setTimeout(() => {
        setBunnyMessage("Hey there! These quick check-ins help us cheer you on your wellness journey. Let's start – you've got this! 🐰");
        setBunnyType('encouragement');
        setShowBunnyEncouragement(true);
        localStorage.setItem('bunny-welcome-seen', 'true');
      }, 1000);
    }
  }, [completedCount]);

  // Save progress to localStorage
  const saveProgress = (updatedQuestionnaires: QuestionnaireData[]) => {
    setQuestionnaires(updatedQuestionnaires);
    localStorage.setItem('questionnaire-progress', JSON.stringify(updatedQuestionnaires));
    setCompletedCount(updatedQuestionnaires.filter(q => q.completed).length);
  };

  // PHQ-9 Questions
  const phq9Questions = [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
    "Trouble concentrating on things, such as reading the newspaper or watching television",
    "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
    "Thoughts that you would be better off dead or of hurting yourself in some way"
  ];

  // GAD-7 Questions
  const gad7Questions = [
    "Feeling nervous, anxious, or on edge",
    "Not being able to stop or control worrying",
    "Worrying too much about different things",
    "Trouble relaxing",
    "Being so restless that it is hard to sit still",
    "Becoming easily annoyed or irritable",
    "Feeling afraid, as if something awful might happen"
  ];

  // SCL-90-R Questions (first 20 for demo)
  const scl90Questions = [
    "Headaches", "Nervousness or shakiness inside", "Unwanted thoughts, words, or ideas that won't leave your mind",
    "Faintness or dizziness", "Loss of sexual interest or pleasure", "Feeling critical of others",
    "The idea that someone else can control your thoughts", "Feeling others are to blame for most of your troubles",
    "Trouble remembering things", "Worried about sloppiness or carelessness", "Feeling easily annoyed or irritated",
    "Pains in heart or chest", "Feeling afraid in open spaces or on the streets", "Feeling low in energy or slowed down",
    "Thoughts of ending your life", "Hearing voices that other people do not hear", "Trembling",
    "Feeling that most people cannot be trusted", "Poor appetite", "Crying easily"
  ];

  // DASS-21 Questions
  const dass21Questions = [
    "I found it hard to wind down", "I was aware of dryness of my mouth", "I couldn't seem to experience any positive feeling at all",
    "I experienced breathing difficulty", "I found it difficult to work up the initiative to do things", "I tended to over-react to situations",
    "I experienced trembling", "I felt that I was using a lot of nervous energy", "I was worried about situations in which I might panic",
    "I felt that I had nothing to look forward to", "I found myself getting agitated", "I found it difficult to relax",
    "I felt down-hearted and blue", "I was intolerant of anything that kept me from getting on with what I was doing", "I felt I was close to panic",
    "I was unable to become enthusiastic about anything", "I felt I wasn't worth much as a person", "I felt that I was rather touchy",
    "I was aware of the action of my heart", "I felt scared without any good reason", "I felt that life was meaningless"
  ];

  // SAS Questions
  const sasQuestions = [
    "I feel more nervous and anxious than usual", "I feel afraid for no reason at all", "I get upset easily or feel panicky",
    "I feel like I'm falling apart and going to pieces", "I feel that everything is all right and nothing bad will happen",
    "My arms and legs shake and tremble", "I am bothered by headaches neck and back pain", "I feel weak and get tired easily",
    "I feel calm and can sit still easily", "I can feel my heart beating fast", "I am bothered by dizzy spells",
    "I have fainting spells or feel like it", "I can breathe in and out easily", "I get feelings of numbness and tingling in my fingers & toes",
    "I am bothered by stomach aches or indigestion", "I have to empty my bladder often", "My hands are usually dry and warm",
    "My face gets hot and blushes", "I fall asleep easily and get a good night's rest", "I have nightmares"
  ];

  const getQuestions = (questionnaireId: string) => {
    switch (questionnaireId) {
      case 'phq9': return phq9Questions;
      case 'gad7': return gad7Questions;
      case 'scl90': return scl90Questions;
      case 'dass21': return dass21Questions;
      case 'sas': return sasQuestions;
      default: return [];
    }
  };

  const calculateScore = (questionnaireId: string, answers: number[]): QuestionnaireResult => {
    const totalScore = answers.reduce((sum, answer) => sum + answer, 0);
    
    switch (questionnaireId) {
      case 'phq9':
        if (totalScore <= 4) return { score: totalScore, level: 'Minimal', color: 'bg-green-500', description: 'Minimal depression' };
        if (totalScore <= 9) return { score: totalScore, level: 'Mild', color: 'bg-yellow-500', description: 'Mild depression' };
        if (totalScore <= 14) return { score: totalScore, level: 'Moderate', color: 'bg-orange-500', description: 'Moderate depression' };
        if (totalScore <= 19) return { score: totalScore, level: 'Moderately Severe', color: 'bg-red-500', description: 'Moderately severe depression' };
        return { score: totalScore, level: 'Severe', color: 'bg-red-600', description: 'Severe depression' };
      
      case 'gad7':
        if (totalScore <= 4) return { score: totalScore, level: 'Minimal', color: 'bg-green-500', description: 'Minimal anxiety' };
        if (totalScore <= 9) return { score: totalScore, level: 'Mild', color: 'bg-yellow-500', description: 'Mild anxiety' };
        if (totalScore <= 14) return { score: totalScore, level: 'Moderate', color: 'bg-orange-500', description: 'Moderate anxiety' };
        return { score: totalScore, level: 'Severe', color: 'bg-red-500', description: 'Severe anxiety' };
      
      case 'scl90':
        const gsi = totalScore / answers.length;
        if (gsi <= 1.0) return { score: totalScore, level: 'Normal', color: 'bg-green-500', description: 'Normal range' };
        return { score: totalScore, level: 'High', color: 'bg-red-500', description: 'High distress' };
      
      case 'dass21':
        // Simplified scoring for demo
        if (totalScore <= 14) return { score: totalScore, level: 'Normal', color: 'bg-green-500', description: 'Normal range' };
        if (totalScore <= 28) return { score: totalScore, level: 'Mild', color: 'bg-yellow-500', description: 'Mild symptoms' };
        if (totalScore <= 42) return { score: totalScore, level: 'Moderate', color: 'bg-orange-500', description: 'Moderate symptoms' };
        return { score: totalScore, level: 'Severe', color: 'bg-red-500', description: 'Severe symptoms' };
      
      case 'sas':
        if (totalScore <= 44) return { score: totalScore, level: 'Normal', color: 'bg-green-500', description: 'Normal range' };
        if (totalScore <= 59) return { score: totalScore, level: 'Mild-Moderate', color: 'bg-yellow-500', description: 'Mild-moderate anxiety' };
        if (totalScore <= 74) return { score: totalScore, level: 'Marked-Severe', color: 'bg-orange-500', description: 'Marked-severe anxiety' };
        return { score: totalScore, level: 'Severe', color: 'bg-red-500', description: 'Severe anxiety' };
      
      default:
        return { score: totalScore, level: 'Unknown', color: 'bg-gray-500', description: 'Unknown' };
    }
  };

  const handleAnswerChange = (questionIndex: number, value: number) => {
    const newAnswers = [...currentAnswers];
    newAnswers[questionIndex] = value;
    setCurrentAnswers(newAnswers);
  };

  const submitQuestionnaire = () => {
    if (currentAnswers.length !== getQuestions(currentQuestionnaire).length) {
      alert('Please answer all questions before submitting.');
      return;
    }

    const result = calculateScore(currentQuestionnaire, currentAnswers);
    const updatedQuestionnaires = questionnaires.map(q => 
      q.id === currentQuestionnaire 
        ? { ...q, completed: true, score: result.score, level: result.level, color: result.color }
        : q
    );

    saveProgress(updatedQuestionnaires);
    
    // Check for high risk
    const isHighRisk = ['Moderate', 'Moderately Severe', 'Severe', 'High', 'Marked-Severe'].includes(result.level);
    
    if (isHighRisk) {
      // Trigger admin alert
      const questionnaireName = questionnaires.find(q => q.id === currentQuestionnaire)?.name || 'Unknown';
      simulateAdminAlert(user?.name || 'Student', questionnaireName, result.score, result.level);
      
      // Show bunny support message
      setBunnyMessage("It's okay to feel this way – you're strong for checking in! Let's chat or reach out for extra support.");
      setBunnyType('support');
      setShowBunnyEncouragement(true);
    } else {
      setBunnyMessage("Great job completing this questionnaire! You're taking important steps for your wellness.");
      setBunnyType('encouragement');
      setShowBunnyEncouragement(true);
    }

    setCurrentQuestionnaire('');
    setCurrentAnswers([]);
    
    // Check if all completed
    if (updatedQuestionnaires.every(q => q.completed)) {
      setTimeout(() => {
        setShowCelebration(true);
      }, 2000);
    }
  };

  const startQuestionnaire = (questionnaireId: string) => {
    setCurrentQuestionnaire(questionnaireId);
    setCurrentAnswers(new Array(getQuestions(questionnaireId).length).fill(0));
  };

  const getProgressPercentage = () => {
    return (completedCount / questionnaires.length) * 100;
  };

  const renderQuestionnaire = () => {
    if (!currentQuestionnaire) return null;

    const questions = getQuestions(currentQuestionnaire);
    const questionnaireName = questionnaires.find(q => q.id === currentQuestionnaire)?.name || '';

    return (
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-primary" />
            <span>{questionnaireName}</span>
          </CardTitle>
          <CardDescription>
            Question {currentAnswers.filter(a => a > 0).length + 1} of {questions.length}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 max-h-[60vh] overflow-y-auto dashboard-scroll">
          {questions.map((question, index) => (
            <div key={index} className="space-y-3">
              <Label className="text-sm font-medium text-foreground">
                {index + 1}. {question}
              </Label>
              <RadioGroup
                value={currentAnswers[index]?.toString() || '0'}
                onValueChange={(value) => handleAnswerChange(index, parseInt(value))}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id={`q${index}-0`} />
                  <Label htmlFor={`q${index}-0`} className="text-xs">Not at all</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id={`q${index}-1`} />
                  <Label htmlFor={`q${index}-1`} className="text-xs">Several days</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id={`q${index}-2`} />
                  <Label htmlFor={`q${index}-2`} className="text-xs">More than half</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3" id={`q${index}-3`} />
                  <Label htmlFor={`q${index}-3`} className="text-xs">Nearly every day</Label>
                </div>
              </RadioGroup>
            </div>
          ))}
          
          <div className="flex justify-end space-x-2">
            <Button
              onClick={() => setCurrentQuestionnaire('')}
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              onClick={submitQuestionnaire}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-6xl mx-auto max-h-[80vh] overflow-y-auto dashboard-scroll">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">
          Mental Health Dashboard 🌱
        </h1>
        <p className="text-muted-foreground">
          Complete all questionnaires for a wellness badge!
        </p>
      </div>

      {/* Progress Bar */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-foreground">Wellness Progress</span>
              <span className="text-sm text-muted-foreground">{completedCount}/{questionnaires.length} completed</span>
            </div>
            <Progress value={getProgressPercentage()} className="h-2" />
            <div className="text-center">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {getProgressPercentage().toFixed(0)}% Complete
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bunny Encouragement Modal */}
      <BunnyEncouragement
        isVisible={showBunnyEncouragement}
        message={bunnyMessage}
        onClose={() => setShowBunnyEncouragement(false)}
        type={bunnyType}
        showAnimation={true}
      />

      {/* Celebration Modal */}
      <CelebrationModal
        isVisible={showCelebration}
        onClose={() => setShowCelebration(false)}
        completedCount={completedCount}
        totalCount={questionnaires.length}
      />

      {/* Questionnaires Grid */}
      {!currentQuestionnaire && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {questionnaires.map((questionnaire) => (
            <Card key={questionnaire.id} className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-sm font-medium">{questionnaire.name}</span>
                  {questionnaire.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {questionnaire.completed ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge className={`${questionnaire.color} text-white`}>
                        {questionnaire.level}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Score: {questionnaire.score}
                      </span>
                    </div>
                    <Button
                      onClick={() => startQuestionnaire(questionnaire.id)}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      Retake
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => startQuestionnaire(questionnaire.id)}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Start Assessment
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Questionnaire Form */}
      {renderQuestionnaire()}

      {/* Additional Dashboard Sections */}
      {!currentQuestionnaire && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {/* Sleep Log */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Moon className="h-5 w-5 text-primary" />
                <span>Sleep Log</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">7.5h</div>
                  <div className="text-sm text-muted-foreground">Last night</div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Log Sleep
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Mood Chart */}
          <MoodChart onBunnyClick={() => {
            setBunnyMessage("Your mood chart shows great progress! Keep up the amazing work! 🌟");
            setBunnyType('encouragement');
            setShowBunnyEncouragement(true);
          }} />

          {/* Mental Health Tags */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-primary" />
                <span>Mental Health Tags</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {['Exam Stress', 'Sleep Issues', 'Motivation', 'Relationships'].map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Add Tag
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* To-Do Tasks */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>To-Do Tasks</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-muted-foreground line-through">Morning meditation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Circle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">Study session</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Circle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">Evening reflection</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Health Assist */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                <span>Health Assist</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Ask AI for wellness tips and support
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Chat with AI
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Daily Wellness Check-in */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-primary" />
                <span>Daily Check-in</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">8/10</div>
                  <div className="text-sm text-muted-foreground">Today's mood</div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Check In
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DashboardQuestionnaires;
