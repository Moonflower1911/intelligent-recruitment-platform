import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./form.css";

function CreateCV() {
  const navigate = useNavigate();

  const initialValues = {
    nom: "",
    prenom: "",
    email: "",
    phoneNumber: "",
    address: "",
    formations: "",
    experiences: "",
    projetsAcademiques: "",
    langues: "",
    langages: "",
    logiciels: "",
  };

  const validationSchema = Yup.object().shape({
    nom: Yup.string().required("Le nom est obligatoire"),
    prenom: Yup.string().required("Le prénom est obligatoire"),
    email: Yup.string()
      .email("Format d'email invalide")
      .required("L'email est obligatoire"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Le numéro de téléphone doit contenir exactement 10 chiffres")
      .required("Le numéro de téléphone est obligatoire"),
    address: Yup.string().required("L'adresse est obligatoire"),
    formations: Yup.string().required("Les formations sont obligatoires"),
    experiences: Yup.string().required("Les expériences sont obligatoires"),
    projetsAcademiques: Yup.string().required("Les projets académiques sont obligatoires"),
    langues: Yup.string().required("Les langues sont obligatoires"),
    langages: Yup.string(),
    logiciels: Yup.string(),
  });

  const onSubmit = async (data, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/jobseeker",
        data,
        {
          headers: {
            accessToken: sessionStorage.getItem("accessToken"),
          },
        }
      );
      console.log("Response: ", response.data);
      if (response.data.error) {
        // Check if the error message indicates a duplicate resume
        if (response.data.error.includes("already has a resume")) {
          alert("Vous avez déjà un CV. Vous ne pouvez pas en créer un autre.");
        } else {
          alert(response.data.error);
        }
      } else {
        navigate("/accountjobseeker"); // Redirect to the account job seeker page
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire!", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form4">
      <div className="homeR4">
        <Link to="/jobseeker" className="backButton4">
          Accueil
        </Link>
        <div className="resumeContainer4">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <label>Nom :</label>
                <ErrorMessage name="nom" component="span" className="error4" />
                <Field
                  id="inputNomCandidat"
                  name="nom"
                  placeholder="(Ex. Zuckerberg..)"
                />

                <label>Prénom :</label>
                <ErrorMessage name="prenom" component="span" className="error4" />
                <Field
                  id="inputPrenomCandidat"
                  name="prenom"
                  placeholder="(Ex. Mark..)"
                />

                <label>Email :</label>
                <ErrorMessage name="email" component="span" className="error4" />
                <Field
                  id="inputEmailCandidat"
                  name="email"
                  placeholder="(Ex. Mark@gmail.com)"
                />

                <label>Numéro de téléphone :</label>
                <ErrorMessage name="phoneNumber" component="span" className="error4" />
                <Field
                  id="inputPhoneNumberCandidat"
                  name="phoneNumber"
                  placeholder="(Ex. 060000000)"
                />

                <label>Adresse :</label>
                <ErrorMessage name="address" component="span" className="error4" />
                <Field
                  id="inputAddress"
                  name="address"
                  placeholder="(Ex. 123 Main St..)"
                />

                <label>Formation :</label>
                <ErrorMessage name="formations" component="span" className="error4" />
                <Field
                  id="inputFormation"
                  name="formations"
                  placeholder="(Ex. Développement d'applications web...)"
                />

                <label>Expérience :</label>
                <ErrorMessage name="experiences" component="span" className="error4" />
                <Field
                  id="inputExperience"
                  name="experiences"
                  placeholder="(Ex. 3 ans)"
                />

                <label>Projets académiques :</label>
                <ErrorMessage name="projetsAcademiques" component="span" className="error4" />
                <Field
                  id="inputProjetsAcademiques"
                  name="projetsAcademiques"
                  placeholder="(Ex. Licence en Informatique)"
                />

                <label>Langues :</label>
                <ErrorMessage name="langues" component="span" className="error4" />
                <Field
                  id="inputLangues"
                  name="langues"
                  placeholder="(Ex. Français, Anglais, Arabe...)"
                />

                <label>Langages :</label>
                <ErrorMessage name="langages" component="span" className="error4" />
                <Field
                  id="inputLangages"
                  name="langages"
                  placeholder="(Ex. JavaScript, Python, HTML...)"
                />

                <label>Logiciels :</label>
                <ErrorMessage name="logiciels" component="span" className="error4" />
                <Field
                  id="inputLogiciels"
                  name="logiciels"
                  placeholder="(Ex. Excel, Matlab...)"
                />
                <button type="submit" disabled={isSubmitting}>
                  Publier le CV
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default CreateCV;