import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./form.css";

function CreateJobOffer() {
  const navigate = useNavigate();

  const initialValues = {
    nomEntreprise: "",
    address: "",
    city: "",
    poste: "",
    description: "",
    experience: "",
    formations: "",
    skills: "",
    keywords: "",
    langues: "",
  };

  const validationSchema = Yup.object().shape({
    nomEntreprise: Yup.string().required("Ce champs est requis"),
    address: Yup.string().required("Ce champs est requis"),
    city: Yup.string().required("Ce champs est requis"),
    poste: Yup.string().required("Ce champs est requis"),
    description: Yup.string().required("Ce champs est requis"),
    experience: Yup.string().required("Ce champs est requis"),
    formations: Yup.string().required("Ce champs est requis"),
    skills: Yup.string().required("Ce champs est requis"),
    keywords: Yup.string().required("Ce champs est requis"),
    langues: Yup.string().required("Ce champs est requis"),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/recruiter",
        data,
        {
          headers: {
            accessToken: sessionStorage.getItem("accessToken"),
          },
        }
      );
      console.log("Response: ", response.data);
      if (response.data.error) {
        alert(response.data.error);
      } else {
        navigate("/recruiter");
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  return (
    <body className="form8">
      <div className="homeR8">
        <Link to="/recruiter" className="backButton8">
          Accueil
        </Link>
        <div className="jobOfferContainer8">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              <label>Nom de l'entreprise : </label>
              <ErrorMessage name="nomEntreprise" component="span" />
              <Field
                id="inputNomEntreprise"
                name="nomEntreprise"
                placeholder="(Ex.ABC Corporation..)"
              />
              <label>Address :</label>
              <ErrorMessage name="address" component="span" />
              <Field
                id="inputAddress"
                name="address"
                placeholder="(Ex. 123 Main St..)"
              />
              <label>Ville :</label>
              <ErrorMessage name="city" component="span" />
              <Field id="inputCity" name="city" placeholder="(Ex. New York)" />

              <label>Poste :</label>
              <ErrorMessage name="poste" component="span" />
              <Field
                id="inputPoste"
                name="poste"
                placeholder="(Ex. Software Engineer)"
              />

              <label>Description :</label>
              <ErrorMessage name="description" component="span" />
              <Field
                id="inputDescription"
                name="description"
                placeholder="(Ex. Responsible for developing web applications...)"
              />

              <label>Experience :</label>
              <ErrorMessage name="experience" component="span" />
              <Field
                id="inputExperience"
                name="experience"
                placeholder="(Ex. 3 years)"
              />

              <label>Formations :</label>
              <ErrorMessage name="formations" component="span" />
              <Field
                id="inputFormations"
                name="formations"
                placeholder="(Ex. Bachelor's degree in Computer Science)"
              />

              <label>Compétences :</label>
              <ErrorMessage name="skills" component="span" />
              <Field
                id="inputSkills"
                name="skills"
                placeholder="(Ex. JavaScript, React, Node.js)"
              />

              <label>Keywords :</label>
              <ErrorMessage name="keywords" component="span" />
              <Field
                id="inputKeywords"
                name="keywords"
                placeholder="(Ex.cloud)"
              />

              <label>Langues :</label>
              <ErrorMessage name="langues" component="span" />
              <Field
                id="inputLangues"
                name="langues"
                placeholder="(Ex. French, English)"
              />
              <button type="submit"> publier l'offre d'emploi </button>
            </Form>
          </Formik>
        </div>
      </div>
    </body>
  );
}

export default CreateJobOffer;
