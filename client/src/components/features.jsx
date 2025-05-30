import { Search, Users, Shield, Zap, Target, Award } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: Search,
      title: "Smart Job Matching",
      description:
        "Our AI-powered algorithm matches candidates with the perfect job opportunities based on skills and preferences.",
    },
    {
      icon: Users,
      title: "Talent Pool Access",
      description: "Connect with a diverse pool of qualified professionals across various industries and skill levels.",
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Your data is protected with enterprise-grade security measures and privacy controls.",
    },
    {
      icon: Zap,
      title: "Fast Hiring Process",
      description: "Streamlined recruitment process that reduces time-to-hire and improves candidate experience.",
    },
    {
      icon: Target,
      title: "Targeted Recruitment",
      description: "Reach the right candidates with precision targeting and advanced filtering options.",
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Verified profiles and skill assessments ensure you connect with top-quality talent.",
    },
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-[#1E3A8A]">Job</span>
            <span className="text-[#D4A574]">Connect</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the features that make JobConnect the preferred platform for both recruiters and job seekers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-gradient-to-br from-[#F3E8D0]/20 to-white border border-[#F3E8D0] hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-[#1E3A8A] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#1E3A8A] mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
