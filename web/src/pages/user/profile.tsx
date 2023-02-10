import { Avatar, Card, Container, RingProgress, Text } from "@mantine/core";
import { useSession } from "next-auth/react";
import { Wrapper } from "../../components";

export default function Profile() {
  const { data } = useSession();
  return (
    <Wrapper>
      <Container>
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <Avatar radius={50} size="xl" src={data?.user?.image!} />
          <div
            style={{
              paddingLeft: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "left",
              flexDirection: "column",
            }}
          >
            <Text>{data?.user?.name!}</Text>
            <Text variant="text" size="sm" color="dimmed">
              {data?.user?.email!}
            </Text>
          </div>
        </Container>
        <Container
          mt="lg"
          style={{
            display: "flex",
            alignItems: "start",
            justifyContent: "space-around",
          }}
        >
          <Card
            sx={(theme) => ({
              display: "flex",
              alignItems: "start",
              justifyContent: "space-around",
              gap: theme.spacing.xl * 2,
            })}
            p="lg"
            shadow="lg"
            withBorder
          >
            <div>
              <Text>Predictions Made</Text>
              <Text>Correct Predictions</Text>
              <Text>Incorrect Predictions</Text>
              <Text>Success Rate</Text>
              <Text>Failure Rate</Text>
            </div>
            <div>
              <Text>23</Text>
              <Text>20</Text>
              <Text>3</Text>
              <Text>{((20 / 23) * 100).toFixed(1)}%</Text>
              <Text>{((3 / 23) * 100).toFixed(1)}%</Text>
            </div>
          </Card>
          <Card p="lg" shadow="lg" withBorder>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                gap: 50,
              }}
            >
              <RingProgress
                sections={[
                  {
                    value: Number(((240 / 500) * 100).toFixed(1)),
                    color: "blue",
                  },
                ]}
                label={
                  <Text color="blue" weight={700} align="center" size="xl">
                    {((240 / 500) * 100).toFixed(1)}%
                  </Text>
                }
              />
              <div>
                <Text>Credits Remaining</Text>
                <Text>Total Credits (free)</Text>
              </div>
              <div>
                <Text>240</Text>
                <Text>500</Text>
              </div>
            </div>
          </Card>
        </Container>
      </Container>
    </Wrapper>
  );
}
