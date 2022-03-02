import './App.scss';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./auth/Login"
import Blog from './Blog';
import Header from './Header';
import NewPost from './NewPost';
import BlogPost from './BlogPost';

function App() {
  return (
    <div className="app">
      <div className="app__container">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Blog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/post" element={<NewPost />} />
            <Route path="/:id" element={<BlogPost />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
