import { Button, Container, Grid, Card, Text } from "@nextui-org/react";
export const Lane = (data) => {
  const { title, lane, icon } = data;
  return (
    <Card variant="flat">
      <Card.Body>
        <Grid.Container justify="center">
          <Grid align="center">
            <Text h2>
              <b>{lane.ready_lanes.delay_minutes || 0}</b> mins
            </Text>
          </Grid>
          <Grid align="center">
            <Text h3>
              {icon} {title}
            </Text>
          </Grid>
          <Grid align="center">
            <Text> Lanes: {lane.maximum_lanes}</Text>
          </Grid>
        </Grid.Container>
      </Card.Body>
    </Card>
  );
};

export const Lanes = ({ lanes }) => {
  return lanes.map(
    (l) =>
      l.lane.maximum_lanes !== "N/A" && (
        <Grid key={l.title} xs={6}>
          <Lane {...l} />
        </Grid>
      )
  );
};
