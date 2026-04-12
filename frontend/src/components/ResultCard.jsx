import React, { useEffect, useState } from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis
} from 'recharts';
import { Star, GitFork, Lightbulb } from 'lucide-react';
import './ResultCard.css';

function ResultCard({ result }) {
    const { repoData, aiResult } = result;
    const [scoreWidth, setScoreWidth] = useState(0);

    const rawScore = String(aiResult.score || "0");
    const parsedScore = parseFloat(rawScore.match(/[\d.]+/)?.[0] || 0);
    const displayScore = parsedScore > 10 ? 10 : parsedScore;

    useEffect(() => {
        const timer = setTimeout(() => {
            setScoreWidth(displayScore * 10);
        }, 100);
        return () => clearTimeout(timer);
    }, [displayScore]);

    const formatFeedbackText = (text) => {
        if (!text) return "";
        const cleanText = text.replace(/"\*\*|\*\*"/g, '**').replace(/"\*/g, '*').replace(/\*"/g, '*');
        const parts = cleanText.split(/(\*\*.*?\*\*|\*.*?\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i}>{part.slice(2, -2)}</strong>;
            } else if (part.startsWith('*') && part.endsWith('*')) {
                return <em key={i}>{part.slice(1, -1)}</em>;
            }
            return part;
        });
    };

    // Recharts Data Prep
    const radarData = [
        { subject: 'Quality', A: aiResult.scoreBreakdown?.quality || 0, fullMark: 10 },
        { subject: 'Readability', A: aiResult.scoreBreakdown?.readability || 0, fullMark: 10 },
        { subject: 'Structure', A: aiResult.scoreBreakdown?.structure || 0, fullMark: 10 },
        { subject: 'README', A: aiResult.scoreBreakdown?.readme || 0, fullMark: 10 },
    ];

    const COLORS = ['#4facfe', '#00f2fe', '#f093fb', '#f5576c', '#5ee7df', '#b490ca'];
    const langData = Object.entries(repoData.languages || {})
        .map(([key, value]) => ({ name: key, value: value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5); // top 5 languages

    const fileData = Object.entries(repoData.fileCategories || {})
        .map(([key, value]) => ({ name: key, count: value }))
        .filter(item => item.count > 0);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p>{`${payload[0].name}: ${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="result-card-wrapper">
            <div className="result-card">
                <div className="card-header">
                    <h2 className="repo-name">{repoData.name}</h2>
                    <div className="repo-stats">
                        <div className="stat-badge">
                            <Star size={16} /> {repoData.stars}
                        </div>
                        <div className="stat-badge">
                            <GitFork size={16} /> {repoData.forks}
                        </div>
                    </div>
                </div>

                <div className="tech-stack">
                    {(aiResult.technologies || (repoData.language ? [repoData.language] : [])).map((tech, index) => (
                        <span key={index} className="tech-tag">
                            {tech}
                        </span>
                    ))}
                </div>

                <p className="repo-summary">{formatFeedbackText(aiResult.summary)}</p>

                <div className="score-container mt-6">
                    <div className="score-header">
                        <span className="score-label">Overall AI Evaluation</span>
                        <span className="score-value">{displayScore} / 10</span>
                    </div>
                    <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${scoreWidth}%` }}></div>
                    </div>
                </div>

                <div className="charts-grid">
                    <div className="chart-box">
                        <h3>Score Breakdown</h3>
                        <ResponsiveContainer width="100%" height={220}>
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                <PolarGrid stroke="rgba(255,255,255,0.2)" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fill: 'transparent' }} axisLine={false} />
                                <Radar name="Score" dataKey="A" stroke="#00f2fe" fill="#4facfe" fillOpacity={0.5} />
                                <RechartsTooltip content={<CustomTooltip />} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                    
                    {langData.length > 0 && (
                        <div className="chart-box">
                            <h3>Language Distribution</h3>
                            <ResponsiveContainer width="100%" height={220}>
                                <PieChart>
                                    <Pie data={langData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
                                        {langData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip content={<CustomTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                    
                    {fileData.length > 0 && (
                        <div className="chart-box full-width">
                            <h3>Repository Composition</h3>
                            <ResponsiveContainer width="100%" height={180}>
                                <BarChart data={fileData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <XAxis dataKey="name" tick={{ fill: '#cbd5e1', fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fill: '#cbd5e1', fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <RechartsTooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
                                    <Bar dataKey="count" fill="#00f2fe" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>
            </div>

            {aiResult.suggestions && aiResult.suggestions.length > 0 && (
                <div className="result-card">
                    <div className="suggestions-section">
                        <h4>Actionable Suggestions</h4>
                        <ul className="suggestions-list">
                            {aiResult.suggestions.map((suggestion, index) => (
                                <li key={index} className="suggestion-item">
                                    <div className="suggestion-icon">
                                        <Lightbulb size={18} />
                                    </div>
                                    <span className="suggestion-text">{formatFeedbackText(suggestion)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ResultCard;