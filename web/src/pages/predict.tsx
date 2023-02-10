import { Button, Card, Container, Text, Title } from "@mantine/core";
import { useState } from "react";
import { Wrapper } from "../components";
import { PredictionModal } from "../components/PredictionModal";
import { Prediction } from "../types";
import Chart from "react-apexcharts";

export default function Predict() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [predictions, setPredictions] = useState<Array<Prediction>>([]);

  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [
        "Goal Count",
        "Team Chemistry",
        "Historic Analysis",
        "Won",
        "Lost",
        "Player Form",
      ],
    },
  });
  const [series, setSeries] = useState([
    {
      name: "West Ham United",
      data: [30, 40, 45, 50, 49, 60],
    },
    {
      name: "Chelsea",
      data: [45, 52, 38, 24, 33, 12],
    },
  ]);

  return (
    <Wrapper>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10vw",
          width: "90%",
        }}
      >
        <div>
          <Card
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              gap: "10vw",
            }}
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
                West Ham United
              </Text>
              <Text color="dimmed" size="sm">
                WHU
              </Text>
              <Text color="dimmed" size="sm">
                Total Wins: 15
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
                Chelsea
              </Text>
              <Text color="dimmed" size="sm">
                CHE
              </Text>
              <Text color="dimmed" size="sm">
                Total Wins: 29
              </Text>
            </div>
          </Card>
          <Container mt="md">
            <Button onClick={() => setOpenModal(true)}>
              Enter your prediction
            </Button>
            <PredictionModal
              teamA={{
                name: "West Ham United",
                code: "WHU",
                totalWins: 15,
                matchesPlayed: 38,
              }}
              teamB={{
                name: "Chelesa",
                code: "CHE",
                totalWins: 29,
                matchesPlayed: 38,
              }}
              opened={openModal}
              setOpened={setOpenModal}
              setPredictions={setPredictions}
            />
          </Container>
        </div>

        <Container>
          <Title order={3} style={{ textAlign: "center" }}>
            Team Stats
          </Title>
          <Chart options={options} series={series} type="radar" width="500" />
        </Container>
      </div>

      <Container
        mt="lg"
        sx={(theme) => ({
          display: "felx",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: theme.spacing.lg,
        })}
      >
        {predictions.length > 0
          ? predictions.map((prediction, idx) => (
              <Card mt="sm" title="Prediction">
                <Text size="lg" color="dimmed">
                  #{idx + 1}
                </Text>
                <div
                  style={{
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "space-between",
                    gap: 50,
                  }}
                >
                  <div>
                    <Text color="green" size="lg">
                      Win: {prediction.winningTeam.name}
                    </Text>
                    <Text color="dimmed" size="md">
                      Loose:{" "}
                      {prediction.teamA.code === prediction.winningTeam.code
                        ? prediction.teamB.name
                        : prediction.teamA.name}
                    </Text>
                  </div>
                  <div>
                    <Text>Winning Precentage: {prediction.percentage}%</Text>
                  </div>
                </div>
              </Card>
            ))
          : null}
      </Container>
    </Wrapper>
  );
}
