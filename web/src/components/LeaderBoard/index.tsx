import { Card, Container, Text, Title } from "@mantine/core";
import { generateName } from "./names";

export const LeaderBoard: React.FC<{ limit: number }> = ({ limit }) => {
  const generateRandomUserData = () => {
    let res = new Array<{
      name: string;
      sucess_rate: number;
      total_correct: number;
      total_predict: number;
    }>(limit);
    for (let i = 0; i <= limit; i++) {
      let name = generateName();
      let total_predict = Number(
        (Math.random() * (500 - 100) + 100).toFixed(0)
      );
      let total_correct = Number(
        (
          Math.random() * (total_predict - total_predict * 0.5) +
          total_predict * 0.5
        ).toFixed(0)
      );
      let sucess_rate = Number(
        ((total_correct / total_predict) * 100).toFixed(2)
      );
      let user = {
        name,
        total_correct,
        total_predict,
        sucess_rate,
      };
      res[i] = user;
    }
    res = res.sort((a, b) => (a.sucess_rate > b.sucess_rate ? -1 : 1));
    return res;
  };

  return (
    <div>
      {generateRandomUserData().map((val, idx) => (
        <Card mb="sm" radius="md" style={{ width: "60vw" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "5vw",
            }}
          >
            <div>
              <Text size="xl">#{idx + 1}</Text>
              <Text color="dimmed">{val.name}</Text>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                gap: 10,
                minWidth: "40%",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <Text>Success Rate</Text>
                <Text>Total Correct</Text>
                <Text>Total Predictions</Text>
              </div>
              <div style={{ textAlign: "right" }}>
                <Text>{val.sucess_rate}%</Text>
                <Text>{val.total_correct}</Text>
                <Text>{val.total_predict}</Text>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
