import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './Home.css';

function JobSeekerHome() {
  const [listOfRecruiters, setListOfRecruiters] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/recruiter").then((response) => {
      setListOfRecruiters(response.data);
    });
  }, []);

  return (
    <div className="Home1">
      <header className="CvNavbar">
        <Link to="/accountjobseeker">Mon compte</Link>
      </header>
      <div className="container1">
        <div className="jobOffers1">
          {listOfRecruiters.map((value, key) => (
            <div
              className="jobOffer1"
              key={key}
              onClick={() => navigate(`/jobOffer/${value.id}`)}
            >
              <div className="personalInfo">
                <div className="nomEntreprise"> {value.nomEntreprise}</div>
                <div className="address"> {value.address} </div>
                <div className="city"> {value.City} </div>
              </div>
              <div className="body">
                <div className="poste"> {value.poste}</div>
                <div className="description"> {value.description}</div>
                <div className="experience"> {value.experience}</div>
                <div className="formations"> {value.formations}</div>
                <div className="skills"> {value.skills}</div>
                <div className="keywords"> {value.keywords}</div>
                <div className="langues"> {value.langues}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobSeekerHome;
