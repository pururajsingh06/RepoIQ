import React, { useEffect, useState } from 'react';
import './ResultCard.css';

function ResultCard({ result }) {
    const { repoData, aiResult } = result;
    const [scoreWidth, setScoreWidth] = useState(0);

    // Extract numeric score safely in case AI returns "8/10" instead of 8
    const rawScore = String(aiResult.score || "0");
    const parsedScore = parseFloat(rawScore.match(/[\d.]+/)?.[0] || 0);
    const displayScore = parsedScore > 10 ? 10 : parsedScore; // Ensure max is 10

    // Animate score bar on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            setScoreWidth(displayScore * 10);
        }, 100);
        return () => clearTimeout(timer);
    }, [displayScore]);

    return (
        <div className="result-card-wrapper">
            <div className="result-card">
                <div className="card-header">
                    <h2 className="repo-name">{repoData.name}</h2>
                    <div className="repo-stats">
                        <div className="stat-badge">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                            {repoData.stars}
                        </div>
                        <div className="stat-badge">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="18" r="3"></circle>
                                <circle cx="6" cy="6" r="3"></circle>
                                <circle cx="18" cy="6" r="3"></circle>
                                <path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"></path>
                                <path d="M12 12v3"></path>
                            </svg>
                            {repoData.forks}
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

                <p className="repo-summary">{aiResult.summary}</p>

                <div className="score-container">
                    <div className="score-header">
                        <span className="score-label">AI Evaluation Score</span>
                        <span className="score-value">{displayScore} / 10</span>
                    </div>
                    <div className="progress-track">
                        <div 
                            className="progress-fill" 
                            style={{ width: `${scoreWidth}%` }}
                        ></div>
                    </div>
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
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="9 11 12 14 22 4"></polyline>
                                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                        </svg>
                                    </div>
                                    <span className="suggestion-text">{suggestion}</span>
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