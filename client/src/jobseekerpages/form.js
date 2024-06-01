import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function CreateCV() {
  //const [hasCV, setHasCV] = useState(false);
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
    nom: Yup.string().required("Nom is required"),
    prenom: Yup.string().required("Prenom is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
    address: Yup.string().required("Address is required"),
    formations: Yup.string().required("Formations are required"),
    experiences: Yup.string().required("Experiences are required"),
    projetsAcademiques: Yup.string().required(
      "Projets Academiques are required"
    ),
    langues: Yup.string().required("Langues are required"),
    langages: Yup.string(),
    logiciels: Yup.string(),
  });

  const onSubmit = async (data) => {
     // Corrected variable name
    try {
      const response = await axios.post("http://localhost:3001/jobseeker", data, {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        }
      });
      console.log("Response: ", response.data);
      if (response.data.error) {
        // Check if the error message indicates a duplicate resume
        if (response.data.error.includes('already has a resume')) {

          alert('You already have a CV. You cannot create another one.');
        //setHasCV(true);
           // Corrected assignment
        } else {
          alert(response.data.error);
        }
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };
  
  return (
    <div className="HomeJs">
      <Link to="/jobseeker">Go Back to Home</Link>
      <div className="resumeContainer">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <label>Nom :</label>
            <ErrorMessage name="nom" component="span" className="error" />
            <Field
              id="inputNomCandidat"
              name="nom"
              placeholder="(Ex. Zuckerberg..)"
            />

            <label>Prénom :</label>
            <ErrorMessage name="prenom" component="span" className="error" />
            <Field
              id="inputPrenomCandidat"
              name="prenom"
              placeholder="(Ex. Mark..)"
            />

            <label>Email :</label>
            <ErrorMessage name="email" component="span" className="error" />
            <Field
              id="inputEmailCandidat"
              name="email"
              placeholder="(Ex. Mark@gmail.com)"
            />

            <label>Phone number :</label>
            <ErrorMessage
              name="phoneNumber"
              component="span"
              className="error"
            />
            <Field
              id="inputPhoneNumberCandidat"
              name="phoneNumber"
              placeholder="(Ex. 060000000)"
            />

            <label>Address :</label>
            <ErrorMessage name="address" component="span" className="error" />
            <Field
              id="inputAddress"
              name="address"
              placeholder="(Ex. 123 Main St..)"
            />

            <label>Formation :</label>
            <ErrorMessage
              name="formations"
              component="span"
              className="error"
            />
            <Field
              id="inputFormation"
              name="formations"
              placeholder="(Ex. Responsible for developing web applications...)"
            />

            <label>Experience :</label>

            <ErrorMessage
              name="experiences"
              component="span"
              className="error"
            />
            <Field
              id="inputExperience"
              name="experiences"
              placeholder="(Ex. 3 years)"
            />

            <label>Projets académiques :</label>

            <ErrorMessage
              name="projetsAcademiques"
              component="span"
              className="error"
            />
            <Field
              id="inputProjetsAcademiques"
              name="projetsAcademiques"
              placeholder="(Ex. Bachelor's degree in Computer Science)"
            />

            <label>Langues :</label>

            <ErrorMessage name="langues" component="span" className="error" />
            <Field
              id="inputLangues"
              name="langues"
              placeholder="(Ex. Francais, Anglais, Arabe...)"
            />

            <label>Langages :</label>
            <ErrorMessage name="langages" component="span" className="error" />
            <Field
              id="inputLangages"
              name="langages"
              placeholder="(Ex. JavaScript, Python, HTML...)"
            />

            <label>Logiciels :</label>
            <ErrorMessage name="logiciels" component="span" className="error" />
            <Field
              id="inputLogiciels"
              name="logiciels"
              placeholder="(Ex. Excel, Matlab...)"
            />
          <button type="submit" onClick={onSubmit}>Publier le CV</button>

          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default CreateCV;
