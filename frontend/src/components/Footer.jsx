import { Github, Linkedin } from "lucide-react";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                
                {/* Logo */}
                <div className="footer-logo">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="url(#footer_paint0)" strokeWidth="2"/>
                        <path d="M2 17L12 22L22 17" stroke="url(#footer_paint1)" strokeWidth="2"/>
                        <path d="M2 12L12 17L22 12" stroke="url(#footer_paint2)" strokeWidth="2"/>
                        <defs>
                            <linearGradient id="footer_paint0" x1="2" y1="2" x2="22" y2="12">
                                <stop stopColor="#4facfe" />
                                <stop offset="1" stopColor="#00f2fe" />
                            </linearGradient>
                            <linearGradient id="footer_paint1" x1="2" y1="17" x2="22" y2="22">
                                <stop stopColor="#4facfe" />
                                <stop offset="1" stopColor="#00f2fe" />
                            </linearGradient>
                            <linearGradient id="footer_paint2" x1="2" y1="12" x2="22" y2="17">
                                <stop stopColor="#4facfe" />
                                <stop offset="1" stopColor="#00f2fe" />
                            </linearGradient>
                        </defs>
                    </svg>
                    RepoIQ
                </div>

                {/* Bottom Section */}
                <div className="footer-bottom">
                    
                    <p>© {new Date().getFullYear()} RepoIQ. All rights reserved.</p>

                    {/* Social Links */}
                    <div className="footer-socials">
                        <a 
                            href="https://github.com/pururajsingh06" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <Github size={16} />
                            pururajsingh06
                        </a>

                        <a 
                            href="https://www.linkedin.com/in/pururaj-singh-9b91a22bb/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <Linkedin size={16} />
                             pururajsingh
                        </a>
                    </div>

                    <p className="made-by">
                        Made by <strong>Pururaj Singh</strong>
                    </p>

                </div>
            </div>
        </footer>
    );
}

export default Footer;