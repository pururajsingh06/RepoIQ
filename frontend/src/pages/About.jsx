import { Shield, Zap, BarChart3, Globe, Code2, Server, Cpu, Database } from "lucide-react";
import "./About.css";

function About() {
  const features = [
    {
      icon: <Zap size={28} />,
      title: "Rapid AI Scanning",
      desc: "Instant evaluation of complex repositories using Gemini 2.5 Flash architecture."
    },
    {
      icon: <BarChart3 size={28} />,
      title: "Visual Intelligence",
      desc: "Radar charts and distribution graphs provide a visual blueprint of your codebase."
    },
    {
      icon: <Shield size={28} />,
      title: "Quality Assurance",
      desc: "In-depth scoring on readability, structure, and documentation quality."
    },
    {
      icon: <Globe size={28} />,
      title: "Direct Integration",
      desc: "Fetches live data from GitHub API including metadata, README, and language stats."
    }
  ];

  const techStack = [
    { icon: <Code2 size={24} />, name: "React" },
    { icon: <Server size={24} />, name: "Node.js" },
    { icon: <Cpu size={24} />, name: "Gemini AI" },
    { icon: <Database size={24} />, name: "GitHub API" }
  ];

  return (
    <div className="about-page">
      <div className="about-card">
        <h1 className="about-title">About RepoIQ</h1>
        <div className="about-content">
          <p>
            RepoIQ is a premium developer tool designed to transform how we understand and evaluate codebases. 
            By bridging the gap between raw code and actionable intelligence, we help developers and teams 
            maintain high architectural standards without the manual overhead.
          </p>
          <p>
            Leveraging direct GitHub integration and state-of-the-art AI, RepoIQ provides detailed 
            visualizations and strategic advice on every project you scan.
          </p>
        </div>

        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-box">
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="tech-section">
          <h3 className="tech-heading">Built With Modern Tech</h3>
          <div className="tech-grid">
            {techStack.map((t, i) => (
              <div key={i} className="tech-item">
                {t.icon}
                <span>{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;