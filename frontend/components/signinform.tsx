"use client";

import Link from "next/link";
import { login } from "@/app/api/users/route";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: any): any => {
    e.preventDefault();
    login({
      email: email,
      password: password,
    })
      .then((res) => {
        localStorage.setItem("user_id", res.data.user_id);
        router.push("/main");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="max-w-sm mx-auto">
      <form>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3">
            <label
              className="block text-gray-800 text-sm font-medium mb-1 text-left"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input w-full text-gray-800"
              placeholder="Enter your email address"
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3">
            <div className="flex justify-between">
              <label
                className="block text-gray-800 text-sm font-medium mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <Link
                href="/reset-password"
                className="text-sm font-medium text-gray-600 hover:underline"
              >
                Having trouble signing in?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input w-full text-gray-800"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mt-6">
          <div className="w-full px-3">
            <button
              className="btn text-white bg-black hover:bg-gray-700 w-full"
              onClick={handleLogin}
            >
              Sign in
            </button>
          </div>
        </div>
      </form>
      <div className="flex items-center my-6">
        <div
          className="border-t border-gray-300 grow mr-3"
          aria-hidden="true"
        ></div>
        <div className="text-gray-600 italic">Or</div>
        <div
          className="border-t border-gray-300 grow ml-3"
          aria-hidden="true"
        ></div>
      </div>
      <form>
        <div className="flex flex-wrap -mx-3 mb-3">
          <div className="w-full px-3">
            {/* <button className="btn px-0 text-white bg-red-600 hover:bg-gray-800 w-full relative flex items-center">
              <svg
                className="w-4 h-4 fill-current text-white opacity-75 shrink-0 mx-4"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7.95 0C3.578 0 0 3.578 0 7.95c0 3.479 2.286 6.46 5.466 7.553.397.1.497-.199.497-.397v-1.392c-2.187.497-2.683-.993-2.683-.993-.398-.895-.895-1.193-.895-1.193-.696-.497.1-.497.1-.497.795.1 1.192.795 1.192.795.696 1.292 1.888.895 2.286.696.1-.497.298-.895.497-1.093-1.79-.2-3.578-.895-3.578-3.975 0-.895.298-1.59.795-2.087-.1-.2-.397-.994.1-2.087 0 0 .695-.2 2.186.795a6.408 6.408 0 011.987-.299c.696 0 1.392.1 1.988.299 1.49-.994 2.186-.795 2.186-.795.398 1.093.199 1.888.1 2.087.496.596.795 1.291.795 2.087 0 3.08-1.889 3.677-3.677 3.875.298.398.596.895.596 1.59v2.187c0 .198.1.497.596.397C13.714 14.41 16 11.43 16 7.95 15.9 3.578 12.323 0 7.95 0z" />
              </svg>
              <span className="flex-auto pl-16 pr-8 -ml-16">
                Retrieve MyInfo with SingPass
              </span>
            </button> */}

            <div className="mx-auto">
              <img
                className="mx-auto"
                src="/assets/singpass-2.png"
                alt="singpass"
                width="200rem"
              />
            </div>
          </div>
        </div>
      </form>
      <div className="text-gray-600 text-center mt-6">
        Don't you have an account?{" "}
        <Link
          href="/signup"
          className="text-black hover:underline transition duration-150 ease-in-out"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
