import { useState, useEffect } from 'react';
import { getMyProfile, updateProfile } from '../services/api';
import './ProfileStyles.css';

const PROF_ICONS = [
  '👤', '👨‍💼', '👩‍💼', '👨‍💻', '👩‍💻', '👨‍🔬', '👩‍🔬', '👨‍🎨', '👩‍🎨', '👨‍🏫', '👩‍🏫', '👨‍⚕️', '👩‍⚕️', '👨‍⚖️', '👩‍⚖️',
  '🚀', '💡', '💎', '🎯', '📈', '🛠️', '💻', '🌐', '🛡️', '⚙️', '📊', '🤝', '🎓', '🏆', '🔥'
];

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    headline: '',
    skills: '',
    profilePicture: '👤',
    experience: [{ title: '', company: '', duration: '', description: '' }],
    education: [{ school: '', degree: '', fieldOfStudy: '', year: '' }]
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getMyProfile();
      const p = res.data.profile;
      setProfile(p);
      setFormData({
        headline: p.headline || '',
        profilePicture: p.profilePicture || '👤',
        skills: (p.skills || []).join(', '),
        experience: p.experience?.length > 0 
          ? p.experience 
          : [{ title: '', company: '', duration: '', description: '' }],
        education: p.education?.length > 0 
          ? p.education 
          : [{ school: '', degree: '', fieldOfStudy: '', year: '' }]
      });
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
        experience: formData.experience.filter(exp => exp.title || exp.company),
        education: formData.education.filter(edu => edu.school || edu.degree)
      };
      await updateProfile(data);
      setIsEditing(false);
      fetchProfile();
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { title: '', company: '', duration: '', description: '' }]
    });
  };

  const updateExperience = (index, field, value) => {
    const newExp = [...formData.experience];
    newExp[index] = { ...newExp[index], [field]: value };
    setFormData({ ...formData, experience: newExp });
  };

  const removeExperience = (index) => {
    const newExp = formData.experience.filter((_, i) => i !== index);
    setFormData({ ...formData, experience: newExp.length > 0 ? newExp : [{ title: '', company: '', duration: '', description: '' }] });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { school: '', degree: '', fieldOfStudy: '', year: '' }]
    });
  };

  const updateEducation = (index, field, value) => {
    const newEdu = [...formData.education];
    newEdu[index] = { ...newEdu[index], [field]: value };
    setFormData({ ...formData, education: newEdu });
  };

  const removeEducation = (index) => {
    const newEdu = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: newEdu.length > 0 ? newEdu : [{ school: '', degree: '', fieldOfStudy: '', year: '' }] });
  };

  if (!profile) return <div className="loading">Loading...</div>;

  return (
    <div className="profile-container">
      <div className="glass-card profile-card">
        <div className="profile-header">
          <div className="avatar-large">{profile.profilePicture || profile.name?.charAt(0).toUpperCase()}</div>
          <div className="header-info">
            <h2>{profile.name}</h2>
            <p className="headline">{profile.headline || 'Add a headline to your profile'}</p>
            <p className="email">✉️ {profile.email}</p>
            {!isEditing && (
              <button onClick={() => setIsEditing(true)} className="btn-primary edit-btn">
                <span>✏️</span> Edit Profile
              </button>
            )}
          </div>
        </div>

        {!isEditing ? (
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
        ) : (
          <form onSubmit={handleSubmit} className="edit-form">
            <div className="form-group">
              <label>Select Professional Avatar</label>
              <div className="icon-grid">
                {PROF_ICONS.map(icon => (
                  <div 
                    key={icon} 
                    className={`icon-option ${formData.profilePicture === icon ? 'selected' : ''}`}
                    onClick={() => setFormData({...formData, profilePicture: icon})}
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Headline</label>
              <input
                type="text"
                placeholder="e.g., Software Developer at Google"
                value={formData.headline}
                onChange={(e) => setFormData({...formData, headline: e.target.value})}
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label>Skills (comma separated)</label>
              <input
                type="text"
                placeholder="React, Node.js, etc."
                value={formData.skills}
                onChange={(e) => setFormData({...formData, skills: e.target.value})}
                className="input-field"
              />
            </div>

            <div className="form-section">
              <h3>Experience</h3>
              {formData.experience.map((exp, index) => (
                <div key={index} className="entry-card">
                  <div className="entry-header">
                    <span>Position {index + 1}</span>
                    <button type="button" onClick={() => removeExperience(index)} className="btn-remove">Remove</button>
                  </div>
                  <input
                    type="text"
                    placeholder="Job Title"
                    value={exp.title}
                    onChange={(e) => updateExperience(index, 'title', e.target.value)}
                    className="input-field"
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => updateExperience(index, 'company', e.target.value)}
                    className="input-field"
                  />
                  <input
                    type="text"
                    placeholder="Duration"
                    value={exp.duration}
                    onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                    className="input-field"
                  />
                  <textarea
                    placeholder="Description"
                    value={exp.description}
                    onChange={(e) => updateExperience(index, 'description', e.target.value)}
                    className="input-field"
                    rows="2"
                  />
                </div>
              ))}
              <button type="button" onClick={addExperience} className="btn-secondary">Add Experience</button>
            </div>

            <div className="form-section">
              <h3>Education</h3>
              {formData.education.map((edu, index) => (
                <div key={index} className="entry-card">
                  <div className="entry-header">
                    <span>Institute {index + 1}</span>
                    <button type="button" onClick={() => removeEducation(index)} className="btn-remove">Remove</button>
                  </div>
                  <input
                    type="text"
                    placeholder="School/University"
                    value={edu.school}
                    onChange={(e) => updateEducation(index, 'school', e.target.value)}
                    className="input-field"
                  />
                  <input
                    type="text"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                    className="input-field"
                  />
                  <input
                    type="text"
                    placeholder="Field of Study"
                    value={edu.fieldOfStudy}
                    onChange={(e) => updateEducation(index, 'fieldOfStudy', e.target.value)}
                    className="input-field"
                  />
                  <input
                    type="text"
                    placeholder="Year"
                    value={edu.year}
                    onChange={(e) => updateEducation(index, 'year', e.target.value)}
                    className="input-field"
                  />
                </div>
              ))}
              <button type="button" onClick={addEducation} className="btn-secondary">Add Education</button>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">Save Changes</button>
              <button type="button" onClick={() => setIsEditing(false)} className="btn-ghost">Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;