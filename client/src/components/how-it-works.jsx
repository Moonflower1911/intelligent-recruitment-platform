import { UserPlus, Search, MessageSquare, CheckCircle, Briefcase, Users } from "lucide-react"
import { useState } from "react"

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState('jobseeker')

  const jobseekerSteps = [
    {
      icon: UserPlus,
      title: "Create Profile",
      description: "Sign up and build your professional profile.",
    },
    {
      icon: Search,
      title: "Find Jobs",
      description: "Browse or get AI-matched with opportunities.",
    },
    {
      icon: MessageSquare,
      title: "Apply",
      description: "Submit applications.",
    },
    {
      icon: CheckCircle,
      title: "Get Hired",
      description: "Receive offers and start your new role.",
    },
  ]

  const recruiterSteps = [
    {
      icon: UserPlus,
      title: "Create Account",
      description: "Set up your company profile.",
    },
    {
      icon: Briefcase,
      title: "Post Jobs",
      description: "List your open positions.",
    },
    {
      icon: Users,
      title: "Evaluate Candidates",
      description: "Review applications and profiles.",
    },
    {
      icon: CheckCircle,
      title: "Hire Talent",
      description: "Make offers to top candidates.",
    },
  ]

  const steps = activeTab === 'jobseeker' ? jobseekerSteps : recruiterSteps

  return (
    <section id="how-it-works" className="py-14 bg-gradient-to-br from-[#F3E8D0]/30 to-[#F3E8D0]/70">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1E3A8A] mb-3">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get started with JobConnect in four simple steps
          </p>
        </div>

        {/* Role Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-full p-1 shadow-sm border border-[#F3E8D0]">
            <button
              onClick={() => setActiveTab('jobseeker')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'jobseeker' ? 'bg-[#1E3A8A] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Briefcase className="inline w-4 h-4 mr-2" />
              Job Seeker
            </button>
            <button
              onClick={() => setActiveTab('recruiter')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'recruiter' ? 'bg-[#1E3A8A] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Users className="inline w-4 h-4 mr-2" />
              Recruiter
            </button>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-[#1E3A8A] rounded-full flex items-center justify-center mx-auto group-hover:scale-105 transition-transform duration-300 shadow-md">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#F3E8D0] rounded-full flex items-center justify-center text-[#1E3A8A] font-bold text-xs shadow-sm border border-[#1E3A8A]/10">
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-[#1E3A8A]/20 transform -translate-x-8"></div>
                )}
              </div>
              <h3 className="text-lg font-semibold text-[#1E3A8A] mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

    
        {/* Call to Action */}
        <div className="mt-10 text-center">
          <button className="inline-flex items-center space-x-3 bg-[#1E3A8A] text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:bg-[#1E3A8A]/90 transition-all duration-300 text-sm">
            <span>Ready to get started?</span>
            <CheckCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}