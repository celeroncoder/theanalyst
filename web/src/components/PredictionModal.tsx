import { Button, Modal, NumberInput, Select } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { Prediction, Team } from "../types";

export const PredictionModal: React.FC<{
  teamA: Team;
  teamB: Team;
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setPredictions: React.Dispatch<React.SetStateAction<Array<Prediction>>>;
}> = ({ teamA, teamB, opened, setOpened, setPredictions }) => {
  const [winningTeam, setWinningTeam] = useState<Team>(teamA);
  const [winningPercentage, setWinningPercentage] = useState<number>(10);

  const submit = () => {
    setPredictions((pastPredictions) => [
      ...pastPredictions,
      { percentage: winningPercentage, teamA, teamB, winningTeam },
    ]);
    showNotification({
      title: "Prediction Saved",
      message: "Your prediction has been saved wait for the results.",
    });
    setOpened(false);
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Enter your prediction"
    >
      <Select
        value={winningTeam.code}
        onChange={(val) =>
          val && setWinningTeam(teamA.code === val ? teamA : teamB)
        }
        label="Winning Team"
        placeholder="TeamA"
        data={[
          { value: teamA.code, label: teamA.name },
          { value: teamB.code, label: teamB.name },
        ]}
      />
      <NumberInput
        mt="md"
        label="Winning Percentage"
        min={10}
        max={90}
        value={winningPercentage}
        onChange={(val) => val && setWinningPercentage(val)}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button mt="md" onClick={submit}>
          Submit
        </Button>
      </div>
    </Modal>
  );
};
