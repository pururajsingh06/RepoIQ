import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const location = useLocation();

    // Helper to determine if a link is the current active route
    const isActive = (path) => {
        return location.pathname === path ? "nav-link active" : "nav-link";
    };

    return (
        <nav className="navbar-container">
            <div className="navbar-content">
                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 17L12 22L22 17" stroke="url(#paint1_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="url(#paint2_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <defs>
                            <linearGradient id="paint0_linear" x1="2" y1="2" x2="22" y2="12" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#4facfe" />
                                <stop offset="1" stopColor="#00f2fe" />
                            </linearGradient>
                            <linearGradient id="paint1_linear" x1="2" y1="17" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#4facfe" />
                                <stop offset="1" stopColor="#00f2fe" />
                            </linearGradient>
                            <linearGradient id="paint2_linear" x1="2" y1="12" x2="22" y2="17" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#4facfe" />
                                <stop offset="1" stopColor="#00f2fe" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <span>RepoIQ</span>
                </Link>

                {/* Centered Navigation Menu */}
                <ul className="navbar-links">
                    <li className="nav-item">
                        <Link to="/" className={isActive("/")}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/analyze" className={isActive("/analyze")}>Analyze</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className={isActive("/about")}>About</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/contact" className={isActive("/contact")}>Contact</Link>
                    </li>
                </ul>

                {/* Right Action Section */}
                <div className="navbar-actions">
                    <Link to="/analyze" className="nav-button">
                        Get Started
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '6px' }}>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;