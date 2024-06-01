import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import RecruiterHome from "./recruiterpages/Home";
import JobSeekerHome from "./jobseekerpages/Home";
import CreateCV from './jobseekerpages/form';
import CreateJobOffer from './recruiterpages/form';
import JobOffer from './jobseekerpages/JobOffer';
import CV from './recruiterpages/cvs';
import LandingPage from './LandingPage/LandingPage';
import RegisterJobSeeker from './authJobSeeker/RegisterJobSeeker';
import LoginJobSeeker from './authJobSeeker/LoginJobSeeker';
import LoginRecruiter from './AuthRecruiter/LoginRecruiter';
import RegisterRecruiter from './AuthRecruiter/RegisterRecruiter';
import AccountRecruiter from './recruiterpages/account';
import AccountJobSeeker from './jobseekerpages/account';
import OfferInterested from './recruiterpages/OfferInterested';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/recruiter" element={<AccountRecruiter />} />
          <Route path="/jobseeker" element={<JobSeekerHome />} />
          <Route path="/createCV" element={<CreateCV />} />
          <Route path="/CreateJobOffer" element={<CreateJobOffer />} />
          <Route path="/jobOffer/:id" element={<JobOffer />} />
          <Route path="/CV/:id" element={<CV />} />
          <Route path="/landingpage" element={<LandingPage/>} />
          <Route path="/authjobseeker" element={<RegisterJobSeeker/>} />
          <Route path="/authjobseeker/login" element={<LoginJobSeeker/>} />
          <Route path="/authrecruiter" element={<RegisterRecruiter/>} />
          <Route path="/authrecruiter/login" element={<LoginRecruiter/>} />      
          <Route path="/accountjobseeker" element={<AccountJobSeeker/>} />
          <Route path="/OfferInterested/:id" element={<OfferInterested />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
