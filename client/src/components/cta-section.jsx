import { Link } from "react-router-dom"
import { ArrowRight, Users, Briefcase } from "lucide-react"

export default function CTASection() {
  return (
    <section className="py-20 bg-[#1E3A8A] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#F3E8D0]/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#F3E8D0]/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Career?</h2>
        <p className="text-xl text-[#F3E8D0] mb-10 max-w-3xl mx-auto">
          Join thousands of professionals who have already found success with JobConnect. Your next opportunity is just
          a click away.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link
            to="/authJobSeeker/login"
            className="group bg-white text-[#1E3A8A] px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <Briefcase className="w-5 h-5" />
            Start Job Hunting
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/authRecruiter/login"
            className="group bg-[#F3E8D0]/20 backdrop-blur-sm text-white border-2 border-[#F3E8D0]/30 px-8 py-4 rounded-xl font-semibold hover:bg-[#F3E8D0]/30 hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <Users className="w-5 h-5" />
            Find Talent
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          <div>
            <div className="text-3xl font-bold mb-2">50K+</div>
            <div className="text-[#F3E8D0]">Active Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">10K+</div>
            <div className="text-[#F3E8D0]">Job Postings</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">95%</div>
            <div className="text-[#F3E8D0]">Success Rate</div>
          </div>
        </div>
      </div>
    </section>
  )
}
