import { Container, Grid, Text } from "@nextui-org/react";
import Border from "../components/border";
import { cleanPorts, getBorders, matchQuery } from "../utils";
export default function Home({ title, ports }) {
  return (
    <Container>
      <Grid.Container gap={2}>
        <Grid xs={12} align="center" direction="column" justify="center">
          <Text h1 weight="black">
            {title.toUpperCase()}
          </Text>
        </Grid>
        <Grid.Container xs={12} gap={3} alignContent="center" justify="center">
          {ports.map((port) => (
            <Grid xs={4} key={port.port_number}>
              <Border {...port} />
            </Grid>
          ))}
        </Grid.Container>
      </Grid.Container>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const {
    query: { id },
  } = context;

  const reports = await getBorders();
  const ports = matchQuery(id, reports);
  return {
    props: {
      title: id,
      ports: cleanPorts(ports),
    },
  };
}
