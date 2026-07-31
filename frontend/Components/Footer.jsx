import { FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white text-center py-5 mt-auto border-top" style={{ borderColor: 'var(--border-color)' }}>
      <div className="container">
        <p className="mb-3 text-uppercase fw-semibold" style={{ letterSpacing: "1px", fontSize: "0.75rem", color: 'var(--text-secondary)' }}>
          Developed By
        </p>
        <div className="d-flex justify-content-center align-items-center gap-4">
          <a
            href="https://www.linkedin.com/in/rishisivakesh/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none d-flex align-items-center gap-2 transition-all"
            style={{ color: 'var(--text-primary)' }}
            onMouseOver={(e) => (e.currentTarget.style.color = 'var(--primary-accent)')}
            onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
          >
            <FaLinkedin style={{ fontSize: "1.25rem", color: "#0A66C2" }} />
            <span className="fw-medium">Rishi</span>
          </a>
          <a
            href="https://www.linkedin.com/in/yavanika-nukala/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none d-flex align-items-center gap-2 transition-all"
            style={{ color: 'var(--text-primary)' }}
            onMouseOver={(e) => (e.currentTarget.style.color = 'var(--primary-accent)')}
            onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
          >
            <FaLinkedin style={{ fontSize: "1.25rem", color: "#0A66C2" }} />
            <span className="fw-medium">Yavanika</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
