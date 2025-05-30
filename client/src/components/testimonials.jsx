import { Star, Quote } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "TechCorp",
      content:
        "JobConnect helped me find my dream job in just 2 weeks. The platform is intuitive and the job matching is incredibly accurate.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Michael Chen",
      role: "HR Director",
      company: "InnovateLab",
      content:
        "As a recruiter, JobConnect has transformed our hiring process. We've reduced our time-to-hire by 40% and found amazing talent.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Manager",
      company: "BrandForward",
      content:
        "The quality of candidates on JobConnect is exceptional. We've made several successful hires through the platform.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1E3A8A] mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear from professionals who've found success with JobConnect
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#F3E8D0]/20 to-white p-8 rounded-2xl border border-[#F3E8D0] hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#1E3A8A] fill-current" />
                ))}
              </div>

              <Quote className="w-8 h-8 text-[#1E3A8A] mb-4" />

              <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>

              <div className="flex items-center">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 border-2 border-[#F3E8D0]"
                />
                <div>
                  <h4 className="font-semibold text-[#1E3A8A]">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
