import { useParams } from "react-router-dom";
import api from "../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/BlogView.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function BlogView(){
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getBlog();
        getComments();
    }, [id]);

    const getBlog = async () => {
        try {
            const res = await api.get(`/api/posts/${id}`);
            setBlog(res.data);
        } catch (err) {
            alert(err);
        }
    };

    const getComments = async () => {
        try {
            const res = await api.get(`/api/comments/${id}/`);
            setComments(res.data);
        } catch (err) {
            alert("Error fetching comments");
        }
    };

    const toggleComments = () => {
        setShowComments(prev => !prev);
    };

    const handleSendComment = async () => {
        if (!newComment.trim()) return;

        try {
            const res = await api.post(`/api/comments/${id}/`, {
                content: newComment,
            });
            setComments([...comments, res.data]);
            setNewComment('');
        } catch (err) {
            alert("Failed to send comment");
        }
    };
    const handleDeleteComment = async (commentId) => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            try {
                await api.delete(`/api/comments/${id}/${commentId}/`);
                setComments(comments.filter(c => c.id !== commentId));
            } catch (err) {
                alert("Failed to delete comment");
            }
        }
                
    };


    const goHome = () => {
        navigate('/');
    };

    if (!blog) {
        return <div className="blogview-loading">Loading blog...</div>;
    }

    return (
        <div className="blogview-container">
            <div className="header-bar-blogview">
                <button className="home-button-blogview" onClick={goHome}>Home</button>
            </div>

            <div className="blogview-card">
                <h1 className="blogview-title">{blog.title}</h1>
                <div className="blogview-meta">
                    <span className="blogview-author">By {blog.author}</span>
                    <span className="blogview-date">
                        {new Date(blog.created_at).toLocaleString()}
                    </span>
                </div>
                <div className="blogview-content">{blog.content}</div>

                <div className="comment-sec">
                    <button className="comment-btn" onClick={toggleComments}>
                        <FontAwesomeIcon icon={faComment} />
                    </button>
                    <span className="comment-count">{comments.length}</span>
                </div>
            </div>

            {/* Comment Slide-up Panel */}
            <div className={`comment-slideup ${showComments ? 'active' : ''}`}>
                <div className="comment-slideup-header">
                    <span>Comments</span>
                    <button className="close-btn" onClick={toggleComments}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
                
                {/* Enter a Comment */}
                <div className="comment-slideup-input">
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                         onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleSendComment();
                            }
                        }}
                        className="comment-input"
                    />
                    <button className="send-btn" onClick={handleSendComment}>
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                </div>

                {/* Comments List */}
                <div className="comment-slideup-body">
                    {comments.length === 0 && <p className="no-comments">No comments yet.</p>}
                    {comments.map((c, i) => (
                        <div key={i} className="comment-item">
                            <div className="comment-author">{c.author || 'Anonymous'}</div>
                            <div className="comment-content">{c.content}</div>
                            <div className="comment-date-delete">
                            <div className="comment-date">{new Date(c.created_at).toLocaleString()}</div>
                                <button className="delete-comment-icon" onClick={() => handleDeleteComment(c.id)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>

                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default BlogView;
