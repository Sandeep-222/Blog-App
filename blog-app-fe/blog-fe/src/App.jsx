import { BrowserRouter as Router ,Routes , Route } from 'react-router-dom'
import './App.css'
import BlogList from './pages/BlogList'
import Register from './pages/Register'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import BlogView from './pages/BlogView'
import NotFound from './pages/NotFound'
import BlogCreate from './pages/BlogCreate'
import { UserProvider } from './components/UserContext'
import UserBlogs from './pages/UserBlogs'
import EditBlog from './pages/EditBlog'



function App() {


  return (
    <>
      <UserProvider>
        <Router>
        <Routes>
          <Route path='/' element={
            <ProtectedRoute>
               < BlogList/>
            </ProtectedRoute>
          }/>
          <Route path='/register' element={< Register />} />
          <Route path='/login' element={< Login />} />
          <Route path='/blog/:id' element={ 
            <ProtectedRoute>
               < BlogView />
            </ProtectedRoute>
          } />
          <Route path='*' element={< NotFound />} />
          <Route path='/blog/create' element={
            <ProtectedRoute>
              < BlogCreate />
            </ProtectedRoute>
          } />
          <Route path='/user/blogs' element={< UserBlogs />} />
          < Route path='/edit-blog/:id' element={
            <ProtectedRoute>
              <EditBlog />
            </ProtectedRoute>
          } />
        </Routes>
        </Router>
      </UserProvider>
      
    </>
  )
}

export default App;
