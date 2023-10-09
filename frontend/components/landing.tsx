import SignInForm from "@/components/signinform";

export default function Landing() {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero content */}
        <div className="pt-12 pb-8 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className="text-center pb-4 md:pb-16">
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
              {/* <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
      APPNAME
    </span> */}
            </h1>
            <div className="max-w-3xl mx-auto">
              <div
                className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <SignInForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
