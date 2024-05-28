import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

function CreateJobOffer() {
  const initialValue = {
    
  }
  return (
    <div>
      <Link to="/recruiter">Go Back to Home</Link>
      <div class="jobOfferContainer">
        <Formik>
          <Form>
            <label>Nom de l'entreprise : </label>
            <Field
              id="inputNomEntreprise"
              name="NomEntreprise"
              placeholder="(Ex.ABC Corporation..)"
            />
            <label>Address :</label>
            <Field
              id="inputAddress"
              name="address"
              placeholder="(Ex. 123 Main St..)"
            />
            <label>Ville :</label>
            <Field id="inputCity" name="city" placeholder="(Ex. New York)" />

            <label>Poste :</label>
            <Field
              id="inputPoste"
              name="poste"
              placeholder="(Ex. Software Engineer)"
            />

            <label>Description :</label>
            <Field
              id="inputDescription"
              name="description"
              placeholder="(Ex. Responsible for developing web applications...)"
            />

            <label>Experience :</label>
            <Field
              id="inputExperience"
              name="experience"
              placeholder="(Ex. 3 years)"
            />

            <label>Formations :</label>
            <Field
              id="inputFormations"
              name="formations"
              placeholder="(Ex. Bachelor's degree in Computer Science)"
            />

            <label>Compétences :</label>
            <Field
              id="inputSkills"
              name="skills"
              placeholder="(Ex. JavaScript, React, Node.js)"
            />

            <label>Keywords :</label>
            <Field
              id="inputKeywords"
              name="keywords"
              placeholder="(Optional)"
            />

            <label>Langues :</label>
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
  );
}

export default CreateJobOffer;
