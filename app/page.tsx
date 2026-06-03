import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import ThreeSteps from '@/components/ThreeSteps'
import WhyZanZan from '@/components/WhyZanZan'
import FreeBeta from '@/components/FreeBeta'
import Footer from '@/components/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FFFAF5]">
      <Navbar />
      <HeroSection />
      <ThreeSteps />
      <WhyZanZan />
      <FreeBeta />
      <Footer />
    </div>
  )
}
