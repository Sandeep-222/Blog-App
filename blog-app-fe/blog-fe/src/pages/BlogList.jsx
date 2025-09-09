import { useEffect, useState } from "react";
import api from "../api";
import BlogItem from "../components/BlogItem";
import { useNavigate,Link,Navigate } from "react-router-dom";
import '../styles/BlogList.css'
import AddButton from "../components/AddButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useUserName } from "../components/UserContext";
import { ACCESS_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
    const { userName,setUserName } = useUserName();


    const getBlogs = async () => {
        try {
            const res = await api.get('/api/posts/');
            setBlogs(res.data);
        } catch (error) {
            alert(error);
        }
    };

    const getUsername = async () => {
        console.log("get user called")
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            console.warn("No token found");
            return;
        }
        try {
            const decoded = jwtDecode(token);
            const id = decoded.user_id
            const res = await api.get(`/api/users/${id}/`);
            const username = res.data.username;
            setUserName( username || "Guest" );
        } catch (error) {
            console.error("Error decoding token:", error);
            setUserName("Guest");
        }
    };
    useEffect(() => {
        getBlogs();
        getUsername();

    }, []);

    const handleUserClick = () => {
        navigate("/user/blogs");
    };
    
    const handleLogout = () => {
        localStorage.clear()
        navigate('/login')
    }


    return (
        <div className="bloglist-container-main">
            <div className="header-bar w-full">
                <p className="welcome-msg">Welcome {userName} !!</p>
                <u className="mr-[50px]">Explore Stories</u>
                <div className="header-actions">
                    <button className="user-btn" onClick={handleUserClick}> <FontAwesomeIcon icon={faUser}/></button>
                
                    <button className="logout-btn" onClick={handleLogout}>Logout < FontAwesomeIcon icon={faRightFromBracket} /></button>
                </div>
            </div>
            <div className="bloglist-container">
            <main className="bloglist-main1">
                {blogs.length === 0 ? (
                    <div className="bloglist-empty">No blogs found.</div>
                ) : (
                    blogs.map((blog, index) => (
                        <div key={index} className="bloglist-item">
                            <BlogItem blog={blog} />
                        </div>
                    ))
                )}
            </main>
            <div className="Add-button">
                <Link to={'/blog/create'}>
                    < AddButton />
                </Link>
            </div>
            </div>
        </div>
        
    );
};

export default BlogList;
