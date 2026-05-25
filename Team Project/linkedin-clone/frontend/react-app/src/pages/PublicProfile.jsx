import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProfileById, sendConnectionRequest } from '../services/api';
import './ProfileStyles.css';

const PublicProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await getProfileById(id);
      setProfile(res.data.profile);
      setError(null);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Could not load profile. It may not exist or you might not have access.');
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async () => {
    try {
      await sendConnectionRequest(id);
      alert('Connection request sent!');
    } catch (err) {
      alert(err.response?.data?.message || 'Error sending request');
    }
  };

  if (loading) return <div className="loading">Loading Profile...</div>;
  if (error) return <div className="profile-container"><div className="glass-card" style={{padding: '40px', textAlign: 'center'}}>{error}</div></div>;
  if (!profile) return null;

  return (
    <div className="profile-container">
      <div className="glass-card profile-card">
        <div className="profile-header">
          <div className="avatar-large">{profile.profilePicture || profile.name?.charAt(0).toUpperCase()}</div>
          <div className="header-info">
            <h2>{profile.name}</h2>
            <p className="headline">{profile.headline || 'Member'}</p>
            <p className="email">✉️ {profile.email}</p>
            <div style={{marginTop: '20px', display: 'flex', gap: '12px'}}>
              <button onClick={handleConnect} className="btn-primary">
                🤝 Connect
              </button>
              <button onClick={() => navigate(-1)} className="btn-ghost">
                Back
              </button>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h3>Skills</h3>
            <div className="skills-tags">
              {profile.skills?.length > 0 ? profile.skills.map((skill, i) => (
                <span key={i} className="skill-tag">{skill}</span>
              )) : <p className="empty-text">No skills added yet.</p>}
            </div>
          </div>

          <div className="profile-section">
            <h3>Experience</h3>
            {profile.experience?.length > 0 ? profile.experience.map((exp, i) => (
              <div key={i} className="experience-item">
                <div className="item-dot"></div>
                <div className="item-content">
                  <h4>{exp.title}</h4>
                  <p className="company">{exp.company}</p>
                  <p className="duration">📅 {exp.duration}</p>
                  <p className="description">{exp.description}</p>
                </div>
              </div>
            )) : <p className="empty-text">No experience listed.</p>}
          </div>

          <div className="profile-section">
            <h3>Education</h3>
            {profile.education?.length > 0 ? profile.education.map((edu, i) => (
              <div key={i} className="experience-item">
                <div className="item-dot edu"></div>
                <div className="item-content">
                  <h4>{edu.school}</h4>
                  <p className="degree">🎓 {edu.degree} • {edu.fieldOfStudy}</p>
                  <p className="duration">📅 {edu.year}</p>
                </div>
              </div>
            )) : <p className="empty-text">No education listed.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
