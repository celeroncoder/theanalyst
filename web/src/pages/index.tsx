import type { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { trpc } from "../utils/trpc";
import { authOptions } from "./api/auth/[...nextauth]";

const Home: NextPage = () => {
  return <div>HELLO</div>;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );
  // redirect to login if session is null i.e user isn't logged in
  const redirect =
    session === null
      ? {
          destination: "/user/login",
          permanent: false,
        }
      : undefined;
  return {
    props: {
      session,
    },
    redirect,
  };
};
