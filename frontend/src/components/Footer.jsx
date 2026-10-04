import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-col">
            <h4 className="footer-heading">DjangoBlog React SPA</h4>
            <p className="footer-desc">
              Decoupled frontend built with React &amp; Vite, consuming Django REST Framework endpoints.
              Part of the FSDL Virtual Lab on Django Project and App Structure.
            </p>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <a href="http://127.0.0.1:8000/blog/" target="_blank" rel="noreferrer">
                  🌐 Django Blog (SSR)
                </a>
              </li>
              <li>
                <a href="http://127.0.0.1:8000/admin/" target="_blank" rel="noreferrer">
                  ⚙️ Django Admin
                </a>
              </li>
              <li>
                <a href="http://127.0.0.1:8000/vlab/" target="_blank" rel="noreferrer">
                  🔬 Virtual Lab (Local)
                </a>
              </li>
              <li>
                <a href="https://dhruvkumarg.github.io/FSDL-LAB-CA/" target="_blank" rel="noreferrer">
                  🚀 Virtual Lab (Live Pages)
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Lab Team</h4>
            <ul className="team-list">
              <li><strong>P1:</strong> Dhruv Goenka (Django Setup &amp; Structure)</li>
              <li><strong>P2:</strong> Shlok Tiwari (Models, Views &amp; API)</li>
              <li><strong>P3:</strong> Prajeet Godse (React Frontend)</li>
              <li><strong>P4:</strong> Arnav (Virtual Lab &amp; Deployment)</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 K. J. Somaiya School of Engineering · Guide: Prof. Ashwini Deshmukh · FSDL Lab CA</p>
        </div>
      </div>
    </footer>
  );
}
