import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Home() {

    const [listOfJobSeekerForms, setListOfJobSeekerForms] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/jobseeker").then((response) => {
            setListOfJobSeekerForms(response.data);
        });
    }, []);

    return (
        <div>
            <div className="jobNavbar">
                <Link to='/accountRecruiter'>Mon compte</Link>
            </div>
            {listOfJobSeekerForms.map((value, key) => {
                return (
                    <div className="jobseekerPost" onClick={() => { navigate(`/CV/${value.id}`); }}
                        key={key} >
                        <div className="personalInfo">
                            <div className="nom"> {value.nom}</div>
                            <div className="prenom"> {value.prenom} </div>
                            <div className="email"> {value.email} </div>
                            <div className="phoneNumber"> {value.phoneNumber} </div>
                            <div className="address"> {value.address} </div>
                        </div>
                        <div className="body">
                            <div className="formations"> {value.formations}</div>
                            <div className="experiences"> {value.experiences}</div>
                            <div className="projetsAcademiques">
                                {" "}
                                {value.projetsAcademiques}
                            </div>
                        </div>
                        <div className="skills">
                            <div className="langues"> {value.langues}</div>
                            <div className="langages"> {value.langages}</div>
                            <div className="logiciels"> {value.logiciels}</div>
                        </div>

                        <div className="body"></div>
                    </div>
                );
            })}
        </div>
    );
}

export default Home;