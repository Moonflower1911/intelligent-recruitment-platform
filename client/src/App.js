import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecruiterHome from "./recruiterpages/Home";
import JobSeekerHome from "./jobseekerpages/Home";
import CreateCV from './jobseekerpages/form';
import CreateJobOffer from './recruiterpages/form';
import JobOffer from './jobseekerpages/JobOffer';
import CV from './recruiterpages/cvs';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/recruiter" element={<RecruiterHome />} />
          <Route path="/jobseeker" element={<JobSeekerHome />} />
          <Route path="/createCV" element={<CreateCV />} />
          <Route path="/CreateJobOffer" element={<CreateJobOffer />} />
          <Route path="/jobOffer/:id" element={<JobOffer />} />
          <Route path="/CV/:id" element={<CV />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
