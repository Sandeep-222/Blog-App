import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import '../styles/BlogCreate.css'

function BlogCreate() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
         try {
            await api.post('/api/posts/',{
                title: title,
                content : content
            })

        } catch (error) {
          console.error("Error creating blog:", error);
          navigate('/')
          alert("Something went wrong!");
        }
        navigate('/')
    };

    return (
        <div className="flex-wrapper">
            <div className="blog-create-container">
            <h2 className="blog-create-heading">Write a New Blog</h2>
            <form onSubmit={handleSubmit} className="blog-create-form">
                <input
                    type="text"
                    placeholder="Blog Title"
                    className="blog-input-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Start writing your blog here..."
                    className="blog-input-content"
                    rows={10}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                ></textarea>
                <div className="blog-create-buttons">
                    <button type="submit" className="btn-create">Publish</button>
                    <button type="button" className="btn-cancel" onClick={() => navigate("/")}>Cancel</button>
                </div>
            </form>
            </div>
        </div>
    );
}

export default BlogCreate;
