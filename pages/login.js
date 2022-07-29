import { getSession, signIn } from "next-auth/react";
import React, { useState } from "react";
import Head from "next/head";
import { isEmpty } from "../helpers";
import { useRouter } from "next/router";
import Link from "next/link";

function Login({}) {
  const [email, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
  const router = useRouter();

  let loginButton;

  if (!isEmpty(email) && !isEmpty(password)) {
    loginButton = (
      <button
        type="submit"
        className="p-2 w-full bg-blue-400 text-white font-semibold text-lg rounded hover:bg-blue-600"
      >
        Login
      </button>
    );
  } else {
    loginButton = (
      <button
        type="submit"
        className="p-2 w-full bg-slate-100 text-slate-600 font-semibold text-lg rounded hover:bg-blue-600"
        disabled
      >
        Login
      </button>
    );
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const signinRes = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: window.location.origin,
      });

      if (signinRes.url === "https://taskit-alpha.vercel.app/") {
        router.push("/");
      }
    } catch (error) {
      setError("Login failed");
    }
  };

  return (
    <div>
      <Head>
        <title>Taskit - Login</title>
        <meta name="description" content="Taskit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex items-center relative min-h-screen">
          <div className="hidden md:flex md:flex-col md:justify-center md:items-center bg-gradient-to-r from-[#0e2a47] to-blue-500 min-h-screen w-1/2 p-20">
            <h1 className="font-bold text-white text-5xl">
              Task<span className="text-yellow-200">it</span>
            </h1>
            <p className="text-white font-bold">
              Your #1 task management platform.
            </p>
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-0">
            <div className="text-3xl font-bold">Login.</div>
            <div className="p-2">
              <form onSubmit={handleLoginSubmit}>
                <div className="relative mt-3">
                  <label className="font-semibold text-slate-600 text-sm">
                    Email Address *
                  </label>
                  <input
                    type={"email"}
                    name="email"
                    value={email}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    placeholder="example@example.com"
                    className="border border-slate-200 focus:border-blue-300 p-2 outline-none w-full rounded"
                  />
                </div>

                <div className="relative mt-3">
                  <label className="font-semibold text-slate-600 text-sm">
                    Password *
                  </label>
                  <input
                    type={"password"}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-slate-200 focus:border-blue-300 p-2 outline-none w-full rounded"
                  />
                </div>

                <div className="relative mt-4">{loginButton}</div>
              </form>

              <div className="mt-1 text-center">
                <div className="text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href={"/signup"}>
                    <span className="cursor-pointer text-blue-500">Signup</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};
export default Login;
