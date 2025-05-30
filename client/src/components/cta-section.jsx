import { Link } from "react-router-dom"
import { ArrowRight, Users, Briefcase } from "lucide-react"

export default function CTASection() {
  return (
    <section className="py-14 bg-[#1E3A8A] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#F3E8D0]/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#F3E8D0]/10 rounded-full blur-xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-5 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Career?</h2>
        <p className="text-lg text-[#F3E8D0] mb-8 max-w-2xl mx-auto">
          Join thousands of professionals who found success with JobConnect. Your next opportunity is just a click away.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/authJobSeeker/login"
            className="group bg-white text-[#1E3A8A] px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center gap-2 text-sm"
          >
            <Briefcase className="w-4 h-4" />
            Start Job Hunting
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/authRecruiter/login"
            className="group bg-[#F3E8D0]/20 backdrop-blur-sm text-white border-2 border-[#F3E8D0]/30 px-6 py-3 rounded-lg font-semibold hover:bg-[#F3E8D0]/30 hover:scale-[1.02] transition-all duration-300 flex items-center gap-2 text-sm"
          >
            <Users className="w-4 h-4" />
            Find Talent
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
          <div>
            <div className="text-2xl font-bold mb-1">50K+</div>
            <div className="text-sm text-[#F3E8D0]">Active Users</div>
          </div>
          <div>
            <div className="text-2xl font-bold mb-1">10K+</div>
            <div className="text-sm text-[#F3E8D0]">Job Postings</div>
          </div>
          <div>
            <div className="text-2xl font-bold mb-1">95%</div>
            <div className="text-sm text-[#F3E8D0]">Success Rate</div>
          </div>
        </div>
      </div>
    </section>
  )
}