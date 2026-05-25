import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  searchProfiles,
  sendConnectionRequest,
  getConnections,
  getConnectionRequests,
  acceptRequest,
  rejectRequest
} from '../services/api';
import { useAuth } from '../context/AuthContext';

const Network = () => {
  const { user: currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [connections, setConnections] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);

  const fetchConnectionData = async () => {
    try {
      const [connRes, reqRes] = await Promise.all([
        getConnections(),
        getConnectionRequests()
      ]);
      setConnections(connRes.data.connections || []);
      setIncomingRequests(reqRes.data.requests || []);
    } catch (err) {
      console.error('Error fetching connection lists:', err);
    }
  };

  useEffect(() => {
    fetchConnectionData();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    setMessage('');
    try {
      const res = await searchProfiles(searchTerm);
      // Filter out the currently logged in user to avoid self-connection requests
      const filtered = res.data.users.filter(
        (u) => u._id !== currentUser?.id && u._id !== currentUser?._id
      );
      setUsers(filtered);
    } catch (err) {
      console.error('Search error:', err);
    }
    setLoading(false);
  };

  const handleConnect = async (userId) => {
    try {
      await sendConnectionRequest(userId);
      setMessage('Connection request sent!');
      setTimeout(() => setMessage(''), 3000);
      fetchConnectionData();
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to send request');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      await acceptRequest(requestId);
      setMessage('Connection request accepted!');
      setTimeout(() => setMessage(''), 3000);
      fetchConnectionData();
    } catch (err) {
      setMessage('Failed to accept request');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await rejectRequest(requestId);
      setMessage('Connection request ignored.');
      setTimeout(() => setMessage(''), 3000);
      fetchConnectionData();
    } catch (err) {
      setMessage('Failed to ignore request');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="net-container">
      <div className="glass-card net-search-hero">
        <div className="hero-content">
          <h1>Discover Talent</h1>
          <p>Find and connect with professionals across the globe</p>
          <form onSubmit={handleSearch} className="search-bar-modern">
            <div className="search-input-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search by skill, role, or industry..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-search">Search Professionals</button>
          </form>
        </div>
      </div>

      {message && <div className="net-toast glass-card">{message}</div>}

      <div className="talent-directory">
        {loading ? (
          <div className="directory-loading">
            <div className="shimmer-row"></div>
            <div className="shimmer-row"></div>
            <div className="shimmer-row"></div>
          </div>
        ) : (
          <div className="talent-list">
            {users.length === 0 && searchTerm && !loading && (
              <div className="no-talent glass-card">
                <div className="no-talent-icon">🕵️‍♂️</div>
                <h3>No professionals found</h3>
                <p>Try searching for a different skill or industry</p>
              </div>
            )}
            
            {users.map((user, index) => {
              const isConnected = connections.some(c => c._id === user._id || c === user._id);
              const incomingReq = incomingRequests.find(r => r.from?._id === user._id || r.from === user._id);
              
              return (
                <div key={user._id} className="talent-row glass-card" style={{ animationDelay: `${index * 0.08}s` }}>
                  <div className="talent-cover"></div>
                  <div className="talent-main">
                    <Link to={`/profile/${user._id}`} className="talent-avatar-link">
                      <div className="talent-avatar">
                        {user.profilePicture || user.name?.charAt(0).toUpperCase()}
                      </div>
                    </Link>
                    <div className="talent-info">
                      <div className="talent-header">
                        <Link to={`/profile/${user._id}`} className="talent-name">{user.name}</Link>
                        <span className="talent-badge">Available</span>
                      </div>
                      <p className="talent-headline">{user.headline || 'Professional Member'}</p>
                      <div className="talent-skills">
                        {user.skills?.map((skill, i) => (
                          <span key={i} className="talent-skill-tag">{skill}</span>
                        ))}
                      </div>
                    </div>
                    <div className="talent-actions">
                      {isConnected ? (
                        <div className="talent-status-badge">✓ Connected</div>
                      ) : incomingReq ? (
                        <div className="talent-request-actions">
                          <button 
                            onClick={() => handleAccept(incomingReq._id)} 
                            className="btn-connect-talent btn-accept"
                          >
                            🤝 Accept
                          </button>
                          <button 
                            onClick={() => handleReject(incomingReq._id)} 
                            className="btn-ignore-talent"
                          >
                            ✕ Ignore
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => handleConnect(user._id)} className="btn-connect-talent">
                          🤝 Connect
                        </button>
                      )}
                      <Link to={`/profile/${user._id}`} className="btn-view-talent">
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        @keyframes networkFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes talentRowFadeIn {
          from { opacity: 0; transform: translateY(30px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .net-container {
          max-width: 1100px;
          margin: 40px auto;
          padding: 0 24px;
          opacity: 0;
          animation: networkFadeIn 0.8s ease-out forwards;
        }

        .net-search-hero {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          color: white;
          padding: 60px 40px;
          border-radius: 24px;
          margin-bottom: 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
          border: none;
        }

        .net-search-hero::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(10, 102, 194, 0.1) 0%, transparent 70%);
          animation: rotate 20s linear infinite;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .hero-content {
          position: relative;
          z-index: 1;
        }

        .hero-content h1 {
          font-size: 42px;
          font-weight: 800;
          margin-bottom: 12px;
          letter-spacing: -1px;
          color: white; /* Explicitly set to white to override global styles */
        }

        .hero-content p {
          font-size: 18px;
          color: #cbd5e1; /* Lighter gray for better visibility */
          margin-bottom: 32px;
        }

        .search-bar-modern {
          display: flex;
          gap: 12px;
          max-width: 700px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.1);
          padding: 8px;
          border-radius: 16px;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .search-input-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 16px;
          background: white;
          border-radius: 12px;
        }

        .search-icon { font-size: 18px; }

        .search-input-wrapper input {
          width: 100%;
          border: none;
          padding: 12px 0;
          font-size: 15px;
          outline: none;
          color: #1e293b;
        }

        .btn-search {
          background: var(--primary);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-search:hover {
          background: #005885;
          transform: translateY(-2px);
        }

        .btn-search:active {
          transform: scale(0.96) translateY(0);
        }

        .talent-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .talent-row {
          display: flex;
          flex-direction: column;
          background: white;
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid var(--border-color);
          opacity: 0;
          animation: talentRowFadeIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }

        .talent-row:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-lg);
          border-color: var(--primary);
        }

        .talent-cover {
          height: 90px;
          background: linear-gradient(135deg, #0a66c2 0%, #3b82f6 50%, #60a5fa 100%);
          transition: all 0.4s ease;
        }

        .talent-row:hover .talent-cover {
          filter: brightness(1.1);
        }

        .talent-main {
          display: flex;
          padding: 0 32px 32px;
          margin-top: -45px;
          gap: 24px;
          align-items: flex-end;
        }

        .talent-avatar-link {
          text-decoration: none;
        }

        .talent-avatar {
          width: 100px;
          height: 100px;
          background: #f8fafc;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 42px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          border: 4px solid #ffffff;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .talent-row:hover .talent-avatar {
          transform: scale(1.08) rotate(3deg);
          box-shadow: 0 20px 25px -5px rgba(10, 102, 194, 0.3);
          border-color: #0a66c2;
        }

        .talent-info {
          flex: 1;
          padding-top: 48px;
        }

        .talent-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 4px;
        }

        .talent-name {
          font-size: 22px;
          font-weight: 800;
          color: #0f172a;
          text-decoration: none;
        }

        .talent-name:hover {
          color: var(--primary);
          text-decoration: none;
        }

        .talent-badge {
          background: #dcfce7;
          color: #166534;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 10px;
          border-radius: var(--radius-full);
          text-transform: uppercase;
        }

        .talent-headline {
          font-size: 15px;
          color: #475569;
          margin-bottom: 16px;
          font-weight: 500;
        }

        .talent-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .talent-skill-tag {
          background: #eff6ff;
          color: #1e40af;
          border: 1px solid #bfdbfe;
          padding: 4px 12px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .talent-skill-tag:hover {
          background: #dbeafe;
          transform: translateY(-1px);
        }

        .talent-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-width: 180px;
          padding-top: 48px;
        }

        .btn-connect-talent {
          background: linear-gradient(135deg, #0a66c2 0%, #1e4ed8 100%);
          color: white;
          border: none;
          padding: 12px;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 6px -1px rgba(10, 102, 194, 0.2);
        }

        .btn-connect-talent:hover {
          background: linear-gradient(135deg, #08519c 0%, #1a40c4 100%);
          box-shadow: 0 10px 15px -3px rgba(10, 102, 194, 0.4);
          transform: translateY(-2px);
        }

        .btn-connect-talent:active {
          transform: scale(0.96) translateY(0);
        }

        .btn-view-talent {
          background: #ffffff;
          color: #0a66c2;
          border: 2px solid #0a66c2;
          padding: 11px;
          border-radius: 12px;
          font-weight: 800;
          text-align: center;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .btn-view-talent:hover {
          background: #0a66c2;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(10, 102, 194, 0.2);
        }

        .btn-view-talent:active {
          transform: scale(0.96) translateY(0);
        }

        .talent-status-badge {
          background: #dcfce7;
          color: #15803d;
          border: 1px solid #bbf7d0;
          padding: 12px;
          border-radius: 12px;
          font-weight: 800;
          text-align: center;
          font-size: 14px;
          box-shadow: 0 4px 6px -1px rgba(21, 128, 61, 0.05);
        }

        .talent-request-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
        }

        .btn-ignore-talent {
          background: #ffffff;
          color: #dc2626;
          border: 2px solid #dc2626;
          padding: 11px;
          border-radius: 12px;
          font-weight: 800;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-ignore-talent:hover {
          background: #dc2626;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(220, 38, 38, 0.2);
        }

        .btn-ignore-talent:active {
          transform: scale(0.96) translateY(0);
        }

        .net-toast {
          position: fixed;
          bottom: 32px;
          right: 32px;
          padding: 16px 32px;
          background: #0f172a;
          color: white;
          border-radius: 16px;
          z-index: 1000;
          animation: slideInRight 0.4s ease-out;
        }

        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        .directory-loading {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .shimmer-row {
          height: 180px;
          background: linear-gradient(90deg, #f1f5f9 25%, #f8fafc 50%, #f1f5f9 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 20px;
        }

        @keyframes shimmer {
          from { background-position: 200% 0; }
          to { background-position: -200% 0; }
        }

        .no-talent {
          text-align: center;
          padding: 80px 40px;
        }

        .no-talent-icon {
          font-size: 64px;
          margin-bottom: 24px;
        }

        @media (max-width: 768px) {
          .talent-main {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 0 20px 20px;
          }
          .talent-actions {
            width: 100%;
            padding-top: 0;
          }
          .search-bar-modern {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default Network;