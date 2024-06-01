import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Home() {
    const [listOfJobSeekerForms, setListOfJobSeekerForms] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        const fetchInterestedJobSeekers = async () => {
            const accessToken = sessionStorage.getItem("accessToken");
            console.log(accessToken);
            try {
                const response = await axios.get('http://localhost:3001/interest', {
                    headers: {
                        accessToken: accessToken
                    }
                });
                setListOfJobSeekerForms(response.data); // Update state with response.data
            } catch (error) {
                console.error("Error fetching interested job seekers:", error);
            }
        };

        fetchInterestedJobSeekers();
    }, []);

    return (
        <div>
            <div className="jobNavbar">
                <Link to='/accountRecruiter'>Mon compte</Link>
            </div>
            {listOfJobSeekerForms.map((value, key) => (
                <div className="jobseekerPost" onClick={() => { navigate(`/CV/${value.id}`); }} key={key}>
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
                        <div className="projetsAcademiques"> {value.projetsAcademiques}</div>
                    </div>
                    <div className="skills">
                        <div className="langues"> {value.langues}</div>
                        <div className="langages"> {value.langages}</div>
                        <div className="logiciels"> {value.logiciels}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;
