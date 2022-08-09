import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { mainData } from "../data";
import Link from "next/link";
import Layout from "../components/Layout";
import axios from "axios";
import { Router } from "next/router";
import DashboardCol from "../components/utilities/DashboardCol";
import { FolderIcon, UsersIcon } from "@heroicons/react/outline";

const Index = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userProjectsCount, setUseProjectsCount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/details`)
      .then((res) => {
        if (res.status === 200) {
          setUseProjectsCount(res.data.userProjectsCount);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        if (error) {
          if (error.response.status === 500) {
            setError("Something went wrong!");
            setIsLoading(false);
          }

          if (error.response.status === 401) {
            setIsLoading(false);
            Router.push("/login");
          }
        }
      });
  }, []);
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
        <div className="bg-white p-3">
          <h1 className="text-2xl md:text-3xl tracking-tight">
            Hello, <span className="font-semibold">{user?.name}</span>
          </h1>
          <p className="text-gray-400 text-sm font-normal">
            All your projects and tasks are intact.
          </p>
        </div>

        <div className="flex justify-center items-center gap-3 md:p-2 mt-5">
          <DashboardCol
            title={"Projects"}
            icon={<FolderIcon className="w-8 h-8 md:w-12 md:h-12" />}
            iconColor="#ffffff"
            iconBg={"#398acc"}
            count={userProjectsCount}
            link={"/projects"}
            classes="border border-slate-100 bg-white flex justify-between items-center px-4 py-6 w-full md:w-[250px] rounded-lg cursor-pointer hover:shadow-lg"
          />
          <DashboardCol
            title={"Members"}
            icon={<UsersIcon className="w-8 h-8 md:w-12 md:h-12" />}
            iconColor="#ffffff"
            iconBg={"#e95656"}
            count={0}
            link={"/members"}
            classes="border border-slate-100 bg-white flex justify-between items-center px-4 py-6 w-full md:w-[250px] rounded-lg cursor-pointer hover:shadow-lg"
          />
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
