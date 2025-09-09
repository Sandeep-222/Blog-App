import { Link } from "react-router-dom";
import '../styles/BlogItem.css'

function BlogItem({ blog }) {
    const getContent = (blog) => {
        const content = blog.content;
        return content.length > 60 ? content.slice(0, 60) + '...' : content;
    };

    return (
        <div className="blog-item-card">
            <Link to={`/blog/${blog.id}`} className="blog-item-link1">
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
        </div>
    );
}

export default BlogItem;
