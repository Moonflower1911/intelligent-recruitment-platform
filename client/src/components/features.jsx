import { Search, Users, Shield, Zap, Target, Award } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: Search,
      title: "Smart Job Matching",
      description: "AI-powered matching based on skills and preferences.",
    },
    {
      icon: Users,
      title: "Talent Pool Access",
      description: "Connect with diverse professionals across industries.",
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Enterprise-grade security and privacy controls.",
    },
    {
      icon: Zap,
      title: "Fast Hiring Process",
      description: "Streamlined recruitment reduces time-to-hire.",
    },
    {
      icon: Target,
      title: "Targeted Recruitment",
      description: "Precision targeting with advanced filters.",
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Verified profiles and skill assessments.",
    },
  ]

  return (
    <section id="features" className="py-14 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Why Choose <span className="text-[#1E3A8A]">Job</span>
            <span className="text-[#D4A574]">Connect</span>?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Features that make JobConnect preferred for recruiters and job seekers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl bg-gradient-to-br from-[#F3E8D0]/20 to-white border border-[#F3E8D0] hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              <div className="w-10 h-10 bg-[#1E3A8A] rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                <feature.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#1E3A8A] mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}