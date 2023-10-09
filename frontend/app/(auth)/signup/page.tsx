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
        <div className="pt-10 pb-4 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className="text-center pb-0 md:pb-16">
            <h1
              className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
              data-aos="zoom-y-out"
            >
              <div className="mx-auto">
                <img
                  className="mx-auto"
                  src="/assets/htx-bike-logo.png"
                  alt="Main Logo"
                />
              </div>
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
