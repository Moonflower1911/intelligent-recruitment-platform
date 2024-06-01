import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AccountJobSeeker.css'; // Verify this path matches your CSS file

function AccountJobSeeker() {
    const [userData, setUserData] = useState(null);
    const [resumes, setResumes] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("accessToken");
        if (token) {
            setIsLoggedIn(true);
            axios.get('http://localhost:3001/jobseeker/account', {
                headers: {
                    accessToken: token,
                }
            })
            .then((response) => {
                if (response.data.error) {
                    console.error(response.data.error);
                } else {
                    setUserData(response.data.user);
                    setResumes(response.data.resume); // Ensure the property name matches what the backend sends
                }
            })
            .catch((error) => {
                console.error("There was an error fetching the user data!", error);
            });
        }
    }, []);

    const createResume = async () => {
        try {
            // Check if user already has a CV
            const response = await axios.get('http://localhost:3001/jobseeker/account', {
                headers: {
                    accessToken: sessionStorage.getItem("accessToken"),
                }
            });

            if (response.data.resume.length > 0) {
                const confirmDelete = window.confirm('Vous avez déjà un CV. Voulez-vous le remplacer ?');

                if (confirmDelete) {
                    // Delete existing resume
                    const existingResumeId = resumes.find(resume => resume.UserJobSeekerId === userData.id)?.id;
                    if (existingResumeId) {
                        deleteResume(existingResumeId);
                    }
                }
            } else {
                navigate('/createCV'); // Redirect to create CV page
            }
        } catch (error) {
            console.error('Error checking if user has CV:', error);
        }
    };

    
    const deleteResume = (id) => {
        if (window.confirm("Are you sure you want to delete this resume?")) {
            axios.delete(`http://localhost:3001/jobseeker/${id}`, {
                headers: {
                    accessToken: sessionStorage.getItem("accessToken"),
                }
            }).then((response) => {
                if (response.data.error) {
                    console.error(response.data.error);
                } else {
                    setResumes(resumes.filter((resume) => resume.id !== id));
                }
            }).catch((error) => {
                console.error("There was an error deleting the job resume!", error);
            });
        }
    };

    const logout = () => {
        sessionStorage.removeItem("accessToken");
        setIsLoggedIn(false);
        setUserData(null);
        setResumes([]);
        navigate('/authjobseeker/login'); // Redirect to login page after logout
    };

    if (!isLoggedIn) {
        return (
            <div>
                <h1>Mon Compte</h1>
                <button onClick={() => navigate('/authjobseeker/login')}>Login</button>
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
            <div className="resumes">
                <h2>Mes CVs</h2>
                {resumes.map((resume, index) => (
                    <div className="resume" key={index}>
                        <h3>{resume.poste}</h3>
                        <p><strong>Nom :</strong> {resume.nom}</p>
                        <p><strong>Prénom :</strong> {resume.prenom}</p>
                        <p><strong>Email:</strong> {resume.email}</p>
                        <p><strong>Numéro:</strong> {resume.phoneNumber}</p>
                        <p><strong>Adresse:</strong> {resume.address}</p>
                        <p><strong>Formations:</strong> {resume.formations}</p>                        
                        <p><strong>Expérience:</strong> {resume.experiences}</p>
                        <p><strong>Projets académiques:</strong> {resume.projetsAcademiques}</p>
                        <p><strong>Langues:</strong> {resume.langues}</p>
                        <p><strong>Langages:</strong> {resume.langages}</p>
                        <p><strong>Logiciels:</strong> {resume.logiciels}</p>
                        
                        <button onClick={() => deleteResume(resume.id)} className="deleteButton">Supprimer</button>
                    </div>
                ))}
                <button onClick={createResume}>Créer un nouveau CV</button>
            </div>
        </div>
    );
}

export default AccountJobSeeker;
