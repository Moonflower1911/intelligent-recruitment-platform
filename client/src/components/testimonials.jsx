import { Star, Quote } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "TechCorp",
      content: "Found my dream job in 2 weeks. The platform is intuitive and job matching is incredibly accurate.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "HR Director",
      company: "InnovateLab",
      content: "Transformed our hiring process. Reduced time-to-hire by 40% with amazing talent.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Manager",
      company: "BrandForward",
      content: "Exceptional candidate quality. Multiple successful hires through the platform.",
      rating: 5,
    },
  ]

  // Function to get initials from name
  const getInitials = (name) => {
    return name.split(' ').map(part => part[0]).join('').toUpperCase()
  }

  return (
    <section id="testimonials" className="py-14 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1E3A8A] mb-3">What Our Users Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from professionals who've found success with JobConnect
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#F3E8D0]/20 to-white p-6 rounded-xl border border-[#F3E8D0] hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#1E3A8A] fill-current" />
                ))}
              </div>

              <Quote className="w-6 h-6 text-[#1E3A8A] mb-3" />

              <p className="text-gray-700 mb-4 text-sm leading-relaxed">"{testimonial.content}"</p>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full mr-3 border-2 border-[#F3E8D0] bg-[#1E3A8A] flex items-center justify-center text-white font-medium">
                  {getInitials(testimonial.name)}
                </div>
                <div>
                  <h4 className="font-semibold text-[#1E3A8A] text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-gray-600">
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