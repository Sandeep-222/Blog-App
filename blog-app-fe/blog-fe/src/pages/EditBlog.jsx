import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";
import "../styles/EditBlog.css";

function EditBlog() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ title: "", content: "" });

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await api.get(`/api/posts/${id}/`);
                setFormData({
                    title: response.data.title,
                    content: response.data.content,
                });
            } catch (error) {
                alert("Error fetching blog data: " + error.message);
            }
        };
        fetchBlog();
    },[]);

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/api/posts/${id}/`, formData);
            alert("Blog updated successfully");
            navigate(`/user/blogs`);
        } catch (error) {
            alert("Error updating blog: " + error.message);
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/api/posts/${id}/`);
            alert("Blog deleted successfully");
            navigate(`/user/blogs`);
        } catch (error) {
            alert("Error deleting blog: " + error.message);
        }
    };

    return (
        <div className="edit-blog-container">
            <h1 className="edit-blog-title">Edit Blog</h1>
            <form className="edit-blog-form" onSubmit={handleEdit}>
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                        }
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Content:</label>
                    <textarea
                        value={formData.content}
                        onChange={(e) =>
                            setFormData({ ...formData, content: e.target.value })
                        }
                        rows={8}
                        required
                    />
                </div>
                <div className="form-buttons">
                    <button type="submit" className="btn update-btn">Update</button>
                    <button type="button" className="btn delete-btn" onClick={handleDelete}>Delete</button>
                    <button type="button" className="btn cancel-btn" onClick={() => navigate("/user/blogs")}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default EditBlog;
