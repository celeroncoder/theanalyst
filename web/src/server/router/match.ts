import { z } from "zod";
import { createProtectedRouter } from "./context";
import { Priority } from "@prisma/client";
import { Match, Team } from "../../types";

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
  let otherTeam = getRandomTeam();
  let teamB = otherTeam !== teamA ? otherTeam : getRandomTeam()!;
  console.log(teamA);
  return { teamA, teamB };
};

const getDemoMatches = (): Match[] => {
  let demoMatches = new Array<Match>();
  for (let i = 15; i <= 15; i++) {
    demoMatches.push(createDemoMatch());
  }
  return demoMatches;
};

export const matchRouter = createProtectedRouter().query("getMatches", {
  resolve() {
    const matches = getDemoMatches();
    console.log(matches);

    return matches;
  },
});
