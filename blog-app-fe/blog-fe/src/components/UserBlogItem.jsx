import { Link } from "react-router-dom";
import '../styles/UserBlogItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import api from "../api";
import { useNavigate } from "react-router-dom";
import EditBlog from "../pages/EditBlog";


function BlogItem({ blog }) {
    const navigate = useNavigate();
    const getContent = (blog) => {
        const content = blog.content;
        return content.length > 60 ? content.slice(0, 60) + '...' : content;
    };

    const handleEdit = (id) => {
        navigate(`/edit-blog/${id}`);
    }

    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/posts/${id}/`);
            alert("Blog deleted successfully");
            window.location.reload();
        } catch (error) {
            alert("Error deleting blog: " + error.message);
        }
    }

    return (
        <div className="blog-item-card">
            <Link to={`/blog/${blog.id}`} className="blog-item-link">
                <div className="blog-item-header">
                    <h3 className="blog-item-title">{blog.title}</h3>
                    <span className="blog-item-date">{new Date(blog.created_at).toDateString()}</span>
                </div>
                <div className="blog-item-body">
                    <p className="blog-item-content">{getContent(blog)}</p>
                </div>
                <div className="blog-item-footer">
                    <span className="blog-item-author">By {blog.author}</span>
                </div>
            </Link>
            <div className="option-container">
                <button className="edit-link" onClick={()=>handleEdit(blog.id)}>< FontAwesomeIcon icon={faEdit} className="edit-icon" /></button>
                <button className="delete-link" onClick={()=>handleDelete(blog.id)}>< FontAwesomeIcon icon={faTrash} className="delete-icon"/></button>
            </div>
        </div>
    );
}

export default BlogItem;
