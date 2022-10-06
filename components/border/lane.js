import { Grid, Card, Text, Divider } from "@nextui-org/react";
import { getDelay } from "../../utils";
export const Lane = (data) => {
  const { title, lane, icon, type } = data;

  const { ready_lanes: delay_minutes } = lane;

  const d = getDelay({
    minutes: delay_minutes || 0,
  });
  const delay = console.log("delay", d.asHours());
  return (
    <Card variant="flat">
      <Card.Body>
        <Grid.Container
          justify="center"
          alignContent="center"
          alignItems="center"
          align="center"
          gap={2}
        >
          <Grid>
            <Text h2 weight={"black"}>
              {lane.ready_lanes.delay_minutes || 0} <Text>mins</Text>
            </Text>
          </Grid>
          <Divider />
          <Grid>
            <Text h3 weight={"black"}>
              {icon} <br /> {title} <br />
            </Text>
          </Grid>
          <Divider />
          <Grid>
            <Text weight={"black"}> Lanes: {lane.maximum_lanes}</Text>
          </Grid>
        </Grid.Container>
      </Card.Body>
    </Card>
  );
};

export const Lanes = ({ lanes, type }) => {
  return lanes.map(
    (l) =>
      l.lane.maximum_lanes !== "N/A" && (
        <Grid key={l.title} xs={6}>
          <Lane {...l} type={type} />
        </Grid>
      )
  );
};
