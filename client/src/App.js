import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import RecruiterHome from "./recruiterpages/Home";
import JobSeekerHome from "./jobseekerpages/Home";
import CreateCV from "./jobseekerpages/form";
import CreateJobOffer from "./recruiterpages/form";
import JobOffer from "./jobseekerpages/JobOffer";
import CV from "./recruiterpages/cvs";
import LandingPage from "./LandingPage/LandingPage";
import RegisterJobSeeker from "./authJobSeeker/RegisterJobSeeker";
import LoginJobSeeker from "./authJobSeeker/LoginJobSeeker";
import LoginRecruiter from "./AuthRecruiter/LoginRecruiter";
import RegisterRecruiter from "./AuthRecruiter/RegisterRecruiter";
import AccountRecruiter from "./recruiterpages/account";
import AccountJobSeeker from "./jobseekerpages/account";
import OfferInterested from "./recruiterpages/OfferInterested";
import AdminAccount from "./Admin/Account";
import AdminLogin from "./Admin/AdminLogin";
import AdminOffers from "./Admin/AdminOffers";
import AdminCV from "./Admin/AdminCV";
import AddInterview from "./recruiterpages/AddInterview";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import MyApplications from "./jobseekerpages/MyApplications";
import ViewInterview from "./components/ViewInterview";
import InterviewsGrid from "./components/InterviewsGrid";

function App() {
  return (
    <div className="App">
      <HelmetProvider>
        <Helmet>
          <title>JobConnect</title>
        </Helmet>
        <Router>
          <Routes>
            <Route path="/recruiter" element={<AccountRecruiter />} />
            <Route path="/jobseeker" element={<JobSeekerHome />} />
            <Route path="/createCV" element={<CreateCV />} />
            <Route path="/CreateJobOffer" element={<CreateJobOffer />} />
            <Route path="/jobOffer/:id" element={<JobOffer />} />
            <Route path="/CV/:id" element={<CV />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/authjobseeker" element={<RegisterJobSeeker />} />
            <Route path="/authjobseeker/login" element={<LoginJobSeeker />} />
            <Route path="/authrecruiter" element={<RegisterRecruiter />} />
            <Route path="/authrecruiter/login" element={<LoginRecruiter />} />
            <Route path="/accountjobseeker" element={<AccountJobSeeker />} />
            <Route path="/OfferInterested/:id" element={<OfferInterested />} />
            <Route path="/OfferInterested/:id" element={<OfferInterested />} />
            <Route path="/recruiter/interview/:interestId" element={<AddInterview />} />       
            <Route path="/recruiter/interview/view/:id" element={<ViewInterview />} />       
<Route path="/recruiter/offers/:offerId/interviews" element={<InterviewsGrid />} />

            {/* Job Seeker Routes */}

            <Route path="/my-applications" element={<MyApplications />} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/account" element={<AdminAccount />} />
            <Route path="/admin/offres" element={<AdminOffers />} />
            <Route path="/admin/cv" element={<AdminCV />} />
          </Routes>
        </Router>
      </HelmetProvider>
    </div>
  );
}

export default App;
