import './App.scss';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./auth/Login"
// import Register from './auth/Register';
import Blog from './Blog';
import Header from './Header';

function App() {
  return (
    <div className="app">
      <div className="app__container">
        <Header />
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            {/* <Route exact path="/register" element={<Register />} /> */}
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
