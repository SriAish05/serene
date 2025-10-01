import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Brain, 
  CheckCircle, 
  ArrowLeft,
  BarChart3,
  Heart,
  AlertTriangle,
  Info
} from 'lucide-react';

export const Assessment = () => {
  const [selectedAssessment, setSelectedAssessment] = useState<'phq9' | 'gad7' | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [interpretation, setInterpretation] = useState('');

  // PHQ-9 Questions
  const phq9Questions = [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself - or that you are a failure or have let yourself or your family down",
    "Trouble concentrating on things, such as reading the newspaper or watching television",
    "Moving or speaking so slowly that other people could have noticed, or the opposite - being so fidgety or restless that you have been moving around a lot more than usual",
    "Thoughts that you would be better off dead, or of hurting yourself"
  ];

  // GAD-7 Questions
  const gad7Questions = [
    "Feeling nervous, anxious, or on edge",
    "Not being able to stop or control worrying",
    "Worrying too much about different things",
    "Trouble relaxing",
    "Being so restless that it's hard to sit still",
    "Becoming easily annoyed or irritable",
    "Feeling afraid, as if something awful might happen"
  ];

  const assessmentOptions = [
    { value: 0, label: "Not at all" },
    { value: 1, label: "Several days" },
    { value: 2, label: "More than half the days" },
    { value: 3, label: "Nearly every day" }
  ];

  const getCurrentQuestions = () => {
    return selectedAssessment === 'phq9' ? phq9Questions : gad7Questions;
  };

  const getTotalQuestions = () => {
    return selectedAssessment === 'phq9' ? 9 : 7;
  };

  const handleAnswerSelect = (answer: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < getTotalQuestions() - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score and complete assessment
      const totalScore = answers.reduce((sum, answer) => sum + (answer || 0), 0);
      setScore(totalScore);
      setIsCompleted(true);
      generateInterpretation(totalScore);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const generateInterpretation = (totalScore: number) => {
    if (selectedAssessment === 'phq9') {
      if (totalScore <= 4) {
        setInterpretation("Minimal depression. Your symptoms are minimal and may not require treatment.");
      } else if (totalScore <= 9) {
        setInterpretation("Mild depression. You may benefit from self-help strategies or counseling.");
      } else if (totalScore <= 14) {
        setInterpretation("Moderate depression. Consider seeking professional help or treatment.");
      } else if (totalScore <= 19) {
        setInterpretation("Moderately severe depression. Professional treatment is recommended.");
      } else {
        setInterpretation("Severe depression. Immediate professional treatment is strongly recommended.");
      }
    } else {
      // GAD-7 interpretation
      if (totalScore <= 4) {
        setInterpretation("Minimal anxiety. Your anxiety symptoms are minimal.");
      } else if (totalScore <= 9) {
        setInterpretation("Mild anxiety. You may benefit from self-help strategies or counseling.");
      } else if (totalScore <= 14) {
        setInterpretation("Moderate anxiety. Consider seeking professional help or treatment.");
      } else {
        setInterpretation("Severe anxiety. Professional treatment is recommended.");
      }
    }
  };

  const resetAssessment = () => {
    setSelectedAssessment(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setIsCompleted(false);
    setScore(0);
    setInterpretation('');
  };

  const getScoreColor = (score: number) => {
    if (selectedAssessment === 'phq9') {
      if (score <= 4) return 'text-green-600';
      if (score <= 9) return 'text-yellow-600';
      if (score <= 14) return 'text-orange-600';
      return 'text-red-600';
    } else {
      if (score <= 4) return 'text-green-600';
      if (score <= 9) return 'text-yellow-600';
      if (score <= 14) return 'text-orange-600';
      return 'text-red-600';
    }
  };

  const getScoreBadgeVariant = (score: number) => {
    if (selectedAssessment === 'phq9') {
      if (score <= 4) return 'default';
      if (score <= 9) return 'secondary';
      if (score <= 14) return 'destructive';
      return 'destructive';
    } else {
      if (score <= 4) return 'default';
      if (score <= 9) return 'secondary';
      if (score <= 14) return 'destructive';
      return 'destructive';
    }
  };

  if (!selectedAssessment) {
    return (
      <div className="p-6 space-y-6 max-w-[100rem] mx-auto">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-primary">Mental Health Assessment</h1>
              <p className="text-xl text-muted-foreground">
                Choose an assessment to evaluate your mental health
              </p>
            </div>
          </div>
        </div>

        {/* Assessment Options */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* PHQ-9 Card */}
          <Card className="shadow-card hover:shadow-soft transition-smooth cursor-pointer" onClick={() => setSelectedAssessment('phq9')}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-6 w-6 text-blue-600" />
                <span>PHQ-9 Depression Assessment</span>
              </CardTitle>
              <CardDescription>
                Patient Health Questionnaire - 9 questions about depression symptoms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4" />
                  <span>9 questions • 2-3 minutes</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <BarChart3 className="h-4 w-4" />
                  <span>Scored 0-27 • Clinical interpretation</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Assesses depression severity over the past 2 weeks
                </div>
              </div>
            </CardContent>
          </Card>

          {/* GAD-7 Card */}
          <Card className="shadow-card hover:shadow-soft transition-smooth cursor-pointer" onClick={() => setSelectedAssessment('gad7')}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-purple-600" />
                <span>GAD-7 Anxiety Assessment</span>
              </CardTitle>
              <CardDescription>
                Generalized Anxiety Disorder - 7 questions about anxiety symptoms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4" />
                  <span>7 questions • 1-2 minutes</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <BarChart3 className="h-4 w-4" />
                  <span>Scored 0-21 • Clinical interpretation</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Assesses anxiety severity over the past 2 weeks
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Information Card */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Info className="h-5 w-5 text-blue-600" />
              <span>Important Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• These assessments are screening tools and not diagnostic instruments</p>
              <p>• Results should be discussed with a healthcare professional</p>
              <p>• If you're experiencing a mental health crisis, please seek immediate help</p>
              <p>• All responses are confidential and not stored</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="p-6 space-y-6 max-w-[100rem] mx-auto">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={resetAssessment}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-primary">
                {selectedAssessment === 'phq9' ? 'PHQ-9' : 'GAD-7'} Assessment Complete
              </h1>
              <p className="text-xl text-muted-foreground">
                Your assessment results and interpretation
              </p>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Score Card */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                <span>Your Score</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
                  {score}
                </div>
                <div className="text-muted-foreground">
                  out of {selectedAssessment === 'phq9' ? '27' : '21'}
                </div>
              </div>
              <Badge variant={getScoreBadgeVariant(score)} className="w-full justify-center">
                {selectedAssessment === 'phq9' ? 'Depression' : 'Anxiety'} Assessment
              </Badge>
            </CardContent>
          </Card>

          {/* Interpretation Card */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-6 w-6 text-primary" />
                <span>Interpretation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">{interpretation}</p>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium">Next Steps:</p>
                      <p>Consider discussing these results with a healthcare professional for personalized guidance.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Button onClick={resetAssessment} variant="outline">
            Take Another Assessment
          </Button>
          <Button onClick={() => window.history.back()}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-[100rem] mx-auto">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={() => setSelectedAssessment(null)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-primary">
              {selectedAssessment === 'phq9' ? 'PHQ-9 Depression Assessment' : 'GAD-7 Anxiety Assessment'}
            </h1>
            <p className="text-xl text-muted-foreground">
              Over the last 2 weeks, how often have you been bothered by the following problems?
            </p>
          </div>
        </div>
      </div>

      {/* Progress */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Question {currentQuestion + 1} of {getTotalQuestions()}</span>
              <span>{Math.round(((currentQuestion + 1) / getTotalQuestions()) * 100)}% Complete</span>
            </div>
            <Progress value={((currentQuestion + 1) / getTotalQuestions()) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Question */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">
            {getCurrentQuestions()[currentQuestion]}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {assessmentOptions.map((option) => (
              <Button
                key={option.value}
                variant={answers[currentQuestion] === option.value ? "default" : "outline"}
                className="w-full justify-start h-auto p-4"
                onClick={() => handleAnswerSelect(option.value)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    answers[currentQuestion] === option.value 
                      ? 'bg-primary border-primary' 
                      : 'border-muted-foreground'
                  }`}>
                    {answers[currentQuestion] === option.value && (
                      <div className="w-2 h-2 bg-primary-foreground rounded-full mx-auto mt-0.5"></div>
                    )}
                  </div>
                  <span className="font-medium">{option.label}</span>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>
        <Button 
          onClick={handleNext}
          disabled={answers[currentQuestion] === undefined}
        >
          {currentQuestion === getTotalQuestions() - 1 ? 'Complete Assessment' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default Assessment;
