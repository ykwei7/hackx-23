export const metadata = {
  title: "Sign Up",
  description: "Page description",
};

import SignUpForm from "@/components/signupform";

export default function SignUp() {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero content */}
        <div className="pt-24 pb-24 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1
              className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
              data-aos="zoom-y-out"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                Sign Up
              </span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <div
                className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <SignUpForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
