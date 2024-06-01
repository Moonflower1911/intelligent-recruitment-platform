import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AccountRecruiter.css';

function AccountRecruiter() {
    const [userData, setUserData] = useState(null);
    const [jobOffers, setJobOffers] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("accessToken");
        if (token) {
            setIsLoggedIn(true);
            axios.get('http://localhost:3001/recruiter/account', {
                headers: {
                    accessToken: token,
                }
            })
            .then((response) => {
                if (response.data.error) {
                    console.error(response.data.error);
                } else {
                    setUserData(response.data.user);
                    setJobOffers(response.data.jobOffers);
                }
            })
            .catch((error) => {
                console.error("There was an error fetching the user data!", error);
            });
        }
    }, []);

    const deleteJobOffer = (id) => {
        if (window.confirm("Are you sure you want to delete this job offer?")) {
            axios.delete(`http://localhost:3001/recruiter/${id}`, {
                headers: {
                    accessToken: sessionStorage.getItem("accessToken"),
                }
            }).then((response) => {
                if (response.data.error) {
                    console.error(response.data.error);
                } else {
                    setJobOffers(jobOffers.filter((offer) => offer.id !== id));
                }
            }).catch((error) => {
                console.error("There was an error deleting the job offer!", error);
            });
        }
    };

    const logout = () => {
        sessionStorage.removeItem("accessToken");
        setIsLoggedIn(false);
        setUserData(null);
        setJobOffers([]);
        navigate('/authrecruiter/login'); // Redirect to login page after logout
    };

    if (!isLoggedIn) {
        return (
            <div>
                <h1>Mon Compte</h1>
                <button onClick={() => navigate('/authrecruiter/login')}>Login</button>
            </div>
        );
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Mon Compte</h1>
            {isLoggedIn && <button onClick={logout}>Logout</button>}
            <div className="userInfo">
                <p>Username: {userData.username}</p>
                <p>User ID: {userData.id}</p>
            </div>
            <div className="jobOffers">
                <h2>Mes Offres d'emploi</h2>
                {jobOffers.map((offer, index) => (
                    <div className="jobOffer" key={index}>
                        <p><strong>Nom de l'Entreprise:</strong> {offer.nomEntreprise}</p>
                        <p><strong>Adresse:</strong> {offer.address}</p>
                        <p><strong>Ville:</strong> {offer.city}</p>
                        <p><strong>Description:</strong> {offer.poste}</p>
                        <p><strong>Poste:</strong> {offer.description}</p>
                        <p><strong>Expérience:</strong> {offer.experience}</p>
                        <p><strong>Formations:</strong> {offer.formations}</p>
                        <p><strong>Compétences:</strong> {offer.skills}</p>
                        <p><strong>Mots-clés:</strong> {offer.keywords}</p>
                        <p><strong>Langues:</strong> {offer.langues}</p>
                        <button onClick={() => deleteJobOffer(offer.id)} className="deleteButton">Supprimer</button>          
                    </div>
                ))}
                <button onClick={() => navigate('/createJobOffer')}>Créer une nouvelle offre d'emploi</button>
            </div>
        </div>
    );
}

export default AccountRecruiter;
