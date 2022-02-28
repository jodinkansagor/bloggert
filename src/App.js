import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./auth/Login"
import Register from './auth/Register';
import Dashboard from './auth/Dashboard';
import Header from './Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
