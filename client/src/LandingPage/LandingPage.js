import Navbar from "../components/navbar"
import Jumbotron from "../components/Jumbotron"
import Features from "../components/features"
import HowItWorks from "../components/how-it-works"
import Testimonials from "../components/testimonials"
import CTASection from "../components/cta-section"
import Footer from "../components/footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Jumbotron />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  )
}
