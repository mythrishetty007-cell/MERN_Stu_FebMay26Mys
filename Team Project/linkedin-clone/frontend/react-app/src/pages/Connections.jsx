import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getConnectionRequests, getConnections, acceptRequest, rejectRequest } from '../services/api';

const Connections = () => {
  const [requests, setRequests] = useState([]);
  const [connections, setConnections] = useState([]);
  const [activeTab, setActiveTab] = useState('requests');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [reqRes, connRes] = await Promise.all([
        getConnectionRequests(),
        getConnections()
      ]);
      setRequests(reqRes.data.requests);
      setConnections(connRes.data.connections);
    } catch (err) {
      console.error('Error fetching connections:', err);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      await acceptRequest(requestId);
      fetchData();
    } catch (err) {
      console.error('Error accepting:', err);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await rejectRequest(requestId);
      fetchData();
    } catch (err) {
      console.error('Error rejecting:', err);
    }
  };

  return (
    <div className="conn-container">
      <div className="glass-card conn-tabs">
        <button 
          onClick={() => setActiveTab('requests')}
          className={`conn-tab ${activeTab === 'requests' ? 'active' : ''}`}
        >
          Incoming Requests ({requests.length})
        </button>
        <button 
          onClick={() => setActiveTab('connections')}
          className={`conn-tab ${activeTab === 'connections' ? 'active' : ''}`}
        >
          My Connections ({connections.length})
        </button>
      </div>

      <div className="conn-content">
        {activeTab === 'requests' ? (
          <div className="conn-list">
            {requests.length === 0 ? (
              <div className="empty-state glass-card">
                <span className="empty-icon">📩</span>
                <p>No pending connection requests</p>
              </div>
            ) : (
              requests.map((req) => (
                <div key={req._id} className="glass-card conn-card">
                  <div className="conn-user">
                    <Link to={`/profile/${req.from?._id}`} className="conn-avatar">
                      {req.from?.profilePicture || req.from?.name?.charAt(0).toUpperCase()}
                    </Link>
                    <div className="conn-info">
                      <Link to={`/profile/${req.from?._id}`} className="conn-name">{req.from?.name}</Link>
                      <p className="conn-headline">{req.from?.headline || 'Professional'}</p>
                    </div>
                  </div>
                  <div className="conn-actions">
                    <button onClick={() => handleAccept(req._id)} className="btn-primary btn-sm">Accept</button>
                    <button onClick={() => handleReject(req._id)} className="btn-ghost btn-sm">Reject</button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="conn-list">
            {connections.length === 0 ? (
              <div className="empty-state glass-card">
                <span className="empty-icon">👥</span>
                <p>No connections yet. Find people in Network!</p>
              </div>
            ) : (
              connections.map((conn) => (
                <div key={conn._id} className="glass-card conn-card">
                  <div className="conn-user">
                    <Link to={`/profile/${conn._id}`} className="conn-avatar">
                      {conn.profilePicture || conn.name?.charAt(0).toUpperCase()}
                    </Link>
                    <div className="conn-info">
                      <Link to={`/profile/${conn._id}`} className="conn-name">{conn.name}</Link>
                      <p className="conn-headline">{conn.headline || 'Member'}</p>
                      <div className="conn-skills">
                        {conn.skills?.slice(0, 3).map((skill, i) => (
                          <span key={i} className="skill-mini">{skill}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Link to={`/profile/${conn._id}`} className="btn-ghost btn-sm">View Profile</Link>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <style>{`
        .conn-container {
          max-width: 800px;
          margin: 40px auto;
          padding: 0 20px;
          animation: fadeIn 0.6s ease-out;
        }
        .conn-tabs {
          display: flex;
          padding: 8px;
          gap: 8px;
          margin-bottom: 24px;
        }
        .conn-tab {
          flex: 1;
          padding: 12px;
          border: none;
          background: transparent;
          color: var(--text-muted);
          border-radius: 12px;
          cursor: pointer;
          font-weight: 700;
          font-size: 14px;
          transition: var(--transition);
        }
        .conn-tab:hover {
          background: rgba(10, 102, 194, 0.05);
          color: var(--primary);
        }
        .conn-tab.active {
          background: var(--primary);
          color: white;
          box-shadow: var(--shadow-md);
        }
        .conn-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .conn-card {
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: white;
        }
        .conn-user {
          display: flex;
          gap: 16px;
          align-items: center;
        }
        .conn-avatar {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, var(--primary), #60a5fa);
          border-radius: 16px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 700;
          text-decoration: none;
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
        }
        .conn-avatar:hover {
          transform: scale(1.05);
          box-shadow: var(--shadow-md);
        }
        .conn-info {
          display: flex;
          flex-direction: column;
        }
        .conn-name {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          text-decoration: none;
        }
        .conn-name:hover {
          color: var(--primary);
          text-decoration: underline;
        }
        .conn-headline {
          font-size: 14px;
          color: var(--text-muted);
          margin-bottom: 4px;
        }
        .conn-actions {
          display: flex;
          gap: 12px;
        }
        .btn-sm {
          padding: 8px 20px;
          font-size: 14px;
        }
        .conn-skills {
          display: flex;
          gap: 6px;
          margin-top: 4px;
        }
        .skill-mini {
          font-size: 11px;
          background: #f1f5f9;
          color: #64748b;
          padding: 2px 8px;
          border-radius: 8px;
          font-weight: 600;
        }
        .empty-state {
          text-align: center;
          padding: 60px 40px;
        }
        .empty-icon {
          font-size: 48px;
          display: block;
          margin-bottom: 16px;
        }
      `}</style>
    </div>
  );
};

export default Connections;