import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const JobOfferForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    companyName: "",
    address: "",
    city: "",
    position: "",
    description: "",
    experience: "",
    education: "",
    skills: "",
    keywords: "",
    languages: "",
  };

  const validationSchema = Yup.object().shape({
    companyName: Yup.string().required("This field is required"),
    address: Yup.string().required("This field is required"),
    city: Yup.string().required("This field is required"),
    position: Yup.string().required("This field is required"),
    description: Yup.string().required("This field is required"),
    experience: Yup.string().required("This field is required"),
    education: Yup.string().required("This field is required"),
    skills: Yup.string().required("This field is required"),
    keywords: Yup.string().required("This field is required"),
    languages: Yup.string().required("This field is required"),
  });

  const onSubmit = async (data) => {
    try {
      const mappedData = {
        nomEntreprise: data.companyName,
        address: data.address,
        city: data.city,
        poste: data.position,
        description: data.description,
        experience: data.experience,
        formations: data.education,
        skills: data.skills,
        keywords: data.keywords,
        langues: data.languages,
        username: sessionStorage.getItem("username"), // Or wherever you store it
        UserRecruiterId: sessionStorage.getItem("userId") // Make sure this exists
      };

      const response = await axios.post(
        "http://localhost:3001/recruiter",
        mappedData,
        {
          headers: {
            accessToken: sessionStorage.getItem("accessToken"),
          },
        }
      );

      if (response.data.error) {
        alert(response.data.error);
      } else {
        navigate("/recruiter");
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  const fields = [
    { name: "companyName", label: "Company Name", placeholder: "E.g. ABC Corporation" },
    { name: "address", label: "Address", placeholder: "E.g. 123 Main St." },
    { name: "city", label: "City", placeholder: "E.g. Rabat" },
    { name: "position", label: "Position", placeholder: "E.g. Web Developer" },
    { name: "description", label: "Description", placeholder: "Responsible for development..." },
    { name: "experience", label: "Experience", placeholder: "E.g. 2 years" },
    { name: "education", label: "Education", placeholder: "Bachelor's in Computer Science" },
    { name: "skills", label: "Skills", placeholder: "React, Node.js" },
    { name: "keywords", label: "Keywords", placeholder: "cloud, devops" },
    { name: "languages", label: "Languages", placeholder: "French, English" },
  ];

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-xl shadow-md mt-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#175d69]">
        New Job Offer
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map(({ name, label, placeholder }) => (
            <div key={name} className="flex flex-col">
              <label htmlFor={name} className="font-semibold mb-1">{label}</label>
              <Field
                name={name}
                placeholder={placeholder}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#175d69]"
              />
              <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
            </div>
          ))}

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-[#175d69] text-white py-3 rounded hover:bg-[#124b55] transition"
            >
              Publish Job Offer
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default JobOfferForm;
