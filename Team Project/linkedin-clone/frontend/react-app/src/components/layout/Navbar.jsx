import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar glass-card">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">in</span>
          <span className="logo-text">Network</span>
        </Link>
        
        {user ? (
          <div className="nav-links">
            <Link to="/" className="nav-link">🏠 Feed</Link>
            <Link to="/network" className="nav-link">👥 Network</Link>
            <Link to="/connections" className="nav-link">🤝 Connections</Link>
            <div className="nav-divider"></div>
            <Link to="/profile" className="nav-user">
              <span className="nav-avatar">{user.profilePicture || '👤'}</span>
              <span className="nav-name">{user.name}</span>
            </Link>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </div>
        ) : (
          <div className="nav-links">
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="btn-primary" style={{ textDecoration: 'none' }}>Register</Link>
          </div>
        )}
      </div>

      <style>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 1000;
          margin: 0;
          border-radius: 0 0 16px 16px;
          padding: 0;
          background: rgba(255, 255, 255, 0.85);
          border-bottom: 1px solid var(--glass-border);
        }
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 24px;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          font-family: 'Outfit', sans-serif;
        }
        .logo-icon {
          background: var(--primary);
          color: white;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          font-weight: 800;
          font-size: 20px;
        }
        .logo-text {
          font-size: 22px;
          font-weight: 700;
          color: var(--primary);
          letter-spacing: -0.5px;
        }
        .nav-links {
          display: flex;
          gap: 24px;
          align-items: center;
        }
        .nav-link {
          color: var(--text-muted);
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          transition: var(--transition);
          padding: 8px 12px;
          border-radius: 8px;
        }
        .nav-link:hover {
          color: var(--primary);
          background: rgba(10, 102, 194, 0.05);
        }
        .nav-divider {
          width: 1px;
          height: 24px;
          background: var(--border-color);
        }
        .nav-user {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: var(--text-main);
          font-weight: 600;
          font-size: 14px;
          padding: 4px 12px;
          border-radius: 12px;
          transition: var(--transition);
          background: #f1f5f9;
        }
        .nav-user:hover {
          background: #e2e8f0;
        }
        .nav-avatar {
          font-size: 18px;
        }
        .btn-logout {
          background: #fee2e2;
          color: #dc2626;
          border: none;
          padding: 8px 16px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          transition: var(--transition);
        }
        .btn-logout:hover {
          background: #fecaca;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;