import { Button, Card, Container, Text, Title } from "@mantine/core";
import type { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LeaderBoard, Wrapper } from "../components";
import { Match, Team } from "../types";
import { trpc } from "../utils/trpc";
import { authOptions } from "./api/auth/[...nextauth]";
const demoTeams: Team[] = [
  { name: "Chelsea", code: "CHE", matchesPlayed: 1173, totalWins: 626 },
  { name: "Arsenal", code: "ARS", matchesPlayed: 1172, totalWins: 635 },
  { name: "Aston Villa", code: "AVL", matchesPlayed: 1060, totalWins: 362 },
  { name: "West Ham United", code: "WHU", matchesPlayed: 1210, totalWins: 589 },
  { name: "Everton", code: "EVE", matchesPlayed: 1173, totalWins: 422 },
  {
    name: "Brighton and Hove Albion",
    code: "BHA",
    matchesPlayed: 210,
    totalWins: 58,
  },
  { name: "FULHAM", code: "FUL", matchesPlayed: 592, totalWins: 171 },
  { name: "AFC Bournemouth", code: "210", matchesPlayed: 210, totalWins: 60 },
];

const createDemoMatch = (): Match => {
  const getRandomTeam = () =>
    demoTeams[Math.floor(Math.random() * demoTeams.length)]!;
  let teamA = getRandomTeam();
  //   let otherTeam = getRandomTeam();
  //   let teamB = otherTeam !== teamA ? otherTeam : getRandomTeam()!;
  let teamB = getRandomTeam();
  console.log(teamA);
  return { teamA, teamB };
};

const getDemoMatches = (): Match[] => {
  let demoMatches = new Array<Match>();
  //   for (let i = 15; i <= 15; i++) {
  demoMatches[0] = createDemoMatch();
  //   }
  return demoMatches;
};

const Home: NextPage = () => {
  const { data } = useSession();
  const router = useRouter();

  const [matches, setMatches] = useState<Array<Match>>(getDemoMatches());

  return (
    <Wrapper>
      <Title mb="lg">Upcoming Matches</Title>
      <div
        style={{
          display: "felx",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {matches!.map((match) => (
          <Card title="Match">
            <Container
              sx={(theme) => ({
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                gap: "10vw",
              })}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "left",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Text color="blue" size="xl">
                  {match.teamA.name}
                </Text>
                <Text color="dimmed" size="sm">
                  {match.teamA.code}
                </Text>
                <Text color="dimmed" size="sm">
                  Total Wins: {match.teamA.totalWins}
                </Text>
              </div>
              <Text size="xl">Vs</Text>
              <div
                style={{
                  display: "flex",
                  alignItems: "right",
                  textAlign: "right",
                  justifyContent: "right",
                  flexDirection: "column",
                }}
              >
                <Text color="red" size="xl">
                  {match.teamB.name}
                </Text>
                <Text color="dimmed" size="sm">
                  {match.teamB.code}
                </Text>
                <Text color="dimmed" size="sm">
                  Total Wins: {match.teamB.totalWins}
                </Text>
              </div>
            </Container>
            <Container
              mt="xl"
              sx={(theme) => ({
                display: "flex",
                alignItems: "center",
                justifyContent: "right",
                gap: theme.spacing.xl,
              })}
            >
              <Button variant="outline" disabled>
                Spectate
              </Button>
              <Button onClick={() => router.push("/predict")}>Predict</Button>
            </Container>
          </Card>
        ))}
      </div>
    </Wrapper>
  );
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
