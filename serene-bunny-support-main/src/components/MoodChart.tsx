import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Smile, TrendingUp, MessageCircle, Brain, Heart } from 'lucide-react';

interface MoodDataPoint {
  date: string;
  chatbot: number;
  questionnaire: number;
  bunny: number;
  average: number;
}

interface MoodChartProps {
  onBunnyClick?: () => void;
}

export const MoodChart: React.FC<MoodChartProps> = ({ onBunnyClick }) => {
  const [moodData, setMoodData] = useState<MoodDataPoint[]>([]);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Generate sample data with ups and downs
  useEffect(() => {
    const generateSampleData = () => {
      const data: MoodDataPoint[] = [];
      const today = new Date();
      
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        // Create realistic mood variations
        const baseMood = 5 + Math.sin(i * 0.8) * 2; // Sine wave for natural variation
        
        const chatbot = Math.max(1, Math.min(10, baseMood + (Math.random() - 0.5) * 2));
        const questionnaire = Math.max(1, Math.min(10, baseMood + (Math.random() - 0.5) * 1.5));
        const bunny = Math.max(1, Math.min(10, baseMood + (Math.random() - 0.5) * 1.8));
        
        const average = (chatbot + questionnaire + bunny) / 3;
        
        data.push({
          date: date.toISOString().split('T')[0],
          chatbot: Math.round(chatbot * 10) / 10,
          questionnaire: Math.round(questionnaire * 10) / 10,
          bunny: Math.round(bunny * 10) / 10,
          average: Math.round(average * 10) / 10
        });
      }
      
      setMoodData(data);
    };

    generateSampleData();
  }, []);

  const getMoodEmoji = (score: number) => {
    if (score >= 8) return '😊';
    if (score >= 6) return '🙂';
    if (score >= 4) return '😐';
    if (score >= 2) return '😔';
    return '😢';
  };

  const getMoodColor = (score: number) => {
    if (score >= 8) return 'text-green-500';
    if (score >= 6) return 'text-green-400';
    if (score >= 4) return 'text-yellow-500';
    if (score >= 2) return 'text-orange-500';
    return 'text-red-500';
  };

  const maxScore = 10;
  const chartHeight = 120;
  const chartWidth = 280;

  const getYPosition = (score: number) => {
    return chartHeight - (score / maxScore) * chartHeight;
  };

  const handleBunnyClick = () => {
    const encouragements = [
      "You're doing great! Keep up the positive energy! 🌟",
      "Your mood is trending upward - that's fantastic! 🚀",
      "Every small step counts towards your wellness journey! 💪",
      "You're stronger than you think - keep going! 🌱",
      "Your progress is inspiring! Keep shining! ✨"
    ];
    
    const randomEncouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
    
    if (onBunnyClick) {
      onBunnyClick();
    } else {
      alert(randomEncouragement);
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Smile className="h-5 w-5 text-primary" />
          <span>Mood Chart</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Interactive Line Chart */}
          <div className="relative">
            <svg width={chartWidth} height={chartHeight} className="mx-auto">
              {/* Grid lines */}
              {[2, 4, 6, 8, 10].map(score => (
                <line
                  key={score}
                  x1="20"
                  y1={getYPosition(score)}
                  x2={chartWidth - 20}
                  y2={getYPosition(score)}
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="1"
                />
              ))}
              
              {/* Data lines */}
              <g>
                {/* Chatbot line (green) */}
                <polyline
                  points={moodData.map((point, index) => 
                    `${20 + (index * (chartWidth - 40) / (moodData.length - 1))},${getYPosition(point.chatbot)}`
                  ).join(' ')}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  opacity="0.8"
                />
                
                {/* Questionnaire line (gray) */}
                <polyline
                  points={moodData.map((point, index) => 
                    `${20 + (index * (chartWidth - 40) / (moodData.length - 1))},${getYPosition(point.questionnaire)}`
                  ).join(' ')}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.6)"
                  strokeWidth="2"
                  opacity="0.7"
                />
                
                {/* Bunny line (white) */}
                <polyline
                  points={moodData.map((point, index) => 
                    `${20 + (index * (chartWidth - 40) / (moodData.length - 1))},${getYPosition(point.bunny)}`
                  ).join(' ')}
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  opacity="0.9"
                />
              </g>
              
              {/* Data points */}
              {moodData.map((point, index) => {
                const x = 20 + (index * (chartWidth - 40) / (moodData.length - 1));
                const y = getYPosition(point.average);
                const isHovered = hoveredPoint === index;
                
                return (
                  <g key={index}>
                    {/* Average point */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isHovered ? 6 : 4}
                      fill="white"
                      stroke="hsl(var(--primary))"
                      strokeWidth={isHovered ? 3 : 2}
                      className="cursor-pointer transition-all duration-200"
                      onMouseEnter={() => setHoveredPoint(index)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                    
                    {/* Tooltip */}
                    {isHovered && (
                      <g>
                        <rect
                          x={x - 40}
                          y={y - 60}
                          width="80"
                          height="50"
                          fill="rgba(0, 0, 0, 0.8)"
                          rx="4"
                        />
                        <text
                          x={x}
                          y={y - 45}
                          textAnchor="middle"
                          fill="white"
                          fontSize="10"
                          fontWeight="bold"
                        >
                          {new Date(point.date).toLocaleDateString()}
                        </text>
                        <text
                          x={x}
                          y={y - 35}
                          textAnchor="middle"
                          fill="white"
                          fontSize="9"
                        >
                          Avg: {point.average}
                        </text>
                        <text
                          x={x}
                          y={y - 25}
                          textAnchor="middle"
                          fill="white"
                          fontSize="8"
                        >
                          C:{point.chatbot} Q:{point.questionnaire} B:{point.bunny}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
            
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground">
              <span>10</span>
              <span>8</span>
              <span>6</span>
              <span>4</span>
              <span>2</span>
              <span>0</span>
            </div>
          </div>
          
          {/* Legend */}
          <div className="flex justify-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-0.5 bg-primary"></div>
              <span className="text-muted-foreground">Chatbot</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-0.5 bg-white/60"></div>
              <span className="text-muted-foreground">Questionnaire</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-0.5 bg-white"></div>
              <span className="text-muted-foreground">Bunny</span>
            </div>
          </div>
          
          {/* Current mood display */}
          <div className="text-center">
            <div className="text-2xl mb-1">
              {getMoodEmoji(moodData[moodData.length - 1]?.average || 5)}
            </div>
            <div className={`text-sm font-medium ${getMoodColor(moodData[moodData.length - 1]?.average || 5)}`}>
              Today: {moodData[moodData.length - 1]?.average.toFixed(1) || '5.0'}/10
            </div>
          </div>
          
          {/* Interactive Bunny */}
          <div className="text-center">
            <Button
              onClick={handleBunnyClick}
              variant="outline"
              size="sm"
              className="w-full bg-accent hover:bg-accent/80"
            >
              <Heart className="h-4 w-4 mr-2" />
              Click Bunny for Encouragement!
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
