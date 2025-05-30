import { UserPlus, Search, MessageSquare, CheckCircle } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      title: "Create Your Profile",
      description: "Sign up and build a comprehensive profile showcasing your skills and experience.",
    },
    {
      icon: Search,
      title: "Discover Opportunities",
      description: "Browse through thousands of job listings or let our AI match you with perfect opportunities.",
    },
    {
      icon: MessageSquare,
      title: "Connect & Interview",
      description: "Connect directly with recruiters and schedule interviews through our platform.",
    },
    {
      icon: CheckCircle,
      title: "Land Your Dream Job",
      description: "Complete the hiring process and start your new career journey with confidence.",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-[#F3E8D0]/30 to-[#F3E8D0]/70">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1E3A8A] mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started with JobConnect in just four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-[#1E3A8A] rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#F3E8D0] rounded-full flex items-center justify-center text-[#1E3A8A] font-bold text-sm shadow-md border border-[#1E3A8A]/10">
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-[#1E3A8A]/20 transform -translate-x-10"></div>
                )}
              </div>
              <h3 className="text-xl font-semibold text-[#1E3A8A] mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg border border-[#F3E8D0]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-16 h-16 bg-[#1E3A8A] rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-white">⚡</span>
              </div>
              <h4 className="text-lg font-semibold text-[#1E3A8A]">Fast Process</h4>
              <p className="text-gray-600">Complete setup in under 10 minutes</p>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 bg-[#1E3A8A] rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-white">🎯</span>
              </div>
              <h4 className="text-lg font-semibold text-[#1E3A8A]">Smart Matching</h4>
              <p className="text-gray-600">AI-powered job recommendations</p>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 bg-[#1E3A8A] rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-white">🔒</span>
              </div>
              <h4 className="text-lg font-semibold text-[#1E3A8A]">Secure Platform</h4>
              <p className="text-gray-600">Your data is always protected</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-4 bg-[#1E3A8A] text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:bg-[#1E3A8A]/90 transition-all duration-300">
            <span>Ready to get started?</span>
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>
      </div>
    </section>
  )
}
