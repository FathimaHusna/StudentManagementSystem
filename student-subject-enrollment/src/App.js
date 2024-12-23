import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddEnrollment from "./components/AddEnrollment";
import EnrollmentList from "./components/EnrollmentList";
import "./App.css"; // Import custom styles
import HomePage from "./components/HomePage";


function App() {
  return (
    <Router>
      <div className="App">
       
      
        <div className="container mt-4">
          <Routes>
      
         
            <Route path="/" element={<HomePage/>} />
            <Route path="/add-enrollment" element={<AddEnrollment />} />
            <Route path="/enrollment-list" element={<EnrollmentList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
