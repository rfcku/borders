import { useState } from "react";
import {
  Badge,
  Button,
  Container,
  Divider,
  Grid,
  Text,
} from "@nextui-org/react";
import Head from "next/head";

import Border from "../components/border";
import { cleanObj, getBorders, arrangeBy } from "../utils";

const groups = {
  Canada: [],
  Mexico: [],
};

export default function Home({ time, groups }) {
  const [country, setCountry] = useState("Mexico");
  const ports = groups[country];
  const countries = Object.keys(groups);

  const [portName, setPortName] = useState("");

  const gs = arrangeBy(ports, "port_name");

  return (
    <>
      <Head>
        <title>Border Wait Times US / {country.toUpperCase()}</title>
        <meta name="google" content="nositelinkssearchbox" key="sitelinks" />
        <meta name="google" content="notranslate" key="notranslate" />
      </Head>
      <Container>
        <Grid.Container gap={2}>
          <Grid xs={12} align="center" direction="column" justify="center">
            <Text h1>US / {country.toUpperCase()}</Text>
          </Grid>
          <Grid
            xs={12}
            alignContent="center"
            justify="center"
            alignItems="center"
            align="center"
          >
            <Button.Group ghost>
              {countries.map((key) => (
                <Button
                  key={key}
                  onClick={() => {
                    setCountry(key);
                    setPortName("");
                  }}
                >
                  {key.toUpperCase()}
                </Button>
              ))}
            </Button.Group>
          </Grid>
          <Grid.Container xs={12}>
            {Object.keys(gs).map((title) => (
              <Badge
                key={title}
                color={portName === title ? "success" : "default"}
                onClick={() => setPortName(title)}
              >
                {title}
              </Badge>
            ))}
          </Grid.Container>
          <Grid xs={12}>
            <Divider />
          </Grid>
          <Grid.Container gap={2}>
            {ports.map((port) => {
              if (portName !== "" && port.port_name !== portName) return null;

              return (
                <Grid xs={3} key={port.port_number}>
                  <Border {...port} />
                </Grid>
              );
            })}
          </Grid.Container>
        </Grid.Container>
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  const reports = await getBorders();
  const { port: ports } = reports;

  const gs = arrangeBy(ports, "port_name");
  console.log("Groups", Object.keys(gs));

  ports.forEach((port) => {
    const obj = cleanObj(port);
    if (port.border[0].includes("Canadian")) {
      groups.Canada.push(obj);
    } else {
      groups.Mexico.push(obj);
    }
  });
  return {
    props: {
      ports: ports || [],
      groups: groups || [],
      gs: gs || {},
      keys: Object.keys(gs) || [],
    },
  };
}
