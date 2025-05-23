import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateCVForm = () => {
  const navigate = useNavigate();
  const [fileUrl, setFileUrl] = useState(null); // For storing the preview URL

  const initialValues = {
    nom: "",
    prenom: "",
    email: "",
    phoneNumber: "",
    address: "",
    cvFile: null,
  };

  const validationSchema = Yup.object().shape({
    nom: Yup.string().required("Name is required"),
    prenom: Yup.string().required("First name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
    address: Yup.string().required("Address is required"),
    cvFile: Yup.mixed()
      .required("CV is required")
      .test("fileFormat", "Only PDF files are allowed", (value) =>
        value && value.type === "application/pdf"
      ),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }

      const response = await axios.post("http://localhost:3001/jobseeker", formData, {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.error) {
        if (response.data.error.includes("already has a resume")) {
          alert("You already have a CV. You cannot create another one.");
        } else {
          alert(response.data.error);
        }
      } else {
        navigate("/accountjobseeker");
      }
    } catch (error) {
      console.error("Error submitting the form!", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle file input change and generate a link
  const handleFileChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("cvFile", file);

    // Generate the file URL
    if (file && file.type === "application/pdf") {
      const fileUrl = URL.createObjectURL(file);
      setFileUrl(fileUrl); // Set the link to the file
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-xl shadow-md mt-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#175d69]">
        Create a New CV
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "nom", label: "Last Name", placeholder: "E.g. Zuckerberg" },
              { name: "prenom", label: "First Name", placeholder: "E.g. Mark" },
              { name: "email", label: "Email", placeholder: "E.g. mark@gmail.com" },
              { name: "phoneNumber", label: "Phone Number", placeholder: "0600000000" },
              { name: "address", label: "Address", placeholder: "123 Main St." },
            ].map(({ name, label, placeholder }) => (
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

            {/* CV Upload with Custom Style and Preview */}
            <div className="flex flex-col md:col-span-2">
              <label htmlFor="cvFile" className="font-semibold mb-2">
                CV (PDF required)
              </label>

              <div className="rounded-md border border-indigo-500 bg-gray-50 p-4 shadow-md w-36">
                <label htmlFor="upload" className="flex flex-col items-center gap-2 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 fill-white stroke-indigo-500" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-gray-600 font-medium">Upload file</span>
                </label>
                <input
                  id="upload"
                  name="cvFile"
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(event) => handleFileChange(event, setFieldValue)}
                />
              </div>

              {/* ✅ Show selected file name */}
              {values.cvFile && (
                <p className="text-sm text-gray-700 mt-2 truncate max-w-xs">
                  Selected file: <strong>{values.cvFile.name}</strong>
                </p>
              )}

              {/* PDF Preview Link */}
              {fileUrl && (
                <div className="mt-4">
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Click here to view the CV
                  </a>
                </div>
              )}

              <ErrorMessage name="cvFile" component="div" className="text-red-500 text-sm mt-2" />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-[#175d69] text-white py-3 rounded hover:bg-[#124b55] transition"
              >
                Publish CV
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateCVForm;
