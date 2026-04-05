import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-logo">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="url(#footer_paint0)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 17L12 22L22 17" stroke="url(#footer_paint1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="url(#footer_paint2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <defs>
                            <linearGradient id="footer_paint0" x1="2" y1="2" x2="22" y2="12" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#4facfe" />
                                <stop offset="1" stopColor="#00f2fe" />
                            </linearGradient>
                            <linearGradient id="footer_paint1" x1="2" y1="17" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#4facfe" />
                                <stop offset="1" stopColor="#00f2fe" />
                            </linearGradient>
                            <linearGradient id="footer_paint2" x1="2" y1="12" x2="22" y2="17" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#4facfe" />
                                <stop offset="1" stopColor="#00f2fe" />
                            </linearGradient>
                        </defs>
                    </svg>
                    RepoIQ
                </div>
                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} RepoIQ. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;