import React from "react";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Layout from "../../components/Layout";
import { mainData } from "../../data";
import Link from "next/link";

const Index = ({ user }) => {
  return (
    <div>
      <Head>
        <title>Taskit - Your #1 platform for project and task management</title>
        <meta
          name="description"
          content="Your #1 platform for project and task management"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout user={user && user}>
        <h1 className="text-2xl md:text-3xl tracking-tight">
          Welcome, <span className="font-semibold">{user?.name}</span>
        </h1>
        <p className="text-gray-500 text-sm font-semibold">
          All your projects and tasks are intact.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-3 md:p-2 mt-5">
          {mainData.map((data) => (
            <Link key={data.title} href={data.link}>
              <div className="border border-slate-100 bg-white flex gap-4 items-center px-4 py-6 w-full md:w-56 rounded-lg cursor-pointer hover:shadow-lg">
                <div>
                  <button
                    type="button"
                    className="rounded-full opacity-0.9 text-lg p-4"
                    style={{
                      color: data.iconColor,
                      backgroundColor: data.iconBg,
                    }}
                  >
                    {data.icon}
                  </button>
                </div>
                <div>
                  <p className="font-semibold text-lg text-gray-500">
                    {data.title}
                  </p>

                  <p className="mt-1 text-gray-400 font-semibold text-md text-center px-2 py-1 bg-slate-100 rounded-full">
                    {data.count > 100 ? "100" : data.count}
                    {data.count > 100 && <span className="font-bold">+</span>}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Layout>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    return {
      props: { user: session?.user },
    };
  }
};

export default Index;
