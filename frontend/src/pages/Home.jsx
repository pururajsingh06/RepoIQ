import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
    return (
        <div className="home-page">
            {/* Background Decorative floating SVGs */}
            <div className="decorative-elements">
                <svg className="floating-icon icon-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
                <svg className="floating-icon icon-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="18" r="3"></circle>
                    <circle cx="6" cy="6" r="3"></circle>
                    <path d="M13 6h3a2 2 0 0 1 2 2v7"></path>
                    <line x1="6" y1="9" x2="6" y2="21"></line>
                </svg>
            </div>

            <div className="hero-content">
                <div className="badge">
                    <span>NEW</span> AI Powered Code Analysis v2.0
                </div>

                <h1 className="hero-title">
                    Elevate Your Code with <br />
                    <span className="gradient-text">Intelligent Insights</span>
                </h1>

                <p className="hero-subtitle">
                    Instantly analyze any GitHub repository. Let our advanced AI evaluate your architecture, identify technical debt, and provide actionable modernization strategies.
                </p>

                <div className="hero-actions">
                    <Link to="/analyze" className="btn-primary">
                        Start Analyzing
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </Link>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                        View Details
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="16" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Home;