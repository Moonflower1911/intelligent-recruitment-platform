// AccountRecruiter.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AccountRecruiter.css';

function AccountRecruiter() {
    const [userData, setUserData] = useState(null);
    const [jobOffers, setJobOffers] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/recruiter/account', {
            headers: {
                accessToken: sessionStorage.getItem("accessToken"),
            }
        }).then((response) => {
            if (response.data.error) {
                console.error(response.data.error);
            } else {
                setUserData(response.data.user);
                setJobOffers(response.data.jobOffers);
            }
        }).catch((error) => {
            console.error("There was an error fetching the user data!", error);
        });
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Mon Compte</h1>
            <div className="userInfo">
                <p>Username: {userData.username}</p>
                <p>User ID: {userData.id}</p>
            </div>
            <div className="jobOffers">
                <h2>Mes Offres d'emploi</h2>
                {jobOffers.map((offer, index) => (
                    <div className="jobOffer" key={index}>
                        <h3>{offer.poste}</h3>
                        <p><strong>Nom de l'Entreprise:</strong> {offer.nomEntreprise}</p>
                        <p><strong>Adresse:</strong> {offer.address}</p>
                        <p><strong>Ville:</strong> {offer.city}</p>
                        <p><strong>Description:</strong> {offer.description}</p>
                        <p><strong>Expérience:</strong> {offer.experience}</p>
                        <p><strong>Formations:</strong> {offer.formations}</p>
                        <p><strong>Compétences:</strong> {offer.skills}</p>
                        <p><strong>Mots-clés:</strong> {offer.keywords}</p>
                        <p><strong>Langues:</strong> {offer.langues}</p>
                    </div>
                ))}
                <button onClick={() => navigate('/createJobOffer')}>Créer une nouvelle offre d'emploi</button>
            </div>
        </div>
    );
}

export default AccountRecruiter;
