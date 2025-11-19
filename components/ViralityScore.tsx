import React from 'react';
import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';

interface ViralityScoreProps {
  score: number;
}

const ViralityScore: React.FC<ViralityScoreProps> = ({ score }) => {
  // TikTok brand colors for the gauge
  // Low: Gray/Red, Mid: Cyan, High: Pink/White
  let fill = '#333';
  if (score >= 80) fill = '#ff0050'; // Viral Pink
  else if (score >= 50) fill = '#00f2ea'; // TikTok Cyan
  else fill = '#fbbf24'; // Warning Yellow

  const data = [{ value: score, fill: fill }];

  return (
    <div className="flex flex-col items-center justify-center relative h-48 w-48 mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart 
          innerRadius="70%" 
          outerRadius="100%" 
          barSize={12} 
          data={data} 
          startAngle={90} 
          endAngle={-270}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background={{ fill: '#27272a' }}
            dataKey="value"
            cornerRadius={10}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-4xl font-black text-white tracking-tighter">{score}</span>
        <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold mt-1">Score</span>
      </div>
    </div>
  );
};

export default ViralityScore;
