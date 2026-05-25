import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getFeed, createPost, likePost, commentOnPost } from '../services/api';

const Feed = () => {
  const { user: currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [commentText, setCommentText] = useState('');
  const [activeComment, setActiveComment] = useState(null);

  // File upload state
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState('none');
  const [filePreview, setFilePreview] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    try {
      const res = await getFeed();
      setPosts(res.data.posts);
    } catch (err) {
      console.error('Error fetching feed:', err);
    }
  };

  const triggerFileSelect = (type) => {
    if (fileInputRef.current) {
      if (type === 'image') {
        fileInputRef.current.accept = 'image/*';
        setFileType('image');
      } else if (type === 'video') {
        fileInputRef.current.accept = 'video/*';
        setFileType('video');
      } else if (type === 'document') {
        fileInputRef.current.accept = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt';
        setFileType('document');
      }
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);

    // Generate preview URL
    if (file.type.startsWith('image/')) {
      setFileType('image');
      setFilePreview(URL.createObjectURL(file));
    } else if (file.type.startsWith('video/')) {
      setFileType('video');
      setFilePreview(URL.createObjectURL(file));
    } else {
      setFileType('document');
      setFilePreview(file.name);
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setFileType('none');
    setFilePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.trim() && !selectedFile) return;

    const formData = new FormData();
    if (newPost.trim()) {
      formData.append('content', newPost);
    }
    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    try {
      await createPost(formData);
      setNewPost('');
      removeSelectedFile();
      fetchFeed();
    } catch (err) {
      console.error('Error creating post:', err);
    }
  };

  const handleLike = async (postId) => {
    try {
      await likePost(postId);
      fetchFeed();
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const handleComment = async (postId) => {
    if (!commentText.trim()) return;
    try {
      await commentOnPost(postId, commentText);
      setCommentText('');
      setActiveComment(null);
      fetchFeed();
    } catch (err) {
      console.error('Error commenting:', err);
    }
  };

  return (
    <div className="feed-layout">
      {/* Sidebar - Profile Summary */}
      <aside className="feed-sidebar">
        <div className="glass-card profile-mini-card">
          <div className="mini-card-cover"></div>
          <div className="mini-card-content">
            <div className="mini-avatar">
              {currentUser?.profilePicture || currentUser?.name?.charAt(0).toUpperCase()}
            </div>
            <Link to="/profile" className="mini-name">{currentUser?.name}</Link>
            <p className="mini-headline">{currentUser?.headline || 'Professional Member'}</p>
          </div>
          <div className="mini-stats">
            <div className="stat-row">
              <span>Profile views</span>
              <span className={`stat-val`}>{currentUser?.profileViews || 0}</span>
            </div>
            <div className="stat-row">
              <span>Post impressions</span>
              <span className={`stat-val`}>{currentUser?.postImpressions || 0}</span>
            </div>
          </div>
        </div>

        <div className="glass-card trending-card">
          <h3>Trending Topics</h3>
          <ul className="trending-list">
            <li>#FutureOfWork</li>
            <li>#Web3DDevelopment</li>
            <li>#ProfessionalGrowth</li>
            <li>#AI&MLRevolution</li>
          </ul>
        </div>
      </aside>

      {/* Main Feed Content */}
      <main className="feed-main">
        {/* Create Post Area */}
        <div className="glass-card post-composer">
          <form onSubmit={handleCreatePost}>
            <div className="composer-input-row">
              <div className="composer-avatar">
                {currentUser?.profilePicture || currentUser?.name?.charAt(0).toUpperCase()}
              </div>
              <textarea
                placeholder="Share a professional insight..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="composer-textarea"
              />
            </div>

            {/* File Preview */}
            {filePreview && (
              <div className="composer-file-preview">
                {fileType === 'image' && (
                  <div className="preview-image-container">
                    <img src={filePreview} alt="Upload preview" className="preview-media" />
                    <button type="button" onClick={removeSelectedFile} className="remove-preview-btn">✕</button>
                  </div>
                )}
                {fileType === 'video' && (
                  <div className="preview-video-container">
                    <video src={filePreview} controls className="preview-media" />
                    <button type="button" onClick={removeSelectedFile} className="remove-preview-btn">✕</button>
                  </div>
                )}
                {fileType === 'document' && (
                  <div className="preview-doc-container">
                    <span className="doc-icon">📄</span>
                    <span className="doc-name">{filePreview}</span>
                    <button type="button" onClick={removeSelectedFile} className="remove-preview-btn">✕</button>
                  </div>
                )}
              </div>
            )}

            <div className="composer-footer">
              <div className="composer-attachments">
                <button type="button" className="attach-btn" onClick={() => triggerFileSelect('image')}>🖼️ Photo</button>
                <button type="button" className="attach-btn" onClick={() => triggerFileSelect('video')}>🎥 Video</button>
                <button type="button" className="attach-btn" onClick={() => triggerFileSelect('document')}>📄 Doc</button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </div>
              <button type="submit" className="btn-post-submit" disabled={!newPost.trim() && !selectedFile}>
                Post Insight
              </button>
            </div>
          </form>
        </div>

        {/* Posts List */}
        <div className="posts-list">
          {posts.length === 0 ? (
            <div className="feed-empty-state glass-card">
              <span className="empty-state-icon">📡</span>
              <h3>Your network is quiet</h3>
              <p>Be the first to share an update or connect with more people to see their posts.</p>
            </div>
          ) : (
            posts.map((post) => (
              <article key={post._id} className="glass-card insight-card">
                <div className="insight-header">
                  <Link to={`/profile/${post.author?._id}`} className="insight-author-link">
                    <div className="insight-avatar">
                      {post.author?.profilePicture || post.author?.name?.charAt(0).toUpperCase()}
                    </div>
                  </Link>
                  <div className="insight-meta">
                    <div className="author-top">
                      <Link to={`/profile/${post.author?._id}`} className="author-name">{post.author?.name}</Link>
                      <span className="connection-degree">• 1st</span>
                    </div>
                    <p className="author-headline">{post.author?.headline || 'Professional'}</p>
                    <time className="insight-time">{new Date(post.createdAt).toLocaleDateString()}</time>
                  </div>
                  <button className="insight-more">•••</button>
                </div>
                
                <div className="insight-content">
                  {post.content && <p className="insight-text-content">{post.content}</p>}
                  {post.file && (
                    <div className="insight-media-container">
                      {post.fileType === 'image' && (
                        <img src={`http://localhost:5000${post.file}`} alt="Post attachment" className="insight-media-img" />
                      )}
                      {post.fileType === 'video' && (
                        <video src={`http://localhost:5000${post.file}`} controls className="insight-media-video" />
                      )}
                      {post.fileType === 'document' && (
                        <div className="insight-media-doc">
                          <div className="doc-info">
                            <span className="doc-icon">📄</span>
                            <div className="doc-details">
                              <span className="doc-title">{post.fileName || 'Attachment Document'}</span>
                              <span className="doc-type">Document</span>
                            </div>
                          </div>
                          <a href={`http://localhost:5000${post.file}`} target="_blank" rel="noreferrer" className="btn-doc-download">
                            Download / View
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="insight-stats">
                  <div className="reaction-group">
                    <span className="reaction-icons">👍❤️💡</span>
                    <span className="stat-text">{post.likes?.length || 0} reactions</span>
                  </div>
                  <span className="stat-text">{post.comments?.length || 0} comments</span>
                </div>

                <div className="insight-actions">
                  <button 
                    onClick={() => handleLike(post._id)} 
                    className={`insight-action-btn ${post.likes?.includes(currentUser?.id) ? 'active' : ''}`}
                  >
                    <span className="action-icon">👍</span> Like
                  </button>
                  <button 
                    onClick={() => setActiveComment(activeComment === post._id ? null : post._id)} 
                    className="insight-action-btn"
                  >
                    <span className="action-icon">💬</span> Comment
                  </button>
                </div>

                {/* Enhanced Comments Section */}
                {post.comments?.length > 0 && (
                  <div className="insight-comments">
                    {post.comments.map((comment, i) => (
                      <div key={i} className="comment-thread">
                        <span className="comment-avatar-small">{comment.user?.profilePicture || '👤'}</span>
                        <div className="comment-bubble">
                          <div className="comment-header">
                            <span className="comment-user-name">{comment.user?.name}</span>
                            <span className="comment-user-headline">{comment.user?.headline || 'Professional'}</span>
                          </div>
                          <p className="comment-message">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Comment Input */}
                {activeComment === post._id && (
                  <div className="insight-comment-input">
                    <div className="comment-input-avatar">
                      {currentUser?.profilePicture || currentUser?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="comment-field-wrapper">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="comment-field"
                      />
                      <button onClick={() => handleComment(post._id)} className="btn-comment-send">Post</button>
                    </div>
                  </div>
                )}
              </article>
            ))
          )}
        </div>
      </main>

      <style>{`
        .feed-layout {
          max-width: 1100px;
          margin: 32px auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 24px;
          animation: fadeIn 0.6s ease-out;
        }

        /* Sidebar Styles */
        .feed-sidebar {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .profile-mini-card {
          overflow: hidden;
          padding: 0;
        }

        .mini-card-cover {
          height: 60px;
          background: linear-gradient(135deg, var(--primary), #60a5fa);
        }

        .mini-card-content {
          padding: 0 16px 16px;
          text-align: center;
          margin-top: -30px;
          border-bottom: 1px solid var(--border-color);
        }

        .mini-avatar {
          width: 64px;
          height: 64px;
          background: white;
          border-radius: 16px;
          margin: 0 auto 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 700;
          box-shadow: var(--shadow-md);
          border: 3px solid white;
        }

        .mini-name {
          font-size: 16px;
          font-weight: 700;
          color: #1e293b;
          text-decoration: none;
          display: block;
        }

        .mini-name:hover { text-decoration: underline; }

        .mini-headline {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 4px;
        }

        .mini-stats {
          padding: 12px 16px;
        }

        .stat-row {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          padding: 4px 0;
        }

        .stat-row span:first-child { color: var(--text-muted); font-weight: 600; }
        .stat-val { color: var(--primary); font-weight: 700; }

        .trending-card {
          padding: 20px;
        }

        .trending-card h3 { font-size: 14px; margin-bottom: 12px; }
        .trending-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
        .trending-list li { font-size: 13px; color: var(--text-muted); font-weight: 600; cursor: pointer; }
        .trending-list li:hover { color: var(--primary); }

        /* Composer Styles */
        .post-composer {
          padding: 16px;
          margin-bottom: 24px;
          background: white;
        }

        .composer-input-row {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
        }

        .composer-avatar {
          width: 48px;
          height: 48px;
          background: #f1f5f9;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .composer-textarea {
          flex: 1;
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 14px 20px;
          resize: none;
          font-family: inherit;
          font-size: 14px;
          background: #f8fafc;
          transition: var(--transition);
        }

        .composer-textarea:focus {
          outline: none;
          background: white;
          border-color: var(--primary);
        }

        .composer-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 12px;
          border-top: 1px solid #f1f5f9;
        }

        .composer-attachments { display: flex; gap: 8px; }
        .attach-btn {
          padding: 8px 12px;
          border-radius: 8px;
          border: none;
          background: transparent;
          font-size: 13px;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
        }
        .attach-btn:hover { background: #f1f5f9; color: var(--primary); }

        .btn-post-submit {
          padding: 8px 24px;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: var(--radius-full);
          font-weight: 700;
          cursor: pointer;
          transition: var(--transition);
        }

        .btn-post-submit:disabled { opacity: 0.5; cursor: not-allowed; }

        /* Insight Card Styles */
        .insight-card {
          margin-bottom: 24px;
          padding: 0;
          background: white;
          overflow: hidden;
        }

        .insight-header {
          padding: 16px 16px 12px;
          display: flex;
          gap: 12px;
          position: relative;
        }

        .insight-avatar {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, var(--primary), #60a5fa);
          border-radius: 12px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 700;
        }

        .insight-meta { flex: 1; }
        .author-top { display: flex; align-items: center; gap: 6px; }
        .author-name { font-size: 14px; font-weight: 700; color: #0f172a; text-decoration: none; }
        .author-name:hover { color: var(--primary); text-decoration: underline; }
        .connection-degree { font-size: 12px; color: var(--text-muted); }
        .author-headline { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
        .insight-time { font-size: 11px; color: #94a3b8; display: block; margin-top: 2px; }

        .insight-more {
          background: transparent;
          border: none;
          color: #64748b;
          cursor: pointer;
          font-size: 16px;
        }

        .insight-content {
          padding: 0 16px 16px;
          font-size: 14px;
          line-height: 1.5;
          color: #334155;
        }

        .insight-stats {
          padding: 8px 16px;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #f1f5f9;
        }

        .reaction-group { display: flex; align-items: center; gap: 8px; }
        .reaction-icons { font-size: 14px; letter-spacing: -2px; }
        .stat-text { font-size: 12px; color: var(--text-muted); }

        .insight-actions {
          display: flex;
          padding: 4px 8px;
        }

        .insight-action-btn {
          flex: 1;
          padding: 10px;
          border: none;
          background: transparent;
          color: #64748b;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: var(--transition);
        }

        .insight-action-btn:hover { background: #f1f5f9; color: var(--primary); }
        .insight-action-btn.active { color: var(--primary); }
        .action-icon { font-size: 16px; }

        /* Comment Styles */
        .insight-comments {
          background: #f8fafc;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .comment-thread { display: flex; gap: 8px; }
        .comment-avatar-small { font-size: 14px; padding-top: 4px; }
        .comment-bubble {
          background: #f1f5f9;
          padding: 8px 12px;
          border-radius: 0 12px 12px 12px;
          flex: 1;
        }

        .comment-header { display: flex; flex-direction: column; margin-bottom: 4px; }
        .comment-user-name { font-size: 13px; font-weight: 700; color: #1e293b; }
        .comment-user-headline { font-size: 11px; color: var(--text-muted); }
        .comment-message { font-size: 13px; color: #334155; }

        .insight-comment-input {
          padding: 12px 16px 16px;
          display: flex;
          gap: 12px;
          align-items: center;
          background: white;
        }

        .comment-input-avatar {
          width: 32px;
          height: 32px;
          background: #f1f5f9;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }

        .comment-field-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          background: #f8fafc;
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 4px 4px 4px 16px;
        }

        .comment-field {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 13px;
          outline: none;
          padding: 6px 0;
        }

        .btn-comment-send {
          background: var(--primary);
          color: white;
          border: none;
          padding: 6px 16px;
          border-radius: 16px;
          font-weight: 700;
          font-size: 12px;
          cursor: pointer;
        }

        .feed-empty-state {
          text-align: center;
          padding: 60px 40px;
        }

        .empty-state-icon { font-size: 48px; display: block; margin-bottom: 16px; }

        /* File Preview Styles */
        .composer-file-preview {
          margin: 12px 0;
          padding: 8px;
          background: #f8fafc;
          border-radius: 12px;
          border: 1px dashed var(--border-color);
        }

        .preview-image-container, .preview-video-container {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          max-height: 250px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #000;
        }

        .preview-media {
          max-width: 100%;
          max-height: 250px;
          object-fit: contain;
        }

        .remove-preview-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(4px);
          color: white;
          border: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          transition: var(--transition);
        }

        .remove-preview-btn:hover {
          background: rgba(239, 68, 68, 0.9);
          transform: scale(1.1);
        }

        .preview-doc-container {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: white;
          border: 1px solid var(--border-color);
          border-radius: 10px;
          position: relative;
        }

        .doc-icon {
          font-size: 24px;
        }

        .doc-name {
          font-size: 13px;
          font-weight: 600;
          color: #334155;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 80%;
        }

        /* Insight media styles */
        .insight-media-container {
          width: 100%;
          background: #f8fafc;
          border-top: 1px solid #f1f5f9;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          margin-top: 12px;
          border-radius: 8px;
        }

        .insight-media-img {
          width: 100%;
          max-height: 450px;
          object-fit: cover;
        }

        .insight-media-video {
          width: 100%;
          max-height: 450px;
          background: #000;
        }

        .insight-media-doc {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          background: #f8fafc;
          border-top: 1px solid #f1f5f9;
          border-bottom: 1px solid #f1f5f9;
        }

        .doc-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .doc-details {
          display: flex;
          flex-direction: column;
        }

        .doc-title {
          font-size: 14px;
          font-weight: 700;
          color: #1e293b;
          max-width: 250px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .doc-type {
          font-size: 11px;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .btn-doc-download {
          padding: 8px 16px;
          background: var(--primary);
          color: white !important;
          text-decoration: none;
          font-size: 12px;
          font-weight: 700;
          border-radius: var(--radius-full);
          transition: var(--transition);
        }

        .btn-doc-download:hover {
          background: #1d4ed8;
          box-shadow: var(--shadow-sm);
        }

        @media (max-width: 900px) {
          .feed-layout { grid-template-columns: 1fr; }
          .feed-sidebar { display: none; }
        }
      `}</style>
    </div>
  );
};

export default Feed;