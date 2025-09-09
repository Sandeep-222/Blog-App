import { useEffect, useState } from "react";
import api from "../api";
import UserBlogItem from "../components/UserBlogItem";
import '../styles/UserBlogs.css'
import {  useNavigate } from "react-router-dom";

function UserBlogs(){
    const navigate = useNavigate();
    const [ blogs, setBlogs ] = useState([])
    const username = localStorage.getItem('username');

    const goHome = () => {
        navigate('/');        
    }

    const getBlogs = async () => {
        try {
            console.log(`api/users/${username}/posts/`)
            const res = await api.get(`/api/users/${username}/posts/`);
            setBlogs(res.data);
            console.log(res.data);
        } catch (error) {
            alert(error);
        }
    };
    useEffect(()=>{
        getBlogs();
    },[username])

     return (
        
        <div className="bloglist-container-main">
            <div className="header-bar">
                <u>Your Blogs</u>
                <button className="home-button" onClick={goHome}>Home</button>
            </div>
            <div className="bloglist-container">
            <main className="bloglist-main">
                {blogs.length === 0 ? (
                    <div className="bloglist-empty">No blogs found.</div>
                ) : (
                    blogs.map((blog, index) => (
                        <div key={index} className="bloglist-item">
                            <UserBlogItem blog={blog} />
                        </div>
                    ))
                )}
            </main>
            </div>
        </div>
        
    );
}

export default UserBlogs;
