import LayoutLanding from '../components/layouts/Landing';
import Spacer from '../components/sections/Spacer';
import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import About from '../components/sections/About';
import Pricing from '../components/sections/Pricing';
import Faq from '../components/sections/Faq';

export default function Home() {
  return (
    <LayoutLanding>
      <Hero />
      <Spacer />
      <Features />
      <Spacer />
      <About />
      <Spacer />
      <Pricing />
      <Spacer />
      <Faq />
    </LayoutLanding>
  );
}
