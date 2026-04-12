import { useState } from "react";
import axios from "axios";
import ResultCard from "../components/ResultCard";
import "./Analyze.css";

function Analyze() {
    const [url, setUrl] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const analyzeRepo = async () => {
        if (!url) return;
        
        try {
            setLoading(true);
            setError(null);
            setResult(null);
            
            const res = await axios.post('/api/repo', { repoUrl: url });

            console.log(res.data);
            setResult(res.data);
        } catch (err) {
            console.error(err);
            const errMsg = err.response?.data?.message || err.message || "Unknown error occurred";
            const cleanErrMsg = errMsg.endsWith('.') ? errMsg : `${errMsg}.`;
            
            
            if (cleanErrMsg.toLowerCase().includes('ai analysis failed') || cleanErrMsg.toLowerCase().includes('high demand') || cleanErrMsg.toLowerCase().includes('rate limit')) {
                setError(`${cleanErrMsg}`); 
            } else {
                setError(`${cleanErrMsg} Please check your URL or try again in a moment.`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="analyze-page">
            <div className="analyze-container">
                <div className="analyze-header">
                    <h1 className="analyze-title">Analyze Repository</h1>
                    <p className="analyze-subtitle">
                        Paste a GitHub repository URL below to generate an AI-powered evaluation of its architecture, codebase health, and actionable improvements.
                    </p>
                </div>

                <div className="analyze-form">
                    <input
                        type="text"
                        placeholder="https://github.com/username/repository"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="analyze-input"
                        onKeyDown={(e) => e.key === 'Enter' && analyzeRepo()}
                    />
                    <button
                        onClick={analyzeRepo}
                        disabled={loading || !url}
                        className="analyze-btn"
                    >
                        {loading ? 'Scanning...' : 'Analyze'}
                        {!loading && (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        )}
                    </button>
                </div>

                {loading && (
                    <div className="analyze-loading">
                        <div className="loading-spinner"></div>
                        <p className="loading-text">Deep scanning repository structure...</p>
                    </div>
                )}

                {error && (
                    <div className="analyze-error">
                        <div className="error-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                        </div>
                        <div className="error-content">
                            <h3 className="error-title">Analysis Failed</h3>
                            <p className="error-message">{error}</p>
                        </div>
                    </div>
                )}

                {!loading && result && (
                    <div className="result-enter w-full flex justify-center">
                        <ResultCard result={result} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Analyze;