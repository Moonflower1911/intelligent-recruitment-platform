import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Upload, FileText, X } from "lucide-react";

const CreateCVForm = () => {
  const navigate = useNavigate();
  const [filePreview, setFilePreview] = useState(null);
  const [fileName, setFileName] = useState("");

  const initialValues = {
    nom: "",
    prenom: "",
    email: "",
    phoneNumber: "",
    address: "",
    cvFile: null,
  };

  const validationSchema = Yup.object().shape({
    nom: Yup.string().required("Last name is required"),
    prenom: Yup.string().required("First name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
      .required("Phone is required"),
    address: Yup.string().required("Address is required"),
    cvFile: Yup.mixed()
      .required("CV file is required")
      .test("fileType", "Only PDF files are allowed", (value) => 
        value && value.type === "application/pdf"
      ),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post(
        "http://localhost:3001/jobseeker",
        formData,
        {
          headers: {
            accessToken: sessionStorage.getItem("accessToken"),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.error) {
        alert(response.data.error.includes("already has a resume") 
          ? "You already have a CV" 
          : response.data.error);
      } else {
        navigate("/accountjobseeker");
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setFieldValue("cvFile", file);
      setFileName(file.name);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const removeFile = (setFieldValue) => {
    setFieldValue("cvFile", null);
    setFileName("");
    setFilePreview(null);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "nom", label: "Last Name", placeholder: "Enter your last name" },
              { name: "prenom", label: "First Name", placeholder: "Enter your first name" },
              { name: "email", label: "Email", placeholder: "your.email@example.com" },
              { name: "phoneNumber", label: "Phone Number", placeholder: "0612345678" },
              { name: "address", label: "Address", placeholder: "123 Main Street", colSpan: "md:col-span-2" },
            ].map((field) => (
              <div key={field.name} className={`flex flex-col ${field.colSpan || ""}`}>
                <label htmlFor={field.name} className="text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <Field
                  name={field.name}
                  id={field.name}
                  placeholder={field.placeholder}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A]"
                />
                <ErrorMessage name={field.name} component="div" className="text-red-500 text-xs mt-1" />
              </div>
            ))}
          </div>

          {/* CV Upload Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Upload CV (PDF only)
            </label>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {filePreview ? (
                <div className="flex flex-col items-center">
                  <FileText className="w-12 h-12 text-[#1E3A8A] mb-2" />
                  <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                    {fileName}
                  </p>
                  <div className="flex space-x-4 mt-4">
                    <a
                      href={filePreview}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#1E3A8A] hover:underline"
                    >
                      Preview
                    </a>
                    <button
                      type="button"
                      onClick={() => removeFile(setFieldValue)}
                      className="text-sm text-red-500 hover:text-red-700 flex items-center"
                    >
                      <X className="w-4 h-4 mr-1" /> Remove
                    </button>
                  </div>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <Upload className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      Drag and drop or <span className="text-[#1E3A8A] font-medium">browse files</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PDF files only (max. 10MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    id="cvFile"
                    name="cvFile"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setFieldValue)}
                  />
                </label>
              )}
            </div>
            <ErrorMessage name="cvFile" component="div" className="text-red-500 text-xs" />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-6 bg-[#1E3A8A] text-white rounded-lg hover:bg-[#1E3A8A]/90 transition-colors font-medium disabled:opacity-70"
          >
            {isSubmitting ? "Creating CV..." : "Create CV"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateCVForm;