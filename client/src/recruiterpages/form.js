import JobOfferForm from "../components/JobOfferForm";

function CreateJobOffer() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4f8] to-[#dfe7ef] py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#1E3A8A]">
            Create New Job Opportunity
          </h1>
          <p className="mt-1 text-sm text-gray-600 max-w-lg mx-auto">
            Fill out the form below to post your job offer
          </p>
        </div>
        <JobOfferForm />
      </div>
    </div>
  );
}

export default CreateJobOffer;