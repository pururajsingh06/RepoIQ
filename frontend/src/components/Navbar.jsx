import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BrainCircuit } from "lucide-react";
import "./Navbar.css";

function Navbar() {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Helper to determine if a link is the current active route
    const isActive = (path) => {
        return location.pathname === path ? "nav-link active" : "nav-link";
    };

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    return (
        <nav className="navbar-container">
            <div className="navbar-content">
                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    <BrainCircuit className="logo-icon" size={28} />
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

                    {/* Hamburger Button (visible only on mobile) */}
                    <button 
                        className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className="hamburger-line"></span>
                        <span className="hamburger-line"></span>
                        <span className="hamburger-line"></span>
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
                <ul className="mobile-links">
                    <li className="mobile-nav-item">
                        <Link to="/" className={isActive("/")}>Home</Link>
                    </li>
                    <li className="mobile-nav-item">
                        <Link to="/analyze" className={isActive("/analyze")}>Analyze</Link>
                    </li>
                    <li className="mobile-nav-item">
                        <Link to="/about" className={isActive("/about")}>About</Link>
                    </li>
                    <li className="mobile-nav-item">
                        <Link to="/contact" className={isActive("/contact")}>Contact</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;