import "./About.css";

function About() {
  return (
    <div className="about-page">
      <div className="about-card">
        <h1 className="about-title">About the Project</h1>
        <div className="about-content">
          <p>
            RepoIQ is a cutting-edge developer tool designed to bridge the gap between rapidly expanding codebases and high architectural standards. 
          </p>
          <p>
            By fetching and parsing repositories directly from GitHub, this app leverages advanced generative AI models to dissect code architecture, identify technical debt, and provide actionable modernization strategies—saving teams countless hours of manual code review.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-box">
            <div className="feature-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </div>
            <h3 className="feature-title">Deep Scanning</h3>
            <p className="feature-desc">Analyzes overall repository structure and file organizations.</p>
          </div>
          
          <div className="feature-box">
            <div className="feature-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
            <h3 className="feature-title">Actionable Advice</h3>
            <p className="feature-desc">Provides exact suggestions for improving code quality.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;