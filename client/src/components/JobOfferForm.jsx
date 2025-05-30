import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Briefcase, MapPin, Building, BookOpen, Code, Key, Globe } from "lucide-react";

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
    companyName: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    position: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    experience: Yup.string().required("Required"),
    education: Yup.string().required("Required"),
    skills: Yup.string().required("Required"),
    keywords: Yup.string().required("Required"),
    languages: Yup.string().required("Required"),
  });

  const onSubmit = async (data, { setSubmitting }) => {
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
        username: sessionStorage.getItem("username"),
        UserRecruiterId: sessionStorage.getItem("userId")
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
    } finally {
      setSubmitting(false);
    }
  };

  const fieldIcons = {
    companyName: <Building className="w-4 h-4 text-[#1E3A8A]" />,
    address: <MapPin className="w-4 h-4 text-[#1E3A8A]" />,
    position: <Briefcase className="w-4 h-4 text-[#1E3A8A]" />,
    education: <BookOpen className="w-4 h-4 text-[#1E3A8A]" />,
    skills: <Code className="w-4 h-4 text-[#1E3A8A]" />,
    keywords: <Key className="w-4 h-4 text-[#1E3A8A]" />,
    languages: <Globe className="w-4 h-4 text-[#1E3A8A]" />,
  };

  const fields = [
    { name: "companyName", label: "Company", placeholder: "Company name" },
    { name: "address", label: "Address", placeholder: "Street address" },
    { name: "city", label: "City", placeholder: "City" },
    { name: "position", label: "Position", placeholder: "Job title" },
    { name: "description", label: "Description", placeholder: "Job responsibilities" },
    { name: "experience", label: "Experience", placeholder: "Required experience" },
    { name: "education", label: "Education", placeholder: "Education requirements" },
    { name: "skills", label: "Skills", placeholder: "Required skills" },
    { name: "keywords", label: "Keywords", placeholder: "Search keywords" },
    { name: "languages", label: "Languages", placeholder: "Language requirements" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-6">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fields.map(({ name, label, placeholder }) => (
                  <div key={name} className="flex flex-col">
                    <div className="flex items-center mb-1">
                      {fieldIcons[name] && (
                        <span className="mr-1">
                          {fieldIcons[name]}
                        </span>
                      )}
                      <label htmlFor={name} className="text-xs font-medium text-gray-700">
                        {label}
                      </label>
                    </div>
                    {name === "description" ? (
                      <Field
                        as="textarea"
                        name={name}
                        id={name}
                        placeholder={placeholder}
                        rows={3}
                        className="text-sm px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1E3A8A] focus:border-[#1E3A8A]"
                      />
                    ) : (
                      <Field
                        name={name}
                        id={name}
                        placeholder={placeholder}
                        className="text-sm px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1E3A8A] focus:border-[#1E3A8A]"
                      />
                    )}
                    <ErrorMessage 
                      name={name} 
                      component="div" 
                      className="text-red-500 text-xs mt-1" 
                    />
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 px-4 bg-[#1E3A8A] text-white rounded-md hover:bg-[#1E3A8A]/90 text-sm font-medium disabled:opacity-70"
                >
                  {isSubmitting ? "Publishing..." : "Publish Job Offer"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default JobOfferForm;