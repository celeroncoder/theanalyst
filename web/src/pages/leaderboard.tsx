import { Container, Title, Text } from "@mantine/core";
import { Wrapper } from "../components";
import { LeaderBoard as LeaderBoardComponent } from "../components";

export default function LeaderBoard() {
  return (
    <Wrapper>
      <Container mb="xl" style={{ textAlign: "center" }}>
        <Title>Leaderboard</Title>
        <Text color="dimmed">Meet the top-notch sport analysts</Text>
      </Container>
      <LeaderBoardComponent limit={50} />
    </Wrapper>
  );
}
