import React, { useEffect, useState } from 'react';
import { useParams,  Link } from 'react-router-dom';
import axios from "axios";
import './JobOffer.css';

function JobOffer() {
    const { id } = useParams(); // Get the job offer ID from the URL
    
    const [offreEmploi, setOffreEmploi] = useState({});
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:3001/recruiter/byId/${id}`).then((response) => {
            setOffreEmploi(response.data);
        });

        // Check if the user has already liked the offer
        axios.get(`http://localhost:3001/interest/check/${id}`, {
            headers: { accessToken: sessionStorage.getItem('accessToken') }
        }).then((response) => {
            setLiked(response.data.liked);
        });
    }, [id]);

    const handleLike = () => {
        axios.post("http://localhost:3001/interest", { OfferId: id }, {
            headers: { accessToken: sessionStorage.getItem('accessToken') }
        })
        .then((response) => {
            setLiked(response.data.liked);
        })
        .catch((error) => {
            console.error("Erreur lors de la manifestation d'intérêt :", error);
            if (error.response && error.response.data && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert("Échec de la manifestation d'intérêt.");
        }
        });
    };

    return (
        <div>
            <Link to="/jobseeker" className="backButton">
                Accueil
            </Link>
            <div className="jobOfferContainer2">
                <div className="jobOfferDetail"><strong>Nom de l'entreprise :</strong> {offreEmploi.nomEntreprise}</div>
                <div className="jobOfferDetail"><strong>Adresse :</strong> {offreEmploi.address}</div>
                <div className="jobOfferDetail"><strong>Ville :</strong> {offreEmploi.city}</div>
                <div className="jobOfferDetail"><strong>Poste :</strong> {offreEmploi.poste}</div>
                <div className="jobOfferDetail"><strong>Description :</strong> {offreEmploi.description}</div>
                <div className="jobOfferDetail"><strong>Expérience :</strong> {offreEmploi.experience}</div>
                <div className="jobOfferDetail"><strong>Formation :</strong> {offreEmploi.formations}</div>
                <div className="jobOfferDetail"><strong>Compétences :</strong> {offreEmploi.skills}</div>
                <div className="jobOfferDetail"><strong>Langues :</strong> {offreEmploi.langues}</div>
                <button onClick={handleLike} className="likeButton">
                    {liked ? 'Unlike' : 'Like'}
                </button>
            </div>
        </div>
    );
}

export default JobOffer;