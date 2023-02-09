import { Button, Card, Center, Divider, Text } from "@mantine/core";
import { IconBrandGoogle } from "@tabler/icons";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]";

export default function Login() {
  return (
    <Center style={{ height: "100%", minHeight: "100vh" }}>
      <Card
        p="xl"
        withBorder
        shadow="xl"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Text>AIOpeners</Text>
        <Text size="sm" color="indigo">
          Community for football fans and analysts
        </Text>
        <Divider my="md" />
        <Text size="md" mb="md">
          Sign in to get started...
        </Text>
        <Button
          onClick={() => signIn("google")}
          size="lg"
          leftIcon={<IconBrandGoogle size={24} />}
        >
          Sign In with Google
        </Button>
      </Card>
    </Center>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );
  return {
    props: { session },
    redirect:
      session !== null
        ? {
            destination: "/",
            permanent: true,
          }
        : undefined,
  };
};
