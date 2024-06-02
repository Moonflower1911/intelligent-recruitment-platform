import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import './JobOffer.css';

function JobOffer() {
    let { id } = useParams();
    const [offreEmploi, setOffreEmploi] = useState({});
    const [hasShownInterest, setHasShownInterest] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/recruiter/byId/${id}`).then((response) => {
            setOffreEmploi(response.data);
        });

        const accessToken = sessionStorage.getItem("accessToken");
        axios.get(`http://localhost:3001/interest/${id}`, {
            headers: {
                accessToken: accessToken
            }
        }).then((response) => {
            setHasShownInterest(response.data.hasInterest);
        }).catch((error) => {
            console.error("Erreur lors de la vérification de l'intérêt :", error);
        });
    }, [id]);

    const montrerInteret = async () => {
        const accessToken = sessionStorage.getItem("accessToken");

        try {
            await axios.post("http://localhost:3001/interest", { OfferId: id }, {
                headers: {
                    accessToken: accessToken
                }
            });
            alert("Intérêt manifesté avec succès !");
            setHasShownInterest(true);
        } catch (error) {
            console.error("Erreur lors de la manifestation d'intérêt :", error);
            if (error.response && error.response.data && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert("Échec de la manifestation d'intérêt.");
            }
        }
    };

    const retirerInteret = async () => {
        const accessToken = sessionStorage.getItem("accessToken");

        try {
            await axios.delete(`http://localhost:3001/interest/${id}`, {
                headers: {
                    accessToken: accessToken
                }
            });
            alert("Intérêt retiré avec succès !");
            setHasShownInterest(false);
        } catch (error) {
            console.error("Erreur lors du retrait de l'intérêt :", error);
            if (error.response && error.response.data && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert("Échec du retrait de l'intérêt.");
            }
        }
    };

    return (
        <div>
            <Link to="/jobseeker" className="backButton">
                Accueil
            </Link>
            <div className="jobOfferContainer2">
                <div className="jobOfferDetail"><strong>Nom de l'entreprise :</strong> {offreEmploi.nomEntreprise}</div>
                <div className="jobOfferDetail"><strong>Adresse :</strong> {offreEmploi.address}</div>
                <div className="jobOfferDetail"><strong>Ville :</strong> {offreEmploi.City}</div>
                <div className="jobOfferDetail"><strong>Poste :</strong> {offreEmploi.poste}</div>
                <div className="jobOfferDetail"><strong>Description :</strong> {offreEmploi.description}</div>
                <div className="jobOfferDetail"><strong>Expérience :</strong> {offreEmploi.experience}</div>
                <div className="jobOfferDetail"><strong>Formation :</strong> {offreEmploi.formations}</div>
                <div className="jobOfferDetail"><strong>Compétences :</strong> {offreEmploi.skills}</div>
                <div className="jobOfferDetail"><strong>Mots-clés :</strong> {offreEmploi.keywords}</div>
                <div className="jobOfferDetail"><strong>Langues :</strong> {offreEmploi.langues}</div>

                {hasShownInterest ? (
                    <button onClick={retirerInteret} className="showInterestButton">Retirer mon intérêt</button>
                ) : (
                    <button onClick={montrerInteret} className="showInterestButton">Je suis intéressé</button>
                )}
            </div>
        </div>
    );
}

export default JobOffer;
