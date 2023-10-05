export const metadata = {
  title: "Home - Simple",
  description: "Page description",
};

import Landing from "@/components/landing";
// import Features from '@/components/features'
// import FeaturesBlocks from '@/components/features-blocks'
// import Testimonials from '@/components/testimonials'
// import Newsletter from '@/components/newsletter'

export default function Home() {
  return (
    <>
      <Landing />
      {/* <Features />
      <FeaturesBlocks />
      <Testimonials />
      <Newsletter /> */}
    </>
  );
}
