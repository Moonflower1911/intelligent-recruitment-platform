import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Resumes from './pages/Recruiter/Resumes';
import Offers from './pages/JobSeeker/Offers';
import CreateResume from './pages/JobSeeker/CreateResume';
import CreateOffer from './pages/Recruiter/CreateOffer';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/resumes' element={<Resumes />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/createresume' element={<CreateResume />} />
          <Route path='/createoffer' element={<CreateOffer />} />
           
        </Routes>
      </Router>
    </div>
  );
}


export default App;
