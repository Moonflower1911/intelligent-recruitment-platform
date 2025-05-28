import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CreateInterviewForm from "../components/CreateInterviewForm"; // The one we built earlier
import InterviewVideoSection from "../components/InterviewVideoSection"; // Recruiter version of VideoSection

function AddInterview() {
  const { interestId } = useParams(); // From route like /recruiter/interview/:interestId
  const [interview, setInterview] = useState(null);
  const [interviewCreated, setInterviewCreated] = useState(false);

  // Simulate recruiter login
  const recruiterId = 1; // TEMP: use actual ID from session/token in real flow

  const fetchInterviewStatus = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/interview/status/${interestId}`);
      if (res.data.interviewed) {
        const interviewId = res.data.interviewId;
        const interviewRes = await axios.get(`http://localhost:3001/interview/${interviewId}`);
        setInterview(interviewRes.data);
        setInterviewCreated(true);
      }
    } catch (err) {
      console.error("Error fetching interview status:", err);
    }
  };

  useEffect(() => {
    fetchInterviewStatus();
  }, [interestId]);

  return (
   
      <div className="max-w-4xl mx-auto">
        

        {/* If no interview exists, show the form */}
        {!interviewCreated ? (
          <CreateInterviewForm
            interestId={interestId}
            recruiterId={recruiterId}
          />
        ) : (
          <>
            {/* Show video section if interview already created */}
            <InterviewVideoSection
              interview={interview}
              onUpdate={() => {
                // Refresh interview after upload/delete
                axios
                  .get(`http://localhost:3001/interview/${interview.id}`)
                  .then((res) => setInterview(res.data))
                  .catch(console.error);
              }}
            />
          </>
        )}
      </div>
    
  );
}

export default AddInterview;
