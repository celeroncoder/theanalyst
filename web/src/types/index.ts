export type Team = {
  name: string;
  code: string;
  totalWins: number;
  matchesPlayed: number;
  //   draws: number;
};

export type Prediction = {
  teamA: Team;
  teamB: Team;
  winningTeam: Team;
  percentage: number;
};

export type Match = {
  teamA: Team;
  teamB: Team;
};
